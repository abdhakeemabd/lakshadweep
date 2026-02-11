import React, { useState } from 'react'
import Header from '../component/header'
import Slidebar from '../component/slidebar'
import { Link } from 'react-router-dom';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
function CreatePackage() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };
  const label = { inputProps: { 'aria-label': 'Size switch demo' } };

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
              <div className="card-header p-4 flex justify-between items-center border-b border-[#e3e3e3] mb-3 lg:mb-5">
                <div className="flex items-center gap-3">
                  <Link to="/admin/vendor/list" className="w-[34px] h-[34px] bg-[#f9f9f9] rounded-xl flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
                  </Link>
                  <div className="font-semibold text-[24px] leading-none tracking-normal text-[#2A2A2A]">Create Package</div>
                </div>
              </div>
              <div className="card-body px-4 py-1">
                <form action="">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="col-span-1 md:col-span-8 mb-3">
                      <label htmlFor="package_name" className="block text-[13px] font-medium text-[#3D3D3D] mb-3">Package Name</label>
                      <input type="text" id="package_name" name="package_name" className="mt-1 block w-full bg-[#f5f5f5] p-[8px_15px] min-h-[42px] rounded-[10px]" />
                    </div>
                    <div className="col-span-1 md:col-span-4 mb-3">
                      <label htmlFor="package_banner" className="block text-[13px] font-medium text-[#3D3D3D] mb-3">Package Banner</label>
                      <div className="relative mt-1">
                        <input type="file" id="package_banner" name="package_banner" onChange={handleFileChange} className="hidden" accept="image/*" />
                        <label htmlFor="package_banner" className="flex items-center w-max bg-transparent min-h-[42px] rounded-[10px] overflow-hidden cursor-pointer">
                          <span className="bg-[#3D3D3D] text-white px-10 py-2 text-[13px] font-medium whitespace-nowrap rounded-[10px]">Choose file</span>
                          <span className="px-3 text-[11px] text-[#8C8C8C]">{selectedFile ? selectedFile.name : 'No file chosen'}</span>
                        </label>
                      </div>
                    </div>
                    <div className="col-span-1 md:col-span-6 lg:col-span-4 mb-3">
                      <label htmlFor="package_name" className="block text-[13px] font-medium text-[#3D3D3D] mb-3">Category <span className='text-red-600'>*</span> </label>
                      <div className="relative inline-block w-full">
                        <select className='appearance-none py-2 pl-6 pr-12 bg-[#F4F4F4] rounded-[8px] w-full text-[14px] text-[#383838] font-medium border-0 focus:border-0 focus:outline-none cursor-pointer' name="" id="">
                          <option value="">Location</option>
                          <option value="">111</option>
                        </select>
                        <svg className="absolute right-[10px] top-1/2 -translate-y-1/2 pointer-events-none" width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 1L6 6L11 1" stroke="#383838" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                    <div className="col-span-1 md:col-span-6 lg:col-span-4 mb-3">
                      <label htmlFor="package_name" className="block text-[13px] font-medium text-[#3D3D3D] mb-3">Activity<span className='text-red-600'>*</span> </label>
                      <div className="relative inline-block w-full">
                        <select className='appearance-none py-2 pl-6 pr-12 bg-[#F4F4F4] rounded-[8px] w-full text-[14px] text-[#383838] font-medium border-0 focus:border-0 focus:outline-none cursor-pointer' name="" id="">
                          <option value="">Location</option>
                          <option value="">111</option>
                        </select>
                        <svg className="absolute right-[10px] top-1/2 -translate-y-1/2 pointer-events-none" width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 1L6 6L11 1" stroke="#383838" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                    <div className="col-span-1 md:col-span-6 lg:col-span-4 mb-3">
                      <label htmlFor="package_name" className="block text-[13px] font-medium text-[#3D3D3D] mb-3">Island/Location<span className='text-red-600'>*</span> </label>
                      <div className="relative inline-block w-full">
                        <select className='appearance-none py-2 pl-6 pr-12 bg-[#F4F4F4] rounded-[8px] w-full text-[14px] text-[#383838] font-medium border-0 focus:border-0 focus:outline-none cursor-pointer' name="" id="">
                          <option value="">Location</option>
                          <option value="">111</option>
                        </select>
                        <svg className="absolute right-[10px] top-1/2 -translate-y-1/2 pointer-events-none" width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 1L6 6L11 1" stroke="#383838" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                    <div className="col-span-1 md:col-span-6 mb-3">
                      <label htmlFor="package_name" className="block text-[13px] font-medium text-[#3D3D3D] mb-3">Activity info<span className='text-red-600'>*</span> </label>
                      <textarea type="text" id="package_name" name="package_name" className="mt-1 block w-full bg-[#f5f5f5] p-[8px_15px] min-h-[180px] rounded-[10px]" />
                    </div>
                    <div className="col-span-1 md:col-span-6 mb-3">
                      <label htmlFor="package_name" className="block text-[13px] font-medium text-[#3D3D3D] mb-3">What's Included <span className='text-red-600'>*</span> (Max 10 items, comma separated)</label>
                      <textarea type="text" id="package_name" name="package_name" className="mt-1 block w-full bg-[#f5f5f5] p-[8px_15px] min-h-[180px] rounded-[10px]" />
                    </div>
                    <div className="col-span-1 md:col-span-6 mb-3">
                      <label htmlFor="package_name" className="block text-[13px] font-medium text-[#3D3D3D] mb-3">What's Excluded (Max 10 items, comma separated) </label>
                      <textarea type="text" id="package_name" name="package_name" className="mt-1 block w-full bg-[#f5f5f5] p-[8px_15px] min-h-[180px] rounded-[10px]" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="col-span-1 md:col-span-6 lg:col-span-4 mb-3">
                      <label htmlFor="package_name" className="block text-[13px] font-medium text-[#3D3D3D] mb-3">Package Badge <span className='text-red-600'>*</span> </label>
                      <input type="text" id="package_name" name="package_name" className="mt-1 block w-full bg-[#f5f5f5] p-[8px_15px] min-h-[42px] rounded-[10px]" />
                    </div>
                    <div className="col-span-1 md:col-span-6 lg:col-span-4 mb-3">
                      <label htmlFor="package_name" className="block text-[13px] font-medium text-[#3D3D3D] mb-3">Package Bookings Badge </label>
                      <input type="text" id="package_name" name="package_name" className="mt-1 block w-full bg-[#f5f5f5] p-[8px_15px] min-h-[42px] rounded-[10px]" />
                    </div>
                    <div className="col-span-1 md:col-span-6 lg:col-span-4 mb-3">
                      <label htmlFor="package_name" className="block text-[13px] font-medium text-[#3D3D3D] mb-3">Duration  </label>
                      <input type="text" id="package_name" name="package_name" className="mt-1 block w-full bg-[#f5f5f5] p-[8px_15px] min-h-[42px] rounded-[10px]" />
                    </div>
                    <div className="col-span-1 md:col-span-6 lg:col-span-4 mb-3">
                      <label htmlFor="package_name" className="block text-[13px] font-medium text-[#3D3D3D] mb-3">Default Price <span className='text-red-600'>*</span>(per person/unit)  </label>
                      <input type="text" id="package_name" name="package_name" className="mt-1 block w-full bg-[#f5f5f5] p-[8px_15px] min-h-[42px] rounded-[10px]" />
                    </div>
                    <div className="col-span-1 md:col-span-6 lg:col-span-4 mb-3">
                      <label htmlFor="package_name" className="block text-[13px] font-medium text-[#3D3D3D] mb-3">Commission and Convenience fee <span className='text-red-600'>*</span> (per person)</label>
                      <input type="text" id="package_name" name="package_name" className="mt-1 block w-full bg-[#f5f5f5] p-[8px_15px] min-h-[42px] rounded-[10px]" />
                    </div>
                    <div className="col-span-1 md:col-span-6 mb-3">
                      <label htmlFor="package_name" className="block text-[13px] font-medium text-[#3D3D3D] mb-3">Terms & Conditions</label>
                      <textarea type="text" id="package_name" name="package_name" className="mt-1 block w-full bg-[#f5f5f5] p-[8px_15px] min-h-[180px] rounded-[10px]" />
                    </div>
                    <div className="col-span-1 md:col-span-6 mb-3">
                      <label htmlFor="package_name" className="block text-[13px] font-medium text-[#3D3D3D] mb-3">Package Description <span className='text-red-600'>*</span></label>
                      <textarea type="text" id="package_name" name="package_name" className="mt-1 block w-full bg-[#f5f5f5] p-[8px_15px] min-h-[180px] rounded-[10px]" />
                    </div>
                    <div className="col-span-1 md:col-span-6 mb-3">
                      <label htmlFor="package_name" className="block text-[13px] font-medium text-[#3D3D3D] mb-3">Package Description <span className='text-red-600'>*</span></label>
                      <FormControlLabel control={<Switch />} label={<span className="text-[#171920] font-bold text-[14px]">Set as Gorogue Exclusive</span>} />
                    </div>
                    <div className="col-span-1 md:col-span-12 text-end items-center">
                      <button className='bg-[#007BFF] text-white px-4 py-2 rounded-[8px] text-[14px] font-semibold w-[137px] h-[36px] cursor-pointer'>Save</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreatePackage