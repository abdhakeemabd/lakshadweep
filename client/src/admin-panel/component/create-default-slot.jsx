import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import AddSlotIcon from "../../../src/assets/admin-panel-icon/icons/add_icon.svg";
import DeleteIcon from "../../../src/assets/admin-panel-icon/icons/delete-icon.svg";

function CreateDefaultSlot() {
  const { id: packageId } = useParams();
  const [slots, setSlots] = useState([
    { id: Date.now(), name: '', start_time: '', end_time: '', touched: [], isNew: true }
  ]);

  const formatTime = (timeStr) => {
    if (!timeStr) return '';
    if (/^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/.test(timeStr)) return timeStr;
    const match = timeStr.match(/^(\d{1,2}):(\d{2})(:(\d{2}))?$/);
    if (match) {
      let hours = parseInt(match[1]);
      const minutes = match[2];
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      return `${String(hours).padStart(2, '0')}:${minutes} ${ampm}`;
    }
    return timeStr;
  };

  const fetchSlots = async () => {
    if (!packageId) return;
    try {
      const res = await fetch(`/slot-api/slot/fetch/?package=${packageId}`, {
        headers: {
          'Authorization': 'Token 8RWYE3BKLZCFIN2FHQNNQEAEWBNDY184TGNYTY6X',
          'Accept': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        }
      });
      if (res.ok) {
        const data = await res.json();
        const results = data.default_slots || (Array.isArray(data) ? data : (data.results || data.data || data.slots || []));
        const loadedSlots = results.map(s => ({
          id: s.id || s.pk || s.slot_id,
          name: s.slot_name || s.name || '',
          start_time: formatTime(s.start_time) || '',
          end_time: formatTime(s.end_time) || '',
          touched: [],
          isNew: false
        }));
        setSlots([...loadedSlots, { id: Date.now(), name: '', start_time: '', end_time: '', touched: [], isNew: true }]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddRow = async (e, currentSlot) => {
    if (e) e.preventDefault();
    setSlots(slots.map(s => s.id === currentSlot.id ? { ...s, touched: ['name', 'start_time', 'end_time'] } : s));
    const isNameValid = currentSlot.name.trim().length > 0;
    const isStartValid = validateTimeFormat(currentSlot.start_time);
    const isEndValid = validateTimeFormat(currentSlot.end_time);
    const isSequenceValid = isEndTimeLater(currentSlot.start_time, currentSlot.end_time);
    
    if (isNameValid && isStartValid && isEndValid && isSequenceValid && currentSlot.start_time && currentSlot.end_time) {
      try {
        const res = await fetch(`/package-api/package/${packageId}/default-slots/`, {
          method: 'POST',
          headers: {
            'Authorization': 'Token 8RWYE3BKLZCFIN2FHQNNQEAEWBNDY184TGNYTY6X',
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'ngrok-skip-browser-warning': 'true'
          },
          body: JSON.stringify({
            slot_name: currentSlot.name,
            name: currentSlot.name,
            start_time: currentSlot.start_time,
            end_time: currentSlot.end_time,
            package: packageId
          })
        });
        if (res.ok) {
          fetchSlots(); // Refresh list after saving
        } else {
          const text = await res.text();
          console.error("Failed to default slot:", text);
          alert("Failed to save slot. Check inputs.");
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleRemoveRow = async (id, isNew) => {
    if (isNew) {
      if (slots.length > 1) {
        setSlots(slots.filter(slot => slot.id !== id));
      }
    } else {
      if (!window.confirm("Are you sure you want to delete this slot?")) return;
      try {
        const res = await fetch(`/package-api/package/default-slot/${id}/`, {
          method: 'DELETE',
          headers: {
            'Authorization': 'Token 8RWYE3BKLZCFIN2FHQNNQEAEWBNDY184TGNYTY6X',
            'Accept': 'application/json',
            'ngrok-skip-browser-warning': 'true'
          }
        });
        if (res.ok || res.status === 204) {
          setSlots(slots.filter(slot => slot.id !== id));
        } else {
          alert('Failed to delete slot.');
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const validateTimeFormat = (time) => {
    if (!time) return false;
    const timeRegex = /^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/;
    return timeRegex.test(time);
  };
  const timeToMinutes = (time) => {
    const timeRegex = /^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/;
    if (!timeRegex.test(time)) return null;
    const [timeStr, period] = time.split(' ');
    let [hours, minutes] = timeStr.split(':').map(Number);
    if (period === 'PM' && hours < 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    return hours * 60 + minutes;
  };
  const isEndTimeLater = (start, end) => {
    if (!start || !end) return true;
    const timeRegex = /^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/;
    if (!timeRegex.test(start) || !timeRegex.test(end)) return true;
    const startMins = timeToMinutes(start);
    const endMins = timeToMinutes(end);
    return endMins > startMins;
  };

  useEffect(() => {
    const dialog = document.getElementById('drawer_default_slot');
    if (dialog) {
      const handleToggle = (e) => {
        if (dialog.open) {
          fetchSlots();
        } else {
          setSlots([{ id: Date.now(), name: '', start_time: '', end_time: '', touched: [], isNew: true }]);
        }
      };
      
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.attributeName === 'open') {
             if (dialog.hasAttribute('open')) {
                 fetchSlots();
             } else {
                 setSlots([{ id: Date.now(), name: '', start_time: '', end_time: '', touched: [], isNew: true }]);
             }
          }
        });
      });
      observer.observe(dialog, { attributes: true });

      return () => observer.disconnect();
    }
  }, [packageId]);

  const markTouched = (id, field) => {
    setSlots(prev => prev.map(slot => {
      if (slot.id === id) {
        const newTouched = [...slot.touched];
        if (!newTouched.includes(field)) newTouched.push(field);

        if (field === 'start_time' && !newTouched.includes('name')) newTouched.push('name');
        if (field === 'end_time') {
          if (!newTouched.includes('name')) newTouched.push('name');
          if (!newTouched.includes('start_time')) newTouched.push('start_time');
        }
        return { ...slot, touched: newTouched };
      }
      return slot;
    }));
  };

  const handleInputChange = (id, field, value) => {
    let processedValue = value;

    if (field === 'start_time' || field === 'end_time') {
      processedValue = value.toUpperCase();
      processedValue = processedValue.replace(/[^0-9: APM]/g, '');

      if (processedValue.length > 8) {
        processedValue = processedValue.slice(0, 8);
      }
      if (/^\d{2}:\d{2}[AP]M$/.test(processedValue)) {
        processedValue = processedValue.slice(0, 5) + ' ' + processedValue.slice(5);
      }
      else if (/^\d{2}:\d{2}:[AP]M$/.test(processedValue)) {
        processedValue = processedValue.slice(0, 5) + ' ' + processedValue.slice(6);
      }
    }
    setSlots(slots.map(slot => slot.id === id ? { ...slot, [field]: processedValue } : slot));
    markTouched(id, field);
  };

  return (
    <>
      <dialog id="drawer_default_slot" aria-labelledby="drawer-title" className="offcanvas-drawer">
        <div className="offcanvas-panel flex flex-col bg-white py-6 shadow-xl">
          <div className="absolute z-10 top-2 right-2 flex">
            <button type="button" onClick={() => document.getElementById('drawer_default_slot').close()} className="relative rounded-md cursor-pointer text-gray-400 z-10 hover:text-gray-700 hover:rotate-90 transition-all duration-500 ease-in-out">
              <span className="sr-only">Close panel</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-6">
                <path d="M6 18 18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          <div className="px-4 sm:px-6">
            <h2 id="drawer-title" className="text-base font-semibold text-[19px] text-[#3d3d3d]">Create Default Slot</h2>
          </div>
          <div className="relative mt-6 flex-1 px-4 sm:px-6 overflow-y-auto">
            <form action="" onSubmit={(e) => e.preventDefault()}>
              {slots.map((slot, index) => (
                <div key={slot.id} className="grid grid-cols-10 gap-6 mb-4">
                  <div className="col-span-12 md:col-span-4 lg:col-span-3">
                    <label htmlFor={`slot_name_${slot.id}`} className="block text-[14px] font-medium text-[#3d3d3d] mb-2">Slot Name <span className="text-red-500">*</span></label>
                    <input type="text" name="name" id={`slot_name_${slot.id}`} placeholder='Enter Slot Name' value={slot.name} onChange={(e) => handleInputChange(slot.id, 'name', e.target.value)} onFocus={() => markTouched(slot.id, 'name')} readOnly={!slot.isNew} className={`mt-1 block w-full rounded-md border ${!slot.name?.trim() && slot.touched.includes('name') ? 'border-red-500' : 'border-[#e3e3e3]'} ${slot.isNew ? 'bg-[#F5F5F5]' : 'bg-[#e9ecef]'} py-2 px-3 text-[14px] font-poppins font-normal text-[#3d3d3d] placeholder:text-[#8C8C8C] focus:border-[#007BFF] focus:ring-[#007BFF]`} />
                    {!slot.name?.trim() && slot.touched.includes('name') && slot.isNew && (
                      <p className="text-red-500 absolute text-[10px] mt-1">Slot Name is required</p>)}
                  </div>
                  <div className="col-span-12 md:col-span-4 lg:col-span-3">
                    <label htmlFor={`start_time_${slot.id}`} className="block text-[14px] font-medium text-[#3d3d3d] mb-2">Start Time <span className="text-red-500">*</span></label>
                    <input type="text" name="start_time" id={`start_time_${slot.id}`} placeholder='HH:MM AM/PM' value={slot.start_time} onChange={(e) => handleInputChange(slot.id, 'start_time', e.target.value)} onFocus={() => markTouched(slot.id, 'start_time')} readOnly={!slot.isNew} className={`mt-1 block w-full rounded-md border ${(slot.touched.includes('start_time') && (!slot.start_time || !validateTimeFormat(slot.start_time))) ? 'border-red-500' : 'border-[#e3e3e3]'} ${slot.isNew ? 'bg-[#F5F5F5]' : 'bg-[#e9ecef]'} py-2 px-3 text-[14px] font-poppins font-normal text-[#3d3d3d] placeholder:text-[#474747] placeholder:font-medium focus:border-[#007BFF] focus:ring-[#007BFF]`} />
                    {slot.touched.includes('start_time') && !slot.start_time && slot.isNew && (
                      <p className="text-red-500 absolute text-[10px] mt-1">Start Time is required</p>
                    )}
                    {slot.touched.includes('start_time') && slot.start_time && !validateTimeFormat(slot.start_time) && slot.isNew && (
                      <p className="text-red-500 absolute text-[10px] mt-1">Format: HH:MM AM/PM</p>
                    )}
                  </div>
                  <div className="col-span-12 md:col-span-4 lg:col-span-3">
                    <label htmlFor={`end_time_${slot.id}`} className="block text-[14px] font-medium text-[#3d3d3d] mb-2">End Time <span className="text-red-500">*</span></label>
                    <input type="text" name="end_time" id={`end_time_${slot.id}`} placeholder='HH:MM AM/PM' value={slot.end_time} onChange={(e) => handleInputChange(slot.id, 'end_time', e.target.value)} onFocus={() => markTouched(slot.id, 'end_time')} readOnly={!slot.isNew} className={`mt-1 block w-full rounded-md border ${(slot.touched.includes('end_time') && (!slot.end_time || !validateTimeFormat(slot.end_time) || !isEndTimeLater(slot.start_time, slot.end_time))) ? 'border-red-500' : 'border-[#e3e3e3]'} ${slot.isNew ? 'bg-[#F5F5F5]' : 'bg-[#e9ecef]'} py-2 px-3 text-[14px] font-poppins font-normal text-[#3d3d3d] placeholder:text-[#474747] placeholder:font-medium focus:border-[#007BFF] focus:ring-[#007BFF]`} />
                    {slot.touched.includes('end_time') && !slot.end_time && slot.isNew && (
                      <p className="text-red-500 absolute text-[10px] mt-1">End Time is required</p>
                    )}
                    {slot.touched.includes('end_time') && slot.end_time && !validateTimeFormat(slot.end_time) && slot.isNew && (
                      <p className="text-red-500 absolute text-[10px] mt-1">Format: HH:MM AM/PM</p>
                    )}
                    {slot.touched.includes('end_time') && validateTimeFormat(slot.start_time) && validateTimeFormat(slot.end_time) && !isEndTimeLater(slot.start_time, slot.end_time) && slot.isNew && (
                      <p className="text-red-500 absolute text-[10px] mt-1">Must be later than start time</p>
                    )}
                  </div>
                  <div className="col-span-12 md:col-span-4 lg:col-span-1 mt-6 flex items-center">
                    {slot.isNew ? (
                      <button type="button" onClick={(e) => handleAddRow(e, slot)} className="btn SAVE_ICON cursor-pointer hover:scale-110 transition-transform">
                        <img src={AddSlotIcon} alt="Add Icon" />
                      </button>
                    ) : (
                      <button type="button" onClick={() => handleRemoveRow(slot.id, slot.isNew)} className="btn SAVE_ICON cursor-pointer hover:scale-110 transition-transform">
                        <img src={DeleteIcon} alt="Delete Icon" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </form>
          </div>
        </div>
      </dialog>
    </>
  )
}

export default CreateDefaultSlot