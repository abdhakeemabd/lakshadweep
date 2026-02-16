import React, { useEffect, useRef, useState } from 'react'

function AddSlotModal() {
  const dialogRef = useRef(null)
  const [isClosing, setIsClosing] = useState(false)

  const handleCloseModal = () => {
    setIsClosing(true)
    setTimeout(() => {
      dialogRef.current?.close()
      setIsClosing(false)
    }, 300) // Match animation duration
  }

  useEffect(() => {
    const dialog = dialogRef.current
    const handleGlobalClick = (e) => {
      if (e.target.getAttribute('commandfor') === 'add-slot-modal') {
        dialog?.showModal()
      }
      if (e.target.getAttribute('command') === 'close' && e.target.getAttribute('commandfor') === 'add-slot-modal') {
        handleCloseModal()
      }
    }
    document.addEventListener('click', handleGlobalClick)
    return () => document.removeEventListener('click', handleGlobalClick)
  }, [])

  return (
    <>
      <style>{`
        @keyframes slideUp {
          from { 
            opacity: 0; 
            transform: translateY(-30px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        @keyframes slideDown {
          from { 
            opacity: 1; 
            transform: translateY(0); 
          }
          to { 
            opacity: 0; 
            transform: translateY(-30px); 
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        dialog[open] { animation: fadeIn 0.3s ease-out; }
        dialog[open] .modal-content { animation: slideUp 0.5s ease-out forwards; }
        dialog[open] .modal-content.closing { animation: slideDown 0.5s ease-out forwards; }
      `}</style>

      <dialog ref={dialogRef} id="add-slot-modal" aria-labelledby="add-slot-modal-title" className="fixed inset-0 z-[100] w-full h-full bg-transparent m-0 p-0 max-w-none max-h-none backdrop:bg-black/50 backdrop:backdrop-blur-sm py-3 md:py-7">
        <div className="flex min-h-screen min-w-full items-center justify-center p-4">
          <div className={`modal-content relative w-full py-4 px-6  max-w-[800px] transform overflow-hidden rounded-[15px] bg-white shadow-2xl ${isClosing ? 'closing' : ''}`}>
            <form action="">
              <div className="modal-header py-10 flex justify-between">
                <h1 className='font-poppins font-bold text-[20px] md:text-[24px] leading-[100%] text-[#2A2A2A]'>Create Slot</h1>
                <button className="absolute top-1 right-1 z-50 p-1 rounded-full text-gray-500 bg-gray-100 hover:bg-gray-200 hover:text-gray-900 transition-all duration-300 cursor-pointer hover:rotate-90 flex items-center justify-center border-none" onClick={handleCloseModal} aria-label="Close">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                </button>
                <button type='button' className="absolute top-13 right-10 z-50 p-[10px_50px_10px_50px] bg-[#007BFF] text-white rounded-[10px] transition-all duration-300 cursor-pointer flex items-center justify-center border-none font-semibold" onClick={handleCloseModal} aria-label="Close"> Save
                </button>
              </div>
              <div className="modal-body bg-white">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-5">
                  <div className='col-span-1 md:col-span-6 mb-3'>
                    <label htmlFor="slot-name" className='text-[#3d3d3d] text-medium text-[13px] mb-2'>Package <span className='text-red-500'>*</span> </label>
                    <select name="" id="" className='bg-[#F5F5F5] w-full text-[13px] text-start rounded-[10px] p-[10px_50px_10px_10px] focus:outline-none '>
                      <option value="">Select Package</option>
                    </select>
                  </div>
                  <div className='col-span-1 md:col-span-6 mb-3'>
                    <label htmlFor="slot-name" className='text-[#3d3d3d] text-medium text-[13px] mb-2'>Vendor <span className='text-red-500'>*</span> </label>
                    <select name="" id="" className='bg-[#F5F5F5] w-full text-[13px] text-start rounded-[10px] p-[10px_50px_10px_10px] focus:outline-none '>
                      <option value="">Select Package</option>
                    </select>
                  </div>
                  <div className='col-span-1 md:col-span-6 mb-3'>
                    <label htmlFor="slot-name" className='text-[#3d3d3d] text-medium text-[13px] mb-2'>Package <span className='text-red-500'>*</span> </label>
                    <select name="" id="" className='bg-[#F5F5F5] w-full text-[13px] text-start rounded-[10px] p-[10px_50px_10px_10px] focus:outline-none '>
                      <option value="">Select Package</option>
                    </select>
                  </div>
                  <div className='col-span-1 md:col-span-6 mb-3'>
                    <label htmlFor="slot-name" className='text-[#3d3d3d] text-medium text-[13px] mb-2'>Vendor <span className='text-red-500'>*</span> </label>
                    <select name="" id="" className='bg-[#F5F5F5] w-full text-[13px] text-start rounded-[10px] p-[10px_50px_10px_10px] focus:outline-none '>
                      <option value="">Select Package</option>
                    </select>
                  </div>
                  <div className='col-span-1 md:col-span-6 mb-3'>
                    <label htmlFor="slot-name" className='text-[#3d3d3d] text-medium text-[13px] mb-2'>Current Price <span className='text-red-500'>*</span> </label>
                    <input type="number" name="" id="" className='bg-[#F5F5F5] w-full text-[13px] text-start rounded-[10px] p-[10px_50px_10px_10px] focus:outline-none ' placeholder='Enter current Price' />
                  </div>
                  <div className='col-span-1 md:col-span-6 mb-3'>
                    <label htmlFor="slot-name" className='text-[#3d3d3d] text-medium text-[13px] mb-2'>Set Capacity <span className='text-red-500'>*</span> (per slot) </label>
                    <input type="number" name="" id="" className='bg-[#F5F5F5] w-full text-[13px] text-start rounded-[10px] p-[10px_50px_10px_10px] focus:outline-none ' placeholder='Enter number of seats' />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </>
  )
}

export default AddSlotModal
