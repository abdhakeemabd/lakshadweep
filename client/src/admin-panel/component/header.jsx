import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserIcon from "../../assets/admin-panel-icon/icons/user-default.svg";
import PasswordIcon from "../../assets/admin-panel-icon/icons/password-check.svg";
import LogoutIcon from "../../assets/admin-panel-icon/icons/logout.svg";
import LogoutModal from "./logout-modal";

function Header() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    setOpen(false);
    navigate('/admin/login');
  };

  // close dropdown on outside click
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
    <header className="bg-[#0F2446] relative z-[100] w-full px-[13px] rounded-[0.832rem] backdrop-blur-[121.76px] shadow-[0px_48.7px_48.7px_-41.35px_#290F008F] py-3 mb-3">
      <div className="grid grid-cols-12 gap-6 items-center">
        <div className="col-span-12 lg:col-span-3">
        </div>
        <div className="col-span-12 lg:col-span-9 justify-end">
          <div className="flex justify-end">
            <div className="relative justify-end">
              <button onClick={() => setOpen(!open)} className="grid grid-cols-[auto_auto_auto] items-center gap-2 px-3 py-1 transition">
                <span className="text-xs font-medium text-white">Admin</span>
                <img src={UserIcon} alt="User" className="w-7 h-7 rounded-full" />
                <i className={`fa fa-angle-down transition ${open ? "rotate-180" : ""}`} />
              </button>
              {open && (
                <ul className="absolute right-0 mt-2 w-56 rounded-xl bg-white shadow-lg border border-gray-200 overflow-hidden z-50">
                  <li className="border-b border-[#E2E2E2]">
                    <button command="show-modal" commandfor="dialogout" className="w-full flex gap-3 items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition">
                      <img src={PasswordIcon} alt="Password" className="w-5 h-5" />
                      Change password
                    </button>
                  </li>
                  <li>
                    <button onClick={handleLogout} className="w-full flex gap-3 items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition">
                      <img src={LogoutIcon} alt="Logout" className="w-5 h-5" />
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
    <LogoutModal />
    </>
  );
}

export default Header;
