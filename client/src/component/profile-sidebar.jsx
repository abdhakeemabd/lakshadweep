import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Avatar from '../assets/icons/avatar.png'
import UpcomingIcon from '../assets/icons/upcoming_booking.svg'
import HistoryIcon from '../assets/icons/booking_history.svg'
import CartIcon from '../assets/icons/profile_cart.svg'
import SavedIcon from '../assets/icons/saved_experiences.svg'
import EditIcon from '../assets/icons/edit _profile.svg'
import LogoutIcon from '../assets/icons/web_logout.svg'
import ResUpcomingIcon from '../assets/icons/res_upcoming.svg'
import ResHistoryIcon from '../assets/icons/res_booking_historty.svg'
import ResCartIcon from '../assets/icons/res-cart.svg'
import ResSavedIcon from '../assets/icons/res_saved.svg'
import ResLogoutIcon from '../assets/icons/res-logout.svg'

function ProfileSidebar() {
  const navigate = useNavigate();
  const phoneNumber = sessionStorage.getItem('phoneNumber') || '';

  const handleLogout = () => {
    sessionStorage.removeItem('sessionId');
    sessionStorage.removeItem('phoneNumber');
    window.dispatchEvent(new Event('authChange'));
    navigate('/');
  }
  return (
    <div className='slider_part'>
      <div className="lg:hidden flex items-center justify-between px-4 py-8 bg-[#122544] text-white">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-1">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <h1 className="text-[17px] font-medium">My Account</h1>
        </div>
        <NavLink to="/profile-edit" className="p-1">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </NavLink>
      </div>

      <h1 className='hidden lg:block text-[clamp(32px,4.5vw,46px)] font-medium mb-3'>My Account</h1>
      <div className="card bg-white lg:bg-[#122544] rounded-none lg:rounded-[18px] px-0 lg:px-[10px] pt-0 lg:pt-[20px] pb-0 lg:pb-[22px] text-[#0F2446] lg:text-white w-full">
        <div className="profile-header flex gap-3 bg-[#122544] lg:bg-[url('/images/background_frame.svg')] bg-no-repeat bg-cover p-5 lg:p-[18px_16px] rounded-0 lg:rounded-[14px] w-full mb-0 lg:mb-5 relative overflow-hidden">
          <div className="lg:hidden absolute -right-10 -top-10 w-44 h-44 border border-white/10 rounded-full"></div>
          <div className="lg:hidden absolute -right-5 -top-5 w-44 h-44 border border-white/10 rounded-full"></div>
          <div className="lg:hidden absolute right-0 top-0 w-44 h-44 border border-white/10 rounded-full"></div>

          <div className="img-card w-[64px] h-[64px] lg:w-[64px] lg:h-[64px] z-10 relative">
            <img className='w-full h-full object-cover rounded-full border-2 border-white/20' src={Avatar} alt="user" />
          </div>
          <div className='block z-10 text-white'>
            <div className='text-[14px] lg:text-[16px] opacity-80 mb-0 lg:mb-[4px]'>Hello, Good Evening</div>
            <div className='text-[18px] lg:text-[16px] font-bold'>user_{phoneNumber}</div>
          </div>
        </div>
        <div className="profile-body px-4 lg:px-0 mt-6 lg:mt-0">
          <ul>
            <li className="relative after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-px after:bg-gray-100 lg:after:bg-white/10 last:after:hidden">
              <NavLink to="/upcoming-bookings" className={({ isActive }) =>
                `flex gap-3 items-center px-0 lg:px-[12px] py-[15px] lg:py-[10px] rounded-[10px] mb-0 lg:mb-[4px] text-[16px] lg:text-[15px] no-underline transition-all duration-200
                ${isActive
                  ? "lg:bg-[#ff6a00] text-[#ff6a00] lg:text-white font-semibold lg:shadow-[0_10px_24px_rgba(0,0,0,0.35)]"
                  : "text-[#0F2446] lg:text-[#e1e7ff] hover:bg-gray-50 lg:hover:bg-[rgba(255,255,255,0.08)] hover:text-[#ff6a00] lg:hover:text-white"
                }`
              }>
                <span className="w-6 h-6 lg:w-5 lg:h-5 flex items-center justify-center">
                  <img src={UpcomingIcon} alt="Upcoming" className="hidden lg:block" />
                  <img src={ResUpcomingIcon} alt="Upcoming" className="lg:hidden" />
                </span>
                <span>Upcoming Booking</span>
              </NavLink>
            </li>
            <li className="relative after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-px after:bg-gray-100 lg:after:bg-white/10 last:after:hidden">
              <NavLink to="/booking-history" className={({ isActive }) =>
                `flex gap-3 items-center px-0 lg:px-[12px] py-[15px] lg:py-[10px] rounded-[10px] mb-0 lg:mb-[4px] text-[16px] lg:text-[15px] no-underline transition-all duration-200
                ${isActive
                  ? "lg:bg-[#ff6a00] text-[#ff6a00] lg:text-white font-semibold lg:shadow-[0_10px_24px_rgba(0,0,0,0.35)]"
                  : "text-[#0F2446] lg:text-[#e1e7ff] hover:bg-gray-50 lg:hover:bg-[rgba(255,255,255,0.08)] hover:text-[#ff6a00] lg:hover:text-white"
                }`
              }>
                <span className="w-6 h-6 lg:w-5 lg:h-5 flex items-center justify-center">
                  <img src={HistoryIcon} alt="History" className="hidden lg:block" />
                  <img src={ResHistoryIcon} alt="History" className="lg:hidden" />
                </span>
                <span>Booking History</span>
              </NavLink>
            </li>
            <li className="relative after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-px after:bg-gray-100 lg:after:bg-white/10 last:after:hidden">
              <NavLink to="/cart" className={({ isActive }) =>
                `flex gap-3 items-center px-0 lg:px-[12px] py-[15px] lg:py-[10px] rounded-[10px] mb-0 lg:mb-[4px] text-[16px] lg:text-[15px] no-underline transition-all duration-200
                ${isActive
                  ? "lg:bg-[#ff6a00] text-[#ff6a00] lg:text-white font-semibold lg:shadow-[0_10px_24px_rgba(0,0,0,0.35)]"
                  : "text-[#0F2446] lg:text-[#e1e7ff] hover:bg-gray-50 lg:hover:bg-[rgba(255,255,255,0.08)] hover:text-[#ff6a00] lg:hover:text-white"
                }`
              }>
                <span className="w-6 h-6 lg:w-5 lg:h-5 flex items-center justify-center">
                  <img src={CartIcon} alt="Cart" className="hidden lg:block" />
                  <img src={ResCartIcon} alt="Cart" className="lg:hidden" />
                </span>
                <span>Cart</span>
              </NavLink>
            </li>
            <li className="relative after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-px after:bg-gray-100 lg:after:bg-white/10 last:after:hidden">
              <NavLink to="/saved-experiences" className={({ isActive }) =>
                `flex gap-3 items-center px-0 lg:px-[12px] py-[15px] lg:py-[10px] rounded-[10px] mb-0 lg:mb-[4px] text-[16px] lg:text-[15px] no-underline transition-all duration-200
                ${isActive
                  ? "lg:bg-[#ff6a00] text-[#ff6a00] lg:text-white font-semibold lg:shadow-[0_10px_24px_rgba(0,0,0,0.35)]"
                  : "text-[#0F2446] lg:text-[#e1e7ff] hover:bg-gray-50 lg:hover:bg-[rgba(255,255,255,0.08)] hover:text-[#ff6a00] lg:hover:text-white"
                }`
              }>
                <span className="w-6 h-6 lg:w-5 lg:h-5 flex items-center justify-center">
                  <img src={SavedIcon} alt="Saved" className="hidden lg:block" />
                  <img src={ResSavedIcon} alt="Saved" className="lg:hidden" />
                </span>
                <span>Saved Experiences</span>
              </NavLink>
            </li>
            <li className="hidden lg:block relative after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-px after:bg-white/10 last:after:hidden">
              <NavLink to="/profile-edit" className={({ isActive }) =>
                `flex gap-3 items-center px-[12px] py-[10px] rounded-[10px] mb-[4px] text-[15px] no-underline transition-[background,color,box-shadow] duration-200 ease-in-out
                ${isActive
                  ? "bg-[#ff6a00] text-white font-semibold shadow-[0_10px_24px_rgba(0,0,0,0.35)] relative"
                  : "text-[#0F2446] lg:text-[#e1e7ff] hover:bg-[rgba(255,255,255,0.08)] hover:text-white"
                }`
              }>
                <span className="w-5 h-5 flex items-center justify-center">
                  <img src={EditIcon} alt="Edit profile" />
                </span>
                <span>Edit Profile</span>
              </NavLink>
            </li>
            <li className="relative after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-px after:bg-gray-100 lg:after:bg-white/10 last:after:hidden">
              <button type="button" onClick={handleLogout} className="flex w-full gap-3 items-center px-0 lg:px-[12px] py-[15px] lg:py-[10px] rounded-[10px] mb-0 lg:mb-[4px] text-[16px] lg:text-[15px] no-underline transition-all duration-200 text-[#0F2446] lg:text-[#e1e7ff] hover:bg-gray-50 lg:hover:bg-[rgba(255,255,255,0.08)] hover:text-[#ff6a00] lg:hover:text-white">
                <span className="w-6 h-6 lg:w-5 lg:h-5 flex items-center justify-center">
                  <img src={LogoutIcon} alt="Logout" className="hidden lg:block" />
                  <img src={ResLogoutIcon} alt="Logout" className="lg:hidden" />
                </span>
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ProfileSidebar