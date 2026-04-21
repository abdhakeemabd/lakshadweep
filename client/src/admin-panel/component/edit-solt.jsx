import React, { useEffect, useRef, useState } from 'react'
import DateRangeFilter from './date-range-filter'
import SearchableSelect from '../../component/searchable-select';

function EditSlotModal({ onSave, vendors = [], packages = [], slot, onClose }) {
  const dialogRef = useRef(null)
  const [isClosing, setIsClosing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [fetchingSlots, setFetchingSlots] = useState(false)

  const [activeTab, setActiveTab] = useState("default");
  const [availableSlots, setAvailableSlots] = useState({
    default_slots: [],
    seasonal_slots: [],
    custom_slots: []
  });

  const [selectedSlots, setSelectedSlots] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState("");
  const [selectedVendor, setSelectedVendor] = useState("");
  const [price, setPrice] = useState("");
  const [capacity, setCapacity] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);

  const tabs = [
    { id: "default", label: "Default Slot" },
    { id: "seasonal", label: "Seasonal Slot" },
    { id: "custom", label: "Custom Slot" },
  ];

  const handleCloseModal = () => {
    setIsClosing(true)
    setTimeout(() => {
      dialogRef.current?.close()
      setIsClosing(false)
      if (onClose) onClose();
    }, 300)
  }

  useEffect(() => {
    const dialog = dialogRef.current
    const handleGlobalClick = (e) => {
      if (e.target.getAttribute('commandfor') === 'edit-slot-modal') {
        dialog?.showModal()
      }
      if (e.target.getAttribute('command') === 'close' && e.target.getAttribute('commandfor') === 'edit-slot-modal') {
        handleCloseModal()
      }
    }
    document.addEventListener('click', handleGlobalClick)
    return () => document.removeEventListener('click', handleGlobalClick)
  }, [])

  // Pre-populate when slot and props change
  useEffect(() => {
    if (slot) {
      // Find package title from packages list using name or ID
      const pkg = packages.find(p => (slot.package_id && p.id === slot.package_id) || (slot.package_name && p.title === slot.package_name));
      if (pkg) {
        setSelectedPackage(pkg.title);
      } else {
        setSelectedPackage(slot.package_name || "");
      }

      // Find vendor name from vendors list
      const vnd = vendors.find(v => (slot.vendor_id && v.id === slot.vendor_id) || (slot.vendor_name && v.vendor_name === slot.vendor_name));
      if (vnd) {
        setSelectedVendor(vnd.vendor_name);
      } else {
        setSelectedVendor(slot.vendor_name || "");
      }

      setPrice(slot.resolved_price?.toString() || "");
      setCapacity(slot.capacity?.toString() || "");
      setSelectedSlots(slot.slot_ids || []);
      
      const type = slot.type_label?.toLowerCase();
      if (type === 'seasonal') setActiveTab('seasonal');
      else if (type === 'custom') setActiveTab('custom');
      else setActiveTab('default');

      if (slot.start_date && slot.end_date) {
        setDateRange([new Date(slot.start_date), new Date(slot.end_date)]);
      } else {
        setDateRange([null, null]);
      }
    }
  }, [slot, packages, vendors]);

  useEffect(() => {
    const fetchAvailableSlots = async () => {
      if (!selectedPackage) return;
      const pkgId = packages.find(p => p.title === selectedPackage)?.id;
      const vndId = vendors.find(v => v.vendor_name === selectedVendor)?.id;
      if (!pkgId) return;
      try {
        setFetchingSlots(true);
        const response = await fetch(`/slot-api/slot/fetch/?package=${pkgId}${vndId ? `&vendor_id=${vndId}` : ''}`, {
          headers: {
            'Authorization': 'Token 8RWYE3BKLZCFIN2FHQNNQEAEWBNDY184TGNYTY6X',
            'Accept': 'application/json',
            'ngrok-skip-browser-warning': 'true'
          }
        });
        const data = await response.json();
        if (data.status) {
          setAvailableSlots({
            default_slots: data.default_slots || [],
            seasonal_slots: data.seasonal_slots || [],
            custom_slots: data.custom_slots || []
          });
        }
      } catch (error) {
        console.error("Error fetching slots:", error);
      } finally {
        setFetchingSlots(false);
      }
    };

    fetchAvailableSlots();
  }, [selectedPackage, selectedVendor, packages, vendors]);

  const getActiveSlots = () => {
    switch (activeTab) {
      case "seasonal": return availableSlots.seasonal_slots;
      case "custom": return availableSlots.custom_slots;
      default: return availableSlots.default_slots;
    }
  };

  const handleSlotToggle = (slotId) => {
    setSelectedSlots(prev =>
      prev.includes(slotId)
        ? prev.filter(id => id !== slotId)
        : [...prev, slotId]
    );
  };

  const handleUpdate = async () => {
    if (!slot) return;

    const pkgId = packages.find(p => p.title === selectedPackage)?.id;
    const vndId = vendors.find(v => v.vendor_name === selectedVendor)?.id;

    if (!selectedPackage || !pkgId) {
      alert("Please select a valid package.");
      return;
    }

    if (!price || parseFloat(price) <= 0) {
      alert("Please enter a valid price.");
      return;
    }

    if (!capacity || parseInt(capacity) < 0) {
      alert("Please enter a valid capacity.");
      return;
    }

    if (!selectedSlots || selectedSlots.length === 0) {
      alert("Please select at least one slot.");
      return;
    }

    // Normalize slot_ids: handle both array of IDs and array of objects
    const normalizedSlotIds = selectedSlots.map(s => {
      if (typeof s === 'object' && s !== null) return parseInt(s.id || s.slot_id);
      return parseInt(s);
    }).filter(id => !isNaN(id));

    const payload = {
      vps_id: parseInt(slot.id),
      package_id: parseInt(pkgId),
      slot_ids: normalizedSlotIds,
      type: activeTab === 'default' ? 1 : activeTab === 'seasonal' ? 2 : 3,
      price: parseFloat(price),
      capacity: parseInt(capacity),
    };

    if (vndId) payload.vendor_id = parseInt(vndId);
    if (dateRange[0]) payload.start_date = (dateRange[0] instanceof Date) ? dateRange[0].toISOString().split('T')[0] : String(dateRange[0]).split('T')[0];
    if (dateRange[1]) payload.end_date = (dateRange[1] instanceof Date) ? dateRange[1].toISOString().split('T')[0] : String(dateRange[1]).split('T')[0];

    console.log("Sending slot update payload:", payload);

    try {
      setLoading(true);
      
      const candidates = [
        { url: "/slot-api/slot/update/", method: "POST" },
        { url: "/slot-api/slot/save-vps/", method: "POST" },
      ];

      let lastData;
      let success = false;

      for (const candidate of candidates) {
        try {
          const response = await fetch(candidate.url, {
            method: candidate.method,
            headers: {
              'Authorization': 'Token 8RWYE3BKLZCFIN2FHQNNQEAEWBNDY184TGNYTY6X',
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'ngrok-skip-browser-warning': 'true'
            },
            body: JSON.stringify(payload)
          });

          const text = await response.text();
          let data;
          try {
            data = JSON.parse(text);
          } catch (e) {
            console.warn(`Response from ${candidate.url} was not JSON:`, text.substring(0, 100));
            continue;
          }
          
          lastData = data;

          if (response.ok && (data.status === true || data.status === 'success' || (response.status >= 200 && response.status < 300))) {
            success = true;
            break;
          }
        } catch (e) {
          console.warn(`Attempt failed for ${candidate.url}:`, e);
        }
      }

      if (success) {
        alert("Slot configuration updated successfully!");
        if (onSave) onSave();
        handleCloseModal();
      } else {
        let errorMsg = lastData?.message || lastData?.error || "Failed to update slot configuration";
        if (typeof lastData === 'object' && lastData !== null) {
          const details = Object.entries(lastData)
            .filter(([key]) => key !== 'status' && key !== 'message')
            .map(([key, val]) => `${key}: ${Array.isArray(val) ? val.join(', ') : val}`)
            .join('\n');
          if (details) errorMsg += `\n\nDetails:\n${details}`;
        }
        alert(errorMsg);
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("An error occurred while updating: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <dialog ref={dialogRef} id="edit-slot-modal" aria-labelledby="edit-slot-modal-title" className={`premium-modal fixed inset-0 z-100 w-full h-full bg-transparent m-0 p-0 max-w-none max-h-none backdrop:bg-black/50 py-3 md:py-7 ${isClosing ? 'closing' : ''}`}>
        <div className="flex min-h-screen min-w-full items-center justify-center p-4">
          <div className={`modal-content relative w-full py-4 px-6 max-w-[800px] transform overflow-hidden rounded-[15px] bg-white shadow-2xl ${isClosing ? 'closing' : ''}`}>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="modal-header py-10 flex justify-between">
                <h1 className='font-poppins font-bold text-[20px] md:text-[24px] leading-[100%] text-[#2A2A2A]'>Edit Slot Configuration</h1>
                <button type="button" className="absolute top-1 right-1 z-50 p-1 rounded-full text-gray-500 bg-gray-100 hover:bg-gray-200 hover:text-gray-900 transition-all duration-300 cursor-pointer hover:rotate-90 flex items-center justify-center border-none" onClick={handleCloseModal} aria-label="Close">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                </button>
                <button type='button' disabled={loading} className="absolute top-13 right-10 z-50 p-[10px_50px_10px_50px] bg-[#007BFF] text-white rounded-[10px] transition-all duration-300 cursor-pointer flex items-center justify-center border-none font-semibold disabled:opacity-50" onClick={handleUpdate}> 
                  {loading ? 'Updating...' : 'Update'}
                </button>
              </div>
              <div className="modal-body bg-white">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-5">
                  <div className='col-span-1 md:col-span-6 mb-3'>
                    <label className='text-[#3d3d3d] font-medium text-[13px] mb-2 block'>Package <span className='text-red-500'>*</span> </label>
                    <SearchableSelect options={packages.map(p => p.title)} value={selectedPackage} onChange={(val) => setSelectedPackage(val)} placeholder="Select Package" searchPlaceholder="Search package..." />
                  </div>
                  <div className='col-span-1 md:col-span-6 mb-3'>
                    <label className='text-[#3d3d3d] font-medium text-[13px] mb-2 block'>Vendor (Optional)</label>
                    <SearchableSelect options={vendors.map(v => v.vendor_name)} value={selectedVendor} onChange={(val) => setSelectedVendor(val)} placeholder="Select Vendor" searchPlaceholder="Search vendor..." />
                  </div>
                  <div className="col-span-12">
                    <div className="w-full">
                      <div className="grid gap-3 grid-cols-12">
                        <div className="col-span-12 md:col-span-4">
                          <ul className="block gap-2 p-1 border border-[#E5E5E5] rounded-[12px] shadow-[0_1px_0_rgba(0,0,0,0.02)]">
                            {tabs.map((tab) => (
                              <li key={tab.id}>
                                <button type="button" onClick={() => setActiveTab(tab.id)} className={`border border-transparent flex items-center w-full py-[10px] px-[12px] rounded-[10px] font-medium text-[14px] text-left transition-all
                                  ${activeTab === tab.id ? "bg-[#E9F4FF] text-[#063970] border-[#CFE9FF] shadow-sm" : "text-[#070707] hover:bg-[#F3F8FF] cursor-pointer"}`} >
                                  <input type="radio" checked={activeTab === tab.id} readOnly className="mr-2 accent-[#007BFF] cursor-pointer w-[16px] h-[16px]" />
                                  {tab.label}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="col-span-12 md:col-span-8">
                          <div className="border border-[#E6F2FF] p-4 min-h-[273px] rounded-[12px] bg-[#E6F2FF]">
                            <div className="flex gap-3 items-center justify-between mb-3">
                              <h3 className="text-lg font-semibold text-[#0F2446]">Available Slots</h3>
                              {(activeTab === "seasonal" || activeTab === "custom") && (
                                <div className="flex items-center gap-3 bg-[#E9F5FF] text-[#0085FF] font-semibold text-[13px] rounded-[12px] w-fit shadow-sm whitespace-nowrap border border-[#2151B9]">
                                  <DateRangeFilter value={dateRange} onChange={setDateRange} />
                                </div>
                              )}
                            </div>
                            
                            {fetchingSlots ? (
                              <div className="flex justify-center items-center h-40">
                                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#007BFF]"></div>
                              </div>
                            ) : getActiveSlots().length === 0 ? (
                              <div className="flex justify-center items-center h-40 text-gray-500 italic">
                                {(!selectedPackage) ? 'Please select a package first' : 'No slots found for this selection'}
                              </div>
                            ) : (
                              <div className="flex flex-col gap-3 max-h-[300px] overflow-y-auto pr-2">
                                {getActiveSlots().map((slotItem) => (
                                  <div key={slotItem.id} className="flex items-center gap-3">
                                    <input id={`edit-slot-${slotItem.id}`} type="checkbox" className="w-[18px] h-[18px] cursor-pointer accent-[#007BFF]" checked={selectedSlots.includes(slotItem.id)} onChange={() => handleSlotToggle(slotItem.id)} />
                                    <label htmlFor={`edit-slot-${slotItem.id}`} className="flex items-center gap-[24px] bg-white p-3 w-full rounded-lg cursor-pointer hover:bg-[#F7FAFF] transition shadow-sm border border-transparent hover:border-blue-200">
                                      <div className="text-[14px] font-semibold text-[#070707] min-w-[100px]">{slotItem.name}</div>
                                      <div className="text-[12px] font-medium text-[#475569]">{slotItem.start_time} - {slotItem.end_time}</div>
                                    </label>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-span-1 md:col-span-6 mb-3'>
                    <label className='text-[#3d3d3d] font-medium text-[13px] block mb-2'>Update Price <span className='text-red-500'>*</span> </label>
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className='bg-[#F5F5F5] w-full text-[13px] rounded-[10px] p-[10px] focus:outline-none border border-transparent focus:border-blue-300' placeholder='Enter Price (INR)' />
                  </div>
                  <div className='col-span-1 md:col-span-6 mb-3'>
                    <label className='text-[#3d3d3d] font-medium text-[13px] block mb-2'>Capacity per Slot <span className='text-red-500'>*</span> </label>
                    <input type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)} className='bg-[#F5F5F5] w-full text-[13px] rounded-[10px] p-[10px] focus:outline-none border border-transparent focus:border-blue-300' placeholder='Enter number of seats' />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </>
  )
}

export default EditSlotModal
