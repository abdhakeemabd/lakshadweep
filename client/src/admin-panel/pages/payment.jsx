import React from 'react'
import Header from '../component/header'
import Slidebar from '../component/slidebar'
import SearchIcon from "../../assets/admin-panel-icon/icons/search.svg";
import ExportIcon from "../../assets/admin-panel-icon/icons/export.svg";
import DateRangeFilter from '../component/date-range-filter';
import { Link } from 'react-router-dom';
function Payment() {
  return (
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
                <h1 className='font-poppins font-semibold text-[20px] md:text-[24px] leading-[100%] text-[#2A2A2A]'>Payments</h1>
              </div>
              <div className='flex items-center gap-3'>
                <DateRangeFilter />
                <button className='bg-[#007BFF] text-white flex items-center gap-2 justify-center py-2 min-w-[111px] h-[36px] text-[12px] rounded-[8px]'>
                  <img src={ExportIcon} alt="Export" />Export</button>
              </div>
            </div>
            <div className="card-sub-header p-4 flex justify-between items-center">
              <div>
                <form action="" className='flex flex-wrap gap-3 md:gap-4 items-center'>
                  <div className="relative inline-block">
                    <select className='appearance-none py-2 pl-6 pr-12 bg-[#F4F4F4] rounded-[8px] min-w-[113px] text-[14px] text-[#383838] font-medium border-0 focus:border-0 focus:outline-none cursor-pointer' name="" id="">
                      <option value="">Vendor</option>
                      <option value="">111</option>
                    </select>
                    <svg className="absolute right-[10px] top-1/2 -translate-y-1/2 pointer-events-none" width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1L6 6L11 1" stroke="#383838" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="relative inline-block">
                    <select className='appearance-none py-2 pl-6 pr-12 bg-[#F4F4F4] rounded-[8px] min-w-[113px] text-[14px] text-[#383838] font-medium border-0 focus:border-0 focus:outline-none cursor-pointer' name="" id="">
                      <option value="">Location</option>
                      <option value="">111</option>
                    </select>
                    <svg className="absolute right-[10px] top-1/2 -translate-y-1/2 pointer-events-none" width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1L6 6L11 1" stroke="#383838" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="relative inline-block">
                    <select className='appearance-none py-2 pl-6 pr-12 bg-[#F4F4F4] rounded-[8px] min-w-[113px] text-[14px] text-[#383838] font-medium border-0 focus:border-0 focus:outline-none cursor-pointer' name="" id="">
                      <option value="">Status</option>
                      <option value="">111</option>
                    </select>
                    <svg className="absolute right-[10px] top-1/2 -translate-y-1/2 pointer-events-none" width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1L6 6L11 1" stroke="#383838" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </form>
              </div>
              <div className="inline-block">
                <form className="relative flex items-center">
                  <input className="w-full border border-[#E5E5E5] rounded-lg px-3 py-2 text-[14px] focus:outline-none focus:ring-1 focus:ring-[#0F2446] bg-[#F4F4F4]" type="search" placeholder="Search" />
                  <button type="button" className="absolute right-2 flex items-center justify-center">
                    <img src={SearchIcon} alt="search" className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
            <div className="card-body py-4">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className='border-b border-[#dee2e6]'>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">#</th>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">Booking ID</th>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">Date</th>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">Customer Name</th>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">Vendor</th>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">Package</th>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">Total Amount</th>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">Amount Paid</th>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">Paid to Vendor</th>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">Payment Status</th>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">Payment mode</th>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className='border-b border-[#dee2e6] last:border-0'>
                      <td className="px-4 py-2 text-[12px] text-[#383838]">1.</td>
                      <td className="px-4 py-2 text-[12px] text-[#383838]">BKG0021</td>
                      <td className="px-4 py-2 text-[12px] text-[#383838]">09/02/2026 05:30 a.m.</td>
                      <td className="px-4 py-2 text-[12px] text-[#383838]">sharini Vinod</td>
                      <td className="px-4 py-2 text-[12px] text-[#383838]">Sunset Shore Dining</td>
                      <td className="px-4 py-2 text-[12px] text-[#383838]">Reef Exploration Snorkel Tour</td>
                      <td className="px-4 py-2 text-[12px] text-[#383838]">5400.00</td>
                      <td className="px-4 py-2 text-[12px] text-[#383838]">5000.00</td>
                      <td className="px-4 py-2 text-[12px] text-[#383838]">400.00</td>
                      <td className="px-4 py-2 text-[12px] text-[#383838]">Alexieser007@gmail.com</td>
                      <td className="px-4 py-2 text-[12px] text-[#383838]">upi</td>
                      <td className="px-4 py-2 text-[12px] text-[#383838]">
                        <Link to="/" className="text-[#007BFF] text-nowrap text-[14px] font-[500]">View Receipt</Link>
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
  )
}

export default Payment