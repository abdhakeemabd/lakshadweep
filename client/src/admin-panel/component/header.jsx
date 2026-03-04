import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import UserIcon from "../../assets/admin-panel-icon/icons/user-default.svg";
import PasswordIcon from "../../assets/admin-panel-icon/icons/password-check.svg";
import LogoutIcon from "../../assets/admin-panel-icon/icons/logout.svg";
import LogoutModal from "./logout-modal";

function Header() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('isAdminAuthenticated');
    setOpen(false);
    navigate('/user/login');
  };

  const toggleMobileSidebar = () => {
    window.dispatchEvent(new CustomEvent('toggle-sidebar'));
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
    <header className="bg-[#0F2446] relative z-100 w-full px-[13px] rounded-[0.832rem] backdrop-blur-[121.76px] shadow-[0px_48.7px_48.7px_-41.35px_#290F008F] py-2 mb-3 lg:mb-5">
      <div className="flex items-center justify-between">
        <button onClick={toggleMobileSidebar} className="lg:hidden text-white hover:bg-white/10 rounded-lg transition-colors ms-1 cursor-pointer">
          <FiMenu size={28} />
        </button>
        <div className="flex-1 flex justify-end items-center">
          <div className="relative dropdown-container" ref={dropdownRef}>
            <button onClick={() => setOpen(!open)} className="flex items-center gap-2 px-3 py-1 transition group cursor-pointer">
              <span className="text-xs font-medium text-white group-hover:text-white/80 transition-colors">Admin</span>
              <img src={UserIcon} alt="User" className="w-8 h-8 rounded-full border border-white/20" />
              <svg 
                className={`w-4 h-4 text-white transition-transform duration-300 ${open ? "rotate-180" : ""}`} 
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            {open && (
              <ul className="absolute right-0 mt-2 w-56 rounded-xl bg-white shadow-xl border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <li className="border-b border-[#F0F0F0]">
                  <button 
                    onClick={() => setOpen(false)}
                    commandfor="change-password-modal" 
                    className="w-full flex gap-3 items-center px-4 py-3 text-[13px] text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <img src={PasswordIcon} alt="Password" className="w-5 h-5 opacity-70" />
                    Change password
                  </button>
                </li>
                <li>
                  <button onClick={handleLogout} className="w-full flex gap-3 items-center px-4 py-3 text-[13px] text-[#dc3545] hover:bg-red-50 transition-colors font-medium cursor-pointer">
                    <img src={LogoutIcon} alt="Logout" className="w-5 h-5" />
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </header>
    <LogoutModal />
    </>
  );
}

export default Header;
