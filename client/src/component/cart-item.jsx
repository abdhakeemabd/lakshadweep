import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DeleteIcon from "../assets/icons/cart_delete.svg";
import LocationIcon from "../assets/icons/red_loc.svg";
import tooltipIcon from "../assets/icons/tolltip.svg";

function CartItem({ item, onDelete }) {
  const [startDate, setStartDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState("");
  const [isSlotOpen, setIsSlotOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const slots = [
    { label: "Morning Slot", value: "morning" },
    { label: "Afternoon Slot", value: "afternoon" },
    { label: "Evening Slot", value: "evening" }
  ];

  const increment = () => setQuantity(prev => prev + 1);
  const decrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const {
    badge,
    image,
    title,
    location,
    pricePerPerson,
    basePrice,
    payLaterPerPerson,
    payableNowPerPerson,
    packageId
  } = item;

  return (
    <div className="col-span-12 lg:col-span-6">
      <div className="profile-cart-card bg-white rounded-[5px] shadow-[1.11px_6.64px_48.6px_0px_#30303014] relative">
        <div className="img-card relative">
          <div className="absolute flex w-full justify-between">
            <div>
              <div className='bg-black text-white px-3 py-1 mx-3 my-3'>{badge}</div>
            </div>
            <div>
              <button
                type="button"
                onClick={() => onDelete && onDelete(item.id)}
                className='px-2 py-2 mx-3 my-3 border-[#DBDBDB] bg-[#FFFFFF78] rounded-sm'
              >
                <img src={DeleteIcon} alt="Delete" />
              </button>
            </div>
          </div>
          <img className='w-full aspect-407/266 object-cover' src={image} alt={title} />
          <div className="hero-text absolute left-5 bottom-4 z-2">
            <h2 className="text-white text-[clamp(17.55px, 2.5vw, 20px)] font-medium">{title}</h2>
            <div className="flex items-center gap-1 text-white">
              <img src={LocationIcon} alt="loc" />
              <span className='text-white '> {location}</span>
            </div>
          </div>
        </div>
        <div className="px-3 pt-3 font-inter">
          <div className="text-[#040404] text-[clamp(24.15px,1.8vw,28px)] font-bold">
            ₹{pricePerPerson.toFixed(2)} <span className="text-[#343434] text-[clamp(17.59px,1.4vw,20px)] font-bold">Per person</span>
          </div>
          <hr className="mt-1 mb-0 border-[#DBDBDB]" />
        </div>
        <div className="px-3 pt-3 pb-2">
          <form>
            <input type="hidden" name="price_at_purchase" value={basePrice} />
            <input type="hidden" name="vendorpackage_slot_id" value={selectedSlot || "None"} />
            <input type="hidden" name="package_id" value={packageId} />
            <div className="mb-3 lg:mb-4">
              <label className="block text-[#1E1E1E] text-[clamp(13.63px,1.1vw,15.5px)] font-medium font-inter mb-3">Date</label>
              <div className="bg-[#F7F7F7] border border-[#EAEAEA] rounded-[6.64px] px-3 py-2 custom-datepicker-container">
                <div className="flex items-center justify-between">
                  <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} placeholderText="DD/MM/YYYY" className="bg-transparent outline-none w-full text-black font-semibold text-[clamp(13.63px,1.1vw,15.5px)] cursor-pointer" dateFormat="dd/MM/yyyy" />
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label className="block text-[#1E1E1E] text-[clamp(13.63px,1.1vw,15.5px)] font-medium font-inter mb-3">
                Slot Preference <span className='text-[#5D5D5D] text-[13.99px] font-normal text-inter'>(optional)</span>
              </label>
              <div className="relative">
                <button type="button" onClick={() => setIsSlotOpen(!isSlotOpen)} className="w-full bg-[#F7F7F7] border border-[#EAEAEA] rounded-[6.64px] px-3 py-2.5 flex items-center justify-between text-black font-semibold text-[clamp(13.63px,1.1vw,15.5px)] focus:outline-none focus:border-blue-500 transition-all">
                  <span>{selectedSlot ? slots.find(s => s.value === selectedSlot)?.label : "Choose a slot"}</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`text-gray-400 transition-transform duration-300 ${isSlotOpen ? 'rotate-180' : ''}`}><path d="M6 9l6 6 6-6" /></svg>
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
                <div>
                  <span className="w-[48.82px] h-[35.66px] flex items-center justify-center font-semibold text-[16px] bg-white">
                    {quantity}
                  </span>
                </div>
                <button type="button" onClick={increment} className="w-[39.26px] h-[33.66px] bg-white hover:bg-gray-50 text-[18px] font-medium flex items-center justify-center transition-colors border-l border-[#D4D2D2]">+</button>
              </div>
            </div>
            <div className="bg-[#F4FBFC] mt-[15px] mb-[10px] py-[10px] font-inter">
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
                <span className="text-[clamp(16.56px,1.3vw,18.82px)] text-[#010101]">₹{(payableNowPerPerson * quantity).toFixed(2)}</span>
              </div>
            </div>
            <button type="button" className="w-full py-2 text-[clamp(13px,1.25vw,15px)] font-bold bg-[#0E85F2] text-white mb-3">Confirm & Pay</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
