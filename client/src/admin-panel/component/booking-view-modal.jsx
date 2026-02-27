import React, { useEffect, useRef, useState } from 'react'
import TooltipIcon from "../../assets/admin-panel-icon/icons/tool-tip.svg"
import * as Tooltip from '@radix-ui/react-tooltip';
function BookingViewModal({ booking }) {
  const dialogRef = useRef(null)
  const [isClosing, setIsClosing] = useState(false)



  const formatDate = (date) => {
    return date ? date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '';
  };


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
      if (e.target.getAttribute('commandfor') === 'booking-view-modal') {
        dialog?.showModal()
      }
      if (e.target.getAttribute('command') === 'close' && e.target.getAttribute('commandfor') === 'booking-view-modal') {
        handleCloseModal()
      }
    }
    document.addEventListener('click', handleGlobalClick)
    return () => document.removeEventListener('click', handleGlobalClick)
  }, [])



  return (
    <>

      <dialog ref={dialogRef} id="booking-view-modal" aria-labelledby="booking-view-modal-title" className="fixed inset-0 z-[100] w-full h-full bg-transparent m-0 p-0 max-w-none max-h-none backdrop:bg-black/50  py-3 md:py-7">
        <div className="flex min-h-screen min-w-full items-center justify-center p-4">
          <div className={`modal-content relative w-full py-4 px-6  max-w-[853px] transform rounded-[15px] bg-white shadow-2xl ${isClosing ? 'closing' : ''}`}>
            <form action="">
              <div className="modal-header py-4 flex justify-between">
                <h1 className='font-poppins font-bold text-[20px] md:text-[24px] leading-[100%] text-[#2A2A2A]'>Booking ID  #{booking?.id}</h1>
                <button type='button' className="absolute top-1 right-1 z-50 p-1 rounded-full text-gray-500 bg-gray-100 hover:bg-gray-200 hover:text-gray-900 transition-all duration-300 cursor-pointer hover:rotate-90 flex items-center justify-center border-none" onClick={handleCloseModal} aria-label="Close">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                </button>
              </div>
              <div className="modal-body bg-white">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-5">
                  <div className="col-span-12">
                    <div className="w-full">
                      <div className="grid gap-3 grid-cols-12">
                        <div className="col-span-12 md:col-span-5">
                          <div className="border border-[#D6D6D6] rounded-[20px] p-4">
                            <div className="grid grid-cols-12 gap-3 mb-3 border-b border-[#F4F4F4] p-2">
                              <div className="col-span-5">
                                <div className="text-[#8C8C8C] font-poppins font-medium text-[12px] leading-full tracking-normal">Customer Name </div>
                              </div>
                              <div className="col-span-7">
                                <div className="text-[#3D3D3D] font-poppins font-semibold text-[13px] leading-full tracking-normal">{booking?.customerName}</div>
                              </div>
                            </div>
                            <div className="grid grid-cols-12 gap-3 mb-3 border-b border-[#F4F4F4] p-2">
                              <div className="col-span-5">
                                <div className="text-[#8C8C8C] font-poppins font-medium text-[12px] leading-full tracking-normal">Phone </div>
                              </div>
                              <div className="col-span-7">
                                <div className="text-[#3D3D3D] font-poppins font-semibold text-[13px] leading-full tracking-normal">{booking?.phone}</div>
                              </div>
                            </div>
                            <div className="grid grid-cols-12 gap-3 mb-3 border-b border-[#F4F4F4] p-2">
                              <div className="col-span-5">
                                <div className="text-[#8C8C8C] font-poppins font-medium text-[12px] leading-full tracking-normal">Email </div>
                              </div>
                              <div className="col-span-7">
                                <div className="text-[#3D3D3D] font-poppins font-semibold text-[13px] leading-full tracking-normal">{booking?.email}</div>
                              </div>
                            </div>
                            <div className="grid grid-cols-12 gap-3 mb-3 border-b border-[#F4F4F4] p-2">
                              <div className="col-span-5">
                                <div className="text-[#8C8C8C] font-poppins font-medium text-[12px] leading-full tracking-normal">Package  </div>
                              </div>
                              <div className="col-span-7">
                                <div className="text-[#3D3D3D] font-poppins font-semibold text-[13px] leading-full tracking-normal">{booking?.packageName}</div>
                              </div>
                            </div>
                            <div className="grid grid-cols-12 gap-3 mb-3 border-b border-[#F4F4F4] p-2">
                              <div className="col-span-5">
                                <div className="text-[#8C8C8C] font-poppins font-medium text-[12px] leading-full tracking-normal">Activity  </div>
                              </div>
                              <div className="col-span-7">
                                <div className="text-[#3D3D3D] font-poppins font-semibold text-[13px] leading-full tracking-normal">{booking?.activity}</div>
                              </div>
                            </div>
                            <div className="grid grid-cols-12 gap-3 mb-3 border-b border-[#F4F4F4] p-2">
                              <div className="col-span-5">
                                <div className="text-[#8C8C8C] font-poppins font-medium text-[12px] leading-full tracking-normal">Island /Location </div>
                              </div>
                              <div className="col-span-7">
                                <div className="text-[#3D3D3D] font-poppins font-semibold text-[13px] leading-full tracking-normal">{booking?.location}</div>
                              </div>
                            </div>
                            <div className="grid grid-cols-12 gap-3 mb-3 border-b border-[#F4F4F4] p-2">
                              <div className="col-span-5">
                                <div className="text-[#8C8C8C] font-poppins font-medium text-[12px] leading-full tracking-normal">Seats </div>
                              </div>
                              <div className="col-span-7">
                                <div className="text-[#3D3D3D] font-poppins font-semibold text-[13px] leading-full tracking-normal">{booking?.seats}</div>
                              </div>
                            </div>
                            <div className="grid grid-cols-12 gap-3 mb-3 border-b border-[#F4F4F4] p-2">
                              <div className="col-span-5">
                                <div className="text-[#8C8C8C] font-poppins font-medium text-[12px] leading-full tracking-normal">Price (per seat) </div>
                              </div>
                              <div className="col-span-7">
                                <div className="text-[#3D3D3D] font-poppins font-semibold text-[13px] leading-full tracking-normal">₹ {booking?.pricePerSeat?.toLocaleString()}</div>
                              </div>
                            </div>
                            <div className="grid grid-cols-12 gap-3 mb-3 border-b border-[#F4F4F4] p-2">
                              <div className="col-span-5">
                                <div className="text-[#8C8C8C] font-poppins font-medium text-[12px] leading-full tracking-normal">Total Amount Paid </div>
                              </div>
                              <div className="col-span-7">
                                <div className="text-[#3D3D3D] font-poppins font-semibold text-[13px] leading-full tracking-normal">₹ {booking?.totalAmount?.toLocaleString()}</div>
                              </div>
                            </div>
                            <div className="grid grid-cols-12 gap-3 mb-3 px-2 pt-2">
                              <div className="col-span-5">
                                <div className="text-[#8C8C8C] font-poppins font-medium text-[12px] leading-full tracking-normal">Total Amount Paid </div>
                              </div>
                              <div className="col-span-7">
                                <span className="inline-flex items-center px-4 py-0.5 rounded-full text-[10px] font-medium bg-[#FFF6E7] text-[#D6A000] border border-[#D6A000]">{booking?.status}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-span-12 md:col-span-7">
                          <div className="border border-[#D6D6D6] rounded-[20px] p-4 mb-3">
                            <div className="grid grid-cols-12 gap-3 mb-3">
                              <div className="col-span-12 md:col-span-5">
                                <div className="text-[#6C6C6C] font-poppins font-medium text-[13px] leading-full tracking-normal mb-3">Package Vendor </div>
                                <div className="text-[#212121] font-poppins font-semibold text-[15px] leading-full tracking-normal">{booking?.vendor}</div>
                              </div>
                              <div className="col-span-12 md:col-span-7">
                                <div className="text-[#6C6C6C] font-poppins font-medium text-[13px] leading-full tracking-normal mb-3">Date </div>
                                <div className="text-[#000000] font-poppins font-bold text-[16px] leading-full tracking-normal">{formatDate(booking?.date ? new Date(booking.date) : null)}</div>
                              </div>
                              <div className="col-span-12 md:col-span-5">
                                <div className="text-[#6C6C6C] font-poppins font-medium text-[13px] leading-full tracking-normal mb-3">Customer Preferred slot 
                                  <Tooltip.Provider>
                                    <Tooltip.Root>
                                      <Tooltip.Trigger asChild>
                                        <img src={TooltipIcon} alt="tooltip" className='inline-block ml-2 cursor-pointer' />
                                      </Tooltip.Trigger>
                                      <Tooltip.Content className="z-[1000] rounded-[6px] bg-[#1A1A1A] px-3 py-2 text-[12px] text-white shadow-xl max-w-[200px] text-center" sideOffset={5}>
                                        The time slot originally requested by the customer
                                        <Tooltip.Arrow className="fill-[#1A1A1A]" />
                                      </Tooltip.Content>
                                    </Tooltip.Root>
                                  </Tooltip.Provider>
                                </div>
                                <div className="text-[#212121] font-poppins font-semibold text-[15px] leading-full tracking-normal">{booking?.slot}</div>
                              </div>
                            </div>
                          </div>
                          <div className='text-[#3D3D3D] text-[14px] font-bold mb-2'>Assigned Slot</div>
                          <div className="border border-[#E6F2FF] p-4 min-h-[80px] rounded-[12px] bg-[#E6F2FF] mb-3">
                            <div className="flex flex-col gap-3">
                              <div className="flex items-center gap-3">
                                <div className="flex items-center gap-[24px] bg-white p-3 w-full rounded-lg transition">
                                  <div className="text-[14px] font-semibold text-[#070707]">{booking?.activity}</div>
                                  <div className="text-[12px] font-medium text-[#475569]">{booking?.slot}</div>
                                  <div className="text-[12px] font-medium text-[#475569]">Seats : {booking?.seats}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className='text-[#3D3D3D] text-[14px] font-bold mb-2'>Customer Notes</div>
                          <textarea name="" id="" className='w-full text-[12px] h-[135px] p-4 text-[#262626] rounded-[12px] font-medium bg-[#F5F5F5] focus:outline-[#e6e6e6]' placeholder='Vendor Delay'></textarea>
                        </div>
                        <div className="col-span-12 text-end mt-3">
                          <div className='flex justify-end items-center gap-3'>
                            <button type="button" className='bg-[#007BFF] px-4 py-2 rounded-[7px] w-[173px] h-[36px] text-white text-[14px] font-poppins font-semibold leading-full tracking-normal'>Send</button>
                          </div>
                        </div>
                      </div>
                    </div>
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

export default BookingViewModal
