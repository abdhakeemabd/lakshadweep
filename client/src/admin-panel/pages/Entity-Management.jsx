import React from 'react'
import EditIcon from "../../assets/admin-panel-icon/icons/edit-icon.svg";
import DeleteIcon from "../../assets/admin-panel-icon/icons/delete-icon.svg";
import {NavLink, Link } from 'react-router-dom';
import { showDeleteAlert, showDeleteSuccess, showDeleteError } from '../component/swal-delete';

function EntityManagement() {
  const handleDelete = async (categoryName) => {
    const confirmed = await showDeleteAlert(categoryName || 'category');
    if (!confirmed) return;
    showDeleteSuccess(categoryName || 'Category');
  };
  return (
    <div className="card relative flex flex-col bg-white bg-clip-border rounded-[1.25rem] shadow-[3px_4px_20px_0px_#0000000F] border-0 mt-3 py-3 px-3">
      <div className="card-header p-1 lg:p-4 flex gap-3 flex-wrap justify-between items-center border-b border-[#e3e3e3]">
        <div className='flex items-center gap-3 bg-[#E9E9EA] rounded-full p-[4px] border border-[#E9E9EA]'>
          <NavLink to="/admin/setting/categories" className={({ isActive }) => `w-[160px] md:w-[170px] font-medium text-center text-[12px] md:text-[14px] rounded-full transition-all px-2 py-2 ${ isActive ? 'bg-[#0F2446] text-white border border-[#2F68C5] font-semibold' : 'text-[#393939] bg-transparent' }`}>Category & Activities</NavLink>
          <NavLink to="/admin/setting/location" className={({ isActive }) => `w-[160px] md:w-[170px] font-medium text-center text-[12px] md:text-[14px] rounded-full transition-all px-2 py-2 ${ isActive ? 'bg-[#0F2446] text-white border border-[#2F68C5] font-semibold' : 'text-[#393939] bg-transparent' }`}>Location</NavLink>
        </div>
        <div className='flex items-center gap-3'>
          <Link to="/admin/setting/add-catagory" className="flex min-w-[147px] h-[36px] text-[12px] md:text-[14px] items-center justify-center gap-4 bg-[#007BFF] rounded-[8px] py-[7px] px-[20px] text-white font-semibold cursor-pointer">+ Add </Link>
        </div>
      </div>
      <div className="card-body py-4">
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full">
            <thead>
              <tr className='border-b border-[#dee2e6]'>
                <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">Category</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">Activity</th>
                <th className="py-2 text-left text-xs font-semibold text-[#383838]"></th>
              </tr>
            </thead>
            <tbody>
              <tr className='border-b border-[#dee2e6] last:border-0'>
                <td className="px-4 py-2 text-[12px] text-[#383838]">C</td>
                <td className="px-4 py-2 text-[12px] text-[#3d3d3d]"> Scuba Diving , Kayaking +3more</td>
                <td className="py-2 text-[12px] text-[#383838]">
                  <div className='flex justify-center gap-3 items-center'>
                    <Link to="/admin/setting/edit-catagory" className='cursor-pointer border-none bg-transparent p-0'>
                      <img className='img-fluid' src={EditIcon} alt="Edit" />
                    </Link>
                    <button className='cursor-pointer border-none bg-transparent p-0' type='button' onClick={() => handleDelete('C')}>
                      <img className='img-fluid' src={DeleteIcon} alt="Delete" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default EntityManagement;