import React, { useState } from 'react'
import Header from '../component/header'
import Slidebar from '../component/slidebar'
import { Link } from 'react-router-dom';
import UploadIcon from "../../../src/assets/admin-panel-icon/icons/add-img-icon.svg";
import DeleteIcon from "../../../src/assets/admin-panel-icon/icons/deletegallery.svg";
import CreateDefaultSlot from '../component/create-default-slot';
// Image Upload Card Component
const ImageUploadCard = ({ imageUrl, onImageSelect, onImageRemove }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageSelect(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="img-card relative">
      {imageUrl ? (
        <div className="w-full aspect-square relative rounded-[6.75px] overflow-hidden border border-[#007BFF]">
          <img src={imageUrl} alt="Preview" className="w-full h-full object-cover absolute top-[50%] left-[50%]"/>
          <button onClick={onImageRemove} className="absolute top-2 right-2 w-[28px] h-[28px] bg-[#FFFFFFE3] w-[28px] h-[28px] text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200" type="button">
            <img className='' src={DeleteIcon} alt="Delete" />
          </button>
        </div>
      ) : (
        <label className='w-full min-h-0 box-border relative flex flex-col items-center justify-center text-center cursor-pointer aspect-square border border-dashed border-[#007BFF] bg-[#DCEFFF] rounded-[6.75px] px-[10px] py-[20px]'>
          <input type="file" className="upload_input" accept="image/*" onChange={handleFileChange}/>
          <img src={UploadIcon} alt="add Image" />
          <button type="button" className="bg-[#007BFF] text-[#FFEBEB] py-2 rounded-[6.75px] text-[11px] font-semibold px-4 h-[31px] w-[88%] py-[5px] absolute bottom-3">Add Image</button>
        </label>
      )}
    </div>
  );
};

function PackageView() {
  const [galleryImages, setGalleryImages] = useState([null, null, null]);

  const handleImageSelect = (index, imageUrl) => {
    const newImages = [...galleryImages];
    newImages[index] = imageUrl;
    setGalleryImages(newImages);
  };

  const handleImageRemove = (index) => {
    const newImages = [...galleryImages];
    newImages[index] = null;
    setGalleryImages(newImages);
  };

  return (
    <>
      <div className="container-fluid mx-auto pr-3">
        <div className="flex gap-5">
          <div className="w-[262px]">
            <Slidebar />
          </div>
          <div className=" w-full pt-3">
            <Header />
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 lg:col-span-4 xl:col-span-3">
                <div className="card relative flex flex-col break-words bg-white bg-clip-border rounded-[1.25rem] shadow-[3px_4px_20px_0px_#0000000F] border-0 mt-3 py-3 px-3">
                  <div className="card-header p-4 flex justify-between items-center border-b border-[#e3e3e3] mb-3 lg:mb-5">
                    <div className="flex items-center gap-3">
                      <Link to="/admin/vendor/list" className="w-[34px] h-[34px] bg-[#f9f9f9] rounded-xl flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
                      </Link>
                      <div className="font-semibold text-[24px] leading-none tracking-normal text-[#2A2A2A]">Package #PKG123456789</div>
                    </div>
                  </div>
                  <div className="card-body p-4">
                    <div className="block mb-3">
                      <div className="font-semibold text-[20px] leading-none tracking-normal text-[#1C1C1C] mb-3">Summer Package A</div>
                      <div className="text-[14px] font-inter leading-[20px] text-[#3d3d3d]">Join our Summer Package for an exciting scuba diving experience in Kavaratti. Discover vibrant marine life, crystal-clear waters, and professional guidance to ensure both safety and fun. Perfect for adventure seekers looking to explore the beauty of the ocean.</div>
                    </div>
                    <div className="flex justify-end mb-3">
                      <button className="flex items-center text-[12px] justify-center w-[93px] h-[34px] bg-[#FF4D4D] text-[#FFEBEB] py-2 rounded-[8px]">Deactivate</button>
                    </div>
                    <div className="block mb-3">
                      <div className='font-poppins text-[#8C8C8C] text-[12px] font-medium mb-2'>Category</div>
                      <div className='font-poppins text-[#3d3d3d] text-[14px] font-semibold'>Watersports</div>
                    </div>
                    <div className="block mb-3">
                      <div className='font-poppins text-[#8C8C8C] text-[12px] font-medium mb-2'>Activity</div>
                      <div className='font-poppins text-[#3d3d3d] text-[14px] font-semibold'>Scuba Diving</div>
                    </div>
                    <div className="block mb-3">
                      <div className='font-poppins text-[#8C8C8C] text-[12px] font-medium mb-2'>Location</div>
                      <div className='font-poppins text-[#3d3d3d] text-[14px] font-semibold'>Kavaratti</div>
                    </div>
                    <div className="block mb-3">
                      <div className='font-poppins text-[#8C8C8C] text-[12px] font-medium mb-2'>Price (per person /unit)</div>
                      <div className='font-poppins text-[#3d3d3d] text-[14px] font-semibold'>INR 35,000.00</div>
                    </div>
                    <div className="block mb-3">
                      <div className='font-poppins text-[#8C8C8C] text-[12px] font-medium mb-2'>Commission and Convenience fee</div>
                      <div className='font-poppins text-[#3d3d3d] text-[14px] font-semibold'>INR 350.00</div>
                    </div>
                    <div className="flex justify-between gap-3 mb-3">
                      <button command="show-modal" commandfor="drawer_default_slot" className='flex items-center w-[147px] text-[12px] font-semibold justify-center h-[34px] bg-[#00B8A9] text-[#FFEBEB] py-2 rounded-[8px]'>Default Slots</button>
                      <button className='flex items-center w-[147px] text-[12px] font-semibold justify-center h-[34px] bg-[#007BFF] text-[#FFEBEB] py-2 rounded-[8px]'>Common Slots</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-12 lg:col-span-8 xl:col-span-9">
                <div className="card min-h-[calc(100vh-220px)] relative flex flex-col break-words bg-white bg-clip-border rounded-[1.25rem] shadow-[3px_4px_20px_0px_#0000000F] border-0 mt-3 py-3 px-3">
                  <div className="card-header p-4 flex justify-between items-center border-b border-[#e3e3e3] mb-3 lg:mb-5">
                    <div className="font-semibold text-[20px] leading-none tracking-normal text-[#1C1C1C] mb-3">Gallery</div>
                    <button className="flex items-center text-[12px] justify-center font-semibold w-[93px] h-[34px] bg-[#007BFF] text-[#FFEBEB] py-2 rounded-[8px]">Save</button>
                  </div>
                  <div className="card-body p-4">
                    <div className="flex flex-wrap gap-6">
                      <div className="min-w-[190px] mb-3">
                        <ImageUploadCard
                          imageUrl={galleryImages[0]}
                          onImageSelect={(url) => handleImageSelect(0, url)}
                          onImageRemove={() => handleImageRemove(0)}
                        />
                      </div>
                      <div className="min-w-[190px] mb-3">
                        <ImageUploadCard
                          imageUrl={galleryImages[1]}
                          onImageSelect={(url) => handleImageSelect(1, url)}
                          onImageRemove={() => handleImageRemove(1)}
                        />
                      </div>
                      <div className="min-w-[190px] mb-3">
                        <ImageUploadCard
                          imageUrl={galleryImages[2]}
                          onImageSelect={(url) => handleImageSelect(2, url)}
                          onImageRemove={() => handleImageRemove(2)}
                        />
                      </div>
                      <div className="min-w-[190px] mb-3">
                        <ImageUploadCard
                          imageUrl={galleryImages[2]}
                          onImageSelect={(url) => handleImageSelect(2, url)}
                          onImageRemove={() => handleImageRemove(2)}
                        />
                      </div>
                      <div className="min-w-[190px] mb-3">
                        <ImageUploadCard
                          imageUrl={galleryImages[2]}
                          onImageSelect={(url) => handleImageSelect(2, url)}
                          onImageRemove={() => handleImageRemove(2)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CreateDefaultSlot />
    </>
  )
}

export default PackageView