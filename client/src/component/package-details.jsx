import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import locationIcon from '../assets/icons/location-icon.svg'
import logo from '../assets/logo/logo.svg'
import gorogueBanner from '../assets/bg/gorogue-banner.svg'
import calendarIcon from '../assets/icons/calendar.svg'
import cartIcon from '../assets/icons/cart-icon.svg'
import tooltipIcon from '../assets/icons/tolltip.svg'

function PackageDetails() {
  const [startDate, setStartDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState("");
  const [isSlotOpen, setIsSlotOpen] = useState(false);

  const slots = [
    { label: "Morning Slot", value: "morning" },
    { label: "Afternoon Slot", value: "afternoon" },
    { label: "Evening Slot", value: "evening" }
  ];
  const [quantity, setQuantity] = useState(1);
  const increment = () => setQuantity(prev => prev + 1);
  const decrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  const basePrice = 1320;
  const payLaterPerPerson = 1300;
  const payableNowPerPerson = 20;

  return (
    <section className='package_details_sec pb-10 lg:pb-20'>
      <div className="container mx-auto px-3">
        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-12 lg:col-span-8">
            <div className="grid grid-cols-12 gap-3">
              <div className="col-span-12 lg:col-span-10 mb-3 lg:mb-5" data-aos="fade-up" data-aos-delay="400">
                <div className="cont">
                  <div className="text-[clamp(28px,4vw,50px)] font-semibold text-[#122544]">Kayak & Paddle – Kavaratti Lagoon</div>
                  <div className="flex items-center flex-wrap gap-3 mb-3">
                    <div className="flex items-center">
                      <img src={locationIcon} className='me-2' alt="Location" />
                      <div className='text-[#0F2446] text-[clamp(14.98px,2.5vw,20px)] font-medium'>Kavaratti Island</div>
                    </div>
                    <div className='flex items-center'>
                      <span className='text-[clamp(12px,1.8vw,15.5px)] text-[#2E2E2E] font-normal'>Activity Provider:</span>
                      <span className='text-black font-semibold text-[clamp(12px,1.8vw,15.5px)]'>Go Rogue</span>
                    </div>
                  </div>
                  <div className='flex gap-3 mt-3 flex-wrap'>
                    <span className='text-[#103569] bg-[#E0ECFF] font-semibold text-[11px] rounded-full px-3 py-1'>RENTALS</span>
                    <span className='text-[#103569] bg-[#E0ECFF] font-semibold text-[11px] rounded-full px-3 py-1'>BIKE RENTALS</span>
                  </div>
                  <div className='text-[clamp(14px,1.2vw,16px)] font-normal text-[#0F2446] font-inter mt-3 lg:mt-5'>Paddle across Kavaratti Lagoon and enjoy a peaceful water adventure suitable for all ages.</div>
                </div>
              </div>
              <div className='col-span-12 mb-4 lg:mb-10' data-aos="fade-up" data-aos-delay="400">
                <div className='text-[clamp(20px,2vw,24px)] font-semibold text-[#0F2446]'>
                  Bike Rentals Details
                </div>
                <div className='text-[clamp(14px,1.2vw,16px)] font-normal text-[#0F2446] font-inter mt-2'>
                  <p>Single or double kayak for calm lagoon paddling.</p>
                </div>
              </div>
              <div className='col-span-12 mt-3 mb-3' data-aos="fade-up" data-aos-delay="400">
                <div className='text-[#0F2446] font-[700] mb-3 text-[clamp(20px,2vw,24px)]'>
                  What’s Included
                </div>
                <ul className='font-inter text-[clamp(14px,1.2vw,16px)] font-normal'>
                  <li> Kayak and paddle Safety jacket Brief instructions</li>
                </ul>
              </div>
              <div className='col-span-12 mt-3 mb-3' data-aos="fade-up" data-aos-delay="400">
                <div className='text-[#0F2446] font-[700] mb-3 text-[clamp(20px,2vw,24px)]'>
                  What’s Excluded
                </div>
                <ul className='font-inter text-[clamp(14px,1.2vw,16px)] font-normal'>
                  <li> Food and drinks Photography Hotel transfers</li>
                </ul>
              </div>
              <div className='col-span-12 mt-3 mb-3' data-aos="fade-up" data-aos-delay="400">
                <div className='text-[#0F2446] font-bold mb-3 text-[clamp(20px,2vw,24px)]'>Our Commitment</div>
                <div className='relative mt-3 p-8 rounded-2xl text-white overflow-hidden bg-[#0F2446]'>
                  <img src={gorogueBanner} className='absolute inset-0 w-full h-full object-cover opacity-100' alt="" />
                  <div className='relative z-10'>
                    <div className='text-[clamp(18px,2.5vw,20px)] font-black mb-[15px]'> This is a GoRogue Exclusive!</div>
                    <div className='mt-2 text-[clamp(14px,1.2vw,16px)] font-normal'>
                      Life jacket must be worn; weather-dependent; follow guide instructions
                    </div>
                    <div className='mt-3 pt-1 text-right'>
                      <img src={logo} alt="Logo" className='inline-block h-6 w-auto brightness-0 invert' />
                    </div>
                  </div>
                  <a href='/' aria-label='gorogue-exclusive' className='absolute inset-0 z-20'></a>
                </div>
              </div>
              <div className='col-span-12 mt-3 mb-3' data-aos="fade-up" data-aos-delay="400">
                <div className='text-[clamp(20px,2vw,24px)] text-[#0F2446] font-bold'>Terms & Conditions</div>
                <div className='text-[clamp(14px,1.2vw,16px)] font-normal text-[#0F2446] font-inter mb-5 lg:mb-10'>Life jacket must be worn; weather-dependent; follow guide instructions</div>
                <div className='relative mt-3 p-8 rounded-2xl text-white overflow-hidden sub-card bg-[linear-gradient(162.04deg,#240E0E_11.66%,#1F0D05_87.76%)]'>
                  <div className='relative z-10'>
                    <div className='text-[clamp(18px,2.5vw,20px)] font-black mb-[15px]'>Dare to Be Different</div>
                    <ul className="list-none p-0 m-0 relative z-[2]">
                      <li className='relative pl-[26px] text-[clamp(14px,1.2vw,16px)] font-normal leading-[1.4] mb-[14px]'>Discover hidden gems and untouched islands across Lakshadweep.</li>
                      <li className='relative pl-[26px] text-[clamp(14px,1.2vw,16px)] font-normal leading-[1.4] mb-[14px]'>Experience thrilling water adventures from scuba diving to jet skiing.</li>
                      <li className='relative pl-[26px] text-[clamp(14px,1.2vw,16px)] font-normal leading-[1.4] mb-[14px]'>Immerse yourself in authentic island culture, beyond the usual tourist trail.</li>
                    </ul>
                    <div className='mt-3 pt-1 text-right'>
                      <img src={logo} alt="Logo" className='inline-block h-6 w-auto brightness-0 invert' />
                    </div>
                  </div>
                  <a href='/' aria-label='gorogue-exclusive' className='absolute inset-0 z-20'></a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-4" data-aos="fade-up" data-aos-delay="400">
            <div className="bg-white rounded-[5px] shadow-[1.11px_6.64px_48.6px_0px_#30303014]">
              <div className="px-3 pt-3 font-inter">
                <div className="text-[#040404] text-[clamp(28.15px,2.2vw,32px)] font-semibold">₹1320 <span className="text-[#343434] text-[clamp(17.59px,1.4vw,20px)] font-normal">Per person</span>
                </div>
                <hr className="mt-1 mb-0" />
              </div>
              <div className="px-3 pt-3 pb-2">
                <form>
                  <input type="hidden" name="price_at_purchase" value="1320" />
                  <input type="hidden" name="vendorpackage_slot_id" value="None" />
                  <input type="hidden" name="package_id" value="3" />
                  <div className="mb-3">
                    <label className="block text-[#1E1E1E] text-[clamp(13.63px,1.1vw,15.5px)] font-semibold font-inter mb-3">
                      Date
                    </label>
                    <div className="bg-[#F7F7F7] border border-[#EAEAEA] rounded-[6.64px] px-3 py-1 custom-datepicker-container">
                      <div className="flex items-center justify-between">
                        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} placeholderText="DD/MM/YYYY" className="bg-transparent outline-none w-full text-black font-semibold text-[clamp(13.63px,1.1vw,15.5px)] cursor-pointer" dateFormat="dd/MM/yyyy" />
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="block text-[#1E1E1E] text-[clamp(13.63px,1.1vw,15.5px)] font-semibold font-inter mb-3">
                      Slot Preference (optional)
                    </label>
                    <div className="relative">
                      <button type="button" onClick={() => setIsSlotOpen(!isSlotOpen)} className="w-full bg-[#F7F7F7] border border-[#EAEAEA] rounded-[6.64px] px-3 py-2.5 flex items-center justify-between text-black font-semibold text-[clamp(13.63px,1.1vw,15.5px)] focus:outline-none focus:border-blue-500 transition-all">
                        <span>{selectedSlot ? slots.find(s => s.value === selectedSlot)?.label : "Choose a slot"}</span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`text-gray-400 transition-transform duration-300 ${isSlotOpen ? 'rotate-180' : ''}`}>
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </button>
                      {isSlotOpen && (
                        <div className="absolute z-50 top-[calc(100%+5px)] left-0 right-0 bg-white border border-[#EAEAEA] rounded-[6.64px] shadow-lg overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                          {slots.map((slot) => (
                            <div key={slot.value} onClick={() => {
                              setSelectedSlot(slot.value);
                              setIsSlotOpen(false);
                            }}
                              className={`px-3 py-2.5 text-[clamp(13.63px,1.1vw,15.5px)] font-medium cursor-pointer transition-colors ${selectedSlot === slot.value ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}>
                              {slot.label}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mb-2">
                    <div className="text-[#5D5D5D] text-[clamp(11.69px,0.95vw,13.29px)] font-normal font-inter">
                      Providing a preference increases assignment chance but is not guaranteed.
                    </div>
                    <div className="inline-flex items-center mt-3 border border-[#D4D2D2] rounded-sm overflow-hidden">
                      <button type="button" onClick={decrement} className="w-[39.26px] h-[33.66px] bg-white hover:bg-gray-50 text-[18px] font-medium flex items-center justify-center transition-colors border-r border-[#D4D2D2]">−</button>
                      <span className="w-[47.82px] h-[33.66px] flex items-center justify-center font-semibold text-[16px] bg-white">
                        {quantity}
                      </span>
                      <button type="button" onClick={increment} className="w-[39.26px] h-[33.66px] bg-white hover:bg-gray-50 text-[18px] font-medium flex items-center justify-center transition-colors border-l border-[#D4D2D2]">+</button>
                    </div>
                  </div>
                  <div className="bg-[#F2F8F9] mt-[15px] mb-[10px] py-[10px] font-inter">
                    <div className="flex justify-between px-[18px] py-[6px] border-b border-white text-[clamp(13.63px,1.1vw,15.5px)] font-medium text-[#444]">
                      <span>₹{basePrice} × {quantity} {quantity > 1 ? 'people' : 'person'}</span>
                      <span className="font-semibold">₹{(basePrice * quantity).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between px-[18px] py-[6px] border-b border-white text-[clamp(13.63px,1.1vw,15.5px)] font-medium text-[#444]">
                      <span className="flex items-center gap-1">
                        Pay Later
                        <img src={tooltipIcon} className="w-4 h-4 cursor-help" alt="info" />
                      </span>
                      <span className="font-semibold">₹{(payLaterPerPerson * quantity).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between px-[18px] pt-[6px] text-[#010101] font-bold text-[clamp(14.61px,1.15vw,16.61px)]">
                      <span>Payable Now</span>
                      <span className="text-[clamp(16.56px,1.3vw,18.82px)] text-blue-600">₹{(payableNowPerPerson * quantity).toFixed(2)}</span>
                    </div>
                  </div>
                  <button type="button" className="w-full py-2 text-[clamp(15.58px,1.25vw,17.71px)] font-bold bg-blue-600 text-white mb-3">Confirm & Pay</button>
                  <button className="w-full py-2 border border-black text-[clamp(15.58px,1.25vw,17.71px)] font-bold flex items-center justify-center gap-2"><img src={cartIcon} alt="Cart" />Add to Cart</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PackageDetails