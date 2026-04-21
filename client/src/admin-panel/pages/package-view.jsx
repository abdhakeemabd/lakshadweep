import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import UploadIcon from "../../../src/assets/admin-panel-icon/icons/add-img-icon.svg";
import DeleteIcon from "../../../src/assets/admin-panel-icon/icons/deletegallery.svg";
import CreateDefaultSlot from '../component/create-default-slot';
import CreateCommonSlot from '../component/create-common-solts';
import { showDeleteAlert, showDeleteSuccess, showDeactivateAlert, showDeactivateSuccess, showActivateAlert, showActivateSuccess, showSuccess, showError } from '../component/swal-delete';

const ImageUploadCard = ({ imageData, onImageSelect, onImageRemove }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageSelect(file, reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const imageUrl = imageData?.preview || imageData?.url;

  return (
    <div className="img-card relative w-full aspect-square">
      {imageUrl ? (
        <div className="w-full h-full relative rounded-[6.75px] overflow-hidden border border-[#007BFF] box-border">
          <img src={imageUrl} alt="Preview" className="w-[190px] h-[190px] aspect-square object-cover" />
          <button onClick={onImageRemove} className="absolute top-2 right-2 w-[28px] h-[28px] flex items-center justify-center shadow-lg transition-all duration-200 cursor-pointer" type="button">
            <img src={DeleteIcon} alt="Delete" />
          </button>
        </div>
      ) : (
        <label className='w-full h-full box-border relative flex flex-col items-center justify-center text-center cursor-pointer border border-dashed border-[#007BFF] bg-[#DCEFFF] rounded-[6.75px] px-[10px] py-[20px]'>
          <input type="file" className="upload_input z-1 hidden" accept="image/*" onChange={handleFileChange} />
          <img src={UploadIcon} alt="add Image" />
          <button type="button" className="bg-[#007BFF] text-[#FFEBEB] py-2 rounded-[6.75px] text-[11px] font-semibold px-4 h-[31px] w-[88%] absolute bottom-3 cursor-pointer pointer-events-none">Add Image</button>
        </label>
      )}
    </div>
  );
};


function PackageView() {
  const { id } = useParams();
  const [packageDetails, setPackageDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [galleryImages, setGalleryImages] = useState(Array(6).fill(null));
  const [savingGallery, setSavingGallery] = useState(false);

  const fetchPackageDetails = async () => {
    try {
      const response = await fetch(`/package-api/package/package-details/${id}/`, {
        headers: {
          'Authorization': 'Token 8RWYE3BKLZCFIN2FHQNNQEAEWBNDY184TGNYTY6X',
          'Accept': 'application/json',
          'ngrok-skip-browser-warning': 'true',
        }
      });
      if (response.ok) {
        const result = await response.json();
        let data = result;
        if (result.status === true || result.status === 'success') {
          data = result.data || result.package || result.package_details || result;
        }
        setPackageDetails(data);
      }
    } catch (error) {
      console.error("Error fetching package details:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchGallery = async () => {
    try {
      const response = await fetch(`/package-api/package/${id}/gallery/`, {
        headers: {
          'Authorization': 'Token 8RWYE3BKLZCFIN2FHQNNQEAEWBNDY184TGNYTY6X',
          'Accept': 'application/json',
          'ngrok-skip-browser-warning': 'true',
          'User-Agent': 'postman'
        }
      });
      if (response.ok) {
        const result = await response.json();
        let images = [];

        let data = result;
        if (result.status === true || result.status === 'success') {
          data = result.data || result.gallery || result.images || result.package_gallery || result;
        }

        if (Array.isArray(data)) {
          images = data;
        } else if (data.gallery && Array.isArray(data.gallery)) {
          images = data.gallery;
        } else if (data.images && Array.isArray(data.images)) {
          images = data.images;
        } else if (data.data && Array.isArray(data.data)) {
          images = data.data;
        } else if (data.results && Array.isArray(data.results)) {
          images = data.results;
        } else if (data.data?.results && Array.isArray(data.data.results)) {
          images = data.data.results;
        } else if (Array.isArray(result)) {
          images = result;
        } else {
          const possibleArray = Object.values(data).find(val => Array.isArray(val));
          if (possibleArray) images = possibleArray;
        }

        const newGallery = Array(6).fill(null);
        images.forEach((img, index) => {
          if (index < 6) {
            let imgUrl = img.image_file || img.image || img.gallery_image || img.image_url || img.url || img.image_path || img.banner_image;
            if (imgUrl && typeof imgUrl === 'string') {
              if (imgUrl.includes('localhost:8000') || imgUrl.includes('ngrok-free.dev') || imgUrl.includes('devtunnels.ms')) {
                imgUrl = imgUrl.replace(/^https?:\/\/[^\/]+/, '');
              }
              if (!imgUrl.startsWith('http')) {
                if (!imgUrl.startsWith('/media') && !imgUrl.startsWith('media')) {
                  imgUrl = imgUrl.startsWith('/') ? `/media${imgUrl}` : `/media/${imgUrl}`;
                } else {
                  imgUrl = imgUrl.startsWith('/') ? imgUrl : `/${imgUrl}`;
                }
              }
            }
            newGallery[index] = {
              id: img.id || img.pk || img.gallery_id,
              url: imgUrl,
              preview: imgUrl,
              file: null
            };
          }
        });
        setGalleryImages(newGallery);
      }
    } catch (error) {
      console.error("Error fetching gallery:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchPackageDetails();
      fetchGallery();
    }
  }, [id]);

  const handleImageSelect = (index, file, previewUrl) => {
    const newImages = [...galleryImages];
    newImages[index] = { id: null, file, preview: previewUrl };
    setGalleryImages(newImages);
  };

  const handleImageRemove = async (index) => {
    const prevImage = galleryImages[index];
    if (prevImage && prevImage.id) {
      const confirmed = await showDeleteAlert('gallery image');
      if (!confirmed) return;

      try {
        const response = await fetch(`/package-api/package/gallery/${prevImage.id}/delete/`, {
          method: 'DELETE',
          headers: {
            'Authorization': 'Token 8RWYE3BKLZCFIN2FHQNNQEAEWBNDY184TGNYTY6X',
            'Accept': 'application/json',
            'ngrok-skip-browser-warning': 'true',
          }
        });

        if (response.ok) {
          showDeleteSuccess('Gallery image');
          const newImages = [...galleryImages];
          newImages[index] = null;
          setGalleryImages(newImages);
        } else {
          showError('Error', 'Failed to delete gallery image');
        }
      } catch (error) {
        console.error("Error deleting image:", error);
        showError('Error', 'An unexpected error occurred while deleting the image');
      }
    } else {
      const newImages = [...galleryImages];
      newImages[index] = null;
      setGalleryImages(newImages);
    }
  };

  const saveGallery = async () => {
    try {
      setSavingGallery(true);
      let success = true;
      let errorMsg = "";

      for (const img of galleryImages) {
        if (img && img.file && !img.id) {
          const formData = new FormData();
          formData.append('image_file', img.file);
          formData.append('image', img.file);
          formData.append('package', id);
          formData.append('package_id', id);

          const res = await fetch(`/package-api/package/${id}/gallery/`, {
            method: 'POST',
            headers: {
              'Authorization': 'Token 8RWYE3BKLZCFIN2FHQNNQEAEWBNDY184TGNYTY6X',
              'Accept': 'application/json',
              'ngrok-skip-browser-warning': 'true',
              'User-Agent': 'postman'
            },
            body: formData
          });

          if (!res.ok) {
            const txt = await res.text();
            success = false;
            errorMsg += `\nFailed to upload image. Details: ${txt.substring(0, 50)}`;
          }
        }
      }

      if (success) {
        await showSuccess("Success", "Gallery updated successfully");
      } else {
        showError("Error", `Completed with some errors: ${errorMsg}`);
      }
      fetchGallery();
    } catch (error) {
      console.error("Error saving gallery:", error);
      showError("Error", "An unexpected error occurred while saving the gallery.");
    } finally {
      setSavingGallery(false);
    }
  };

  const handleDeactivate = async () => {
    const confirmed = await showDeactivateAlert('package');
    if (!confirmed) return;
    try {
      const response = await fetch(`/package-api/package/${id}/deactivate/`, {
        method: 'POST',
        headers: {
          'Authorization': 'Token 8RWYE3BKLZCFIN2FHQNNQEAEWBNDY184TGNYTY6X',
          'Accept': 'application/json',
          'ngrok-skip-browser-warning': 'true',
        }
      });
      if (response.ok) {
        showDeactivateSuccess('Package');
        fetchPackageDetails();
      } else {
        showError('Error', 'Failed to deactivate package');
      }
    } catch (error) {
      showError('Error', 'An unexpected error occurred');
    }
  };

  const handleActivate = async () => {
    const confirmed = await showActivateAlert('package');
    if (!confirmed) return;
    try {
      const response = await fetch(`/package-api/package/package-activate/${id}/`, {
        method: 'POST',
        headers: {
          'Authorization': 'Token 8RWYE3BKLZCFIN2FHQNNQEAEWBNDY184TGNYTY6X',
          'Accept': 'application/json',
          'ngrok-skip-browser-warning': 'true',
        }
      });
      if (response.ok) {
        showActivateSuccess('Package');
        fetchPackageDetails();
      } else {
        showError('Error', 'Failed to activate package');
      }
    } catch (error) {
      showError('Error', 'An unexpected error occurred');
    }
  };

  if (loading || !packageDetails) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#007BFF]"></div>
        <span className="ml-3 text-lg font-medium text-gray-600">Loading details...</span>
      </div>
    );
  }

  const pTitle = packageDetails?.package_name || packageDetails?.name || packageDetails?.title || 'Package Name';
  const pCode = packageDetails?.package_code || packageDetails?.code || `#PKG${String(id).padStart(4, '0')}`;
  const isActive = packageDetails?.status === 'Active' || packageDetails?.status?.toLowerCase() === 'active' || packageDetails?.is_active;

  const stripHtml = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };
  return (
    <>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-4 xl:col-span-3">
          <div className="card relative flex flex-col bg-white bg-clip-border rounded-[1.25rem] shadow-[3px_4px_20px_0px_#0000000F] border-0 mt-3 py-3 px-3">
            <div className="card-header p-4 flex justify-between items-center border-b border-[#e3e3e3] mb-3 lg:mb-5">
              <div className="flex items-center gap-3">
                <Link to="/admin/packages-list" className="w-[34px] h-[34px] bg-[#f9f9f9] rounded-xl flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
                </Link>
                <div className="font-semibold text-[24px] leading-none tracking-normal text-[#2A2A2A]">{pCode}</div>
              </div>
            </div>
            <div className="card-body p-4">
              <div className="block mb-3">
                <div className="font-semibold text-[20px] leading-none tracking-normal text-[#1C1C1C] mb-3">{pTitle}</div>
                <div className="text-[14px] font-inter leading-[20px] text-[#3d3d3d] wrap-break-word">
                  {packageDetails?.package_description ? stripHtml(packageDetails.package_description) : 'N/A'}
                </div>
              </div>
              <div className="flex justify-end mb-3">
                {isActive ? (
                  <button onClick={handleDeactivate} className="flex items-center text-[12px] justify-center w-[93px] h-[34px] bg-[#FF4D4D] text-[#FFEBEB] py-2 rounded-[8px] cursor-pointer">Deactivate</button>
                ) : (
                  <button onClick={handleActivate} className="flex items-center text-[12px] justify-center w-[93px] h-[34px] bg-[#1C9762] text-[#FFEBEB] py-2 rounded-[8px] cursor-pointer">Activate</button>
                )}
              </div>
              <div className="block mb-3">
                <div className='font-poppins text-[#8C8C8C] text-[12px] font-medium mb-2'>Category</div>
                <div className='font-poppins text-[#3d3d3d] text-[14px] font-semibold'>{packageDetails?.category || packageDetails?.category_name || 'N/A'}</div>
              </div>
              <div className="block mb-3">
                <div className='font-poppins text-[#8C8C8C] text-[12px] font-medium mb-2'>Activity</div>
                <div className='font-poppins text-[#3d3d3d] text-[14px] font-semibold'>{packageDetails?.activity || packageDetails?.activity_name || 'N/A'}</div>
              </div>
              <div className="block mb-3">
                <div className='font-poppins text-[#8C8C8C] text-[12px] font-medium mb-2'>Location</div>
                <div className='font-poppins text-[#3d3d3d] text-[14px] font-semibold'>{packageDetails?.island || packageDetails?.location || packageDetails?.location_name || 'N/A'}</div>
              </div>
              <div className="block mb-3">
                <div className='font-poppins text-[#8C8C8C] text-[12px] font-medium mb-2'>Price (per person /unit)</div>
                <div className='font-poppins text-[#3d3d3d] text-[14px] font-semibold'>INR {packageDetails?.default_price || packageDetails?.price || packageDetails?.base_price || 0}</div>
              </div>
              <div className="block mb-3">
                <div className='font-poppins text-[#8C8C8C] text-[12px] font-medium mb-2'>Commission and Convenience fee</div>
                <div className='font-poppins text-[#3d3d3d] text-[14px] font-semibold'>INR {packageDetails?.commission || 0}</div>
              </div>
              <div className="flex justify-between gap-3 mb-3">
                <button command="show-modal" commandfor="drawer_default_slot" className='flex items-center w-[147px] text-[12px] font-semibold justify-center h-[34px] bg-[#00B8A9] text-[#FFEBEB] py-2 rounded-[8px] cursor-pointer'>Default Slots</button>
                <button command="show-modal" commandfor="drawer_common_slot" className='flex items-center w-[147px] text-[12px] font-semibold justify-center h-[34px] bg-[#007BFF] text-[#FFEBEB] py-2 rounded-[8px] cursor-pointer'>Common Slots</button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-8 xl:col-span-9">
          <div className="card min-h-[calc(100vh-220px)] relative flex flex-col bg-white bg-clip-border rounded-[1.25rem] shadow-[3px_4px_20px_0px_#0000000F] border-0 mt-3 py-3 px-3">
            <div className="card-header p-4 flex justify-between items-center border-b border-[#e3e3e3] mb-3 lg:mb-5">
              <div className="font-semibold text-[20px] leading-none tracking-normal text-[#1C1C1C] mb-3">Gallery</div>
              <button disabled={savingGallery} onClick={saveGallery} className="flex items-center text-[12px] justify-center font-semibold w-[93px] h-[34px] bg-[#007BFF] text-[#FFEBEB] py-2 rounded-[8px] cursor-pointer disabled:opacity-50">
                {savingGallery ? 'Saving...' : 'Save'}
              </button>
            </div>
            <div className="card-body p-4">
              <div className="flex flex-wrap gap-6">
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <div key={index} className="min-w-[190px] mb-3">
                    <ImageUploadCard
                      imageData={galleryImages[index]}
                      onImageSelect={(file, url) => handleImageSelect(index, file, url)}
                      onImageRemove={() => handleImageRemove(index)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <CreateDefaultSlot />
      <CreateCommonSlot />
    </>
  )
}

export default PackageView;