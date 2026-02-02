import React, { useEffect, useRef, useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import LoginImage from '../assets/img/login.png'
import Logo from '../assets/logo/logo.svg'

function LoginModal() {
  const dialogRef = useRef(null)
  const [phone, setPhone] = useState('')

  useEffect(() => {
    const dialog = dialogRef.current
    const handleShowModal = (e) => {
      if (e.target.getAttribute('commandfor') === 'dialog') {
        dialog?.showModal()
      }
    }
    // Listen for close command
    const handleCloseModal = (e) => {
      if (e.target.getAttribute('command') === 'close' && e.target.getAttribute('commandfor') === 'dialog') {
        dialog?.close()
      }
    }
    document.addEventListener('click', handleShowModal)
    document.addEventListener('click', handleCloseModal)
    return () => {
      document.removeEventListener('click', handleShowModal)
      document.removeEventListener('click', handleCloseModal)
    }
  }, [])

  return (
    <>
      <style>{`
        @keyframes modalPopUp {
          0% {
            opacity: 0;
            transform: scale(0.8) translateY(20px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        dialog[open] .modal-content {
          animation: modalPopUp 0.3s ease-out forwards;
        }

        dialog::backdrop {
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(4px);
        }

        /* Custom styling for react-phone-input-2 */
        .react-tel-input {
          font-family: inherit;
        }

        .react-tel-input .form-control {
          width: 100%;
          height: 48px;
          padding: 12px 16px 12px 58px;
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
          font-size: 1rem;
          transition: all 0.3s;
        }

        .react-tel-input .form-control:focus {
          outline: none;
          border-color: transparent;
          box-shadow: 0 0 0 2px #3b82f6;
        }

        .react-tel-input .flag-dropdown {
          background-color: transparent;
          border: none;
          border-right: 1px solid #d1d5db;
          border-radius: 0.5rem 0 0 0.5rem;
        }

        .react-tel-input .flag-dropdown:hover,
        .react-tel-input .flag-dropdown.open {
          background-color: transparent;
        }

        .react-tel-input .selected-flag {
          padding: 0 0 0 12px;
          width: 52px;
          height: 48px;
          display: flex;
          align-items: center;
        }

        .react-tel-input .selected-flag:hover,
        .react-tel-input .selected-flag:focus {
          background-color: transparent;
        }

        .react-tel-input .country-list {
          width: 320px;
          max-height: 250px;
          border-radius: 0.5rem;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          border: 1px solid #d1d5db;
        }

        .react-tel-input .country-list .country {
          padding: 12px 16px;
          display: flex;
          align-items: center;
        }

        .react-tel-input .country-list .country:hover {
          background-color: #f3f4f6;
        }

        .react-tel-input .country-list .country.highlight {
          background-color: #eff6ff;
        }

        .react-tel-input .country-list .country .flag {
          margin-right: 12px;
        }

        .react-tel-input .country-list .country .country-name {
          flex: 1;
          font-weight: 500;
          color: #374151;
        }

        .react-tel-input .country-list .country .dial-code {
          color: #6b7280;
        }

        .react-tel-input .country-list .search {
          padding: 12px;
          position: sticky;
          top: 0;
          background-color: white;
          border-bottom: 1px solid #e5e7eb;
        }

        .react-tel-input .country-list .search-box {
          width: 100%;
          padding: 8px 12px;
          border: 1px solid #d1d5db;
          border-radius: 0.375rem;
          font-size: 0.875rem;
        }

        .react-tel-input .country-list .search-box:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 1px #3b82f6;
        }
      `}</style>
      <dialog ref={dialogRef} id="dialog" aria-labelledby="dialog-title" className="fixed inset-0 z-[100] w-full h-full bg-transparent m-0 p-0 max-w-none max-h-none">
        <div className="flex min-h-screen min-w-full items-center justify-center p-4">
          <div className="modal-content relative w-full max-w-4xl transform overflow-hidden rounded-4xl bg-white shadow-2xl">
            <div className="bg-white px-2 py-2">
              <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
                <div>
                  <img src={LoginImage} alt="Login" />
                </div>
                <div className='ps-3 pe-8 py-3'>
                  <img className='w-auto mb-6' src={Logo} alt="" />
                  <h4 className="text-xl font-semibold text-gray-900 mb-3">Login or Signup</h4>
                  <div className='text-base font-medium text-gray-700 mb-6'>Enter your mobile number to get started.</div>
                  <form className="space-y-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
                      <PhoneInput
                        country={'in'}
                        value={phone}
                        onChange={setPhone}
                        enableSearch={true}
                        searchPlaceholder="Search country..."
                        inputProps={{
                          name: 'phone',
                          required: true,
                          autoFocus: false
                        }}
                        containerClass="phone-input-container"
                        inputClass="phone-input-field"
                        buttonClass="phone-input-button"
                        dropdownClass="phone-input-dropdown"
                      />
                    </div>
                    <button type="submit" className="w-full py-3 px-4 bg-gradient-to-br from-[#20212B] to-[#16171F] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300">Send OTP</button>
                  </form>
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