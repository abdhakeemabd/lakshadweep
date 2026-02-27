import React, { useEffect, useRef, useState } from 'react'

function AddBannerModal() {
  const dialogRef = useRef(null)
  const [fileName, setFileName] = useState("No file chosen")
  const [isClosing, setIsClosing] = useState(false)
  const fileInputRef = useRef(null)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFileName(file.name)
    } else {
      setFileName("No file chosen")
    }
  }

  const handleCloseModal = () => {
    setIsClosing(true)
    setTimeout(() => {
      dialogRef.current?.close()
      setIsClosing(false)
      setFileName("No file chosen")
    }, 300)
  }

  useEffect(() => {
    const dialog = dialogRef.current

    const handleGlobalClick = (e) => {
      if (e.target.getAttribute('commandfor') === 'add-banner-modal') {
        dialog?.showModal()
      }

      if (
        e.target.getAttribute('command') === 'close' &&
        e.target.getAttribute('commandfor') === 'add-banner-modal'
      ) {
        handleCloseModal()
      }
    }

    document.addEventListener('click', handleGlobalClick)
    return () => document.removeEventListener('click', handleGlobalClick)
  }, [])

  return (
    <>

      <dialog ref={dialogRef} id="add-banner-modal" aria-labelledby="add-banner-modal-title" className="fixed inset-0 z-[100] w-full h-full bg-transparent m-0 p-0 max-w-none max-h-none backdrop:bg-black/50  py-3 md:py-7">
        <div className="flex min-h-screen min-w-full items-center justify-center p-4">
          <div className={`modal-content relative w-full py-4 max-w-[490px] transform rounded-[15px] bg-white shadow-2xl ${isClosing ? 'closing' : ''}`}>
            <form>
              <div className="modal-header border-b border-[#DEDCDC] px-6 py-3 flex justify-between">
                <h1 className="font-poppins font-bold text-[14px] md:text-[16px] leading-[100%] text-[#2A2A2A]">Add Banner</h1>
                <button type="button" onClick={handleCloseModal} className="absolute top-1 right-1 z-50 p-1 rounded-full text-gray-500 bg-gray-100 hover:bg-gray-200 hover:text-gray-900 transition-all duration-300 cursor-pointer hover:rotate-90 flex items-center justify-center border-none">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                </button>
              </div>
              <div className="modal-body px-6 py-4 bg-white">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-5">
                  <div className="col-span-12 mb-2">
                    <label htmlFor='Title' className="text-[#3D3D3D] font-poppins font-medium text-[13px] ">Title  <span className="text-red-500">*</span>  </label>
                    <input className="text-[#3D3D3D] bg-[#F5F5F5] py-2 px-3 rounded-[8px] font-poppins font-semibold text-[13px] mt-3 w-full" placeholder='Enter Banner Title' required />
                  </div>
                  <div className="col-span-12 mb-2">
                    <label htmlFor='Destination' className="text-[#3D3D3D] font-poppins font-medium text-[13px] ">Destination </label>
                    <input className="text-[#3D3D3D] bg-[#F5F5F5] py-2 px-3 rounded-[8px] font-poppins font-semibold text-[13px] mt-3 w-full" placeholder='Enter Banner Title' />
                  </div>
                  <div className="col-span-12 mb-2">
                    <label htmlFor='Activity' className="text-[#3D3D3D] font-poppins font-medium text-[13px] ">Select Activity </label>
                    <select className="w-full text-[12px] mt-3 py-2 pl-4 pr-10 bg-[#F4F4F4] rounded-[10px] min-w-[113px] focus:border-0 focus:outline-none" name="" id="">
                      <option className="text-[12px]" value="">Destination</option>
                      <option className="text-[12px]" value="">111</option>
                    </select>
                  </div>
                  <div className="col-span-12 mb-2">
                    <label htmlFor='banner' className="text-[#3D3D3D] font-poppins font-medium text-[14px] block mb-3">Upload Image <span className="text-red-500">*</span></label>
                    <div className="flex items-center gap-4">
                      <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" id="banner-upload"/>
                      <button type="button" onClick={() => fileInputRef.current?.click()} className="bg-[#393838] text-white px-6 py-3 rounded-[10px] min-w-[155px] text-[13px] font-medium cursor-pointer transition-colors hover:bg-[#2A2A2A] border-none">
                        Choose File
                      </button>
                      <span className="text-[#989898] text-[12px] font-poppins">{fileName}</span>
                    </div>
                    <div className=' mt-3 text-[#8C8C8C] font-poppins text-normal text-[10px]'>(The image size should be 1440px X 505px & less than 2 mb)</div>
                  </div>
                  <div className="col-span-12">
                    <button className='w-full bg-[#007BFF] text-white text-[16px] font-semibold py-2 px-3 rounded-[8px]'>Save </button>
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

export default AddBannerModal