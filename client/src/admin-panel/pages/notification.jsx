import React from 'react'
import Slidebar from '../component/slidebar'
import Header from '../component/header'
import DateRangeFilter from '../component/date-range-filter';
import NotificationModal from '../component/notification-modal';
function Notification() {
  return (
    <>
      <div className="container-fluid mx-auto pr-3">
        <div className="flex gap-5">
          <div className="w-[262px]">
            <Slidebar />
          </div>
          <div className=" w-full pt-3">
            <Header />
            <div className="card relative flex flex-col break-words bg-white bg-clip-border rounded-[1.25rem] shadow-[3px_4px_20px_0px_#0000000F] border-0 mt-3 py-3 px-3">
              <div className="card-header p-4 flex justify-between items-center border-b border-[#e3e3e3]">
                <div>
                  <h1 className='font-poppins font-semibold text-[20px] md:text-[24px] leading-[100%] text-[#2A2A2A]'>Messages Logs</h1>
                </div>
                <div className='flex items-center gap-3'>
                  <DateRangeFilter />
                </div>
              </div>
              <div className="card-body py-4">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className='border-b border-[#dee2e6]'>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">Date & Time</th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">Customer </th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">Package</th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">Message</th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className='border-b border-[#dee2e6] last:border-0'>
                        <td className="px-4 py-2 text-[12px] text-[#383838]">07/09/2025  06:30 am</td>
                        <td className="px-4 py-2 text-[12px] text-[#383838]">Alexander Sharington</td>
                        <td className="px-4 py-2 text-[12px] text-[#383838]">Summer Package</td>
                        <td className="px-4 py-2 text-[12px] text-[#383838]">
                          <div className="max-w-[400px] line-clamp-2">Hello Jhon Abraham! 👋Your booking is confirmed! Thank you for choosing Go Rogue. We are excited to take you on an adventure......</div>
                        </td>
                        <td className="px-4 py-2 text-[12px] text-[#383838]">
                          <button command="show-modal" commandfor="notification-modal" className="text-[#007BFF] text-nowrap text-[14px] font-[500]">View</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <NotificationModal />
    </>
  )
}

export default Notification