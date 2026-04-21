import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Fancybox } from "@fancyapps/ui";
import CallIcon from "../../../src/assets/admin-panel-icon/icons/call-icon.svg";
import EmailIcon from "../../../src/assets/admin-panel-icon/icons/email-icon.svg";
import pdfIcon from "../../../src/assets/admin-panel-icon/icons/pdf-icon.svg";
import DefaultProfile from "../../../src/assets/admin-panel-icon/icons/user-default.jpeg";

function VendorProfile({ vendor: passedVendor, loading: passedLoading }) {
  const { id } = useParams();
  const [vendorData, setVendorData] = useState(passedVendor || null);
  const [loading, setLoading] = useState(passedLoading !== undefined ? passedLoading : !passedVendor);


  useEffect(() => {
    if (passedVendor) {
      setVendorData(passedVendor);
      setLoading(passedLoading || false);
      return;
    }

    const fetchVendor = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const response = await fetch(`/vendor-api/vendor/vendor-details/${id}/`, {
          method: 'GET',
          headers: {
            'Authorization': 'Token 8RWYE3BKLZCFIN2FHQNNQEAEWBNDY184TGNYTY6X',
            'Accept': 'application/json',
          },
        });
        if (response.ok) {
          const result = await response.json();
          let fetchedData = result;
          if (result.status === true || result.status === 'success') {
            fetchedData = result.data || result.vendor || result.vendor_details || result;
          }
          if (Array.isArray(fetchedData)) fetchedData = fetchedData[0];
          setVendorData(fetchedData);
        }
      } catch (e) {
        console.warn("Failed to fetch vendor details:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchVendor();
  }, [id, passedVendor, passedLoading]);

  const vendor = vendorData || {};

  const displayData = {
    profile_picture: vendor.profile_picture || DefaultProfile,
    name: vendor.vendor_name || vendor.name || "",
    code: vendor.vendor_code || vendor.code || "#VND567",
    phone: vendor.mobile_no || vendor.phone || (vendor.user && vendor.user.mobile_no) || "",
    email: vendor.vendor_email || vendor.email || (vendor.user && vendor.user.email) || "",
    address: vendor.address1 || vendor.address_line_1 || "",
    address2: vendor.address2 || vendor.address_line_2 || "",
    latitude: vendor.latitude || vendor.vendor_latitude || "",
    longitude: vendor.longitude || vendor.vendor_longitude || "",
    island_location: vendor.island_location || vendor.location || (Array.isArray(vendor.unique_islands) ? vendor.unique_islands.join(", ") : vendor.unique_islands) || "",
    category: vendor.category || (Array.isArray(vendor.unique_categories) ? vendor.unique_categories.join(", ") : vendor.unique_categories) || "",
    description: vendor.vendor_description || vendor.description || "None",
    docs: vendor.docs || [],
    state: vendor.state || "",
    pincode: vendor.pincode || "",
    image: vendor.profile_picture || vendor.profile_img || vendor.image || vendor.vendor_image
  };

  const getFullImageUrl = (path) => {
    if (!path) return DefaultProfile;
    if (path.startsWith('http') || path.startsWith('blob:') || path.startsWith('data:')) return path;
    // Prepend /media if it's a relative path from the backend
    if (!path.startsWith('/media/') && !path.startsWith('media/')) {
        return `/media/${path}`;
    }
    return path.startsWith('/') ? path : `/${path}`;
  };

  const [profileImg, setProfileImg] = useState(getFullImageUrl(displayData.image));

  useEffect(() => {
    setProfileImg(getFullImageUrl(displayData.image));
  }, [displayData.image]);

  useEffect(() => {
    Fancybox.bind("[data-fancybox]", {});
    return () => Fancybox.destroy();
  }, []);

  if (loading) {
    return (
      <div className="vendor-profile-card px-3 shadow-[3px_4px_20px_0px_#0000000F] bg-white border-0 rounded-[1.25rem] animate-pulse">
        <div className="card-header py-4 border-b border-[#E5E5E5]">
          <div className="h-8 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="p-4 space-y-4">
          <div className="flex gap-4">
            <div className="w-24 h-24 bg-gray-200 rounded-xl"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="vendor-profile-card px-3 shadow-[3px_4px_20px_0px_#0000000F] bg-white border-0 rounded-[1.25rem]">
        <div className="card-header py-2 border-b border-[#E5E5E5]">
          <div className="flex items-center gap-3">
            <Link to="/admin/vendor/list" className="w-[34px] h-[34px] bg-[#f9f9f9] rounded-xl flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
            </Link>
            <div className="font-semibold text-[24px] leading-none tracking-normal text-[#2A2A2A]">Vendor Profile</div>
          </div>
        </div>
        <div className="pt-4 pb-5 grid grid-cols-1 gap-5">
          <div className="flex gap-4">
            <div className="relative aspect-[92/89] max-w-[92px] w-full">
              <a href={profileImg} data-fancybox="profile" data-caption={displayData.name}>
                <img src={profileImg} alt="Profile" className="w-full h-full rounded-[0.875rem] object-cover cursor-pointer" onError={() => setProfileImg(DefaultProfile)} />
              </a>
            </div>
            <div>
              <div className="font-semibold text-[16px] text-[#3d3d3d] mb-1">{displayData.name}</div>
              <div className="text-[15px] font-medium text-[#0E833F]">{displayData.code}</div>
            </div>
          </div>
          <div className="space-y-3">
            <a href={`tel:${displayData.phone}`} className="flex items-center gap-2 text-[14px] font-semibold text-[#3D3D3D]" >
              <img src={CallIcon} className="w-4" alt="Call" />
              <span>{displayData.phone}</span>
            </a>
            <a href={`mailto:${displayData.email}`} className="flex items-center gap-2 text-[14px] font-semibold text-[#3D3D3D]" >
              <img src={EmailIcon} className="w-4" alt="Email" />
              <span>{displayData.email}</span>
            </a>
          </div>
          <div>
            <label className="block mb-1 text-[12px] font-medium text-[#8c8c8c]">Vendor Address</label>
            <div className="text-[14px] font-semibold text-[#3d3d3d]">{displayData.address}{displayData.address2 ? `, ${displayData.address2}` : ''}</div>
          </div>
          <div>
            <label className="block mb-1 text-[12px] font-medium text-[#8c8c8c]">Vendor Location</label>
            <a href={`https://www.google.com/maps?q=${displayData.latitude},${displayData.longitude}`} target="_blank" rel="noreferrer" className="text-[14px] font-semibold text-[#007BFF] hover:underline transition-all">View on Google Maps</a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block mb-1 text-[12px] font-medium text-[#8c8c8c]">Island/Location</label>
              <div className="text-[14px] font-semibold text-[#3d3d3d]">{displayData.island_location}</div>
            </div>
            <div>
              <label className="block mb-1 text-[12px] font-medium text-[#8c8c8c]">Category</label>
              <div className="text-[14px] font-semibold text-[#3d3d3d]">{displayData.category}</div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block mb-1 text-[12px] font-medium text-[#8c8c8c]">State</label>
              <div className="text-[14px] font-semibold text-[#3d3d3d]">{displayData.state}</div>
            </div>
            <div>
              <label className="block mb-1 text-[12px] font-medium text-[#8c8c8c]">Pincode</label>
              <div className="text-[14px] font-semibold text-[#3d3d3d]">{displayData.pincode}</div>
            </div>
          </div>
          <div>
            <label className="block mb-1 text-[13px] font-medium text-[#8c8c8c]">Description</label>
            <div className="text-[14px] font-semibold text-[#3d3d3d] line-clamp-4">{displayData.description}</div>
          </div>
          <div>
            <label className="block mb-2 text-[13px] font-medium text-[#8c8c8c]">Documents</label>
            {displayData.docs.length > 0 ? displayData.docs.map((doc, i) => (
              <div key={i} className="mb-2">
                <div className="relative flex items-center gap-2 p-2 bg-gray-50 rounded-lg group hover:bg-gray-100 transition-all">
                  <img src={pdfIcon} className="w-4" alt="doc" />
                  <div className="text-[13px] font-medium text-[#555555] truncate flex-1">
                    {doc.document_name || (doc.file && doc.file.split('/').pop()) || `Document ${i + 1}`}
                  </div>
                  <a href={doc.file} target="_blank" rel="noreferrer" className="text-[11px] text-[#007BFF] font-bold group-hover:underline">View</a>
                </div>
              </div>
            )) : <div className="text-[13px] text-[#8c8c8c]">No documents available</div>}
          </div>
        </div>
      </div>
    </div>
  );
}



export default VendorProfile;