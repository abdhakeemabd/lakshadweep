import React, { useEffect, useRef, useState } from 'react'
import DefaultUserIcon from '../assets/icons/user-defult-icon.svg'
import UploadIcon from '../assets/icons/file-icon.svg'
import SearchableSelect from './searchable-select'

const states = [
  "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar",
  "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Goa",
  "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka",
  "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
  "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

function RegisterModal() {
  const [profilePreview, setProfilePreview] = useState(DefaultUserIcon)
  const [selectedState, setSelectedState] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setProfilePreview(URL.createObjectURL(file))
    }
  }
  const dialogRef = useRef(null)
  const [phone, setPhone] = useState('')

  const [isClosing, setIsClosing] = useState(false)

  const handleCloseModal = () => {
    setIsClosing(true)
    setTimeout(() => {
      dialogRef.current?.close()
      setIsClosing(false)
      setPhone('')
    }, 400) // Match animation duration
  }

  useEffect(() => {
    const dialog = dialogRef.current
    const handleGlobalClick = (e) => {
      if (e.target.getAttribute('commandfor') === 'register-modal') {
        dialog?.showModal()
      }
      if (e.target.getAttribute('command') === 'close' && e.target.getAttribute('commandfor') === 'register-modal') {
        handleCloseModal()
      }
    }

    const handleOpenFromLogin = (e) => {
      if (e.detail?.phone) {
        setPhone(e.detail.phone)
      }
      setTimeout(() => dialog?.showModal(), 300)
    }

    document.addEventListener('click', handleGlobalClick)
    window.addEventListener('openRegister', handleOpenFromLogin)

    return () => {
      document.removeEventListener('click', handleGlobalClick)
      window.removeEventListener('openRegister', handleOpenFromLogin)
    }
  }, [])
  return (
    <>
      <dialog 
        ref={dialogRef} 
        id="register-modal" 
        aria-labelledby="register-modal-title" 
        className={`premium-modal fixed inset-0 z-[100] w-full h-full bg-transparent m-0 p-0 max-w-none max-h-none backdrop:bg-black/50 ${isClosing ? 'closing' : ''}`}>
        <div className="flex min-h-screen min-w-full items-center justify-center p-4">
          <div className={`modal-content relative w-full max-w-[800px] transform rounded-[9px] bg-white shadow-2xl ${isClosing ? 'closing' : ''}`}>
            <div className="modal-header flex items-center justify-between px-8 py-6 border-b border-gray-100">
              <h2 id="register-modal-title" className="text-2xl font-bold text-gray-800">Personal info</h2>
            </div>
            <form action="">
              <div className="modal-body px-8 py-8">
                <div className="grid grid-cols-12 gap-8">
                  <div className="col-span-12 lg:col-span-3 flex justify-center">
                    <div className="relative h-max">
                      <div className="p-1">
                        <img src={profilePreview} alt="User" className="w-32 h-32 rounded-[30px] object-cover border border-gray-100" />
                      </div>
                      <label htmlFor="fileInput" className="absolute bottom-2 right-2 flex items-center justify-center rounded-full cursor-pointer border-white">
                        <img src={UploadIcon} alt="Upload" className="w-9 h-9 object-contain" />
                      </label>
                      <input id="fileInput" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                    </div>
                  </div>
                  <div className="col-span-12 lg:col-span-9">
                    <div className="grid grid-cols-12 gap-x-6 gap-y-5">
                      <div className="col-span-12 md:col-span-6">
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5 bg-">First Name <span className="text-red-500">*</span></label>
                        <input type="text" placeholder="Enter First name" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all placeholder:text-gray-400" />
                      </div>
                      <div className="col-span-12 md:col-span-6">
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Last Name <span className="text-red-500">*</span></label>
                        <input type="text" placeholder="Enter Last name" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all placeholder:text-gray-400" />
                      </div>
                      <div className="col-span-12 md:col-span-6">
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Mobile Number <span className="text-red-500">*</span></label>
                        <input type="text" value={phone} readOnly className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-gray-50 text-gray-500 cursor-not-allowed" />
                      </div>
                      <div className="col-span-12 md:col-span-6">
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email ID <span className="text-red-500">*</span></label>
                        <input type="email" placeholder="Enter your email id" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all placeholder:text-gray-400" />
                      </div>
                      <div className="col-span-12 md:col-span-6">
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Address <span className="text-red-500">*</span></label>
                        <input type="text" placeholder="Enter your address" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all placeholder:text-gray-400" />
                      </div>
                      <div className="col-span-12 md:col-span-3">
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Pincode <span className="text-red-500">*</span></label>
                        <input type="text" maxLength="10" placeholder="Enter" onInput={(e) => (e.target.value = e.target.value.replace(/\D/g, ""))} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all placeholder:text-gray-400" />
                      </div>
                      <div className="col-span-12 md:col-span-3">
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">State <span className="text-red-500">*</span></label>
                        <SearchableSelect options={states} value={selectedState} onChange={setSelectedState} placeholder="Select state" searchPlaceholder="Search state..." />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer px-8 py-6 bg-gray-50/50 border-t border-gray-100 flex justify-end">
                <button type="submit" className="bg-[#0F2446] text-white px-12 py-2.5 rounded-xl font-semibold">
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </>
  )
}

export default RegisterModal
