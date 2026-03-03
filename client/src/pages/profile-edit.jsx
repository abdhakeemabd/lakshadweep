import React, { useState, useMemo, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import ProfileSidebar from '../component/profile-sidebar'
import ProfileDefault from '../assets/icons/edit-prfile-default.svg'
import UploadIcon from '../assets/icons/upload_icon.svg'
import SearchableSelect from '../component/searchable-select'

const states = [
  "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar",
  "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Goa",
  "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka",
  "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
  "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

function ProfileEdit() {
  const [selectedState, setSelectedState] = useState('');

  useEffect(() => {
    const forceScroll = () => {
      document.documentElement.style.setProperty('overflow', 'auto', 'important');
      document.documentElement.style.setProperty('padding-right', '0px', 'important');
    };

    // Initial force
    forceScroll();
    const observer = new MutationObserver(forceScroll);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['style', 'class'] });
    observer.observe(document.body, { attributes: true, attributeFilter: ['style', 'class'] });

    return () => {
      observer.disconnect();
      document.documentElement.style.removeProperty('overflow');
      document.documentElement.style.removeProperty('padding-right');
    };
  }, []);


  return (
    <section className='pt-4 pb-10 lg:py-20 bg-[#F5F5F5] min-h-screen'>
      <div className="container mx-auto px-3">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-4 xl:col-span-3 hidden lg:block">
            <ProfileSidebar />
          </div>
          <div className="col-span-12 lg:col-span-8 xl:col-span-9 lg:mt-20">
            <NavLink to="/profile" className="lg:hidden flex items-center gap-2 px-1 text-[#0F2446] font-semibold mb-2">
              <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              Profile Edit 
            </NavLink>
            <div className="card bg-white py-6 px-6 lg:px-8 w-full rounded-2xl shadow-[1px_0px_4px_0px_#00000014]">
              <div className="card-header border-b border-gray-100 pb-4 mb-6">
                <h2 className="card-title text-[#0F2446] text-[clamp(20px,2vw,24px)] font-bold">Edit Profile</h2>
              </div>
              <div className="card-body">
                <form onReset={() => setSelectedState('')} action="">
                  <div className="flex justify-center lg:justify-start mb-10">
                    <div className="avatar-wrap relative w-max" title="Change profile picture">
                      <img src={ProfileDefault} id="profilePreview" alt="Avatar" className="w-[120px] h-[120px] rounded-full object-cover border-2 border-[#ECECEC]" />
                      <div className="avatar-badge absolute bottom-1 right-1 bg-white p-2 rounded-full shadow-md" title="Upload photo" id="uploadBtn">
                        <img src={UploadIcon} alt="Upload" className="w-4 h-4" />
                      </div>
                      <input type="file" name="profile_pic" id="fileInputImage" className="hidden" accept="image/*" />
                    </div>
                  </div>
                  <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-12 lg:col-span-6">
                      <label htmlFor="full_name" className='block font-inter text-[15px] font-medium text-[#424242] mb-2'>Full Name <span className='text-red-500'>*</span></label>
                      <input className='border border-[#ECECEC] rounded-[5px] h-[42px] w-full bg-[#DCDCDC0D] px-3 py-2 outline-none focus:border-[#ff6a00] transition-all' type="text" name="full_name" id="full_name" />
                    </div>
                    <div className="col-span-12 lg:col-span-6">
                      <label htmlFor="email" className='block font-inter text-[15px] font-medium text-[#424242] mb-2'>Email Address <span className='text-red-500'>*</span></label>
                      <input className='border border-[#ECECEC] rounded-[5px] h-[42px] w-full bg-[#DCDCDC0D] px-3 py-2 outline-none focus:border-[#ff6a00] transition-all' type="email" name="email" id="email" />
                    </div>
                    <div className="col-span-12 lg:col-span-6">
                      <label htmlFor="phone" className='block font-inter text-[15px] font-medium text-[#424242] mb-2'>Phone Number <span className='text-red-500'>*</span></label>
                      <input className='border border-[#ECECEC] rounded-[5px] h-[42px] w-full bg-[#DCDCDC0D] px-3 py-2 outline-none focus:border-[#ff6a00] transition-all' type="number" name="phone" id="phone" />
                    </div>
                    <div className="col-span-12 lg:col-span-6">
                      <label htmlFor="address_1" className='block font-inter text-[15px] font-medium text-[#424242] mb-2'> Address Line 1 <span className='text-red-500'>*</span></label>
                      <input className='border border-[#ECECEC] rounded-[5px] h-[42px] w-full bg-[#DCDCDC0D] px-3 py-2 outline-none focus:border-[#ff6a00] transition-all' type="text" name="address_1" id="address_1" />
                    </div>
                    <div className="col-span-12 lg:col-span-6">
                      <label htmlFor="state" className='block font-inter text-[15px] font-medium text-[#424242] mb-2'>State <span className='text-red-500'>*</span></label>
                      <SearchableSelect options={states} value={selectedState} onChange={setSelectedState} placeholder="Select Any" searchPlaceholder="Search state..." />
                    </div>
                    <div className="col-span-12 lg:col-span-6">
                      <label htmlFor="pincode" className='block font-inter text-[15px] font-medium text-[#424242] mb-2'>Pincode <span className='text-red-500'>*</span></label>
                      <input className='border border-[#ECECEC] rounded-[5px] h-[42px] w-full bg-[#DCDCDC0D] px-3 py-2 outline-none focus:border-[#ff6a00] transition-all' type="text" name="pincode" id="pincode" />
                    </div>
                  </div>
                  <div className='mt-8 flex justify-end gap-3'>
                    <button type="reset" className="bg-[#F5F2F2] text-[#0F2446] px-8 py-2.5 rounded-md font-semibold cursor-pointer"> Cancel </button>
                    <button type="submit" className="bg-[#0F2446] text-white px-8 py-2.5 rounded-md font-semibold cursor-pointer"> Save Changes </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProfileEdit