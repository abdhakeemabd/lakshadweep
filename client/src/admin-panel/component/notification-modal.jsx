import React, { useEffect, useRef, useState } from 'react'

function NotificationModal() {
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
      if (e.target.getAttribute('commandfor') === 'notification-modal') {
        dialog?.showModal()
      }
      if (e.target.getAttribute('command') === 'close' && e.target.getAttribute('commandfor') === 'notification-modal') {
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

      <dialog ref={dialogRef} id="notification-modal" aria-labelledby="notification-modal-title" className="fixed inset-0 z-[100] w-full h-full bg-transparent m-0 p-0 max-w-none max-h-none backdrop:bg-black/50 backdrop:backdrop-blur-sm py-3 md:py-7">
        <div className="flex min-h-screen min-w-full items-center justify-center p-4">
          <div className={`modal-content relative w-full max-w-[800px] transform overflow-hidden rounded-[15px] bg-white shadow-2xl ${isClosing ? 'closing' : ''}`}>
            <div className="modal-header flex justify-end">
              <button className="absolute top-3 right-3 z-50 p-2 rounded-full text-gray-500 bg-gray-100 hover:bg-gray-200 hover:text-gray-900 transition-all duration-300 cursor-pointer hover:rotate-90 flex items-center justify-center border-none" onClick={handleCloseModal} aria-label="Close">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>
            <div className="modal-body bg-white px-4 lg:px-10 py-4 md:py-10">
              <div className="flex gap-3 md:gap-5">
                <div>
                  <div className='text-[#2A2A2A] text-[22px] font-semibold'>To: </div>
                </div>
                <div>
                  <div className="mb-3 lg:mb-6">
                    <div className='text-[#2A2A2A] text-[22px] font-semibold'>Alexander Sharington</div>
                  </div>
                  <div className="mb-3">
                    <div className='text-[#5a5a5a] text-[15px] font-regular'>Hello Jhon Abraham! 👋Your booking is confirmed! Thank you for choosing Go Rogue. We are excited to take you on an adventure. Your booking is confirmed!</div>
                  </div>
                  <div className="mb-3">
                    <div className='text-[#5a5a5a] text-[15px] font-regular'>Hello Jhon Abraham! 👋Your booking is confirmed! Thank you for choosing Go Rogue. We are excited to take you on an adventure. Your booking is confirmed!</div>
                  </div>
                  <div className="mb-5">
                    <div className='text-[#252525] text-[15px] font-bold mb-3'>Here are your booking details:</div>
                    <div className='text-[#5a5a5a] text-[15px] font-regular mb-2'>📦  Package: Summer Package</div>
                    <div className='text-[#5a5a5a] text-[15px] font-regular mb-2'>🎯 Activity: Jetski</div>
                    <div className='text-[#5a5a5a] text-[15px] font-regular mb-2'>👥 Guests: 1</div>
                    <div className='text-[#5a5a5a] text-[15px] font-regular mb-2'>🗓️ Date: Friday, 6th February 2026</div>
                  </div>
                  <div className="mb-3">
                    <div className='text-[#545454] text-[15px] font-regular'>Please feel free to contact us if you have any questions. We can't wait to see you!</div>
                  </div>
                  <div className="mb-3">
                    <div className='text-[#545454] text-[15px] font-regular'>Best Wishes, </div>
                  </div>
                  <div className="mb-3">
                    <div className='text-[#252525] text-[14px] font-bold mb-2'>Team Go Rogue</div>
                    <a href="tel:+971501234567" className='text-[#252525] text-[14px] font-medium'>+971 50 123 4567</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </>
  )
}

export default NotificationModal
