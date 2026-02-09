import React from 'react'
import { Link, NavLink } from 'react-router-dom'
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
            <NavLink to="/admin/slots-list" className={({ isActive }) => `group flex gap-3 items-center py-[10px] px-[15px] rounded-[10px] hover:bg-[#FF5C1A] transition-all duration-300 ease-in-out lg:pl-[20px] ${isActive ? "bg-[#FF5C1A]" : ""}`}>
              {({ isActive }) => (
                <>
                  <div className="icon">
                    <img src={Slots} alt="Vendors" className={`w-6 h-6 ${isActive ? "hidden" : "block"} group-hover:hidden`} />
                    <img src={SlotsActive} alt="Vendors Active" className={`w-6 h-6 ${isActive ? "block" : "hidden"} group-hover:block`} />
                  </div>
                  <span className={`text-[#969CB9] text-[13px] font-light ${isActive ? "font-semibold text-white" : ""}`}>Slots</span>
                </>
              )}
            </NavLink>
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
            <NavLink to="/admin/customers-list" className={({ isActive }) => `group flex gap-3 items-center py-[10px] px-[15px] rounded-[10px] hover:bg-[#FF5C1A] transition-all duration-300 ease-in-out lg:pl-[20px] ${isActive ? "bg-[#FF5C1A]" : ""}`}>
              {({ isActive }) => (
                <>
                  <div className="icon">
                    <img src={Customers} alt="Vendors" className={`w-6 h-6 ${isActive ? "hidden" : "block"} group-hover:hidden`} />
                    <img src={CustomersActive} alt="Vendors Active" className={`w-6 h-6 ${isActive ? "block" : "hidden"} group-hover:block`} />
                  </div>
                  <span className={`text-[#969CB9] text-[13px] font-light ${isActive ? "font-semibold text-white" : ""}`}>Customers</span>
                </>
              )}
            </NavLink>
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
            <NavLink to="/admin/settings-list" className={({ isActive }) => `group flex gap-3 items-center py-[10px] px-[15px] rounded-[10px] hover:bg-[#FF5C1A] transition-all duration-300 ease-in-out lg:pl-[20px] ${isActive ? "bg-[#FF5C1A]" : ""}`}>
              {({ isActive }) => (
                <>
                  <div className="icon">
                    <img src={Settings} alt="Vendors" className={`w-6 h-6 ${isActive ? "hidden" : "block"} group-hover:hidden`} />
                    <img src={SettingsActive} alt="Vendors Active" className={`w-6 h-6 ${isActive ? "block" : "hidden"} group-hover:block`} />
                  </div>
                  <span className={`text-[#969CB9] text-[13px] font-light ${isActive ? "font-semibold text-white" : ""}`}>Settings</span>
                </>
              )}
            </NavLink>
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