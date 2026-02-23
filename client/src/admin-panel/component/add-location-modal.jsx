import React, { useEffect, useRef, useState } from 'react'

function AddLocationModal() {
  const dialogRef = useRef(null)
  const [isClosing, setIsClosing] = useState(false)

  const handleCloseModal = () => {
    setIsClosing(true)
    setTimeout(() => {
      dialogRef.current?.close()
      setIsClosing(false)
    }, 300)
  }

  useEffect(() => {
    const dialog = dialogRef.current

    const handleGlobalClick = (e) => {
      if (e.target.getAttribute('commandfor') === 'add-location-modal') {
        dialog?.showModal()
      }

      if (
        e.target.getAttribute('command') === 'close' &&
        e.target.getAttribute('commandfor') === 'add-location-modal'
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
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideDown {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(-30px); }
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

      <dialog ref={dialogRef} id="add-location-modal" aria-labelledby="add-location-modal-title" className="fixed inset-0 z-[100] w-full h-full bg-transparent m-0 p-0 max-w-none max-h-none backdrop:bg-black/50 backdrop:backdrop-blur-sm py-3 md:py-7">
        <div className="flex min-h-screen min-w-full items-center justify-center p-4">
          <div className={`modal-content relative w-full py-4 max-w-[390px] transform rounded-[15px] bg-white shadow-2xl ${isClosing ? 'closing' : ''}`}>
            <form>
              <div className="modal-header border-b border-[#DEDCDC] px-6 py-3 flex justify-between">
                <h1 className="font-poppins font-bold text-[16px] md:text-[20px] leading-[100%] text-[#2A2A2A]">Add Location</h1>
                <button type="button" onClick={handleCloseModal} className="absolute top-1 right-1 z-50 p-1 rounded-full text-gray-500 bg-gray-100 hover:bg-gray-200 hover:text-gray-900 transition-all duration-300 cursor-pointer hover:rotate-90 flex items-center justify-center border-none">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                </button>
              </div>
              <div className="modal-body px-6 py-4 bg-white">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-5">
                  <div className="col-span-12 mb-3 lg:mb-5">
                    <div className="text-[#3D3D3D] font-poppins font-medium text-[13px] ">Location  <span className="text-red-500">*</span>  </div>
                    <input className="text-[#3D3D3D] bg-[#F5F5F5] py-2 px-3 rounded-[8px] font-poppins font-semibold text-[13px] mt-3 w-full" placeholder='Enter Location' />
                  </div>
                  <div className="col-span-12">
                    <button className='w-full bg-[#007BFF] text-white text-[16px] font-semibold py-3 px-3 rounded-[8px]'>Save </button>
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

export default AddLocationModal