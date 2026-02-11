import React, { useState, forwardRef } from 'react'
import DatePicker, { CalendarContainer } from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

const DateRangeFilter = ({ onRangeChange, initialRange = [null, null] }) => {
  const [dateRange, setDateRange] = useState(initialRange);
  const [startDate, endDate] = dateRange;
  const [isOpen, setIsOpen] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  const setPreset = (type) => {
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
        setShowCalendar(true);
        return;
    }
    setDateRange([start, end]);
    onRangeChange([start, end]);
    setIsOpen(false);
    setShowCalendar(false);
  };

  const handleApply = () => {
    onRangeChange(dateRange);
    setIsOpen(false);
    setShowCalendar(false);
  };

  const handleCancel = () => {
    setDateRange([null, null]);
    onRangeChange([null, null]);
    setIsOpen(false);
    setShowCalendar(false);
  };

  const CustomDateInput = forwardRef(({ value, onClick }, ref) => (
    <button
      className="flex items-center gap-3 bg-[#E9F5FF] text-[#0085FF] font-semibold text-[13px] px-5 py-2.5 rounded-[12px] w-fit shadow-sm transition-all hover:bg-[#D4EAFF] whitespace-nowrap"
      onClick={() => {
        setIsOpen(!isOpen);
        if (!isOpen) setShowCalendar(false);
      }}
      ref={ref}
    >
      <div className="flex items-center gap-3 shrink-0">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 2V5M16 2V5M3.5 9.09H20.5M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" stroke="#0085FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7 13.5H7.01M7 16.5H7.01M12 13.5H12.01M12 16.5H12.01M17 13.5H17.01M17 16.5H17.01" stroke="#0085FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="flex-1 text-center tracking-[1px]">{value || "Select Date Range"}</span>
      </div>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 ml-2">
        <path d="M19.92 8.95L13.4 15.47C12.63 16.24 11.37 16.24 10.6 15.47L4.08 8.95" stroke="#0085FF" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  ));

  const formatDate = (date) => {
    if (!date) return '..';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const MyContainer = ({ className, children }) => {
    return (
      <CalendarContainer className={`${className} custom-daterange-picker ${!showCalendar ? 'picker-presets-only' : ''}`}>
        <div className="flex">
          <div className="datepicker-sidebar">
            <button onClick={() => setPreset('today')}>Today</button>
            <button onClick={() => setPreset('yesterday')}>Yesterday</button>
            <button onClick={() => setPreset('last7')}>Last 7 Days</button>
            <button onClick={() => setPreset('last30')}>Last 30 Days</button>
            <button onClick={() => setPreset('thisMonth')}>This Month</button>
            <button onClick={() => setPreset('lastMonth')}>Last Month</button>
            <button className={showCalendar ? 'active' : ''} onClick={() => setShowCalendar(true)}>Custom Range</button>
          </div>
          {showCalendar && (
            <div className="datepicker-content">
              {children}
              <div className="datepicker-footer">
                <span className="range-text tracking-[1px]">
                  {formatDate(startDate)} - {formatDate(endDate)}
                </span>
                <button className="btn-cancel" onClick={handleCancel}>Cancel</button>
                <button className="btn-apply" onClick={handleApply}>Apply</button>
              </div>
            </div>
          )}
        </div>
      </CalendarContainer>
    );
  };

  return (
    <div className="flex items-center gap-4">
      <DatePicker
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        onChange={(update) => setDateRange(update)}
        customInput={<CustomDateInput />}
        calendarContainer={MyContainer}
        shouldCloseOnSelect={false}
        monthsShown={2}
        popperPlacement="bottom-end"
        dateFormat="dd/MM/yyyy"
        open={isOpen}
        onClickOutside={() => setIsOpen(false)}
        onInputClick={() => setIsOpen(true)}
      />
      {startDate && (
        <button
          onClick={() => {
            handleCancel();
            setShowCalendar(false);
          }}
          className="text-[12px] text-[#8c8c8c] hover:text-[#FF5C1A] font-medium transition-colors"
        >
          Clear Filter
        </button>
      )}
    </div>
  )
}

export default DateRangeFilter
