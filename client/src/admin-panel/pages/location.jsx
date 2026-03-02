import React from 'react'
import EditIcon from "../../assets/admin-panel-icon/icons/edit-icon.svg";
import DeleteIcon from "../../assets/admin-panel-icon/icons/delete-icon.svg";
import { NavLink, Link } from 'react-router-dom';
import AddLanguageModal from '../component/add-location-modal';
import EditLocationModal from '../component/edit-location-modal';

function Location() {
  return (
    <>
      <div className="card relative flex flex-col break-words bg-white bg-clip-border rounded-[1.25rem] shadow-[3px_4px_20px_0px_#0000000F] border-0 mt-3 py-3 px-3">
        <div className="card-header p-1 lg:p-4 flex gap-3 flex-wrap justify-between items-center border-b border-[#e3e3e3]">
          <div className='flex items-center gap-3 bg-[#E9E9EA] rounded-full p-[4px] border-1 border-[#E9E9EA]'>
            <NavLink to="/admin/setting/categories" className={({ isActive }) => `w-[160px] md:w-[170px] font-medium text-center text-[12px] md:text-[14px] rounded-full transition-all px-2 py-2 ${isActive ? 'bg-[#0F2446] text-white border border-[#2F68C5] font-semibold' : 'text-[#393939] bg-transparent'}`}>Category & Activities</NavLink>
            <NavLink to="/admin/setting/location" className={({ isActive }) => `w-[160px] md:w-[170px] font-medium text-center text-[12px] md:text-[14px] rounded-full transition-all px-2 py-2 ${isActive ? 'bg-[#0F2446] text-white border border-[#2F68C5] font-semibold' : 'text-[#393939] bg-transparent'}`}>Location</NavLink>
          </div>
          <div className='flex items-center gap-3'>
            <button command="show-modal" commandfor="add-location-modal" type="button" className="flex min-w-[147px] h-[36px] text-[12px] items-center justify-center gap-4 bg-[#007BFF] rounded-[8px] py-[7px] px-[20px] text-white font-semibold cursor-pointer">+ Add</button>
          </div>
        </div>
        <div className="card-body py-4">
          <div className="overflow-x-auto min-h-[400px]">
            <table className="w-full">
              <thead>
                <tr className='border-b border-[#dee2e6]'>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">Location</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">No of Vendors</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">No of Packages</th>
                  <th className="py-2 text-left text-xs font-semibold text-[#383838]"></th>
                </tr>
              </thead>
              <tbody>
                <tr className='border-b border-[#dee2e6] last:border-0'>
                  <td className="px-4 py-2 text-[12px] text-[#383838]">Agatti</td>
                  <td className="px-4 py-2 text-[12px] text-[#3d3d3d]">2</td>
                  <td className="px-4 py-2 text-[12px] text-[#3d3d3d]">2</td>
                  <td className="py-2 text-[12px] text-[#383838]">
                    <div className='flex justify-center gap-3 items-center'>
                      <button className='cursor-pointer' type='button' command="show-modal" commandfor="edit-location-modal">
                        <img className='img-fluid' src={EditIcon} alt="Edit" />
                      </button>
                      <button className='cursor-pointer' type='button' command="show-modal" commandfor="delete-slot-modal">
                        <img className='img-fluid' src={DeleteIcon} alt="Edit" />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <AddLanguageModal />
      <EditLocationModal />
    </>
  )
}

export default Location;