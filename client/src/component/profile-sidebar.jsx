import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
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
      < div className="lg:hidden bg-[#122544] relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-44 h-44 border border-white/10 rounded-full pointer-events-none"></div>
        <div className="absolute -right-5 -top-5 w-44 h-44 border border-white/10 rounded-full pointer-events-none"></div>
        <div className="absolute right-0 top-0 w-44 h-44 border border-white/10 rounded-full pointer-events-none"></div>
        <div className="flex items-center justify-between px-4 pt-4 pb-8 text-white relative z-10">
          <Link to="/" className="flex items-center gap-2">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <h1 className="text-[17px] font-semibold tracking-wide">My Account</h1>
          </Link>
          <NavLink to="/profile-edit" className="p-1">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </NavLink>
        </div>
        <div className="flex items-center gap-4 px-5 pb-10 relative z-10">
          <div className="w-[60px] h-[60px] shrink-0">
            <img className="w-full h-full object-cover rounded-full border-2 border-white/30" src={Avatar} alt="user" />
          </div>
          <div className="text-white">
            <div className="text-[13px] opacity-75 mb-[3px]">Hello, Good Evening</div>
            <div className="text-[17px] font-bold">user_{phoneNumber}</div>
          </div>
        </div>
      </div>
      <h1 className='hidden lg:block text-[clamp(32px,4.5vw,46px)] font-medium mb-3'>My Account</h1>
      <div className="card hidden lg:block bg-[#122544] rounded-[18px] px-[10px] pt-[20px] pb-[22px] text-white w-full">
        <div className="profile-header flex gap-3 bg-[url('/images/background_frame.svg')] bg-no-repeat bg-cover p-[18px_16px] rounded-[14px] w-full mb-5 relative overflow-hidden">
          <div className="img-card w-[64px] h-[64px] z-10 relative">
            <img className='w-full h-full object-cover rounded-full border-2 border-white/20' src={Avatar} alt="user" />
          </div>
          <div className='block z-10 text-white'>
            <div className='text-[16px] opacity-80 mb-[4px]'>Hello, Good Evening</div>
            <div className='text-[16px] font-bold'>user_{phoneNumber}</div>
          </div>
        </div>
        <div className="profile-body px-0">
          <ul>
            <li className="relative after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-px after:bg-white/10 last:after:hidden">
              <NavLink to="/upcoming-bookings" className={({ isActive }) =>
                `flex gap-3 items-center px-[12px] py-[10px] rounded-[10px] mb-[4px] text-[15px] no-underline transition-all duration-200
                ${isActive ? "bg-[#ff6a00] text-white font-semibold shadow-[0_10px_24px_rgba(0,0,0,0.35)]" : "text-[#e1e7ff] hover:bg-[rgba(255,255,255,0.08)] hover:text-white"}`}>
                <span className="w-5 h-5 flex items-center justify-center"><img src={UpcomingIcon} alt="Upcoming" /></span>
                <span>Upcoming Booking</span>
              </NavLink>
            </li>
            <li className="relative after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-px after:bg-white/10 last:after:hidden">
              <NavLink to="/booking-history" className={({ isActive }) =>
                `flex gap-3 items-center px-[12px] py-[10px] rounded-[10px] mb-[4px] text-[15px] no-underline transition-all duration-200
                ${isActive ? "bg-[#ff6a00] text-white font-semibold shadow-[0_10px_24px_rgba(0,0,0,0.35)]" : "text-[#e1e7ff] hover:bg-[rgba(255,255,255,0.08)] hover:text-white"}`}>
                <span className="w-5 h-5 flex items-center justify-center"><img src={HistoryIcon} alt="History" /></span>
                <span>Booking History</span>
              </NavLink>
            </li>
            <li className="relative after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-px after:bg-white/10 last:after:hidden">
              <NavLink to="/cart" className={({ isActive }) =>
                `flex gap-3 items-center px-[12px] py-[10px] rounded-[10px] mb-[4px] text-[15px] no-underline transition-all duration-200
                ${isActive ? "bg-[#ff6a00] text-white font-semibold shadow-[0_10px_24px_rgba(0,0,0,0.35)]" : "text-[#e1e7ff] hover:bg-[rgba(255,255,255,0.08)] hover:text-white"}`}>
                <span className="w-5 h-5 flex items-center justify-center"><img src={CartIcon} alt="Cart" /></span>
                <span>Cart</span>
              </NavLink>
            </li>
            <li className="relative after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-px after:bg-white/10 last:after:hidden">
              <NavLink to="/saved-experiences" className={({ isActive }) =>
                `flex gap-3 items-center px-[12px] py-[10px] rounded-[10px] mb-[4px] text-[15px] no-underline transition-all duration-200
                ${isActive ? "bg-[#ff6a00] text-white font-semibold shadow-[0_10px_24px_rgba(0,0,0,0.35)]" : "text-[#e1e7ff] hover:bg-[rgba(255,255,255,0.08)] hover:text-white"}`}>
                <span className="w-5 h-5 flex items-center justify-center"><img src={SavedIcon} alt="Saved" /></span>
                <span>Saved Experiences</span>
              </NavLink>
            </li>
            <li className="relative after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-px after:bg-white/10 last:after:hidden">
              <NavLink to="/profile-edit" className={({ isActive }) =>
                `flex gap-3 items-center px-[12px] py-[10px] rounded-[10px] mb-[4px] text-[15px] no-underline transition-[background,color,box-shadow] duration-200 ease-in-out
                ${isActive ? "bg-[#ff6a00] text-white font-semibold shadow-[0_10px_24px_rgba(0,0,0,0.35)]" : "text-[#e1e7ff] hover:bg-[rgba(255,255,255,0.08)] hover:text-white"}`}>
                <span className="w-5 h-5 flex items-center justify-center"><img src={EditIcon} alt="Edit profile" /></span>
                <span>Edit Profile</span>
              </NavLink>
            </li>
            <li className="relative after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-px after:bg-white/10 last:after:hidden">
              <button type="button" onClick={handleLogout} className="flex w-full gap-3 items-center px-[12px] py-[10px] rounded-[10px] mb-[4px] text-[15px] no-underline transition-all duration-200 text-[#e1e7ff] hover:bg-[rgba(255,255,255,0.08)] hover:text-white">
                <span className="w-5 h-5 flex items-center justify-center"><img src={LogoutIcon} alt="Logout" /></span>
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="lg:hidden bg-white">
        <ul className="px-4 pt-3">
          <li className="relative after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-px after:bg-gray-100 last:after:hidden">
            <NavLink to="/upcoming-bookings" className={({ isActive }) =>
              `flex gap-4 items-center py-[16px] text-[15px] no-underline transition-all duration-200
              ${isActive ? "text-[#ff6a00] font-semibold" : "text-[#0F2446] hover:text-[#ff6a00]"}`}>
              <span className="w-6 h-6 shrink-0 flex items-center justify-center">
                <img src={ResUpcomingIcon} alt="Upcoming" className="w-5 h-5" />
              </span>
              <span>Upcoming Booking</span>
            </NavLink>
          </li>
          <li className="relative after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-px after:bg-gray-100 last:after:hidden">
            <NavLink to="/booking-history" className={({ isActive }) =>
              `flex gap-4 items-center py-[16px] text-[15px] no-underline transition-all duration-200
              ${isActive ? "text-[#ff6a00] font-semibold" : "text-[#0F2446] hover:text-[#ff6a00]"}`}>
              <span className="w-6 h-6 shrink-0 flex items-center justify-center">
                <img src={ResHistoryIcon} alt="History" className="w-5 h-5" />
              </span>
              <span>Booking History</span>
            </NavLink>
          </li>
          <li className="relative after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-px after:bg-gray-100 last:after:hidden">
            <NavLink to="/cart" className={({ isActive }) =>
              `flex gap-4 items-center py-[16px] text-[15px] no-underline transition-all duration-200
              ${isActive ? "text-[#ff6a00] font-semibold" : "text-[#0F2446] hover:text-[#ff6a00]"}`}>
              <span className="w-6 h-6 shrink-0 flex items-center justify-center">
                <img src={ResCartIcon} alt="Cart" className="w-5 h-5" />
              </span>
              <span>Cart</span>
            </NavLink>
          </li>
          <li className="relative after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-px after:bg-gray-100 last:after:hidden">
            <NavLink to="/saved-experiences" className={({ isActive }) =>
              `flex gap-4 items-center py-[16px] text-[15px] no-underline transition-all duration-200
              ${isActive ? "text-[#ff6a00] font-semibold" : "text-[#0F2446] hover:text-[#ff6a00]"}`}>
              <span className="w-6 h-6 shrink-0 flex items-center justify-center">
                <img src={ResSavedIcon} alt="Saved" className="w-5 h-5" />
              </span>
              <span>Saved Experiences</span>
            </NavLink>
          </li>
          <li className="relative after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-px after:bg-gray-100 last:after:hidden">
            <button type="button" onClick={handleLogout} className="flex w-full gap-4 items-center py-[16px] text-[15px] text-[#0F2446] transition-all duration-200 hover:text-[#ff6a00]">
              <span className="w-6 h-6 shrink-0 flex items-center justify-center">
                <img src={ResLogoutIcon} alt="Logout" className="w-5 h-5" />
              </span>
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}
export default ProfileSidebar
