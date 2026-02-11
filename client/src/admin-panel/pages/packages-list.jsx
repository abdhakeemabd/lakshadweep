import React, { useEffect, useState } from 'react'
import Slidebar from '../component/slidebar'
import Header from '../component/header'
import NotificationModal from '../component/notification-modal';
import filter from '../../assets/admin-panel-icon/icons/filter-icon.svg'
import { FiMoreVertical } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import SearchIcon from "../../assets/admin-panel-icon/icons/search.svg";
import ExportIcon from "../../assets/admin-panel-icon/icons/export.svg";
function PackagesList() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggleDropdown = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const toggleFilterDropdown = () => {
    setOpenIndex(openIndex === "filter" ? null : "filter");
  };
  const handleDelete = (packageId) => {
    // TODO: Implement delete functionality
    console.log('Delete package:', packageId);
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
                  <h1 className='font-poppins font-semibold text-[20px] md:text-[24px] leading-[100%] text-[#2A2A2A]'>Packages</h1>
                </div>
                <div className='flex items-center gap-3'>
                  <button className='bg-[#007BFF] text-white flex items-center gap-2 justify-center py-2 min-w-[111px] h-[36px] text-[12px] rounded-[8px]'>
                    <img src={ExportIcon} alt="Export" />Export</button>
                  <div className="relative dropdown-container">
                    <button onClick={toggleFilterDropdown} className="flex items-center gap-4 bg-[#26354D] rounded-[8px] py-[7px] px-[20px] text-white text-[12px] font-semibold">
                      Filters
                      <img className='ms-4 w-[16px] h-[16px]' src={filter} alt="filter" />
                    </button>
                    {openIndex === "filter" && (
                      <div className="relative">
                        <div className="card min-w-[278px] shadow-[3px_4px_13px_0px_#0000001A] absolute right-0 z-10 bg-white p-3 rounded-[10px]">
                          <div className="card-header py-3 border-b border-[#dedede]">
                            <div className='text-[#2A2A2A] font-bold text-[16px] leading-[100%] py-3 ps-3'>Filter Options</div>
                          </div>
                          <div className="card-body p-3">
                            <div className="flex flex-col gap-4">
                              <div className="item">
                                <label className="text-[#2A2A2A] font-semibold text-[12px] leading-[100%]">Category</label>
                                <select name="category" id="category" className="w-full appearance-none border border-[#E5E5E5] rounded-lg px-3 py-2 mt-1 text-[14px] text-[#414242] bg-[#F4F4F4] focus:outline-none focus:ring-1 focus:ring-[#0F2446] focus:border-[#0F2446] cursor-pointer" defaultValue="">
                                  <option value="" disabled>Select Category</option>
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                </select>
                              </div>
                              <div className="items">
                                <label className="text-[#2A2A2A] font-semibold text-[12px] leading-[100%]">Location</label>
                                <select name="category" id="category" className="w-full appearance-none border border-[#E5E5E5] rounded-lg px-3 py-2 mt-1 text-[14px] text-[#414242] bg-[#F4F4F4] focus:outline-none focus:ring-1 focus:ring-[#0F2446] focus:border-[#0F2446] cursor-pointer" defaultValue="">
                                  <option value="" disabled>Select Category</option>
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                </select>
                              </div>
                              <div className="items">
                                <label className="text-[#2A2A2A] font-semibold text-[12px] leading-[100%]">Vendor</label>
                                <select name="category" id="category" className="w-full appearance-none border border-[#E5E5E5] rounded-lg px-3 py-2 mt-1 text-[14px] text-[#414242] bg-[#F4F4F4] focus:outline-none focus:ring-1 focus:ring-[#0F2446] focus:border-[#0F2446] cursor-pointer" defaultValue="">
                                  <option value="" disabled>Select Category</option>
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                </select>
                              </div>
                              <div className="flex gap-3 mb-3">
                                <div className="items">
                                  <label className="text-[#2A2A2A] font-semibold text-[12px] leading-[100%]">Price</label>
                                  <div className="relative rounded-[8px] overflow-hidden">
                                    <div className='absolute left-0 h-full top-0 bg-[#494949] w-[38px] h-[20px]'>
                                      <span className='text-[12px] text-white flex items-center justify-center h-full'>Min</span>
                                    </div>
                                    <input type="text" className="ps-[45px] w-full border border-[#E5E5E5] rounded-lg pe-3 py-2 text-[14px] focus:outline-none focus:ring-[#0F2446] bg-[#F4F4F4]" />
                                  </div>
                                </div>
                                <div className="items">
                                  <label className="text-[#2A2A2A] font-semibold text-[12px] leading-[100%]">Price</label>
                                  <div className="relative rounded-[8px] overflow-hidden">
                                    <div className='absolute left-0 h-full top-0 bg-[#494949] w-[38px] h-[20px]'>
                                      <span className='text-[12px] text-white flex items-center justify-center h-full'>Max</span>
                                    </div>
                                    <input type="text" className="ps-[45px] w-full border border-[#E5E5E5] rounded-lg pe-3 py-2 text-[14px] focus:outline-none focus:ring-[#0F2446] bg-[#F4F4F4]" />
                                  </div>
                                </div>
                              </div>
                              <div className="flex gap-3">
                                <button type='button' className='bg-[#EDEDED] font-[12px] w-[117px] h-[38px] px-5 cursor-pointer py-2 rounded-[8px] text-[#131313] font-semibold'>Reset</button>
                                <button type='button' className='bg-[#007BFF] font-[12px] w-[117px] h-[38px] px-5 cursor-pointer py-2 rounded-[8px] text-[#FFFFFF] font-semibold'>Apply</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <Link to="/admin/packages/add" className="flex items-center gap-4 bg-[#007BFF] rounded-[8px] py-[7px] px-[20px] text-white text-[12px] font-semibold">
                    + Create Package
                  </Link>
                </div>
              </div>
              <div className="card-sub-header p-4 flex justify-end items-center">
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
                <div className="overflow-x-auto min-h-[400px]">
                  <table className="w-full">
                    <thead>
                      <tr className='border-b border-[#dee2e6]'>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">#</th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">Title </th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">Category</th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">Activity</th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">Location</th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">Vendor</th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">Price</th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">Status</th>
                        <th className="py-2 text-left text-xs font-semibold text-[#383838]"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className='border-b border-[#dee2e6] last:border-0'>
                        <td className="px-4 py-2 text-[12px] text-[#383838]">1</td>
                        <td className="text-[#383838] text-[12px] leading-[100%] py-3">
                          <div className="font-medium text-[13px] mb-1 text-[#2A2A2A]">Summer Package </div>
                          <div className="text-[#751CC2] font-medium text-[9px]">#PKG0001</div>
                        </td>
                        <td className="px-4 py-2 text-[12px] text-[#383838]">Watersports</td>
                        <td className="px-4 py-2 text-[12px] text-[#383838]">Scuba Diving</td>
                        <td className="px-4 py-2 text-[12px] text-[#383838]">Kavaratti</td>
                        <td className="px-4 py-2 text-[12px] text-[#383838]">Alexander Sharington</td>
                        <td className="px-4 py-2 text-[12px] text-[#383838]">INR 35000</td>
                        <td className="py-2 text-[12px] text-[#383838]">
                          <span className='badge font-semibold text-[9px] bg-[#B5FFDF] text-[#1C9762] border-1 border-[#1C9762] py-[5px] px-4 rounded-[22px]'>Active</span>
                        </td>
                        <td className="px-4 py-2 text-[12px] text-[#383838]">
                          <div className="relative inline-block text-left dropdown-container">
                            <button onClick={() => toggleDropdown(0)} className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 focus:outline-none ${openIndex === 0 ? 'bg-gray-100 text-[#007BFF]' : 'text-gray-400 hover:bg-gray-100 hover:text-gray-600'}`}>
                              <FiMoreVertical size={20} />
                            </button>
                            {openIndex === 0 && (
                              <ul className="absolute right-0 mt-2 w-40 origin-top-right bg-white border border-0 rounded-[12px] shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)] z-[100] overflow-hidden py-1">
                                <li className='border-b border-[#e2e2e2]'>
                                  <Link to={`/admin/package/view`} className="flex items-center gap-3 px-4 py-2.5 text-[11px] font-medium text-[#8c8c8c] hover:text-[#3d3d3d] transition-colors" onClick={() => setOpenIndex(null)}>View</Link>
                                </li>
                                <li className='border-b border-[#e2e2e2]'>
                                  <Link to={`/admin/package/edit`} className="flex items-center gap-3 px-4 py-2.5 text-[11px] font-medium text-[#8c8c8c] hover:text-[#3d3d3d] transition-colors w-full text-left cursor-pointer" onClick={() => setOpenIndex(null)}>Edit</Link>
                                </li>
                                <li>
                                  <button className="flex items-center gap-3 px-4 py-2.5 text-[11px] font-medium text-[#dc3545] hover:text-[#dc3545] transition-colors w-full text-left cursor-pointer" onClick={() => { handleDelete('PKG0001'); setOpenIndex(null); }}>Delete</button>
                                </li>
                              </ul>
                            )}
                          </div>
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

export default PackagesList