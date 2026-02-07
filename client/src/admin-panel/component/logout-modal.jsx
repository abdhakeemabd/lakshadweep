import React, { useEffect, useRef, useState } from 'react'
import Logo from '../../assets/logo/logo.svg'
import { FiEye, FiEyeOff } from 'react-icons/fi'

function LogoutModal() {
  const dialogRef = useRef(null)

  const [showOld, setShowOld] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const handleCloseModal = () => {
    dialogRef.current?.close()
  }

  useEffect(() => {
    const dialog = dialogRef.current
    const handleGlobalClick = (e) => {
      if (e.target.getAttribute('commandfor') === 'dialog') {
        dialog?.showModal()
      }
      if (
        e.target.getAttribute('command') === 'close' &&
        e.target.getAttribute('commandfor') === 'dialog'
      ) {
        handleCloseModal()
      }
    }
    document.addEventListener('click', handleGlobalClick)
    return () => document.removeEventListener('click', handleGlobalClick)
  }, [])

  return (
    <>
      <style>{`
        @keyframes modalPopUp {
          0% { opacity: 0; transform: scale(0.8) translateY(20px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        dialog[open] .modal-content { animation: modalPopUp 0.3s ease-out forwards; }
      `}</style>

      <dialog
        ref={dialogRef}
        id="dialogout"
        aria-labelledby="dialog-title"
        className="fixed inset-0 z-[100] w-full h-full bg-transparent m-0 p-0 max-w-none max-h-none backdrop:bg-black/50 backdrop:backdrop-blur-sm"
      >
        <div className="flex min-h-screen min-w-full items-center justify-center p-4">
          <div className="modal-content relative w-full max-w-[502px] overflow-hidden rounded-3xl bg-white shadow-2xl px-6 py-6 lg:py-10">
            <div className="relative flex items-center justify-center py-6 border-b border-gray-100">
              <button className="absolute top-5 right-5 z-50 p-2 rounded-full text-gray-500 bg-gray-100 hover:bg-gray-200 hover:text-gray-900 transition-all duration-300 cursor-pointer hover:rotate-90 w-[40px] h-[40px]" onClick={handleCloseModal} aria-label="Close">✕</button>
              <img className="h-[44px]" src={Logo} alt="Logo" />
            </div>
            <div className="px-6 py-6">
              <form className="space-y-5">
                <div>
                  <label className="block text-[14px] font-medium text-[#3d3d3d] mb-2">Enter Old Password</label>
                  <div className="relative">
                    <input type={showOld ? 'text' : 'password'} placeholder="Enter your old password" className="w-full h-[48px] rounded-xl border border-gray-300 px-4 pr-12 text-[16px] focus:border-[#FF5C1A] focus:outline-none" required autoComplete="current-password" />
                    <button type="button" onClick={() => setShowOld(!showOld)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700">{showOld ? <FiEye size={20} /> : <FiEyeOff size={20} />}</button>
                  </div>
                </div>
                <div>
                  <label className="block text-[14px] font-medium text-[#3d3d3d] mb-2">Enter New Password</label>
                  <div className="relative">
                    <input type={showNew ? 'text' : 'password'} placeholder="Enter new password" className="w-full h-[48px] rounded-xl border border-gray-300 px-4 pr-12 text-[16px] focus:border-[#FF5C1A] focus:outline-none" required autoComplete="new-password" />
                    <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700">{showNew ? <FiEye size={20} /> : <FiEyeOff size={20} />}</button>
                  </div>
                </div>
                <div>
                  <label className="block text-[14px] font-medium text-[#3d3d3d] mb-2">Re-enter New Password</label>
                  <div className="relative">
                    <input type={showConfirm ? 'text' : 'password'} placeholder="Re-enter new password" className="w-full h-[48px] rounded-xl border border-gray-300 px-4 pr-12 text-[16px] focus:border-[#FF5C1A] focus:outline-none" required autoComplete="new-password" />
                    <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700">{showConfirm ? <FiEye size={20} /> : <FiEyeOff size={20} />}</button>
                  </div>
                </div>
                <div className="pt-4">
                  <button type="submit" className="w-full h-[46px] text-white bg-[#FF5C1A] text-[16.14px] font-semibold rounded-[12.11px]">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </dialog>
    </>
  )
}

export default LogoutModal
