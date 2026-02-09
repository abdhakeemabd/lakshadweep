import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CallIcon from "../../../src/assets/admin-panel-icon/icons/call-icon.svg";
import EmailIcon from "../../../src/assets/admin-panel-icon/icons/email-icon.svg";
import pdfIcon from "../../../src/assets/admin-panel-icon/icons/pdf-icon.svg";
import DefaultProfile from "../../../src/assets/admin-panel-icon/icons/user-default.jpeg";

function CunstomerProfile() {
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
            <InfoList label="Island/Location" items={displayData.islands} />
            <InfoList label="Category" items={displayData.categories} />
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
            <label className="block mb-1 text-[13px] font-medium text-[#9CA3AF]">Description</label>
            <div className="text-[14px] font-semibold text-[#3d3d3d] line-clamp-4">{displayData.description}</div>
          </div>
          <div>
            <label className="block mb-2 text-[13px] font-medium text-[#9CA3AF]">Documents</label>
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

export default CunstomerProfile;