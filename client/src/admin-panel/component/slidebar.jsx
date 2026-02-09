import React from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Logo from '../../assets/admin-panel-icon/logo/logo-white.svg'
import Dashboard from '../../assets/admin-panel-icon/sidebar/dashboard.svg'
import DashboardActive from '../../assets/admin-panel-icon/sidebar/dashboard-active.svg'
import Vendors from '../../assets/admin-panel-icon/sidebar/vendors.svg'
import VendorsActive from '../../assets/admin-panel-icon/sidebar/vendors-active.svg'
import Packages from '../../assets/admin-panel-icon/sidebar/packages.svg'
import PackagesActive from '../../assets/admin-panel-icon/sidebar/packages-active.svg'
import Slots from '../../assets/admin-panel-icon/sidebar/slot.svg'
import SlotsActive from '../../assets/admin-panel-icon/sidebar/slot-active.svg'
import Bookings from '../../assets/admin-panel-icon/sidebar/bookings.svg'
import BookingsActive from '../../assets/admin-panel-icon/sidebar/bookings-active.svg'
import Customers from '../../assets/admin-panel-icon/sidebar/customers.svg'
import CustomersActive from '../../assets/admin-panel-icon/sidebar/customers-active.svg'
import Notifications from '../../assets/admin-panel-icon/sidebar/notification.svg'
import NotificationsActive from '../../assets/admin-panel-icon/sidebar/notification-active.svg'
import Settings from '../../assets/admin-panel-icon/sidebar/setting.svg'
import SettingsActive from '../../assets/admin-panel-icon/sidebar/setting-active.svg'
import Payments from '../../assets/admin-panel-icon/sidebar/payments.svg'
import PaymentsActive from '../../assets/admin-panel-icon/sidebar/payments-active.svg'

function Slidebar() {
  const location = useLocation();
  const isCustomerActive = location.pathname.startsWith('/admin/all-customer') || location.pathname.startsWith('/admin/users') || location.pathname.startsWith('/admin/enquiries');
  const isSlotsActive = location.pathname.startsWith('/slot');
  const isSettingActive = location.pathname.startsWith('/setting');

  const [isCustomerOpen, setIsCustomerOpen] = React.useState(isCustomerActive);
  const [isSlotsOpen, setIsSlotsOpen] = React.useState(isSlotsActive);
  const [isSettingOpen, setIsSettingOpen] = React.useState(isSettingActive);


  return (
    <div className='side-bar admin-sidebar bg-[#0F2446] text-white px-[20px] py-4 min-h-screen h-full'>
      <aside>
        <div className="py-5 mb-4  text-center">
          <Link to="/" className="a-logo"><img src={Logo} className="h-[30px] mx-auto" alt="Logo" /></Link>
        </div>
        <ul className="space-y-2">
          <li className='mb-3 lg:mb-4'>
            <NavLink to="/admin/dashboard" className={({ isActive }) => `group flex gap-3 items-center py-[10px] px-[15px] rounded-[10px] hover:bg-[#FF5C1A] transition-all duration-300 ease-in-out lg:pl-[20px] ${isActive ? "bg-[#FF5C1A]" : ""}`}>
              {({ isActive }) => (
                <>
                  <div className="icon">
                    <img src={Dashboard} alt="Dashboard" className={`w-6 h-6 ${isActive ? "hidden" : "block"} group-hover:hidden`} />
                    <img src={DashboardActive} alt="Dashboard Active" className={`w-6 h-6 ${isActive ? "block" : "hidden"} group-hover:block`} />
                  </div>
                  <span className={`text-[#969CB9] text-[13px] font-light ${isActive ? "font-semibold text-white" : ""}`}>Dashboard</span>
                </>
              )}
            </NavLink>
          </li>
          <li className='mb-3 lg:mb-4'>
            <NavLink to="/admin/vendor/list" className={({ isActive }) => `group flex gap-3 items-center py-[10px] px-[15px] rounded-[10px] hover:bg-[#FF5C1A] transition-all duration-300 ease-in-out lg:pl-[20px] ${isActive ? "bg-[#FF5C1A]" : ""}`}>
              {({ isActive }) => (
                <>
                  <div className="icon">
                    <img src={Vendors} alt="Vendors" className={`w-6 h-6 ${isActive ? "hidden" : "block"} group-hover:hidden`} />
                    <img src={VendorsActive} alt="Vendors Active" className={`w-6 h-6 ${isActive ? "block" : "hidden"} group-hover:block`} />
                  </div>
                  <span className={`text-[#969CB9] text-[13px] font-light ${isActive ? "font-semibold text-white" : ""}`}>Vendors</span>
                </>
              )}
            </NavLink>
          </li>
          <li className='mb-3 lg:mb-4'>
            <NavLink to="/admin/packages-list" className={({ isActive }) => `group flex gap-3 items-center py-[10px] px-[15px] rounded-[10px] hover:bg-[#FF5C1A] transition-all duration-300 ease-in-out lg:pl-[20px] ${isActive ? "bg-[#FF5C1A]" : ""}`}>
              {({ isActive }) => (
                <>
                  <div className="icon">
                    <img src={Packages} alt="Vendors" className={`w-6 h-6 ${isActive ? "hidden" : "block"} group-hover:hidden`} />
                    <img src={PackagesActive} alt="Vendors Active" className={`w-6 h-6 ${isActive ? "block" : "hidden"} group-hover:block`} />
                  </div>
                  <span className={`text-[#969CB9] text-[13px] font-light ${isActive ? "font-semibold text-white" : ""}`}>Packages</span>
                </>
              )}
            </NavLink>
          </li>
          <li className='mb-3 lg:mb-4'>
            <div onClick={() => setIsSlotsOpen(!isSlotsOpen)} className={`group flex gap-3 items-center py-[10px] px-[15px] rounded-[10px] hover:bg-[#FF5C1A] transition-all duration-300 ease-in-out lg:pl-[20px] cursor-pointer ${(isSlotsOpen || isSlotsActive) ? "bg-[#FF5C1A]" : ""}`}>
              <div className="icon">
                <img src={Slots} alt="Slots" className={`w-6 h-6 ${(isSlotsOpen || isSlotsActive) ? "hidden" : "block"} group-hover:hidden`} />
                <img src={SlotsActive} alt="Slots Active" className={`w-6 h-6 ${(isSlotsOpen || isSlotsActive) ? "block" : "hidden"} group-hover:block`} />
              </div>
              <span className={`text-[#969CB9] text-[13px] font-light flex-1 ${(isSlotsOpen || isSlotsActive) ? "font-semibold text-white" : ""}`}>Slots</span>
              <svg className={`w-4 h-4 transition-transform ${isSlotsOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
            {isSlotsOpen && (
              <ul className="sub-menu mt-2 space-y-1">
                <li>
                  <NavLink to="/slot/admin-all-slots/" className={({ isActive }) => `block py-2 pl-[20px] text-[13px] transition-colors ${isActive ? "text-[#D9D9D9] bg-[#1B3969] font-semibold border-1 rounded-[10px] border-[#FF5C1A]" : "text-[#969CB9] hover:text-white"}`}>
                    All Slots
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/slot/day-schedule/" className={({ isActive }) => `block py-2 pl-[20px] text-[13px] transition-colors ${isActive ? "text-[#D9D9D9] bg-[#1B3969] font-semibold border-1 rounded-[10px] border-[#FF5C1A]" : "text-[#969CB9] hover:text-white"}`}>
                    Day Schedule
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
          <li className='mb-3 lg:mb-4'>
            <NavLink to="/admin/bookings-list" className={({ isActive }) => `group flex gap-3 items-center py-[10px] px-[15px] rounded-[10px] hover:bg-[#FF5C1A] transition-all duration-300 ease-in-out lg:pl-[20px] ${isActive ? "bg-[#FF5C1A]" : ""}`}>
              {({ isActive }) => (
                <>
                  <div className="icon">
                    <img src={Bookings} alt="Vendors" className={`w-6 h-6 ${isActive ? "hidden" : "block"} group-hover:hidden`} />
                    <img src={BookingsActive} alt="Vendors Active" className={`w-6 h-6 ${isActive ? "block" : "hidden"} group-hover:block`} />
                  </div>
                  <span className={`text-[#969CB9] text-[13px] font-light ${isActive ? "font-semibold text-white" : ""}`}>Bookings</span>
                </>
              )}
            </NavLink>
          </li>
          <li className='mb-3 lg:mb-4'>
            <div
              onClick={() => setIsCustomerOpen(!isCustomerOpen)}
              className={`group flex gap-3 items-center py-[10px] px-[15px] rounded-[10px] hover:bg-[#FF5C1A] transition-all duration-300 ease-in-out lg:pl-[20px] cursor-pointer ${(isCustomerOpen || isCustomerActive) ? "bg-[#FF5C1A]" : ""}`}>
              <div className="icon">
                <img src={Customers} alt="Customers" className={`w-6 h-6 ${(isCustomerOpen || isCustomerActive) ? "hidden" : "block"} group-hover:hidden`} />
                <img src={CustomersActive} alt="Customers Active" className={`w-6 h-6 ${(isCustomerOpen || isCustomerActive) ? "block" : "hidden"} group-hover:block`} />
              </div>
              <span className={`text-[#969CB9] text-[13px] font-light flex-1 ${(isCustomerOpen || isCustomerActive) ? "font-semibold text-white" : ""}`}>Customers</span>
              <svg className={`w-4 h-4 transition-transform ${isCustomerOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
            {isCustomerOpen && (
              <ul className="sub-menu mt-2 space-y-1">
                <li>
                  <NavLink to="/admin/all-customer" className={({ isActive }) => `block pl-[20px] py-2 text-[13px] transition-colors ${isActive ? "text-[#D9D9D9] bg-[#1B3969] font-semibold border-1 rounded-[10px] border-[#FF5C1A]" : "text-[#969CB9] hover:text-white"}`}>
                    All Customers
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/admin/users" className={({ isActive }) => `block pl-[20px] py-2 text-[13px] transition-colors ${isActive ? "text-[#D9D9D9] bg-[#1B3969] font-semibold border-1 rounded-[10px] border-[#FF5C1A]" : "text-[#969CB9] hover:text-white"}`}>
                    Users
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/admin/enquiries" className={({ isActive }) => `block pl-[20px] py-2 text-[13px] transition-colors ${isActive ? "text-[#D9D9D9] bg-[#1B3969] font-semibold border-1 rounded-[10px] border-[#FF5C1A]" : "text-[#969CB9] hover:text-white"}`}>
                    Enquiries
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
          <li className='mb-3 lg:mb-4'>
            <NavLink to="/admin/notifications-list" className={({ isActive }) => `group flex gap-3 items-center py-[10px] px-[15px] rounded-[10px] hover:bg-[#FF5C1A] transition-all duration-300 ease-in-out lg:pl-[20px] ${isActive ? "bg-[#FF5C1A]" : ""}`}>
              {({ isActive }) => (
                <>
                  <div className="icon">
                    <img src={Notifications} alt="Vendors" className={`w-6 h-6 ${isActive ? "hidden" : "block"} group-hover:hidden`} />
                    <img src={NotificationsActive} alt="Vendors Active" className={`w-6 h-6 ${isActive ? "block" : "hidden"} group-hover:block`} />
                  </div>
                  <span className={`text-[#969CB9] text-[13px] font-light ${isActive ? "font-semibold text-white" : ""}`}>Notifications</span>
                </>
              )}
            </NavLink>
          </li>
          <li className='mb-3 lg:mb-4'>
            <div
              onClick={() => setIsSettingOpen(!isSettingOpen)}
              className={`group flex gap-3 items-center py-[10px] px-[15px] rounded-[10px] hover:bg-[#FF5C1A] transition-all duration-300 ease-in-out lg:pl-[20px] cursor-pointer ${(isSettingOpen || isSettingActive) ? "bg-[#FF5C1A]" : ""}`}>
              <div className="icon">
                <img src={Settings} alt="Settings" className={`w-6 h-6 ${(isSettingOpen || isSettingActive) ? "hidden" : "block"} group-hover:hidden`} />
                <img src={SettingsActive} alt="Settings Active" className={`w-6 h-6 ${(isSettingOpen || isSettingActive) ? "block" : "hidden"} group-hover:block`} />
              </div>
              <span className={`text-[#969CB9] text-[13px] font-light flex-1 ${(isSettingOpen || isSettingActive) ? "font-semibold text-white" : ""}`}>Settings</span>
              <svg className={`w-4 h-4 transition-transform ${isSettingOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
            {isSettingOpen && (
              <ul className="sub-menu mt-2 space-y-1">
                <li>
                  <NavLink to="/admin/setting/categories" className={({ isActive }) => `block py-2 pl-[20px] text-[13px] transition-colors ${isActive ? "text-[#D9D9D9] bg-[#1B3969] font-semibold border-1 rounded-[10px] border-[#FF5C1A]" : "text-[#969CB9] hover:text-white"}`}>
                    Categories
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/admin/setting/content-management" className={({ isActive }) => `block py-2 pl-[20px] text-[13px] transition-colors ${isActive ? "text-[#D9D9D9] bg-[#1B3969] font-semibold border-1 rounded-[10px] border-[#FF5C1A]" : "text-[#969CB9] hover:text-white"}`}>
                    Content Management
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
          <li className='mb-3 lg:mb-4'>
            <NavLink to="/admin/payments-list" className={({ isActive }) => `group flex gap-3 items-center py-[10px] px-[15px] rounded-[10px] hover:bg-[#FF5C1A] transition-all duration-300 ease-in-out lg:pl-[20px] ${isActive ? "bg-[#FF5C1A]" : ""}`}>
              {({ isActive }) => (
                <>
                  <div className="icon">
                    <img src={Payments} alt="Vendors" className={`w-6 h-6 ${isActive ? "hidden" : "block"} group-hover:hidden`} />
                    <img src={PaymentsActive} alt="Vendors Active" className={`w-6 h-6 ${isActive ? "block" : "hidden"} group-hover:block`} />
                  </div>
                  <span className={`text-[#969CB9] text-[13px] font-light ${isActive ? "font-semibold text-white" : ""}`}>Payments</span>
                </>
              )}
            </NavLink>
          </li>
        </ul>
      </aside>
    </div>
  )
}

export default Slidebar