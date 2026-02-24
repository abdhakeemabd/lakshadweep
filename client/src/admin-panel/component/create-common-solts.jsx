import React, { useState } from 'react'
import AddSlotIcon from "../../../src/assets/admin-panel-icon/icons/add_icon.svg";
import DeleteIcon from "../../../src/assets/admin-panel-icon/icons/delete-icon.svg";

function CreateCommonSlot() {
  const [slots, setSlots] = useState([
    { id: Date.now(), name: '', start_time: '', end_time: '', touched: [] }
  ]);
  const handleAddRow = (e, currentSlot) => {
    if (e) e.preventDefault();
    setSlots(slots.map(s => s.id === currentSlot.id ? { ...s, touched: ['name', 'start_time', 'end_time'] } : s));
    const isNameValid = currentSlot.name.trim().length > 0;
    const isStartValid = validateTimeFormat(currentSlot.start_time);
    const isEndValid = validateTimeFormat(currentSlot.end_time);
    const isSequenceValid = isEndTimeLater(currentSlot.start_time, currentSlot.end_time);
    if (isNameValid && isStartValid && isEndValid && isSequenceValid && currentSlot.start_time && currentSlot.end_time) {
      console.log("Automatically saving slot:", currentSlot);
      setSlots([...slots, { id: Date.now() + Math.random(), name: '', start_time: '', end_time: '', touched: [] }]);
    }
  };
  const handleRemoveRow = (id) => {
    if (slots.length > 1) {
      setSlots(slots.filter(slot => slot.id !== id));
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
  React.useEffect(() => {
    const dialog = document.getElementById('drawer_common_slot');
    if (dialog) {
      const handleClose = () => {
        setSlots([{ id: Date.now(), name: '', start_time: '', end_time: '', touched: [] }]);
      };
      dialog.addEventListener('toggle', (e) => {
        if (!dialog.open) {
          handleClose();
        }
      });
      dialog.addEventListener('close', handleClose);
    }
  }, []);
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
      <dialog id="drawer_common_slot" aria-labelledby="drawer-title" className="offcanvas-drawer">
        <div className="offcanvas-panel flex flex-col bg-white py-6 shadow-xl">
          <div className="absolute z-10 top-2 right-2 flex">
            <button type="button" onClick={() => document.getElementById('drawer_common_slot').close()} className="relative rounded-md cursor-pointer text-gray-400 z-10 hover:text-gray-700 hover:rotate-90 transition-all duration-500 ease-in-out">
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
                    <input type="text" name="name" id={`slot_name_${slot.id}`} placeholder='Enter Slot Name' value={slot.name} onChange={(e) => handleInputChange(slot.id, 'name', e.target.value)} onFocus={() => markTouched(slot.id, 'name')} required className={`mt-1 block w-full rounded-md border ${!slot.name.trim() && slot.touched.includes('name') ? 'border-red-500' : 'border-[#e3e3e3]'} bg-[#F5F5F5] py-2 px-3 text-[14px] font-poppins font-normal text-[#3d3d3d] placeholder:text-[#8C8C8C] focus:border-[#007BFF] focus:ring-[#007BFF]`} />
                    {!slot.name.trim() && slot.touched.includes('name') && (
                      <p className="text-red-500 absolute text-[10px] mt-1">Slot Name is required</p>)}
                  </div>
                  <div className="col-span-12 md:col-span-4 lg:col-span-3">
                    <label htmlFor={`start_time_${slot.id}`} className="block text-[14px] font-medium text-[#3d3d3d] mb-2">Start Time <span className="text-red-500">*</span></label>
                    <input type="text" name="start_time" id={`start_time_${slot.id}`} placeholder='HH:MM AM/PM' value={slot.start_time} onChange={(e) => handleInputChange(slot.id, 'start_time', e.target.value)} onFocus={() => markTouched(slot.id, 'start_time')} required className={`mt-1 block w-full rounded-md border ${(slot.touched.includes('start_time') && (!slot.start_time || !validateTimeFormat(slot.start_time))) ? 'border-red-500' : 'border-[#e3e3e3]'} bg-[#F5F5F5] py-2 px-3 text-[14px] font-poppins font-normal text-[#3d3d3d] placeholder:text-[#474747] placeholder:font-medium focus:border-[#007BFF] focus:ring-[#007BFF]`} />
                    {slot.touched.includes('start_time') && !slot.start_time && (
                      <p className="text-red-500 absolute text-[10px] mt-1">Start Time is required</p>
                    )}
                    {slot.touched.includes('start_time') && slot.start_time && !validateTimeFormat(slot.start_time) && (
                      <p className="text-red-500 absolute text-[10px] mt-1">Format: HH:MM AM/PM</p>
                    )}
                  </div>
                  <div className="col-span-12 md:col-span-4 lg:col-span-3">
                    <label htmlFor={`end_time_${slot.id}`} className="block text-[14px] font-medium text-[#3d3d3d] mb-2">End Time <span className="text-red-500">*</span></label>
                    <input type="text" name="end_time" id={`end_time_${slot.id}`} placeholder='HH:MM AM/PM' value={slot.end_time} onChange={(e) => handleInputChange(slot.id, 'end_time', e.target.value)} onFocus={() => markTouched(slot.id, 'end_time')} required className={`mt-1 block w-full rounded-md border ${(slot.touched.includes('end_time') && (!slot.end_time || !validateTimeFormat(slot.end_time) || !isEndTimeLater(slot.start_time, slot.end_time))) ? 'border-red-500' : 'border-[#e3e3e3]'} bg-[#F5F5F5] py-2 px-3 text-[14px] font-poppins font-normal text-[#3d3d3d] placeholder:text-[#474747] placeholder:font-medium focus:border-[#007BFF] focus:ring-[#007BFF]`} />
                    {slot.touched.includes('end_time') && !slot.end_time && (
                      <p className="text-red-500 absolute text-[10px] mt-1">End Time is required</p>
                    )}
                    {slot.touched.includes('end_time') && slot.end_time && !validateTimeFormat(slot.end_time) && (
                      <p className="text-red-500 absolute text-[10px] mt-1">Format: HH:MM AM/PM</p>
                    )}
                    {slot.touched.includes('end_time') && validateTimeFormat(slot.start_time) && validateTimeFormat(slot.end_time) && !isEndTimeLater(slot.start_time, slot.end_time) && (
                      <p className="text-red-500 absolute text-[10px] mt-1">Must be later than start time</p>
                    )}
                  </div>

                  <div className="col-span-12 md:col-span-4 lg:col-span-1 mt-6 flex items-center">
                    {index === slots.length - 1 ? (
                      <button type="button" onClick={(e) => handleAddRow(e, slot)} className="btn SAVE_ICON cursor-pointer">
                        <img src={AddSlotIcon} alt="Add Icon" />
                      </button>
                    ) : (
                      <button type="button" onClick={() => handleRemoveRow(slot.id)} className="btn SAVE_ICON cursor-pointer">
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

export default CreateCommonSlot