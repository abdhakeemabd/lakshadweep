import React, { useEffect, useRef, useState } from 'react'
import Slidebar from '../component/slidebar'
import Header from '../component/header'
import filter from '../../assets/admin-panel-icon/icons/filter-icon.svg'
import SearchIcon from "../../assets/admin-panel-icon/icons/search.svg";
import Export from "../../assets/admin-panel-icon/icons/excel.svg";
import Print from "../../assets/admin-panel-icon/icons/print.svg";
function VendorList() {
  const [openIndex, setOpenIndex] = useState(null);

  const vendors = [
    {
      id: 1,
      name: "Vendor Name Now",
      code: "#VND0056",
      phone: "+91 9999999999",
      email: "subha12@gmail.com",
      location: "Kavaratti",
      category: "Watersports",
      status: "Active",
    },
    {
      id: 2,
      name: "Blue Ocean Adventures",
      code: "#VND0057",
      phone: "+91 8888888888",
      email: "blueocean@gmail.com",
      location: "Agatti",
      category: "Boating",
      status: "Inactive",
    }
  ];

  const toggleDropdown = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const toggleFilterDropdown = () => {
    setOpenIndex(openIndex === "filter" ? null : "filter");
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

  const updateExportUrl = () => {
    console.log("Export clicked");
  };

  const printThis = () => {
    window.print();
  };

  return (
    <section>
      <div className="container-fluid mx-auto pr-3">
        <div className="flex gap-2">
          <div className="w-[262px]">
            <Slidebar />
          </div>
          <div className=" w-full pt-3">
            <Header />
            <div className="card relative flex flex-col break-words bg-white bg-clip-border rounded-[1.25rem] shadow-[3px_4px_20px_0px_#0000000F] border-0 mt-3 py-3 px-3">
              <div className="card-header p-4 flex justify-between items-center border-b border-[#e3e3e3]">
                <h1 className='font-poppins font-semibold text-[20px] md:text-[24px] leading-[100%] text-[#2A2A2A]'>Vendor List</h1>
                <div className='flex gap-4'>
                  <div className="relative dropdown-container">
                    <button onClick={toggleFilterDropdown} className="flex items-center gap-4 bg-[#26354D] rounded-[8px] py-[7px] px-[20px] text-white text-[12px] font-semibold">
                      Filters
                      <img className='ms-4 w-[16px] h-[16px]' src={filter} alt="filter" />
                    </button>
                    {openIndex === "filter" && (
                      <div className="relative">
                        <div className="card min-w-[278px] shadow-[3px_4px_13px_0px_#0000001A] absolute right-0 z-10 bg-white p-3">
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
                  <button className="bg-[#007BFF] rounded-[8px] py-[7px] px-[20px] gap-[5px] text-white text-[12px] font-semibold">+ Add Vendor</button>
                </div>
              </div>
              <div className="card-sub-header py-6 flex align-center justify-end">
                <div className="inline-block mr-[15px]">
                  <form className="relative flex items-center">
                    <input className="w-full border border-[#E5E5E5] rounded-lg px-3 py-2 text-[14px] focus:outline-none focus:ring-1 focus:ring-[#0F2446] bg-[#F4F4F4]" type="search" placeholder="Search" />
                    <button type="button" className="absolute right-2 flex items-center justify-center">
                      <img src={SearchIcon} alt="search" className="w-4 h-4" />
                    </button>
                  </form>
                </div>
                <div className="inline-flex items-center gap-2">
                  <button title="excel" id="EXCEL" onClick={updateExportUrl} className="inline-flex items-center justify-center p-2 bg-[#f4f4f4] rounded-[10px] transition cursor-pointer">
                    <img src={Export} alt="Excel" className="w-5 h-5" />
                  </button>
                  <button type="button" onClick={printThis} className="inline-flex items-center justify-center p-2 bg-[#f4f4f4] rounded-[10px] transition cursor-pointer">
                    <img src={Print} alt="Print" className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="card-body">
                <div className="overflow-x-auto">
                  <div className="table-responsive min-h-[400px]">
                    <table className="w-full">
                      <thead>
                        <tr className='border-b border-[#e3e3e3]'>
                          <th className='text-[#383838] font-semibold text-[12px] leading-[100%] text-left py-3 ps-3'>#</th>
                          <th className='text-[#383838] font-semibold text-[12px] leading-[100%] text-left py-3'>Name</th>
                          <th className='text-[#383838] font-semibold text-[12px] leading-[100%] text-left py-3'>Phone</th>
                          <th className='text-[#383838] font-semibold text-[12px] leading-[100%] text-left py-3'>Email</th>
                          <th className='text-[#383838] font-semibold text-[12px] leading-[100%] text-left py-3'>Island /Location</th>
                          <th className='text-[#383838] font-semibold text-[12px] leading-[100%] text-left py-3'>Category</th>
                          <th className='text-[#383838] font-semibold text-[12px] leading-[100%] text-left py-3'>Status</th>
                          <th className='text-[#383838] font-semibold text-[12px] leading-[100%] text-left py-3'></th>
                        </tr>
                      </thead>
                      <tbody>
                        {vendors.map((vendor, index) => (
                          <tr key={vendor.id} className='border-b border-[#e3e3e3] last:border-b-0'>
                            <td className='text-[#383838] text-[12px] leading-[100%] py-3 ps-3'>{index + 1}</td>
                            <td className='text-[#383838] text-[12px] leading-[100%] py-3'>
                              <div className='text-[#313131] font-medium text-[11px] mb-1'>{vendor.name}</div>
                              <div className='text-[#751CC2] font-medium text-[8px]'>{vendor.code}</div>
                            </td>
                            <td className='text-[#383838] text-[12px] leading-[100%] py-3'>{vendor.phone}</td>
                            <td className='text-[#383838] text-[12px] leading-[100%] py-3'>{vendor.email}</td>
                            <td className='text-[#383838] text-[12px] leading-[100%] py-3'>{vendor.location}</td>
                            <td className='text-[#383838] text-[12px] leading-[100%] py-3'>{vendor.category}</td>
                            <td className='text-[#383838] text-[12px] leading-[100%] py-3'>
                              <div className={`badge px-1 justify-center flex items-center w-[50px] h-[20px] rounded-full text-[9px] font-medium 
                                ${vendor.status === "Active"
                                  ? "text-[#1C9762] bg-[#B5FFDF] border border-[#1C9762]"
                                  : "text-[#dc3545] bg-[#ffd6d6] border border-[#dc3545]"}`}>
                                {vendor.status}
                              </div>
                            </td>
                            <td className='py-3'>
                              <div className="relative inline-block text-left dropdown-container">
                                <button onClick={() => toggleDropdown(index)} className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 transition-colors">
                                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <circle cx="12" cy="5" r="2" fill="#C5C5C5" />
                                    <circle cx="12" cy="12" r="2" fill="#C5C5C5" />
                                    <circle cx="12" cy="19" r="2" fill="#C5C5C5" />
                                  </svg>
                                </button>
                                {openIndex === index && (
                                  <ul className="absolute right-0 mt-2 min-w-[130px] border-0 rounded-[10px] shadow-[3px_4px_13px_0px_#0000001A] overflow-hidden z-[100] bg-white">
                                    <li className="border-b border-[#E2E2E2] last:border-b-0">
                                      <button className="w-full flex gap-3 items-center px-4 py-[8px] text-[#8c8c8c] hover:text-[#3d3d3d] font-medium bg-transparent cursor-pointer text-[11px]">
                                        View
                                      </button>
                                    </li>
                                    <li className="border-b border-[#E2E2E2] last:border-b-0">
                                      <button className="w-full flex gap-3 items-center px-4 py-[8px] text-[#8c8c8c] hover:text-[#3d3d3d] font-medium bg-transparent cursor-pointer text-[11px]">
                                        Edit
                                      </button>
                                    </li>
                                    <li className="border-b border-[#E2E2E2] last:border-b-0">
                                      <button className="w-full flex gap-3 items-center px-4 py-[8px] text-[#8c8c8c] hover:text-[#3d3d3d] font-medium bg-transparent cursor-pointer text-[11px]">
                                        Deactivate
                                      </button>
                                    </li>
                                    <li className="border-b border-[#E2E2E2] last:border-b-0">
                                      <button className="w-full flex gap-3 items-center px-4 py-[8px] text-[#dc3545] hover:text-[#dc3545] font-medium bg-transparent cursor-pointer text-[11px]">Delete</button>
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
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default VendorList
