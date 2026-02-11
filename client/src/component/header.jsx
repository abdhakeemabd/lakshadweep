import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/logo/logo.svg'
import CartIcon from '../assets/icons/cart.svg'
import Home from '../assets/icons/home.svg'
import HeartIcon from '../assets/icons/blackheart.svg'
import NotificationIcon from '../assets/icons/notification.svg'
import MenuIcon from '../assets/icons/menu-icon.svg'
import LoginModal from './login-modal'

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }
  return (
    <>
      <header className="header sticky top-0 z-50 py-4 bg-white shadow-md w-full absolute">
        <div className="container m-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Link to="/" className="flex items-center">
                <img src={Logo} alt="Logo" className="w-auto object-contain hover:scale-105 transition-transform duration-300 sm:h-7 md:h-8 lg:h-10" />
              </Link>
            </div>
            <nav className="hidden lg:flex items-center gap-6">
              <Link to="/" className="relative text-gray-800 font-medium text-base transition-all duration-300 after:transition-all after:duration-300 hover:after:w-full"> Home</Link>
              <Link to="/" className="relative text-gray-800 font-medium text-base transition-all duration-300 after:transition-all after:duration-300 hover:after:w-full"> Packages</Link>
            </nav>
            <div className="hidden lg:flex justify-end items-center gap-2">
              <button aria-label="Shopping Cart" className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center">
                <img src={CartIcon} alt="cart" className="h-auto w-auto" />
              </button>
              <button aria-label="Wishlist" className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center">
                <img src={HeartIcon} alt="heart" className="h-auto w-auto" />
              </button>
              <button aria-label="Notifications" className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center">
                <img src={NotificationIcon} alt="notification" className="h-auto w-auto" />
              </button>
              <button command="show-modal" commandfor="dialog" className="min-w-[96px] h-[36px] text-[14px] leading-[11px] font-medium text-white bg-gradient-to-br from-[#20212B] to-[#16171F] rounded-[8px] hover:shadow-lg transition-shadow duration-300 cursor-pointer">Join now</button>
            </div>
            <div className="flex lg:hidden items-center gap-3">
              <button command="show-modal" commandfor="dialog" className="min-w-[80px] h-[32px] text-[12px] font-medium text-white bg-gradient-to-br from-[#20212B] to-[#16171F] rounded-[8px] cursor-pointer">Join now</button>
              <button onClick={toggleMobileMenu} aria-label="Toggle Menu" className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-300">
                <img src={MenuIcon} alt="menu" className="h-6 w-auto" />
              </button>
            </div>
          </div>
        </div>
      </header>
      <div className={`fixed top-0 right-0 h-full w-[280px] bg-white shadow-2xl z-[70] lg:hidden transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="flex justify-end items-center p-4">
            <button onClick={toggleMobileMenu} aria-label="Close Menu" className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-300">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className="flex flex-col gap-2 py-4 flex-1 overflow-y-auto">
            <div className="pt-3">
              <div className="flex flex-col gap-3">
                <button onClick={() => setIsMobileMenuOpen(false)} command="show-modal" commandfor="dialog" className="px-3 py-2 h-[41px] text-[14px] font-medium text-white bg-gradient-to-br from-[#20212B] to-[#16171F] rounded-[8px] mx-6 cursor-pointer">Sign In</button>
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 py-3 px-6 hover:bg-gray-50 transition-all duration-300 border-b border-[#E3E3E3]">
                  <img src={Home} alt="home" className="h-auto w-auto" />
                  <span className="text-gray-800 font-medium">Home</span>
                </Link>
                <Link to="/packages" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 py-3 px-6 hover:bg-gray-50 transition-all duration-300 border-b border-[#E3E3E3]">
                  <img src={CartIcon} alt="cart" className="h-auto w-auto" />
                  <span className="text-gray-800 font-medium">Cart</span>
                </Link>
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 py-3 px-6 hover:bg-gray-50 transition-all duration-300 border-b border-[#E3E3E3]">
                  <img src={HeartIcon} alt="wishlist" className="h-a w-auto" />
                  <span className="text-gray-800 font-medium">Whishlist</span>
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </div>
      <LoginModal />
    </>
  )
}

export default Header