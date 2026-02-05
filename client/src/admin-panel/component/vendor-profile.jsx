import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Fancybox } from "@fancyapps/ui";
import CallIcon from "../../../src/assets/admin-panel-icon/icons/call-icon.svg";
import EmailIcon from "../../../src/assets/admin-panel-icon/icons/email-icon.svg";
import pdfIcon from "../../../src/assets/admin-panel-icon/icons/pdf-icon.svg";
import DefaultProfile from "../../../src/assets/admin-panel-icon/icons/user-default.jpeg";

function VendorProfile() {
  const vendor = {
    vendor_name: "Ocean Adventure Sports",
    profile_picture: DefaultProfile,
    user: {
      mobile_no: "+91 99999 99999",
      email: "oceanadventure@gmail.com",
    },
    address1: "Beach Road",
    address2: "Near Lighthouse, Kozhikode",
    latitude: "11.2588",
    longitude: "75.7804",
    unique_islands: ["Agatti", "Bangaram", "Kavaratti"],
    unique_categories: ["Scuba Diving", "Snorkeling", "Kayaking"],
    docs: [
      { document_name: "Vendor License.pdf", file: "/docs/sample.pdf" },
      { document_name: "Insurance Certificate.pdf", file: "/docs/sample.pdf" },
    ],
  };

  const [profileImg, setProfileImg] = useState(vendor.profile_picture || DefaultProfile);

  useEffect(() => {
    Fancybox.bind("[data-fancybox]", {});
    return () => Fancybox.destroy();
  }, []);

  return (
    <div>
      <div className="vendor-profile-card px-3 shadow-[3px_4px_20px_0px_#0000000F] bg-white border-0 rounded-[1.25rem]">
        <div className="card-header py-2 border-b border-[#E5E5E5]">
          <div className="flex items-center gap-3">
            <Link className="w-[34px] h-[34px] bg-[#f9f9f9] rounded-xl flex items-center justify-center" to="/admin/vendors-list">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
            </Link>
            <div className="font-semibold text-[24px] leading-none tracking-normal text-[#2A2A2A]">Vendor Profile</div>
          </div>
        </div>
        <div className="pt-4 pb-5 grid grid-cols-1 gap-5">
          <div className="flex gap-4">
            <div className="relative aspect-[92/89] max-w-[92px]">
              <a href={profileImg} data-fancybox="profile" data-caption={vendor.vendor_name}>
                <img 
                  src={profileImg} 
                  alt="Profile" 
                  className="w-full h-full rounded-[0.875rem] object-cover cursor-pointer" 
                  onError={() => setProfileImg(DefaultProfile)}
                />
              </a>
            </div>
            <div>
              <div className="font-medium text-[16px] font-semibold text-[#3d3d3d]">{vendor.vendor_name}</div>
              <div className="text-[15px] text-[#0E833F]">#NTYFC567</div>
            </div>
          </div>
          <div className="space-y-3">
            <a href={`tel:${vendor.user.mobile_no}`} className="flex items-center gap-2 text-[14px] font-semibold text-[#3D3D3D]" >
              <img src={CallIcon} className="w-4" alt="Call" />
              <span>{vendor.user.mobile_no}</span>
            </a>
            <a href={`mailto:${vendor.user.email}`} className="flex items-center gap-2 text-[14px] font-semibold text-[#3D3D3D]" >
              <img src={EmailIcon} className="w-4" alt="Email" />
              <span>{vendor.user.email}</span>
            </a>
          </div>
          <div>
            <label className="block mb-1 text-[12px] font-medium text-[#8c8c8c]">Vendor Address</label>
            <div className="text-[14px] font-semibold text-[#3d3d3d]">{vendor.address1}, {vendor.address2}</div>
          </div>
          <div>
            <label className="block mb-1 text-[12px] font-medium text-[#8c8c8c]">Vendor Location</label>
            <a href={`https://www.google.com/maps?q=${vendor.latitude},${vendor.longitude}`} target="_blank" rel="noreferrer" className="text-[14px] font-semibold text-[#3d3d3d]">View on Google Maps</a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <InfoList className="text-[14px] font-semibold text-[#3d3d3d]" label="Island/Location" items={vendor.unique_islands} />
            <InfoList className="text-[14px] font-semibold text-[#3d3d3d]" label="Category" items={vendor.unique_categories} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block mb-1 text-[12px] font-medium text-[#8c8c8c]">State</label>
              <div className="text-[14px] font-semibold text-[#3d3d3d]">Kerala</div>
            </div>
            <div>
              <label className="block mb-1 text-[12px] font-medium text-[#8c8c8c]">Pincode</label>
              <div className="text-[14px] font-semibold text-[#3d3d3d]">673645</div>
            </div>
          </div>
          <div>
            <label className="block mb-1 text-[13px] font-medium text-[#9CA3AF]">Description</label>
            <div className="text-[14px] font-semibold text-[#3d3d3d] line-clamp-4">Experienced watersports vendor offering safe and exciting activities including snorkeling, scuba diving, and kayaking.</div>
          </div>
          <div>
            <label className="block mb-2 text-[13px] font-medium text-[#9CA3AF]">Documents</label>
            {vendor.docs.map((doc, i) => (
              <div key={i} className="mb-2">
                <div className="relative flex items-center gap-2">
                  <img src={pdfIcon} className="w-4" alt="doc" />
                  <div className="text-[13px] text-[#555555]">
                    {doc.document_name}
                  </div>
                  <a href={doc.file} className="absolute inset-0" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
function InfoList({ label, items = [] }) {
  const fullText = items.join(", ");
  return (
    <div title={fullText}>
      <label className="block mb-1 text-[13px] font-medium text-[#9CA3AF]">
        {label}
      </label>
      <div className="text-[14px] font-semibold text-[#3d3d3d] truncate">
        {fullText || "N/A"}
      </div>
    </div>
  );
}

export default VendorProfile;