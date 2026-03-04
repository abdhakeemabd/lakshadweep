import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/logo/logo.svg'
import CartIcon from '../assets/icons/cart.svg'
import Home from '../assets/icons/home.svg'
import HeartIcon from '../assets/icons/blackheart.svg'
import NotificationIcon from '../assets/icons/notification.svg'
import MenuIcon from '../assets/icons/menu-icon.svg'
import UserIcon from "../assets/admin-panel-icon/icons/user-default.svg"
import LoginModal from './login-modal'
import RegisterModal from './register-modal'

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isNotifOpen, setIsNotifOpen] = useState(false)
  const notifRef = useRef(null)

  const notifications = [
    { id: 1, title: 'Booking Confirmed', message: 'Your package to Kalpeni is confirmed!', time: '2m ago', unread: true },
    { id: 2, title: 'New Offer', message: '20% off on Agatti island packages', time: '1h ago', unread: true },
    { id: 3, title: 'Payment Received', message: 'Payment of ₹4,500 received successfully', time: '3h ago', unread: false },
  ]

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setIsNotifOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])
  const [isLogin, setIsLogin] = useState(!!sessionStorage.getItem('sessionId'))
  const [cartCount, setCartCount] = useState(parseInt(sessionStorage.getItem('cartCount') || '2', 10))
  const [phoneNumber, setPhoneNumber] = useState(sessionStorage.getItem('phoneNumber') || '')
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }
  React.useEffect(() => {
    const handleStorageChange = () => {
      setIsLogin(!!sessionStorage.getItem('sessionId'))
      setPhoneNumber(sessionStorage.getItem('phoneNumber') || '')
      setCartCount(parseInt(sessionStorage.getItem('cartCount') || '2', 10))
    }
    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('authChange', handleStorageChange)
    window.addEventListener('cartChange', handleStorageChange)
    handleStorageChange()
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('authChange', handleStorageChange)
      window.removeEventListener('cartChange', handleStorageChange)
    }
  }, [])
  return (
    <>
      <header className="header sticky top-0 z-50 py-4 bg-white shadow-md w-full">
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
              <div className="relative">
                <Link to="/cart" aria-label="Shopping Cart" className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center">
                  <img src={CartIcon} alt="cart" className="h-auto w-auto" />
                </Link>
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 min-w-[18px] h-[18px] px-[4px] bg-[#1897FF] text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none pointer-events-none">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </div>
              <Link to="/saved-experiences" aria-label="Wishlist" className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center">
                <img src={HeartIcon} alt="heart" className="h-auto w-auto" />
              </Link>
              <div className="relative" ref={notifRef}>
                <button aria-label="Notifications" onClick={() => setIsNotifOpen(!isNotifOpen)} className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center relative">
                  <img src={NotificationIcon} alt="notification" className="h-auto w-auto" />
                  {notifications.some(n => n.unread) && (<span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>)}
                </button>
                {isNotifOpen && (
                  <div className="absolute right-0 mt-2 w-[320px] bg-white rounded-md shadow-2xl border border-gray-100 z-50 overflow-hidden animate-fade-in">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-[#dee2e6]">
                      <span className="text-[#312F2F] text-[20px] font-bold">Notifications</span>
                      <button onClick={() => setIsNotifOpen(false)} aria-label="Close Notifications" className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-300">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <ul className="max-h-[260px] overflow-y-auto divide-y divide-gray-50">
                      {notifications.map(notif => (
                        <li key={notif.id} className={`flex gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors duration-200 ${notif.unread ? 'bg-blue-50/40' : ''}`}>
                          <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${notif.unread ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[15px] font-semibold text-[#323232] leading-[18px]">{notif.title}</p>
                            <p className="text-[12px] text-[#5A5A5A] leading-[17px] truncate">{notif.message}</p>
                            <p className="text-[11px] text-[#7B7B7B] mt-0.5">{notif.time}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              {!isLogin ? (
                <button command="show-modal" commandfor="dialog" className="min-w-[96px] h-[36px] text-[14px] leading-[11px] font-medium text-white bg-gradient-to-br from-[#20212B] to-[#16171F] rounded-[8px] hover:shadow-lg transition-shadow duration-300 cursor-pointer">Join now</button>
              ) : (
                <Link to='/profile' className="w-[45px] h-[45px] rounded-full block border-2 border-transparent hover:border-gray-200 transition-all overflow-hidden" aria-label='User Inform'>
                  <img className='h-full w-full object-cover' src={UserIcon} alt="User" />
                </Link>
              )}
            </div>
            <div className="flex lg:hidden items-center gap-3">
              {!isLogin ? (
                <button command="show-modal" commandfor="dialog" className="min-w-[80px] h-[32px] text-[12px] font-medium text-white bg-gradient-to-br from-[#20212B] to-[#16171F] rounded-[8px] cursor-pointer">Join now</button>
              ) : (
                <Link to='/profile' className="w-[32px] h-[32px] rounded-full block border border-transparent hover:border-gray-200 transition-all overflow-hidden" aria-label='User Inform'>
                  <img className='h-full w-full object-cover' src={UserIcon} alt="User" />
                </Link>
              )}
              <button onClick={toggleMobileMenu} aria-label="Toggle Menu" className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-300">
                <img src={MenuIcon} alt="menu" className="h-6 w-auto" />
              </button>
            </div>
          </div>
        </div>
      </header>
      <div className={`fixed top-0 right-0 h-full w-[280px] bg-white shadow-2xl z-70 lg:hidden transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="flex justify-end items-center p-[4_4_0_4]">
            <button onClick={toggleMobileMenu} aria-label="Close Menu" className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-300">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className="flex flex-col gap-2 py-4 flex-1 overflow-y-auto">
            <div className="pt-3">
              <div className="flex flex-col gap-3">
                {!isLogin ? (
                  <button onClick={() => setIsMobileMenuOpen(false)} command="show-modal" commandfor="dialog" className="px-3 py-2 h-[41px] text-[14px] font-medium text-white bg-gradient-to-br from-[#20212B] to-[#16171F] rounded-[8px] mx-6 cursor-pointer">Sign In</button>
                ) : (
                  <Link to='/profile' onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 py-3 px-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-300 group" aria-label='User Profile'>
                    <div className="w-[51px] h-[51px] rounded-full overflow-hidden border-2 border-white shadow-sm group-hover:scale-105 transition-transform">
                      <img className='h-full w-full object-cover' src={UserIcon} alt="User" />
                    </div>
                    <div>
                      <div className="font-semibold text-base text-[#1B1B1B]">User Name </div>
                      <div className="font-medium text-xs text-[#FF0000]">{phoneNumber} </div>
                    </div>
                  </Link>
                )}
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
      <RegisterModal />
    </>
  )
}

export default Header