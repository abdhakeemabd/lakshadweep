import React, { useEffect, useRef, useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import LoginImage from '../assets/img/login.png'
import Logo from '../assets/logo/logo.svg'

function LoginModal() {
  const dialogRef = useRef(null)
  const [phone, setPhone] = useState('')
  const [dialCode, setDialCode] = useState('91')
  const [step, setStep] = useState('phone')
  const [otp, setOtp] = useState(['', '', '', '', '', ''])

  const handleCloseModal = () => {
    dialogRef.current?.close()
    setStep('phone')
    setPhone('')
    setOtp(['', '', '', '', '', ''])
  }

  const handleSendOtp = (e) => {
    e.preventDefault()
    if (phone) {
      setStep('otp')
    }
  }

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return
    const newOtp = [...otp]
    newOtp[index] = value.substring(value.length - 1)
    setOtp(newOtp)
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus()
    }
  }
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus()
    }
  }
  const handleVerifyOtp = (e) => {
    e.preventDefault()
    console.log('Verifying OTP:', otp.join(''))
  }
  useEffect(() => {
    if (step === 'otp') {
      setTimeout(() => {
        document.getElementById('otp-0')?.focus()
      }, 100)
    }
  }, [step])
  useEffect(() => {
    const dialog = dialogRef.current
    const handleGlobalClick = (e) => {
      if (e.target.getAttribute('commandfor') === 'dialog') {
        dialog?.showModal()
      }
      if (e.target.getAttribute('command') === 'close' && e.target.getAttribute('commandfor') === 'dialog') {
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
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        dialog[open] .modal-content { animation: modalPopUp 0.3s ease-out forwards; }
        .step-transition { animation: fadeIn 0.4s ease-out; }
        .react-tel-input .country-list .search-emoji { display: none; }
        .react-tel-input .country-list .search-box{width:100%}
      `}</style>

      <dialog 
        ref={dialogRef} 
        id="dialog" 
        aria-labelledby="dialog-title" 
        className="fixed inset-0 z-[100] w-full h-full bg-transparent m-0 p-0 max-w-none max-h-none backdrop:bg-black/50 backdrop:backdrop-blur-sm"
      >
        <div className="flex min-h-screen min-w-full items-center justify-center p-4">
          <div className="modal-content relative w-full max-w-5xl transform overflow-hidden rounded-4xl bg-white shadow-2xl">
            <div className="modal-header flex justify-end">
              <button className="absolute top-6 right-6 z-50 p-2 rounded-full text-gray-500 bg-gray-100 hover:bg-gray-200 hover:text-gray-900 transition-all duration-300 cursor-pointer hover:rotate-90 flex items-center justify-center border-none" onClick={handleCloseModal} aria-label="Close">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>
            <div className="bg-white px-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
                <div className='aspect-[391/229] md:aspect-[491/589]'>
                  <img className='w-full h-full object-cover rounded-3xl' src={LoginImage} alt="Login" />
                </div>
                <div className='ps-3 pe-8 py-3'>
                  <img className='w-[75%] mb-18' src={Logo} alt="" />
                  {step === 'phone' ? (
                    <div className="step-transition">
                      <h4 className="text-[#0F2446] text-[22px] md:text-[28px] font-semibold mb-2.5">Login or Signup</h4>
                      <div className='text-[#30154E] text-[15px] font-normal mb-9'>Enter your mobile number to get started.</div>
                      <form className="space-y-4" onSubmit={handleSendOtp}>
                        <div className='mb-10'>
                          <label htmlFor="phone" className="text-black text-[17.5px] font-medium">Mobile Number</label>
                          <div className="relative mt-3">
                            <PhoneInput country={'in'} value={phone} onChange={(val, country) => {
                                setPhone(val)
                                setDialCode(country.dialCode)
                              }}
                              enableSearch={true}
                              searchPlaceholder="Search country..."
                              placeholder="Enter your mobile number"
                              disableCountryCode={true}
                              disableCountryGuess={true}
                              inputProps={{ name: 'phone', required: true, autoFocus: false }}
                              containerClass="!w-full"
                              inputClass="!w-full !h-12 !pl-[95px] !pr-4 !py-3 !border !border-gray-300 !rounded-lg !text-base focus:!outline-none focus:!border-[#FF5C1A] !transition-all"
                              buttonClass="!bg-transparent !border-none !rounded-l-lg hover:!bg-[#FFF8F1]"
                              dropdownClass="!w-80 !max-h-[200px] !rounded-lg !shadow-xl !border !border-gray-300"
                              searchClass="!p-3 !sticky !top-0 !bg-white !border-b !border-gray-200"
                            />
                            <div className="absolute left-[45px] top-1/2 -translate-y-1/2 flex items-center pointer-events-none select-none">
                              <span className="text-gray-900 font-medium">+{dialCode}</span>
                              <div className="w-[1px] h-6 bg-gray-300 mx-3"></div>
                            </div>
                          </div>
                        </div>
                        <button type="submit" className="text-[20px] font-semibold h-[58px] text-white bg-[#0F2446] border border-[#0F2446] rounded-[15.02px] w-full hover:shadow-lg transition-all duration-300 cursor-pointer">Send OTP</button>
                        <div className='text-[#555555] text-[12px] md:text-[15px] text-center font-medium px-[37px] max-w-[350px] mx-auto'>By contacting us, you agree to our Terms of service and Privacy Policy</div>
                      </form>
                    </div>
                  ) : (
                    <div className="step-transition">
                      <h4 className="text-[#0F2446] text-[22px] md:text-[28px] font-semibold mb-3">Verify OTP</h4>
                      <div className='text-base font-medium text-gray-700 mb-6'>Enter the 6-digit code sent to <span className="text-gray-900 font-bold">+{phone}</span></div>
                      <form className="space-y-6" onSubmit={handleVerifyOtp}>
                        <div className="flex justify-between gap-2">
                          {otp.map((digit, index) => (
                            <input 
                              key={index} 
                              id={`otp-${index}`} 
                              type="text" 
                              maxLength={1} 
                              value={digit} 
                              onChange={(e) => handleOtpChange(index, e.target.value)} 
                              onKeyDown={(e) => handleKeyDown(index, e)} 
                              className="w-14 h-14 text-center text-base font-medium rounded-[14.9px] bg-[#FFF8F1] text-[#FF5C1A] outline-none border border-transparent focus:border-[#FF5C1A] focus:bg-[#FEF1E4] focus:-translate-y-0.5 transition-all duration-300" 
                              onFocus={(e) => e.target.select()} 
                            />
                          ))}
                        </div>
                        <div className="text-base text-gray-500 mb-10 cursor-pointer">Don't receive the OTP? <button type="button" className="text-gray-900 font-bold hover:underline">Resend OTP</button></div>
                        <button type="submit" className="text-[20px] font-semibold h-[58px] text-white bg-[#0F2446] border border-[#0F2446] rounded-[15.02px] w-full hover:shadow-lg transition-all duration-300 cursor-pointer">Verify & Continue</button>
                        <div className='text-[#555555] text-[12px] md:text-[15px] text-center font-medium px-[37px] max-w-[400px] mx-auto'>By contacting us, you agree to our Terms of service and Privacy Policy</div>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </>
  )
}

export default LoginModal
