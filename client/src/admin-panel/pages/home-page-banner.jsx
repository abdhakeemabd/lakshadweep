import React, { useState, useEffect } from 'react'
import Slidebar from '../component/slidebar'
import Header from '../component/header'
import EditIcon from "../../assets/admin-panel-icon/icons/edit-icon.svg";
import DeleteIcon from "../../assets/admin-panel-icon/icons/delete-icon.svg";
import { NavLink, Link } from 'react-router-dom';
import DagableIcon from "../../assets/admin-panel-icon/icons/reorder.svg";
import { FiMoreVertical } from 'react-icons/fi';
import AddBannerModal from './add-banner-modal';
import EddBannerModal from './edit-banner-modal';
function HomePageBanner() {
    const [openIndex, setOpenIndex] = useState(null);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const handleConfirmBooking = (booking) => {
      setSelectedBooking(booking);
      setOpenIndex(null);
    };

    const handleViewBooking = (booking) => {
      setSelectedBooking(booking);
      setOpenIndex(null);
    };

    const banners = [
      {
        id: 1,
        title: "baneree",
        activity: "Bike Rentals",
        destination: "Minicoy Island",
        status: "Active"
      }
    ];

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
      <div className="container-fluid mx-auto pr-3">
        <div className="flex gap-5">
          <div className="w-[262px]">
            <Slidebar />
          </div>
          <div className=" w-full pt-3">
            <Header />
            <div className='text-[24px] text-[#2A2A2A] font-semibold'>Content Management</div>
            <div className="card relative flex flex-col break-words bg-white bg-clip-border rounded-[1.25rem] shadow-[3px_4px_20px_0px_#0000000F] border-0 mt-3 py-3 px-3">
              <div className="card-header p-4 flex justify-between items-center border-b border-[#e3e3e3]">
                <div className='flex items-center gap-3 bg-[#E9E9EA] rounded-full p-[4px] border-1 border-[#E9E9EA]'>
                  <NavLink to="/admin/setting/content-management" className={({ isActive }) => `w-[170px] font-medium text-center text-[14px] rounded-full transition-all px-2 py-2 ${isActive ? 'bg-[#0F2446] text-white border border-[#2F68C5] font-semibold' : 'text-[#393939] bg-transparent'}`}>Homepage Banner</NavLink>
                  <NavLink to="/admin/setting/content-gallery" className={({ isActive }) => `w-[170px] font-medium text-center text-[14px] rounded-full transition-all px-2 py-2 ${isActive ? 'bg-[#0F2446] text-white border border-[#2F68C5] font-semibold' : 'text-[#393939] bg-transparent'}`}>Gallery</NavLink>
                </div>
                <div className='flex items-center gap-3'>
                  <button command="show-modal" commandfor="add-banner-modal" type="button" className="flex min-w-[147px] h-[36px] text-[12px] items-center justify-center gap-4 bg-[#007BFF] rounded-[8px] py-[7px] px-[20px] text-white font-semibold cursor-pointer">+ Add</button>
                </div>
              </div>
              <div className="card-sub-header p-4 flex gap-3 items-center">
                <div>
                  <select className="text-[12px] py-2 pl-4 pr-10 bg-[#F4F4F4] rounded-[10px] min-w-[113px] focus:border-0 focus:outline-none" name="" id="">
                    <option className="text-[12px]" value="">Activity</option>
                    <option className="text-[12px]" value="">111</option>
                  </select>
                </div>
                <select className="text-[12px] py-2 pl-4 pr-10 bg-[#F4F4F4] rounded-[10px] min-w-[113px] focus:border-0 focus:outline-none" name="" id="">
                  <option className="text-[12px]" value="">Destination</option>
                  <option className="text-[12px]" value="">111</option>
                </select>
              </div>
              <div className="card-body py-4">
                <div className="overflow-x-auto min-h-[400px]">
                  <table className="w-full">
                    <thead>
                      <tr className='border-b border-[#dee2e6]'>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]"></th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">Banner</th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">Title</th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">Activity</th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">Destination</th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">Status</th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]"></th>
                        <th className="py-2 text-left text-xs font-semibold text-[#383838]"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {banners.map((item, index) => (
                        <tr key={index} className='border-b border-[#dee2e6] last:border-0'>
                          <td className="px-4 py-2 text-[12px] text-[#383838]">
                            <img src={DagableIcon} alt="DagableIcon" />
                          </td>
                          <td className="px-4 py-2 text-[12px] text-[#3d3d3d]">
                            <div className="img-card relative aspect-[77/32]">
                              <a href="" className="block w-full h-full">
                                <img className="w-full h-full object-cover" src={DagableIcon} alt="Banner" />
                              </a>
                            </div>
                          </td>
                          <td className="px-4 py-2 text-[12px] text-[#3d3d3d]">{item.title}</td>
                          <td className="px-4 py-2 text-[12px] text-[#3d3d3d]">{item.activity}</td>
                          <td className="px-4 py-2 text-[12px] text-[#3d3d3d]">{item.destination}</td>
                          <td className="px-4 py-2 text-[12px] text-[#3d3d3d]">
                            <span className='badge font-medium flex justify-center items-center text-[10px] py-1 px-3 min-h-[20px] min-w-[50px] rounded-full inline-block bg-[#B5FFDF] text-[#1C9762] border-[1px] border-[#1C9762]'>{item.status}</span>
                          </td>
                          <td className="py-2 text-[12px] text-[#383838]">
                            <div className='flex justify-center gap-3 items-center dropdown-container relative'>
                               <button className='cursor-pointer' type='button' command="" commandfor="">
                                <img className='img-fluid' src={DeleteIcon} alt="Delete" />
                              </button>
                              <button className='cursor-pointer' type='button' command="show-modal" commandfor="edit-banner-modal">
                                <img className='img-fluid' src={EditIcon} alt="Edit" />
                              </button>
                              <button onClick={() => toggleDropdown(index)} className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 focus:outline-none ${openIndex === index ? 'text-[#383838]' : 'text-[#383838]'}`}>
                                <FiMoreVertical size={20} />
                              </button>
                              {openIndex === index && (
                                <ul className="absolute right-0 mt-2 top-full w-40 origin-top-right bg-white border border-gray-100 rounded-[12px] shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)] z-[100] overflow-hidden py-1">
                                  <li className='border-b border-[#E2E2E2]'>
                                    <button className="flex items-center gap-3 px-5 py-3 text-[11px] font-medium text-[#3D3D3D] hover:text-black hover:font-semibold transition-colors w-full text-left cursor-pointer" command="show-modal" commandfor="booking-view-modal" onClick={() => handleViewBooking(item)}>Activate</button>
                                  </li>
                                  <li>
                                    <button className="flex items-center gap-3 px-5 py-3 text-[11px] font-medium text-[#3D3D3D] hover:text-black hover:font-semibold transition-colors w-full text-left cursor-pointer" command="show-modal" commandfor="booking-conform-modal" onClick={() => handleConfirmBooking(item)}>Deactivate</button>
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
      <AddBannerModal />
      <EddBannerModal />
    </>
  )
}

export default HomePageBanner