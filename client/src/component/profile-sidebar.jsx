import React from 'react'
import { NavLink } from 'react-router-dom'
import Avatar from '../assets/icons/avatar.png'
import UpcomingIcon from '../assets/icons/upcoming_booking.svg'
import HistoryIcon from '../assets/icons/booking_history.svg'
import CartIcon from '../assets/icons/profile_cart.svg'
import SavedIcon from '../assets/icons/saved_experiences.svg'
import EditIcon from '../assets/icons/edit _profile.svg'
import LogoutIcon from '../assets/icons/web_logout.svg'

function ProfileSidebar() {
  return (
    <div className='slider_part'>
      <h1 className='text-[clamp(32px,5vw,56px)] mb-3'>My Account</h1>
      <div className="card bg-[#122544] rounded-[18px] px-[10px] pt-[20px] pb-[22px] text-white w-full">
        <div className="profile-header flex gap-3 bg-[url('/images/background_frame.svg')] bg-no-repeat bg-cover p-[18px_16px] rounded-[14px] w-full mb-3 lg:mb-5">
          <div className="img-card w-[64px] h-[64px]">
            <img className='w-full h-full object-cover' src={Avatar} alt="user" />
          </div>
          <div className='block'>
            <div className='text-[16px] font-bold mb-[4px]'>user_+919072242643</div>
            <div className='text-[10px] text-[#B8CDF2] opacity-90 mb-0'>9072242643</div>
          </div>
        </div>
        <div className="profile-body">
          <ul>
            <li className="relative after:content-[''] after:absolute after:left-[7px] after:right-0 after:bottom-0 after:h-px after:bg-white/10 last:after:hidden">
              <NavLink to="/profile" end className={({ isActive }) =>
                `flex gap-3 items-center px-[12px] py-[10px] rounded-[10px] mb-[4px] text-[15px] no-underline transition-[background,color,box-shadow] duration-200 ease-in-out
                ${isActive
                  ? "bg-[#ff6a00] text-white font-semibold shadow-[0_10px_24px_rgba(0,0,0,0.35)] relative"
                  : "text-[#e1e7ff] hover:bg-[rgba(255,255,255,0.08)] hover:text-white"
                }`
              }>
                <span className="w-5 h-5 flex items-center justify-center">
                  <img src={UpcomingIcon} alt="Upcoming booking" />
                </span>
                <span>Upcoming Booking</span>
              </NavLink>
            </li>
            <li className="relative after:content-[''] after:absolute after:left-[7px] after:right-0 after:bottom-0 after:h-px after:bg-white/10 last:after:hidden">
              <NavLink to="/booking-history" className={({ isActive }) =>
                `flex gap-3 items-center px-[12px] py-[10px] rounded-[10px] mb-[4px] text-[15px] no-underline transition-[background,color,box-shadow] duration-200 ease-in-out
                ${isActive
                  ? "bg-[#ff6a00] text-white font-semibold shadow-[0_10px_24px_rgba(0,0,0,0.35)] relative"
                  : "text-[#e1e7ff] hover:bg-[rgba(255,255,255,0.08)] hover:text-white"
                }`
              }>
                <span className="w-5 h-5 flex items-center justify-center">
                  <img src={HistoryIcon} alt="Booking history" />
                </span>
                <span>Booking History</span>
              </NavLink>
            </li>
            <li className="relative after:content-[''] after:absolute after:left-[7px] after:right-0 after:bottom-0 after:h-px after:bg-white/10 last:after:hidden">
              <NavLink to="/cart" className={({ isActive }) =>
                `flex gap-3 items-center px-[12px] py-[10px] rounded-[10px] mb-[4px] text-[15px] no-underline transition-[background,color,box-shadow] duration-200 ease-in-out
                ${isActive
                  ? "bg-[#ff6a00] text-white font-semibold shadow-[0_10px_24px_rgba(0,0,0,0.35)] relative"
                  : "text-[#e1e7ff] hover:bg-[rgba(255,255,255,0.08)] hover:text-white"
                }`
              }>
                <span className="w-5 h-5 flex items-center justify-center">
                  <img src={CartIcon} alt="Cart" />
                </span>
                <span>Cart</span>
              </NavLink>
            </li>
            <li className="relative after:content-[''] after:absolute after:left-[7px] after:right-0 after:bottom-0 after:h-px after:bg-white/10 last:after:hidden">
              <NavLink to="/saved-experiences" className={({ isActive }) =>
                `flex gap-3 items-center px-[12px] py-[10px] rounded-[10px] mb-[4px] text-[15px] no-underline transition-[background,color,box-shadow] duration-200 ease-in-out
                ${isActive
                  ? "bg-[#ff6a00] text-white font-semibold shadow-[0_10px_24px_rgba(0,0,0,0.35)] relative"
                  : "text-[#e1e7ff] hover:bg-[rgba(255,255,255,0.08)] hover:text-white"
                }`
              }>
                <span className="w-5 h-5 flex items-center justify-center">
                  <img src={SavedIcon} alt="Saved experiences" />
                </span>
                <span>Saved Experiences</span>
              </NavLink>
            </li>
            <li className="relative after:content-[''] after:absolute after:left-[7px] after:right-0 after:bottom-0 after:h-px after:bg-white/10 last:after:hidden">
              <NavLink to="/edit-profile" className={({ isActive }) =>
                `flex gap-3 items-center px-[12px] py-[10px] rounded-[10px] mb-[4px] text-[15px] no-underline transition-[background,color,box-shadow] duration-200 ease-in-out
                ${isActive
                  ? "bg-[#ff6a00] text-white font-semibold shadow-[0_10px_24px_rgba(0,0,0,0.35)] relative"
                  : "text-[#e1e7ff] hover:bg-[rgba(255,255,255,0.08)] hover:text-white"
                }`
              }>
                <span className="w-5 h-5 flex items-center justify-center">
                  <img src={EditIcon} alt="Edit profile" />
                </span>
                <span>Edit Profile</span>
              </NavLink>
            </li>
            <li className="relative after:content-[''] after:absolute after:left-[7px] after:right-0 after:bottom-0 after:h-px after:bg-white/10 last:after:hidden">
              <NavLink to="/logout" className={({ isActive }) =>
                `flex gap-3 items-center px-[12px] py-[10px] rounded-[10px] mb-[4px] text-[15px] no-underline transition-[background,color,box-shadow] duration-200 ease-in-out
                ${isActive
                  ? "bg-[#ff6a00] text-white font-semibold shadow-[0_10px_24px_rgba(0,0,0,0.35)] relative"
                  : "text-[#e1e7ff] hover:bg-[rgba(255,255,255,0.08)] hover:text-white"
                }`
              }>
                <span className="w-5 h-5 flex items-center justify-center">
                  <img src={LogoutIcon} alt="Logout" />
                </span>
                <span>Logout</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ProfileSidebar