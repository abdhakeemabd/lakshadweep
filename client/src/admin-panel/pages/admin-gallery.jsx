import React, { useState, useEffect } from 'react'
import Gallery from '../../assets/admin-panel-icon/img/default-image.jpg';
import DeleteIcon from '../../assets/admin-panel-icon/icons/deletegallery.svg';
import EditIcon from '../../assets/admin-panel-icon/icons/share.svg';
import { NavLink } from 'react-router-dom';
import { Fancybox } from "@fancyapps/ui";
import AddGalleryModal from './add-gallery-modal';
import EditGalleryModal from './edit-gallery-modal';

function AdminGallery() {
  const [openIndex, setOpenIndex] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const galleryItems = [
    { id: 1, location: "Kavaratti", image: Gallery },
    { id: 2, location: "Agatti", image: Gallery },
    { id: 3, location: "Kilthan", image: Gallery },
    { id: 4, location: "Agatti", image: Gallery },
    { id: 5, location: "Bengaram", image: Gallery },
  ];

  useEffect(() => {
    Fancybox.bind("[data-fancybox]", {});
    return () => Fancybox.destroy();
  }, []);

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
      <div className='text-[24px] text-[#2A2A2A] font-semibold mt-3'>Content Management</div>
      <div className="card relative flex flex-col break-words bg-white bg-clip-border rounded-[1.25rem] shadow-[3px_4px_20px_0px_#0000000F] border-0 mt-3  py-3 px-3">
        <div className="card-header p-2 lg:p-4 flex gap-3 flex-wrap justify-between items-center border-b border-[#e3e3e3]">
          <div className='flex items-center gap-3 bg-[#E9E9EA] rounded-full p-[4px] border-1 border-[#E9E9EA]'>
            <NavLink to="/admin/setting/content-management" className={({ isActive }) => `w-[160px] md:w-[170px] font-medium text-center text-[12px] md:text-[14px] rounded-full transition-all px-2 py-2 ${isActive ? 'bg-[#0F2446] text-white border border-[#2F68C5] font-semibold' : 'text-[#393939] bg-transparent'}`}>Homepage Banner</NavLink>
            <NavLink to="/admin/setting/content-gallery" className={({ isActive }) => `w-[160px] md:w-[170px] font-medium text-center text-[12px] md:text-[14px] rounded-full transition-all px-2 py-2 ${isActive ? 'bg-[#0F2446] text-white border border-[#2F68C5] font-semibold' : 'text-[#393939] bg-transparent'}`}>Gallery</NavLink>
          </div>
          <div className='flex items-center gap-3'>
            <button command="show-modal" commandfor="add-gallery-modal" type="button" className="flex min-w-[147px] h-[36px] text-[12px] items-center justify-center gap-4 bg-[#007BFF] rounded-[8px] py-[7px] px-[20px] text-white font-semibold cursor-pointer">+ Add</button>
          </div>
        </div>
        <div className="card-sub-header p-4 flex gap-3 items-center">
          <div>
            <select className="text-[12px] py-2 pl-4 pr-10 bg-[#F4F4F4] rounded-[10px] min-w-[113px] focus:border-0 focus:outline-none" name="" id="">
              <option className="text-[12px]" value="">Activity</option>
              <option className="text-[12px]" value="">111</option>
            </select>
          </div>
        </div>
        <div className="card-body py-4">
          <div className='grid gap-3 lg:gap-4 grid-cols-12'>
            {galleryItems.map((item) => (
              <div key={item.id} className="col-span-12 md:col-span-4 lg:col-span-3 mb-3">
                <div className="rounded-[3px] relative overflow-hidden">
                  <div className="img-card relative w-full aspect-[260/237]">
                    <button className='absolute top-2 right-2'>
                      <img src={DeleteIcon} alt="" />
                    </button>
                    <a className='' href={item.image} data-fancybox="gallery">
                      <img className='w-full h-full object-cover' src={item.image} alt="Gallery" />
                    </a>
                    <div className="footer flex justify-between items-center px-3 py-3 bg-[#0F2446] text-white">
                      <div className='text-[11px] font-light'>Location: <span className='font-medium'>{item.location}</span></div>
                      <button type='button' command="show-modal" commandfor="edit-gallery-modal" className=' cursor-pointer'>
                        <img src={EditIcon} alt="Edit" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <AddGalleryModal />
      <EditGalleryModal/>
    </>
  )
}

export default AdminGallery;