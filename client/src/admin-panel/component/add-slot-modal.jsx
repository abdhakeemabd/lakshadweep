import React, { useEffect, useRef, useState } from 'react'
import DateRangeFilter from './date-range-filter'
import SearchableSelect from '../../component/searchable-select';

function AddSlotModal({ onSave, vendors = [], packages = [] }) {
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
      // Reset form
      setSelectedSlots([]);
      setSelectedPackage("");
      setSelectedVendor("");
      setPrice("");
      setCapacity("");
      setAvailableSlots({ default_slots: [], seasonal_slots: [], custom_slots: [] });
    }, 300)
  }

  useEffect(() => {
    const dialog = dialogRef.current
    const handleGlobalClick = (e) => {
      if (e.target.getAttribute('commandfor') === 'add-slot-modal') {
        dialog?.showModal()
      }
      if (e.target.getAttribute('command') === 'close' && e.target.getAttribute('commandfor') === 'add-slot-modal') {
        handleCloseModal()
      }
    }
    document.addEventListener('click', handleGlobalClick)
    return () => document.removeEventListener('click', handleGlobalClick)
  }, [])

  // Fetch slots whenever package or vendor changes
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

  const handleSave = async () => {
    if (!selectedPackage || selectedSlots.length === 0 || !price || !capacity) {
      alert("Please fill all required fields and select at least one slot.");
      return;
    }

    const pkgId = packages.find(p => p.title === selectedPackage)?.id;
    const vndId = vendors.find(v => v.vendor_name === selectedVendor)?.id;

    const payload = {
      package_id: parseInt(pkgId),
      slot_ids: selectedSlots.map(id => parseInt(id)).filter(id => !isNaN(id)),
      type: activeTab === 'default' ? 1 : activeTab === 'seasonal' ? 2 : 3,
      price: parseFloat(price),
      capacity: parseInt(capacity),
    };

    if (vndId) payload.vendor_id = parseInt(vndId);
    if (dateRange[0]) payload.start_date = (dateRange[0] instanceof Date) ? dateRange[0].toISOString().split('T')[0] : String(dateRange[0]).split('T')[0];
    if (dateRange[1]) payload.end_date = (dateRange[1] instanceof Date) ? dateRange[1].toISOString().split('T')[0] : String(dateRange[1]).split('T')[0];

    try {
      setLoading(true);
      const response = await fetch("/slot-api/slot/save-vps/", {
        method: "POST",
        headers: {
          'Authorization': 'Token 8RWYE3BKLZCFIN2FHQNNQEAEWBNDY184TGNYTY6X',
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      if (data.status) {
        alert("Slot configuration saved successfully!");
        if (onSave) onSave();
        handleCloseModal();
      } else {
        alert(data.message || "Failed to save slot configuration");
      }
    } catch (error) {
      console.error("Save error:", error);
      alert("An error occurred while saving.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <dialog ref={dialogRef} id="add-slot-modal" aria-labelledby="add-slot-modal-title" className={`premium-modal fixed inset-0 z-100 w-full h-full bg-transparent m-0 p-0 max-w-none max-h-none backdrop:bg-black/50 py-3 md:py-7 ${isClosing ? 'closing' : ''}`}>
        <div className="flex min-h-screen min-w-full items-center justify-center p-4">
          <div className={`modal-content relative w-full py-4 px-6 max-w-[800px] transform overflow-hidden rounded-[15px] bg-white shadow-2xl ${isClosing ? 'closing' : ''}`}>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="modal-header py-10 flex justify-between">
                <h1 className='font-poppins font-bold text-[20px] md:text-[24px] leading-[100%] text-[#2A2A2A]'>Create Slot</h1>
                <button type="button" className="absolute top-1 right-1 z-50 p-1 rounded-full text-gray-500 bg-gray-100 hover:bg-gray-200 hover:text-gray-900 transition-all duration-300 cursor-pointer hover:rotate-90 flex items-center justify-center border-none" onClick={handleCloseModal} aria-label="Close">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                </button>
                <button type='button' disabled={loading} className="absolute top-13 right-10 z-50 p-[10px_50px_10px_50px] bg-[#007BFF] text-white rounded-[10px] transition-all duration-300 cursor-pointer flex items-center justify-center border-none font-semibold disabled:opacity-50" onClick={handleSave}> 
                  {loading ? 'Saving...' : 'Save'}
                </button>
              </div>
              <div className="modal-body bg-white">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-5">
                  <div className='col-span-1 md:col-span-6 mb-3'>
                    <label className='text-[#3d3d3d] font-medium text-[13px] mb-2 block'>Package <span className='text-red-500'>*</span> </label>
                    <SearchableSelect options={Array.from(new Set(packages.map(p => p.title).filter(Boolean)))} value={selectedPackage} onChange={(val) => setSelectedPackage(val)} placeholder="Select Package" searchPlaceholder="Search package..." />
                  </div>
                  <div className='col-span-1 md:col-span-6 mb-3'>
                    <label className='text-[#3d3d3d] font-medium text-[13px] mb-2 block'>Vendor (Optional)</label>
                    <SearchableSelect options={Array.from(new Set(vendors.map(v => v.vendor_name).filter(Boolean)))} value={selectedVendor} onChange={(val) => setSelectedVendor(val)} placeholder="Select Vendor" searchPlaceholder="Search vendor..." />
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
                                {getActiveSlots().map((slot) => (
                                  <div key={slot.id} className="flex items-center gap-3">
                                    <input id={`slot-${slot.id}`} type="checkbox" className="w-[18px] h-[18px] cursor-pointer accent-[#007BFF]" checked={selectedSlots.includes(slot.id)} onChange={() => handleSlotToggle(slot.id)} />
                                    <label htmlFor={`slot-${slot.id}`} className="flex items-center gap-[24px] bg-white p-3 w-full rounded-lg cursor-pointer hover:bg-[#F7FAFF] transition shadow-sm border border-transparent hover:border-blue-200">
                                      <div className="text-[14px] font-semibold text-[#070707] min-w-[100px]">{slot.name}</div>
                                      <div className="text-[12px] font-medium text-[#475569]">{slot.start_time} - {slot.end_time}</div>
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
                    <label className='text-[#3d3d3d] font-medium text-[13px] block mb-2'>Current Price <span className='text-red-500'>*</span> </label>
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

export default AddSlotModal
