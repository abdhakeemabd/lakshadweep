import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import Logo from "../../assets/admin-panel-icon/logo/logo-white.svg";
import Dashboard from "../../assets/admin-panel-icon/sidebar/dashboard.svg";
import DashboardActive from "../../assets/admin-panel-icon/sidebar/dashboard-active.svg";
import Vendors from "../../assets/admin-panel-icon/sidebar/vendors.svg";
import VendorsActive from "../../assets/admin-panel-icon/sidebar/vendors-active.svg";
import Packages from "../../assets/admin-panel-icon/sidebar/packages.svg";
import PackagesActive from "../../assets/admin-panel-icon/sidebar/packages-active.svg";
import Slots from "../../assets/admin-panel-icon/sidebar/slot.svg";
import SlotsActive from "../../assets/admin-panel-icon/sidebar/slot-active.svg";
import Bookings from "../../assets/admin-panel-icon/sidebar/bookings.svg";
import BookingsActive from "../../assets/admin-panel-icon/sidebar/bookings-active.svg";
import Customers from "../../assets/admin-panel-icon/sidebar/customers.svg";
import CustomersActive from "../../assets/admin-panel-icon/sidebar/customers-active.svg";
import Notifications from "../../assets/admin-panel-icon/sidebar/notification.svg";
import NotificationsActive from "../../assets/admin-panel-icon/sidebar/notification-active.svg";
import Settings from "../../assets/admin-panel-icon/sidebar/setting.svg";
import SettingsActive from "../../assets/admin-panel-icon/sidebar/setting-active.svg";
import Payments from "../../assets/admin-panel-icon/sidebar/payments.svg";
import PaymentsActive from "../../assets/admin-panel-icon/sidebar/payments-active.svg";

function Slidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isCustomerActive =
    location.pathname.startsWith("/admin/all-customer") ||
    location.pathname.startsWith("/admin/users") ||
    location.pathname.startsWith("/admin/enquiries");
  const isSlotsActive =
    location.pathname.startsWith("/admin/all-slots") ||
    location.pathname.startsWith("/admin/day-schedule");
  const isSettingActive = location.pathname.startsWith("/admin/setting");

  const [isCustomerOpen, setIsCustomerOpen] = useState(isCustomerActive);
  const [isSlotsOpen, setIsSlotsOpen] = useState(isSlotsActive);
  const [isSettingOpen, setIsSettingOpen] = useState(isSettingActive);

  useEffect(() => {
    const handleToggle = () => setIsOpen((prev) => !prev);
    window.addEventListener("toggle-sidebar", handleToggle);
    return () => window.removeEventListener("toggle-sidebar", handleToggle);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    if (isCustomerActive) {
      setIsCustomerOpen(true);
      setIsSlotsOpen(false);
      setIsSettingOpen(false);
    } else if (isSlotsActive) {
      setIsSlotsOpen(true);
      setIsCustomerOpen(false);
      setIsSettingOpen(false);
    } else if (isSettingActive) {
      setIsSettingOpen(true);
      setIsCustomerOpen(false);
      setIsSlotsOpen(false);
    }
  }, [isCustomerActive, isSlotsActive, isSettingActive]);

  return (
    <>
      {isOpen && (<div className="fixed inset-0 bg-black/50 z-[999] lg:hidden" onClick={() => setIsOpen(false)} />)}
      <div className={`side-bar admin-sidebar bg-[#0F2446] text-white px-[20px] py-4 min-h-screen h-full fixed lg:relative inset-y-0 left-0 z-[1000] lg:z-auto w-[260px] lg:w-full transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <aside>
          <div className="py-5 pt-10 lg:pt-5 text-center flex items-center justify-between lg:justify-center">
            <button onClick={() => setIsOpen(false)} className="lg:hidden absolute top-2 right-2 text-white p-2 hover:bg-white/10 rounded-full transition-colors">
              <IoClose size={24} />
            </button>
            <Link to="/" className="a-logo">
              <img src={Logo} className="h-[30px] mx-auto" alt="Logo" />
            </Link>
          </div>
          <ul className="space-y-2">
            <li className="mb-3 lg:mb-4">
              <NavLink to="/admin/dashboard" className={({ isActive }) => `group flex gap-3 items-center py-[10px] px-[15px] rounded-[10px] hover:bg-[#FF5C1A] transition-all duration-300 ease-in-out lg:pl-[20px] ${isActive ? "bg-[#FF5C1A]" : ""}`}>
                {({ isActive }) => (
                  <>
                    <div className="icon">
                      <img src={Dashboard} alt="Dashboard" className={`w-6 h-6 transition-all duration-300 ${isActive ? "hidden" : "block"} group-hover:hidden`} />
                      <img src={DashboardActive} alt="Dashboard Active" className={`w-6 h-6 transition-all duration-300 ${isActive ? "block" : "hidden"} group-hover:block`} />
                    </div>
                    <span className={`text-[#969CB9] text-[13px] font-light transition-all duration-300 group-hover:text-white group-hover:font-semibold ${isActive ? "font-semibold text-white" : ""}`}>
                      Dashboard
                    </span>
                  </>
                )}
              </NavLink>
            </li>
            <li className="mb-3 lg:mb-4">
              <NavLink to="/admin/vendor/list" className={({ isActive }) => `group flex gap-3 items-center py-[10px] px-[15px] rounded-[10px] hover:bg-[#FF5C1A] transition-all duration-300 ease-in-out lg:pl-[20px] ${isActive ? "bg-[#FF5C1A]" : ""}`}>
                {({ isActive }) => (
                  <>
                    <div className="icon">
                      <img src={Vendors} alt="Vendors" className={`w-6 h-6 transition-all duration-300 ${isActive ? "hidden" : "block"} group-hover:hidden`} />
                      <img src={VendorsActive} alt="Vendors Active" className={`w-6 h-6 transition-all duration-300 ${isActive ? "block" : "hidden"} group-hover:block`} />
                    </div>
                    <span className={`text-[#969CB9] text-[13px] font-light transition-all duration-300 group-hover:text-white group-hover:font-semibold ${isActive ? "font-semibold text-white" : ""}`}>
                      Vendors
                    </span>
                  </>
                )}
              </NavLink>
            </li>
            <li className="mb-3 lg:mb-4">
              <NavLink to="/admin/packages-list" className={({ isActive }) => `group flex gap-3 items-center py-[10px] px-[15px] rounded-[10px] hover:bg-[#FF5C1A] transition-all duration-300 ease-in-out lg:pl-[20px] ${isActive ? "bg-[#FF5C1A]" : ""}`}>
                {({ isActive }) => (
                  <>
                    <div className="icon">
                      <img src={Packages} alt="Packages" className={`w-6 h-6 transition-all duration-300 ${isActive ? "hidden" : "block"} group-hover:hidden`} />
                      <img src={PackagesActive} alt="Packages Active" className={`w-6 h-6 transition-all duration-300 ${isActive ? "block" : "hidden"} group-hover:block`} />
                    </div>
                    <span className={`text-[#969CB9] text-[13px] font-light transition-all duration-300 group-hover:text-white group-hover:font-semibold ${isActive ? "font-semibold text-white" : ""}`}>
                      Packages
                    </span>
                  </>
                )}
              </NavLink>
            </li>
            <li className="mb-3 lg:mb-4">
              <div onClick={() => {
                setIsSlotsOpen(!isSlotsOpen);
                setIsCustomerOpen(false);
                setIsSettingOpen(false);
              }}
                className={`group flex gap-3 items-center py-[10px] px-[15px] rounded-[10px] hover:bg-[#FF5C1A] transition-all duration-300 ease-in-out lg:pl-[20px] cursor-pointer ${isSlotsOpen || isSlotsActive ? "bg-[#FF5C1A]" : ""}`} >
                <div className="icon">
                  <img src={Slots} alt="Slots" className={`w-6 h-6 transition-all duration-300 ${isSlotsOpen || isSlotsActive ? "hidden" : "block"} group-hover:hidden`} />
                  <img src={SlotsActive} alt="Slots Active" className={`w-6 h-6 transition-all duration-300 ${isSlotsOpen || isSlotsActive ? "block" : "hidden"} group-hover:block`} />
                </div>
                <span className={`text-[#969CB9] text-[13px] font-light transition-all duration-300 flex-1 group-hover:text-white group-hover:font-semibold ${isSlotsOpen || isSlotsActive ? "font-semibold text-white" : ""}`}>Slots</span>
                <svg className={`w-4 h-4 transition-transform duration-300 group-hover:text-white ${isSlotsOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
              {isSlotsOpen && (
                <ul className="sub-menu mt-2 space-y-1">
                  <li>
                    <NavLink to="/admin/all-slots/" className={({ isActive }) => `block py-2 pl-[20px] text-[13px] transition-all duration-300 border border-transparent rounded-[10px] ${isActive ? "text-[#D9D9D9] bg-[#1B3969] border font-semibold border-[#FF5C1A]" : "text-[#969CB9] hover:text-white hover:bg-[#1B3969] hover:font-semibold hover:border-[#FF5C1A]"}`}>All Slots</NavLink>
                  </li>
                  <li>
                    <NavLink to="/admin/day-schedule/" className={({ isActive }) => `block py-2 pl-[20px] text-[13px] transition-all duration-300 border border-transparent rounded-[10px] ${isActive ? "text-[#D9D9D9] bg-[#1B3969] border font-semibold border-[#FF5C1A]" : "text-[#969CB9] hover:text-white hover:bg-[#1B3969] hover:font-semibold hover:border-[#FF5C1A]"}`}>Day Schedule</NavLink>
                  </li>
                </ul>
              )}
            </li>
            <li className="mb-3 lg:mb-4">
              <NavLink to="/admin/bookings-list" className={({ isActive }) => `group flex gap-3 items-center py-[10px] px-[15px] rounded-[10px] hover:bg-[#FF5C1A] transition-all duration-300 ease-in-out lg:pl-[20px] ${isActive ? "bg-[#FF5C1A]" : ""}`}>
                {({ isActive }) => (
                  <>
                    <div className="icon">
                      <img src={Bookings} alt="Bookings" className={`w-6 h-6 transition-all duration-300 ${isActive ? "hidden" : "block"} group-hover:hidden`} />
                      <img src={BookingsActive} alt="Bookings Active" className={`w-6 h-6 transition-all duration-300 ${isActive ? "block" : "hidden"} group-hover:block`} />
                    </div>
                    <span className={`text-[#969CB9] text-[13px] font-light transition-all duration-300 group-hover:text-white group-hover:font-semibold ${isActive ? "font-semibold text-white" : ""}`}>
                      Bookings
                    </span>
                  </>
                )}
              </NavLink>
            </li>
            <li className="mb-3 lg:mb-4">
              <div
                onClick={() => {
                  setIsCustomerOpen(!isCustomerOpen);
                  setIsSlotsOpen(false);
                  setIsSettingOpen(false);
                }}
                className={`group flex gap-3 items-center py-[10px] px-[15px] rounded-[10px] hover:bg-[#FF5C1A] transition-all duration-300 ease-in-out lg:pl-[20px] cursor-pointer ${isCustomerOpen || isCustomerActive ? "bg-[#FF5C1A]" : ""}`}>
                <div className="icon">
                  <img src={Customers} alt="Customers" className={`w-6 h-6 transition-all duration-300 ${isCustomerOpen || isCustomerActive ? "hidden" : "block"} group-hover:hidden`} />
                  <img src={CustomersActive} alt="Customers Active" className={`w-6 h-6 transition-all duration-300 ${isCustomerOpen || isCustomerActive ? "block" : "hidden"} group-hover:block`} />
                </div>
                <span className={`text-[#969CB9] text-[13px] font-light transition-all duration-300 flex-1 group-hover:text-white group-hover:font-semibold ${isCustomerOpen || isCustomerActive ? "font-semibold text-white" : ""}`}>
                  Customers
                </span>
                <svg className={`w-4 h-4 transition-transform duration-300 group-hover:text-white ${isCustomerOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
              {isCustomerOpen && (
                <ul className="sub-menu mt-2 space-y-1">
                  <li>
                    <NavLink to="/admin/all-customer" className={({ isActive }) => `block py-2 pl-[20px] text-[13px] transition-all duration-300 border border-transparent rounded-[10px] ${isActive ? "text-[#D9D9D9] bg-[#1B3969] border font-semibold border-[#FF5C1A]" : "text-[#969CB9] hover:text-white hover:bg-[#1B3969] hover:font-semibold hover:border-[#FF5C1A]"}`}> All Customers </NavLink>
                  </li>
                  <li>
                    <NavLink to="/admin/users" className={({ isActive }) => `block py-2 pl-[20px] text-[13px] transition-all duration-300 border border-transparent rounded-[10px] ${isActive ? "text-[#D9D9D9] bg-[#1B3969] border font-semibold border-[#FF5C1A]" : "text-[#969CB9] hover:text-white hover:bg-[#1B3969] hover:font-semibold hover:border-[#FF5C1A]"}`}>Users</NavLink>
                  </li>
                  <li>
                    <NavLink to="/admin/enquiries" className={({ isActive }) => `block py-2 pl-[20px] text-[13px] transition-all duration-300 border border-transparent rounded-[10px] ${isActive ? "text-[#D9D9D9] bg-[#1B3969] border font-semibold border-[#FF5C1A]" : "text-[#969CB9] hover:text-white hover:bg-[#1B3969] hover:font-semibold hover:border-[#FF5C1A]"}`}>Enquiries</NavLink>
                  </li>
                </ul>
              )}
            </li>
            <li className="mb-3 lg:mb-4">
              <NavLink
                to="/admin/notifications-list"
                className={({ isActive }) =>
                  `group flex gap-3 items-center py-[10px] px-[15px] rounded-[10px] hover:bg-[#FF5C1A] transition-all duration-300 ease-in-out lg:pl-[20px] ${isActive ? "bg-[#FF5C1A]" : ""}`}>
                {({ isActive }) => (
                  <>
                    <div className="icon">
                      <img src={Notifications} alt="Notifications" className={`w-6 h-6 transition-all duration-300 ${isActive ? "hidden" : "block"} group-hover:hidden`} />
                      <img src={NotificationsActive} alt="Notifications Active" className={`w-6 h-6 transition-all duration-300 ${isActive ? "block" : "hidden"} group-hover:block`} />
                    </div>
                    <span className={`text-[#969CB9] text-[13px] font-light transition-all duration-300 group-hover:text-white group-hover:font-semibold ${isActive ? "font-semibold text-white" : ""}`}>
                      Notifications
                    </span>
                  </>
                )}
              </NavLink>
            </li>
            <li className="mb-3 lg:mb-4">
              <div
                onClick={() => {
                  setIsSettingOpen(!isSettingOpen);
                  setIsSlotsOpen(false);
                  setIsCustomerOpen(false);
                }}
                className={`group flex gap-3 items-center py-[10px] px-[15px] rounded-[10px] hover:bg-[#FF5C1A] transition-all duration-300 ease-in-out lg:pl-[20px] cursor-pointer ${isSettingOpen || isSettingActive ? "bg-[#FF5C1A]" : ""}`}>
                <div className="icon">
                  <img src={Settings} alt="Settings" className={`w-6 h-6 transition-all duration-300 ${isSettingOpen || isSettingActive ? "hidden" : "block"} group-hover:hidden`} />
                  <img src={SettingsActive} alt="Settings Active" className={`w-6 h-6 transition-all duration-300 ${isSettingOpen || isSettingActive ? "block" : "hidden"} group-hover:block`} />
                </div>
                <span className={`text-[#969CB9] text-[13px] font-light transition-all duration-300 flex-1 group-hover:text-white group-hover:font-semibold ${isSettingOpen || isSettingActive ? "font-semibold text-white" : ""}`}>
                  Settings
                </span>
                <svg className={`w-4 h-4 transition-transform duration-300 group-hover:text-white ${isSettingOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
              {isSettingOpen && (
                <ul className="sub-menu mt-2 space-y-1">
                  <li>
                    <NavLink to="/admin/setting/categories" className={({ isActive }) => `block py-2 pl-[20px] text-[13px] transition-all duration-300 border border-transparent rounded-[10px] ${isActive ? "text-[#D9D9D9] bg-[#1B3969] border font-semibold border-[#FF5C1A]" : "text-[#969CB9] hover:text-white hover:bg-[#1B3969] hover:font-semibold hover:border-[#FF5C1A]"}`} >Categories
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/admin/setting/content-management" className={({ isActive }) => `block py-2 pl-[20px] text-[13px] transition-all duration-300 border border-transparent rounded-[10px] ${isActive ? "text-[#D9D9D9] bg-[#1B3969] border font-semibold border-[#FF5C1A]" : "text-[#969CB9] hover:text-white hover:bg-[#1B3969] hover:font-semibold hover:border-[#FF5C1A]"}`} >Content Management
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>
            <li className="mb-3 lg:mb-4">
              <NavLink
                to="/admin/payments-list"
                className={({ isActive }) =>
                  `group flex gap-3 items-center py-[10px] px-[15px] rounded-[10px] hover:bg-[#FF5C1A] transition-all duration-300 ease-in-out lg:pl-[20px] ${isActive ? "bg-[#FF5C1A]" : ""}`}>
                {({ isActive }) => (
                  <>
                    <div className="icon">
                      <img src={Payments} alt="Payments" className={`w-6 h-6 transition-all duration-300 ${isActive ? "hidden" : "block"} group-hover:hidden`} />
                      <img src={PaymentsActive} alt="Payments Active" className={`w-6 h-6 transition-all duration-300 ${isActive ? "block" : "hidden"} group-hover:block`} />
                    </div>
                    <span className={`text-[#969CB9] text-[13px] font-light transition-all duration-300 group-hover:text-white group-hover:font-semibold ${isActive ? "font-semibold text-white" : ""}`}>
                      Payments
                    </span>
                  </>
                )}
              </NavLink>
            </li>
          </ul>
        </aside>
      </div>
    </>
  );
}

export default Slidebar;