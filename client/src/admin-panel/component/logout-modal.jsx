import React, { useState, useEffect } from 'react'
import Logo from '../../assets/logo/logo.svg'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'

function LogoutModal() {
  const [open, setOpen] = useState(false)
  const [showOld, setShowOld] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const handleCloseModal = () => {
    setOpen(false)
  }

  useEffect(() => {
    const handleGlobalClick = (e) => {
      const trigger = e.target.closest('[commandfor="change-password-modal"]')
      if (trigger) {
        setOpen(true)
      }
    }
    document.addEventListener('click', handleGlobalClick)
    return () => document.removeEventListener('click', handleGlobalClick)
  }, [])

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-1000">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/60 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
          <DialogPanel transition className="relative transform overflow-hidden rounded-[2.5rem] bg-white shadow-2xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-[502px] data-closed:sm:translate-y-0 data-closed:sm:scale-95">
            <div className="relative px-6 py-6 lg:py-10">
              <div className="relative flex flex-col items-center justify-center pb-8 border-b border-gray-100">
                <button type="button" className="absolute top-0 right-0 p-2 rounded-full text-gray-400 bg-gray-50 hover:bg-gray-100 hover:text-gray-900 transition-all duration-300 cursor-pointer hover:rotate-90 flex items-center justify-center" onClick={handleCloseModal} aria-label="Close">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-5">
                    <path d="M6 18 18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <img className="h-11 mb-4" src={Logo} alt="Logo" />
                <h2 className="text-xl font-bold text-gray-900">Change Password</h2>
              </div>
              <div className="mt-8 px-2">
                <form className="space-y-6 text-left" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label className="block text-[14px] font-medium text-[#3d3d3d] mb-2">Enter Old Password</label>
                    <div className="relative">
                      <input type={showOld ? 'text' : 'password'} placeholder="Enter your old password" className="w-full h-12 rounded-2xl border border-gray-200 px-4 pr-12 text-base focus:border-[#FF5C1A] focus:ring-1 focus:ring-[#FF5C1A] outline-none transition-all placeholder:text-gray-400" required autoComplete="current-password" />
                      <button type="button" onClick={() => setShowOld(!showOld)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        {showOld ? <FiEye size={20} /> : <FiEyeOff size={20} />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">New Password</label>
                    <div className="relative">
                      <input type={showNew ? 'text' : 'password'} placeholder="Enter new password" className="w-full h-12 rounded-2xl border border-gray-200 px-4 pr-12 text-base focus:border-[#FF5C1A] focus:ring-1 focus:ring-[#FF5C1A] outline-none transition-all placeholder:text-gray-400" required autoComplete="new-password" />
                      <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        {showNew ? <FiEye size={20} /> : <FiEyeOff size={20} />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Re-enter New Password</label>
                    <div className="relative">
                      <input type={showConfirm ? 'text' : 'password'} placeholder="Re-enter new password" className="w-full h-12 rounded-2xl border border-gray-200 px-4 pr-12 text-base focus:border-[#FF5C1A] focus:ring-1 focus:ring-[#FF5C1A] outline-none transition-all placeholder:text-gray-400" required autoComplete="new-password" />
                      <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        {showConfirm ? <FiEye size={20} /> : <FiEyeOff size={20} />}
                      </button>
                    </div>
                  </div>
                  <div className="pt-4">
                    <button type="submit" className="w-full h-12 text-white bg-[#FF5C1A] hover:bg-[#e64d00] text-base font-bold rounded-2xl shadow-[0_10px_20px_-10px_rgba(255,92,26,0.5)] transition-all active:scale-[0.98]">Update Password</button>
                  </div>
                </form>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

export default LogoutModal
