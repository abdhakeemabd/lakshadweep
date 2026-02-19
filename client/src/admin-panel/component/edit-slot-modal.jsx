import React, { useEffect, useRef, useState, forwardRef } from 'react'
import DatePicker, { CalendarContainer } from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import CalendarIcon from '../../assets/admin-panel-icon/icons/calender-mute.svg'
import EditIcon from "../../assets/admin-panel-icon/icons/edit-icon.svg";

const formatDate = (date) => {
  if (!date) return '..';
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const MyContainer = ({ className, children, showCalendar, setShowCalendar, setPreset, startDate, endDate, handleCancel, handleApply }) => {
  const handleCustomClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowCalendar(true);
  };

  const handlePresetClick = (e, type) => {
    e.preventDefault();
    e.stopPropagation();
    setPreset(type);
  };

  return (
    <CalendarContainer className={`${className} custom-daterange-picker ${!showCalendar ? 'picker-presets-only' : ''}`}>
      <div className="flex" onClick={(e) => e.stopPropagation()}>
        <div className="datepicker-sidebar">
          <button type="button" onClick={(e) => handlePresetClick(e, 'today')}>Today</button>
          <button type="button" onClick={(e) => handlePresetClick(e, 'yesterday')}>Yesterday</button>
          <button type="button" onClick={(e) => handlePresetClick(e, 'last7')}>Last 7 Days</button>
          <button type="button" onClick={(e) => handlePresetClick(e, 'last30')}>Last 30 Days</button>
          <button type="button" onClick={(e) => handlePresetClick(e, 'thisMonth')}>This Month</button>
          <button type="button" onClick={(e) => handlePresetClick(e, 'lastMonth')}>Last Month</button>
          <button type="button" className={showCalendar ? 'active' : ''} onClick={handleCustomClick}>Custom Range</button>
        </div>
        {showCalendar && (
          <div className="datepicker-content">
            {children}
            <div className="datepicker-footer">
              <span className="range-text tracking-[1px]">
                {formatDate(startDate)} - {formatDate(endDate)}
              </span>
              <button type="button" className="btn-cancel" onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleCancel(); }}>Cancel</button>
              <button type="button" className="btn-apply" onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleApply(); }}>Apply</button>
            </div>
          </div>
        )}
      </div>
    </CalendarContainer>
  );
};

const CustomInput = forwardRef(({ value, onClick, disabled, showEditButton, onEditClick }, ref) => (
  <div className="flex items-center gap-2 relative w-full" ref={ref}>
    <input
      type="text"
      placeholder='DD/MM/YYYY - DD/MM/YYYY'
      disabled={disabled}
      value={value}
      readOnly
      onClick={!disabled ? onClick : undefined}
      className={`w-full rounded-[0px_10px_10px_0px] pl-0 ${showEditButton ? 'pr-[65px]' : 'pr-10'} py-2 text-[13.7px] text-[#414242] bg-[#F5F5F5] focus:outline-none ${disabled ? 'cursor-not-allowed opacity-80' : 'cursor-pointer'}`}
    />
    <div className='absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2'>
      <button
        type="button"
        className="p-0 cursor-pointer"
        disabled={disabled}
        onClick={!disabled ? onClick : undefined}
      >
        <img src={CalendarIcon} alt="Calendar" className="w-[22px] h-[22px]" />
      </button>
      {showEditButton && (
        <button type="button" className="p-0 cursor-pointer" onClick={onEditClick}>
          <img src={EditIcon} alt="Edit" className="w-[28px] h-[28px]" />
        </button>
      )}
    </div>
  </div>
));

function EditSlotModal() {
  const dialogRef = useRef(null)
  const formRef = useRef(null)
  const [isClosing, setIsClosing] = useState(false)

  // Seasonal Slot State
  const [isSeasonalEditing, setIsSeasonalEditing] = useState(false)
  const [seasonalDateRange, setSeasonalDateRange] = useState([null, null]);
  const [seasonalStartDate, seasonalEndDate] = seasonalDateRange;
  const [isSeasonalCalendarOpen, setIsSeasonalCalendarOpen] = useState(false);
  const [showSeasonalSidebar, setShowSeasonalSidebar] = useState(false);

  // Custom Slot State
  const [isCustomEditing, setIsCustomEditing] = useState(false)
  const [customDateRange, setCustomDateRange] = useState([null, null]);
  const [customStartDate, customEndDate] = customDateRange;
  const [isCustomCalendarOpen, setIsCustomCalendarOpen] = useState(false);
  const [showCustomSidebar, setShowCustomSidebar] = useState(false);

  const handleCloseModal = () => {
    setIsClosing(true)
    setTimeout(() => {
      dialogRef.current?.close()
      setIsClosing(false)

      // Reset State
      setIsSeasonalEditing(false)
      setSeasonalDateRange([null, null])
      setIsSeasonalCalendarOpen(false)
      setShowSeasonalSidebar(false)

      setIsCustomEditing(false)
      setCustomDateRange([null, null])
      setIsCustomCalendarOpen(false)
      setShowCustomSidebar(false)

      // Reset Form
      if (formRef.current) {
        formRef.current.reset()
      }
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

  const handlePreset = (type, setRange, setOpen, setShowSidebar) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let start, end;
    switch (type) {
      case 'today':
        start = end = today;
        break;
      case 'yesterday':
        start = end = new Date(today);
        start.setDate(today.getDate() - 1);
        break;
      case 'last7':
        start = new Date(today);
        start.setDate(today.getDate() - 7);
        end = today;
        break;
      case 'last30':
        start = new Date(today);
        start.setDate(today.getDate() - 30);
        end = today;
        break;
      case 'thisMonth':
        start = new Date(today.getFullYear(), today.getMonth(), 1);
        end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        break;
      case 'lastMonth':
        start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        end = new Date(today.getFullYear(), today.getMonth(), 0);
        break;
      default:
        setShowSidebar(true);
        return;
    }
    setRange([start, end]);
    setOpen(false);
    setShowSidebar(false);
  };
  
  const handleReset = () => {
    // Reset State
    setIsSeasonalEditing(false)
    setSeasonalDateRange([null, null])
    setIsSeasonalCalendarOpen(false)
    setShowSeasonalSidebar(false)
    
    setIsCustomEditing(false)
    setCustomDateRange([null, null])
    setIsCustomCalendarOpen(false)
    setShowCustomSidebar(false)

    // Reset Form
    if (formRef.current) {
      formRef.current.reset()
    }
  }

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
        
        /* Hide number arrows */
        input[type=number]::-webkit-outer-spin-button,
        input[type=number]::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type=number] {
          -moz-appearance: textfield;
        }
      `}</style>
      
      <dialog ref={dialogRef} id="edit-slot-modal" aria-labelledby="edit-slot-modal-title" className="fixed inset-0 z-[100] w-full h-full bg-transparent m-0 p-0 max-w-none max-h-none backdrop:bg-black/50 backdrop:backdrop-blur-sm py-3 md:py-7">
        <div className="flex min-h-screen min-w-full items-center justify-center p-4">
          <div className={`modal-content relative w-full py-4 px-6  max-w-[396px] transform rounded-[8px] bg-white shadow-2xl ${isClosing ? 'closing' : ''}`}>
            <form ref={formRef} action="">
              <div className="modal-header py-4 flex justify-between border-b border-[#E5E7EB]">
                <h1 className='font-poppins font-bold text-[20px] md:text-[16px] leading-[100%] text-[#2A2A2A]'>Edit Price</h1>
                <button type="button" className="absolute top-1 right-1 z-50 p-1 rounded-full text-gray-500 bg-gray-100 hover:bg-gray-200 hover:text-gray-900 transition-all duration-300 cursor-pointer hover:rotate-90 flex items-center justify-center border-none" onClick={handleCloseModal} command="close" commandfor="edit-slot-modal" aria-label="Close">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                </button>
              </div>
              <div className="modal-body bg-white py-5">
                <div className="card-head mb-3 text-[19px] font-semibold text-[#2A2A2A]">Summer Package A</div>
                <div className="grid col-spans-12 mb-3">
                  <div className="col-span-12 mb-3">
                    <label htmlFor="" className='text-[13px] text-[#3d3d3d] font-medium'>Default Price</label>
                    <input type="number" name="" id="" className='bg-[#F5F5F5] w-full text-[13px] mt-2 text-start rounded-[10px] p-[10px_50px_10px_10px] focus:outline-none ' placeholder='Enter Default Price' onKeyDown={(e) => ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()} />
                  </div>
                  <div className="col-span-12 mb-3">
                    <label htmlFor="seasonal_price" className='text-[13px] text-[#3d3d3d] font-medium'>Seasonal Price</label>
                    <div className="flex items-center relative w-full">
                      <input type="number" name="seasonal_price" min="1" disabled={!isSeasonalEditing} className={`max-w-[90px] rounded-[10px_0px_0px_10px] pl-2 py-2 text-[14px] text-[#414242] bg-[#F5F5F5] focus:outline-none ${!isSeasonalEditing ? 'cursor-not-allowed opacity-80' : ''}`} placeholder="00.00" onKeyDown={(e) => ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()} />
                      <div className="relative w-full">
                        <DatePicker selectsRange={true} startDate={seasonalStartDate} endDate={seasonalEndDate} onChange={(update) => setSeasonalDateRange(update)} wrapperClassName="w-full" customInput={<CustomInput disabled={!isSeasonalEditing} showEditButton={!isSeasonalEditing} onEditClick={() => setIsSeasonalEditing(true)} />}
                          calendarContainer={(props) => (
                            <MyContainer {...props} showCalendar={showSeasonalSidebar} setShowCalendar={setShowSeasonalSidebar} setPreset={(type) => handlePreset(type, setSeasonalDateRange, setIsSeasonalCalendarOpen, setShowSeasonalSidebar)} startDate={seasonalStartDate} endDate={seasonalEndDate} handleCancel={() => { setSeasonalDateRange([null, null]); setIsSeasonalCalendarOpen(false); setShowSeasonalSidebar(false); }} handleApply={() => { setIsSeasonalCalendarOpen(false); setShowSeasonalSidebar(false); }}
                            />
                          )}
                          shouldCloseOnSelect={false} monthsShown={2} popperPlacement="bottom-end" dateFormat="dd/MM/yyyy" open={isSeasonalCalendarOpen && isSeasonalEditing} onClickOutside={() => setIsSeasonalCalendarOpen(false)} onInputClick={() => isSeasonalEditing && setIsSeasonalCalendarOpen(true)} disabled={!isSeasonalEditing} />
                      </div>
                    </div>
                  </div>
                  <div className="col-span-12 mb-3">
                    <label htmlFor="custom_price" className='text-[13px] text-[#3d3d3d] font-medium'>Custom Price</label>
                    <div className="flex items-center relative w-full">
                      <input type="number" name="custom_price" min="1" disabled={!isCustomEditing} className={`max-w-[90px] rounded-[10px_0px_0px_10px] pl-2 py-2 text-[14px] text-[#414242] bg-[#F5F5F5] focus:outline-none ${!isCustomEditing ? 'cursor-not-allowed opacity-80' : ''}`} placeholder="00.00" onKeyDown={(e) => ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()} />
                      <div className="relative w-full">
                        <DatePicker selectsRange={true} startDate={customStartDate} endDate={customEndDate} onChange={(update) => setCustomDateRange(update)} wrapperClassName="w-full" customInput={<CustomInput disabled={!isCustomEditing} showEditButton={!isCustomEditing} onEditClick={() => setIsCustomEditing(true)} />}
                          calendarContainer={(props) => (
                            <MyContainer {...props} showCalendar={showCustomSidebar} setShowCalendar={setShowCustomSidebar} setPreset={(type) => handlePreset(type, setCustomDateRange, setIsCustomCalendarOpen, setShowCustomSidebar)} startDate={customStartDate} endDate={customEndDate} handleCancel={() => { setCustomDateRange([null, null]); setIsCustomCalendarOpen(false); setShowCustomSidebar(false); }}
                              handleApply={() => { setIsCustomCalendarOpen(false); setShowCustomSidebar(false); }}
                            />
                          )} shouldCloseOnSelect={false} monthsShown={2} popperPlacement="bottom-end" dateFormat="dd/MM/yyyy" open={isCustomCalendarOpen && isCustomEditing} onClickOutside={() => setIsCustomCalendarOpen(false)} onInputClick={() => isCustomEditing && setIsCustomCalendarOpen(true)} disabled={!isCustomEditing}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 justify-between">
                  <button type='button' onClick={handleReset} className='cursor-pointer min-w-[168px] min-h-[38px] bg-[#EDEDED] text-[#313131] rounded-[7px] text-[14px] font-semibold'>Reset</button>
                  <button type='button' className='cursor-pointer min-w-[168px] min-h-[38px] bg-[#007BFF] text-[#FFFFFF] rounded-[7px] text-[14px] font-semibold'>Apply</button>
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
