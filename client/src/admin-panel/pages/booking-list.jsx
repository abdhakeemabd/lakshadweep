import React, { useState, useEffect } from 'react'
import { FiMoreVertical } from 'react-icons/fi'
import BookingViewModal from '../component/booking-view-modal';
import BookingConfirmModal from '../component/booking-conform-modal';
import BookingCancelModal from '../component/booking-cancel-modal';

function BookingList() {
  const [openIndex, setOpenIndex] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const bookings = [
    {
      id: "001",
      packageId: "#GRGC567",
      packageName: "Summer Package",
      customerName: "Alexander Sharington",
      phone: "+91 98234567890",
      email: "alexies007ter@gmail.com",
      activity: "Scuba Diving",
      vendor: "William Anderson",
      location: "Kavaratti",
      seats: 2,
      pricePerSeat: 10000,
      totalAmount: 20000,
      status: "Pending",
      date: "15 Oct 2025",
      slot: "8:00 am - 9:00 am"
    }
  ];

  const handleViewBooking = (booking) => {
    setSelectedBooking(booking);
    setOpenIndex(null);
  };
  const handleConfirmBooking = (booking) => {
    setSelectedBooking(booking);
    setOpenIndex(null);
  };
  const toggleDropdown = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".dropdown-container")) {
        setOpenIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <>
      <div className="card relative flex flex-col bg-white bg-clip-border rounded-[1.25rem] shadow-[3px_4px_20px_0px_#0000000F] border-0 mt-3 py-3 px-3">
        <div className="card-header p-4 flex justify-between items-center border-b border-[#e3e3e3]">
          <div>
            <h1 className='font-poppins font-semibold text-[20px] md:text-[24px] leading-[100%] text-[#2A2A2A]'>All Bookings</h1>
          </div>
          <div className='flex items-center gap-3'>
            <button type='button' commandfor="add-slot-modal" className="flex items-center gap-4 bg-[#007BFF] rounded-[8px] py-[7px] px-[20px] text-white text-[12px] font-semibold">
              + Create Slot
            </button>
          </div>
        </div>
        <div className="card-sub-header p-4 flex justify-between items-center">
          <div>
            <form action="" className='flex gap-3 items-center'>
              <select className='text-[12px] py-2 pl-4 pr-10 bg-[#F4F4F4] rounded-[10px] min-w-[113px] focus:border-0 focus:outline-none' name="" id="">
                <option className='text-[12px]' value="">Vendor</option>
                <option className='text-[12px]' value="">111</option>
              </select>
              <select className='text-[12px] py-2 pl-4 pr-10 bg-[#F4F4F4] rounded-[10px] min-w-[113px] focus:border-0 focus:outline-none' name="" id="">
                <option className='text-[12px]' value="">Activity</option>
                <option className='text-[12px]' value="">111</option>
              </select>
              <select className='text-[12px] py-2 pl-4 pr-10 bg-[#F4F4F4] rounded-[10px] min-w-[113px] focus:border-0 focus:outline-none' name="" id="">
                <option className='text-[12px]' value="">Location</option>
                <option className='text-[12px]' value="">111</option>
              </select>
              <select className='text-[12px] py-2 pl-4 pr-10 bg-[#F4F4F4] rounded-[10px] min-w-[113px] focus:border-0 focus:outline-none' name="" id="">
                <option className='text-[12px]' value="">Status</option>
                <option className='text-[12px]' value="">111</option>
              </select>
            </form>
          </div>
        </div>
        <div className="card-body py-4">
          <div className="overflow-x-auto min-h-[400px]">
            <table className="w-full">
              <thead>
                <tr className='border-b border-[#dee2e6]'>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">#</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">ID</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">Package</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">Customer Name</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">Phone</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">Seats</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">Activity</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">Vendor</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">Location</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">Price per seat</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">Total Price</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">Status</th>
                  <th className="py-2 text-left text-xs font-semibold text-[#383838]"></th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, index) => (
                  <tr key={index} className='border-b border-[#dee2e6] last:border-0'>
                    <td className="px-4 py-2 text-[12px] text-[#545454]">{index + 1}</td>
                    <td className="px-4 py-2 text-[12px] text-[#545454]">{booking.id}</td>
                    <td className="px-4 py-2 text-[#383838] text-[12px] leading-[100%]">
                      <div className='text-[#313131] font-medium text-[11px] mb-2'>{booking.packageName}</div>
                      <div className="text-[9px] font-medium text-[#751CC2]">{booking.packageId}</div>
                    </td>
                    <td className="px-4 py-2 text-[12px] text-[#545454]">{booking.customerName}</td>
                    <td className="px-4 py-2 text-[12px] text-[#545454]">{booking.phone}</td>
                    <td className="px-4 py-2 text-[12px] text-[#545454]">{booking.seats}</td>
                    <td className="px-4 py-2 text-[12px] text-[#545454]">{booking.activity}</td>
                    <td className="px-4 py-2 text-[12px] text-[#545454]">{booking.vendor}</td>
                    <td className="px-4 py-2 text-[12px] text-[#545454]">{booking.location}</td>
                    <td className="px-4 py-2 text-[12px] text-[#545454]">₹ {booking.pricePerSeat}</td>
                    <td className="px-4 py-2 text-[12px] text-[#545454]">₹ {booking.totalAmount}</td>
                    <td className="px-4 py-2 text-[12px] text-[#545454]">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-[#B5FFDF] text-[#1C9762] border border-[#1C9762]">{booking.status}</span>
                    </td>
                    <td className="py-2 text-[12px] text-[#545454]">
                      <div className="relative inline-block text-left dropdown-container">
                        <button onClick={() => toggleDropdown(index)} className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 focus:outline-none ${openIndex === index ? 'text-[#383838]' : 'text-[#383838]'}`}>
                          <FiMoreVertical size={20} />
                        </button>
                        {openIndex === index && (
                          <ul className="absolute right-0 mt-2 w-40 origin-top-right bg-white border border-gray-100 rounded-[12px] shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)] z-[100] overflow-hidden py-1">
                            <li className='border-b border-[#E2E2E2]'>
                              <button className="flex items-center gap-3 px-5 py-3 text-[11px] font-medium text-[##3D3D3D] hover:text-black hover:font-semibold transition-colors w-full text-left cursor-pointer" command="show-modal" commandfor="booking-view-modal" onClick={() => handleViewBooking(booking)}>View</button>
                            </li>
                            <li>
                              <button className="flex items-center gap-3 px-5 py-3 text-[11px] font-medium text-[##3D3D3D] hover:text-black hover:font-semibold transition-colors w-full text-left cursor-pointer" command="show-modal" commandfor="booking-conform-modal" onClick={() => handleConfirmBooking(booking)}>Confirm</button>
                            </li>
                          </ul>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <BookingViewModal booking={selectedBooking} />
      <BookingConfirmModal booking={selectedBooking} />
      <BookingCancelModal booking={selectedBooking} />
    </>
  )
}

export default BookingList;
