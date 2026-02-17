import React, { useEffect, useRef, useState } from 'react'
import DateRangeFilter from './date-range-filter'

function EditSlotModal() {
  const dialogRef = useRef(null)
  const [isClosing, setIsClosing] = useState(false)

  const handleCloseModal = () => {
    setIsClosing(true)
    setTimeout(() => {
      dialogRef.current?.close()
      setIsClosing(false)
    }, 300) // Match animation duration
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

  const [activeTab, setActiveTab] = useState("default");
  const tabs = [
    { id: "default", label: "Default Slot", content: "Add Slot" },
    { id: "seasonal", label: "Seasonal Slot", content: "Add Slot" },
    { id: "custom", label: "Custom Slot", content: "Add Slot" },
  ];
  const defaultSlots = [
    { id: "default-1", name: "Rahul", startTime: "9:00 a.m.", endTime: "11:00 a.m." },
    { id: "default-2", name: "Priya", startTime: "11:00 a.m.", endTime: "1:00 p.m." },
    { id: "default-3", name: "Amit", startTime: "2:00 p.m.", endTime: "4:00 p.m." },
    { id: "default-4", name: "Sneha", startTime: "4:00 p.m.", endTime: "6:00 p.m." },
  ];
  const seasonalSlots = [
    { id: "seasonal-1", name: "Summer Morning", startTime: "6:00 a.m.", endTime: "8:00 a.m." },
    { id: "seasonal-2", name: "Summer Evening", startTime: "5:00 p.m.", endTime: "7:00 p.m." },
    { id: "seasonal-3", name: "Winter Morning", startTime: "8:00 a.m.", endTime: "10:00 a.m." },
    { id: "seasonal-4", name: "Winter Evening", startTime: "3:00 p.m.", endTime: "5:00 p.m." },
  ];
  const customSlots = [
    { id: "custom-1", name: "Private Tour", startTime: "10:00 a.m.", endTime: "12:00 p.m." },
    { id: "custom-2", name: "Group Event", startTime: "1:00 p.m.", endTime: "3:00 p.m." },
    { id: "custom-3", name: "VIP Experience", startTime: "3:00 p.m.", endTime: "5:00 p.m." },
  ];

  const getActiveSlots = () => {
    switch (activeTab) {
      case "default":
        return defaultSlots;
      case "seasonal":
        return seasonalSlots;
      case "custom":
        return customSlots;
      default:
        return defaultSlots;
    }
  };

  const [selectedSlots, setSelectedSlots] = useState([]);

  const handleSlotToggle = (slotId) => {
    setSelectedSlots(prev =>
      prev.includes(slotId)
        ? prev.filter(id => id !== slotId)
        : [...prev, slotId]
    );
  };

  return (
    <>
      <style>{`
        @keyframes slideUp {
          from { 
            opacity: 0; 
            transform: translateY(-30px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        @keyframes slideDown {
          from { 
            opacity: 1; 
            transform: translateY(0); 
          }
          to { 
            opacity: 0; 
            transform: translateY(-30px); 
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        dialog[open] { animation: fadeIn 0.3s ease-out; }
        dialog[open] .modal-content { animation: slideUp 0.5s ease-out forwards; }
        dialog[open] .modal-content.closing { animation: slideDown 0.5s ease-out forwards; }
      `}</style>

      <dialog ref={dialogRef} id="edit-slot-modal" aria-labelledby="edit-slot-modal-title" className="fixed inset-0 z-[100] w-full h-full bg-transparent m-0 p-0 max-w-none max-h-none backdrop:bg-black/50 backdrop:backdrop-blur-sm py-3 md:py-7">
        <div className="flex min-h-screen min-w-full items-center justify-center p-4">
          <div className={`modal-content relative w-full py-4 px-6  max-w-[800px] transform overflow-hidden rounded-[15px] bg-white shadow-2xl ${isClosing ? 'closing' : ''}`}>
            <form action="">
              <div className="modal-header py-10 flex justify-between">
                <h1 className='font-poppins font-bold text-[20px] md:text-[24px] leading-[100%] text-[#2A2A2A]'>Edit Slot</h1>
                <button className="absolute top-1 right-1 z-50 p-1 rounded-full text-gray-500 bg-gray-100 hover:bg-gray-200 hover:text-gray-900 transition-all duration-300 cursor-pointer hover:rotate-90 flex items-center justify-center border-none" onClick={handleCloseModal} aria-label="Close">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                </button>
                <button type='button' className="absolute top-13 right-10 z-50 p-[10px_50px_10px_50px] bg-[#007BFF] text-white rounded-[10px] transition-all duration-300 cursor-pointer flex items-center justify-center border-none font-semibold" onClick={handleCloseModal} aria-label="Close"> Save
                </button>
              </div>
              <div className="modal-body bg-white">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-5">
                  <div className='col-span-1 md:col-span-6 mb-3'>
                    <label htmlFor="slot-name" className='text-[#3d3d3d] text-medium text-[13px] mb-2'>Package <span className='text-red-500'>*</span> </label>
                    <select name="" id="" className='bg-[#F5F5F5] w-full text-[13px] text-start rounded-[10px] p-[10px_50px_10px_10px] focus:outline-none '>
                      <option value="">Select Package</option>
                    </select>
                  </div>
                  <div className='col-span-1 md:col-span-6 mb-3'>
                    <label htmlFor="slot-name" className='text-[#3d3d3d] text-medium text-[13px] mb-2'>Vendor <span className='text-red-500'>*</span> </label>
                    <select name="" id="" className='bg-[#F5F5F5] w-full text-[13px] text-start rounded-[10px] p-[10px_50px_10px_10px] focus:outline-none '>
                      <option value="">Select Vendor</option>
                    </select>
                  </div>
                  <div className="col-span-12">
                    <div className="w-full">
                      <div className="grid gap-3 grid-cols-12">
                        <div className="col-span-12 md:col-span-4">
                          <ul className="block gap-2 p-1 border-1 border-[#E5E5E5] rounded-[12px]  shadow-[0_1px_0_rgba(0,0,0,0.02)]">
                            {tabs.map((tab) => (
                              <li key={tab.id}>
                                <button type="button" onClick={() => setActiveTab(tab.id)} className={`border-1 border-transparent flex items-center w-full py-[10px] px-[12px] rounded-[10px] font-medium text-[14px] text-left transition-300
                                  ${activeTab === tab.id ? "bg-[#E9F4FF] text-[#063970] border-[#CFE9FF] shadow-[0_6px_18px_rgba(9,30,66,0.04)]" : "text-[#070707] hover:bg-[#F3F8FF] cursor-pointer"}`} >
                                  <input type="radio" checked={activeTab === tab.id} readOnly className="mr-2 accent-[#4E46B4] cursor-pointer w-[16px] h-[16px]" />
                                  {tab.label}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="col-span-12 md:col-span-8">
                          <div className="border border-[#E6F2FF] p-4 min-h-[273px] rounded-[12px] bg-[#E6F2FF]">
                            {tabs.map(
                              (tab) => activeTab === tab.id && (
                                <div key={tab.id}>
                                  <div className="flex gap-3 items-center justify-between mb-3">
                                    <h3 className="text-lg font-semibold text-[#0F2446]">Add Slot</h3>
                                    {(activeTab === "seasonal" || activeTab === "custom") && (
                                      <div className="flex items-center gap-3 bg-[#E9F5FF] text-[#0085FF] font-semibold text-[13px] rounded-[12px] w-fit shadow-sm whitespace-nowrap border border-[#2151B9]">
                                        <DateRangeFilter />
                                      </div>
                                    )}
                                  </div>
                                  {activeTab === "default" && (
                                    <div className="flex flex-col gap-3">
                                      {getActiveSlots().map((slot) => (
                                        <div key={slot.id} className="flex items-center gap-3">
                                          <input id={`slot-${slot.id}`} type="checkbox" className="w-[16px] h-[16px] cursor-pointer accent-[#007BFF] rounded-[10px]" checked={selectedSlots.includes(slot.id)} onChange={() => handleSlotToggle(slot.id)} />
                                          <label htmlFor={`slot-${slot.id}`} className="flex items-center gap-[24px] bg-white p-3 w-full rounded-lg cursor-pointer hover:bg-[#F7FAFF] transition">
                                            <div className="text-[14px] font-semibold text-[#070707]">{slot.name}</div>
                                            <div className="text-[12px] font-medium text-[#475569]">{slot.startTime} - {slot.endTime}</div>
                                          </label>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                  {(activeTab === "seasonal" || activeTab === "custom") && (
                                    <div className="flex flex-col gap-3">
                                      {getActiveSlots().map((slot) => (
                                        <div key={slot.id} className="flex items-center gap-3">
                                          <input id={`slot-${slot.id}`} type="checkbox" className="w-[16px] h-[16px] cursor-pointer accent-[#007BFF] rounded-[10px]" checked={selectedSlots.includes(slot.id)} onChange={() => handleSlotToggle(slot.id)} />
                                          <label htmlFor={`slot-${slot.id}`} className="w-full cursor-pointer">
                                            <div className="flex gap-3 justify-between">
                                              <div className="text-[14px] font-semibold text-[#070707] bg-white p-3 w-full rounded-[10px]">{slot.name}</div>
                                              <div className="text-[12px] font-medium text-[#475569] bg-white p-3 w-full rounded-[10px]">{slot.startTime} - {slot.endTime}</div>
                                            </div>
                                          </label>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-span-1 md:col-span-6 mb-3'>
                    <label htmlFor="slot-name" className='text-[#3d3d3d] text-medium text-[13px]'>Current Price <span className='text-red-500'>*</span> </label>
                    <input type="number" name="" id="" className='bg-[#F5F5F5] w-full text-[13px] mt-2 text-start rounded-[10px] p-[10px_50px_10px_10px] focus:outline-none ' placeholder='Enter current Price' />
                  </div>
                  <div className='col-span-1 md:col-span-6 mb-3'>
                    <label htmlFor="slot-name" className='text-[#3d3d3d] text-medium text-[13px]'>Set Capacity <span className='text-red-500'>*</span> (per slot) </label>
                    <input type="number" name="" id="" className='bg-[#F5F5F5] w-full text-[13px] mt-2 text-start rounded-[10px] p-[10px_50px_10px_10px] focus:outline-none ' placeholder='Enter number of seats' />
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
