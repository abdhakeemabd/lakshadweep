import React from 'react'
import Header from '../component/header'
import Slidebar from '../component/slidebar'
import SearchIcon from "../../assets/admin-panel-icon/icons/search.svg";
import ExportIcon from "../../assets/admin-panel-icon/icons/export.svg";
import { Link } from 'react-router-dom';
function AllCustomer() {
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
                  <h1 className='font-poppins font-semibold text-[20px] md:text-[24px] leading-[100%] text-[#2A2A2A]'>All Customers</h1>
                </div>
                <div className='flex items-center gap-3'>
                  <button className='bg-[#007BFF] text-white flex items-center gap-2 justify-center py-2 min-w-[111px] h-[36px] text-[12px] rounded-[8px]'>
                    <img src={ExportIcon} alt="Export" />Export</button>
                </div>
              </div>
              <div className="card-sub-header p-4 flex justify-between items-center">
                <div>
                  <form action="" className='flex gap-3 items-center'>
                    <select className='py-2 pl-4 pr-10 bg-[#F4F4F4] rounded-[10px] min-w-[113px] focus:border-0 focus:outline-none' name="" id="">
                      <option value="">Activity</option>
                      <option value="">111</option>
                    </select>
                    <select className='py-2 pl-4 pr-10 bg-[#F4F4F4] rounded-[10px] min-w-[113px] focus:border-0 focus:outline-none' name="" id="">
                      <option value="">Activity</option>
                      <option value="">111</option>
                    </select>
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
                      <tr className='border-b border-[#e3e3e3]'>
                        <th className="pl-10 px-4 py-2 text-left text-xs font-semibold text-[#383838]">ID</th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">Customer Name</th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">Phone</th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">Email</th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">No of Bookings</th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">Activities</th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">Location</th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="pl-10 px-4 py-2 text-[12px] text-[#383838]">1.</td>
                        <td className="px-4 py-2 text-[12px] text-[#383838]">
                          <div className='item'>
                            <div className='text-[#313131] text-[11px] font-medium leading[22px]'>Jacob Lamarstein</div>
                            <div className='text-[#751CC2] text-[9px] font-medium leading[22px]'>#NTYFC567</div>
                          </div>
                        </td>
                        <td className="px-4 py-2 text-[12px] text-[#383838]">+91 9633485674</td>
                        <td className="px-4 py-2 text-[12px] text-[#383838]">Alexieser007@gmail.com</td>
                        <td className="px-4 py-2 text-[12px] text-[#383838]">3</td>
                        <td className="px-4 py-2 text-[12px] text-[#383838]">Scuba Diving</td>
                        <td className="px-4 py-2 text-[12px] text-[#383838]">Kerala</td>
                        <td className="px-4 py-2">
                          <Link className='text-[#007BFF] font-medium text-[13px] ' to='/admin/customer-view'>View</Link>
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
    </>
  )
}

export default AllCustomer