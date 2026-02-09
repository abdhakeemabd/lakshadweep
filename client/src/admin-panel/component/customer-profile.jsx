import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Fancybox } from "@fancyapps/ui";
import CallIcon from "../../../src/assets/admin-panel-icon/icons/call-icon.svg";
import EmailIcon from "../../../src/assets/admin-panel-icon/icons/email-icon.svg";
import DefaultProfile from "../../../src/assets/admin-panel-icon/icons/user-default.jpeg";

function CustomerProfile({ customer: passedCustomer, loading }) {
  const defaultCustomer = {
    customer_name: "John Doe",
    profile_picture: DefaultProfile,
    user: {
      mobile_no: "+91 98765 43210",
      email: "johndoe@example.com",
    },
    address1: "123 Main Street, Kozhikode, Kerala",
    bookings_count: 3,
    activities: ["Scuba Diving", "Snorkeling", "Kayaking"],
  };

  const customer = passedCustomer || defaultCustomer;
  const displayData = {
    name: customer.name || customer.customer_name || defaultCustomer.customer_name,
    code: customer.customer_code || customer.code || "#CUST567",
    phone: customer.phone || customer.mobile_no || (customer.user && customer.user.mobile_no) || defaultCustomer.user.mobile_no,
    email: customer.email || customer.customer_email || (customer.user && customer.user.email) || defaultCustomer.user.email,
    address: customer.address_line_1 || customer.address1 || defaultCustomer.address1,
    image: customer.image || customer.profile_picture || customer.customer_image || DefaultProfile,
    bookings: customer.bookings_count || customer.total_bookings || defaultCustomer.bookings_count,
    activities: customer.activities || customer.unique_activities || defaultCustomer.activities,
  };

  const [profileImg, setProfileImg] = useState(displayData.image);

  useEffect(() => {
    setProfileImg(displayData.image);
  }, [displayData.image]);

  useEffect(() => {
    Fancybox.bind("[data-fancybox]", {});
    return () => Fancybox.destroy();
  }, []);

  if (loading) {
    return (
      <div className="customer-profile-card px-3 shadow-[3px_4px_20px_0px_#0000000F] bg-white border-0 rounded-[1.25rem] animate-pulse">
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
      <div className="customer-profile-card px-3 shadow-[3px_4px_20px_0px_#0000000F] bg-white border-0 rounded-[1.25rem]">
        <div className="card-header py-2 px-3 border-b border-[#E5E5E5]">
          <div className="flex items-center gap-3">
            <Link to="/admin/customer/list" className="w-[34px] h-[34px] bg-[#f9f9f9] rounded-xl flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
            </Link>
            <div className="font-semibold text-[24px] leading-none tracking-normal text-[#2A2A2A]">Customer #121</div>
          </div>
        </div>
        <div className="card-body pt-4 pb-10 px-3 lg:px-6 grid grid-cols-1 gap-5">
          <div className="flex gap-4">
            <div className="relative aspect-[92/89] max-w-[92px] w-full">
              <a href={profileImg} data-fancybox="profile" data-caption={displayData.name}>
                <img src={profileImg} alt="Profile" className="w-full h-full rounded-[0.875rem] object-cover cursor-pointer" onError={() => setProfileImg(DefaultProfile)} />
              </a>
            </div>
            <div>
              <div className="font-semibold text-[16px] text-[#3d3d3d] mb-1">{displayData.name}</div>
              <div className="text-[15px] font-normal text-[#0E833F]">{displayData.code}</div>
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
            <label className="block mb-1 text-[12px] font-medium text-[#8c8c8c]">No of Bookings</label>
            <div className="text-[14px] font-semibold text-[#3d3d3d]">{displayData.bookings || 0}</div>
          </div>
          <div>
            <label className="block mb-1 text-[12px] font-medium text-[#8c8c8c]">Activities</label>
            <div className="text-[14px] font-semibold text-[#3d3d3d]">
              {Array.isArray(displayData.activities) ? displayData.activities.join(", ") : displayData.activities || "N/A"}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block mb-1 text-[12px] font-medium text-[#8c8c8c]">Address</label>
              <div className="text-[14px] font-semibold text-[#3d3d3d]">{displayData.address}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerProfile;