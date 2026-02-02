import React from 'react'
import bg from "../assets/bg/paln-bg.webp";
import Sunset from '../assets/icons/sunset.svg'
import Permit from '../assets/icons/permit.svg'
import Pack from '../assets/icons/pack.svg'
import Wifi from '../assets/icons/wifi.svg'

function Gateaway() {
  const getawayData = [
    {
      id: 1,
      icon: Sunset,
      title: "Best Time to Visit",
      description: "The ideal time to explore Lakshadweep is from October to mid-May, when the weather is pleasant and perfect for water sports."
    },
    {
      id: 2,
      icon: Permit,
      title: "Permits & Entry",
      description: "All visitors need a permit to enter. We can assist you with the application process once your booking is confirmed."
    },
    {
      id: 3,
      icon: Pack,
      title: "What to Pack",
      description: "Pack light cottons, swimwear, sunscreen, sunglasses, and a hat. Don't forget your camera for the stunning views!."
    },
    {
      id: 4,
      icon: Wifi,
      title: "Connectivity",
      description: "Travel between islands is mainly by boat. Plan your itinerary in advance as schedules can vary based on weather conditions."
    }
  ];

  return (
    <section className='gateaway_sec py-5 lg:py-18 bg-cover bg-center bg-no-repeat' style={{ backgroundImage: `url(${bg})` }}>
      <div className="container m-auto px-3">
        <div className="grid grid-cols-12 justify-center">
          <div className="col-span-12 text-center mb-3 md:mb-4 lg:mb-5 max-w-5xl mx-auto w-full">
            <h1 className='font-semibold text-[clamp(28px,3vw,42px)] leading-[1.24] text-white mb-3'>Plan Your Perfect Getaway</h1>
            <div className='text-[16px] md:text-[18px] lg:text-[20px] text-white leading-[clamp(94%,3vw,85%)] font-medium mb-3 lg:mb-4'>Essential tips and information to help you prepare for an unforgettable adventure.</div>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-4">
          {getawayData.map((item) => (
            <div key={item.id} className="col-span-6 md:col-span-6 lg:col-span-3 mx-2 relative ">
              <div className="gateaway-card bg-[#1A1A1ABD] text-white backdrop-blur-[12px] transition-all duration-[400ms] shadow-[0px_0px_16px_0px_#F2F2F2_inset] shadow-[0px_0px_3px_0px_#FFFFFF80_inset] shadow-[-1px_-1px_0.5px_-1px_#FFFFFF_inset] shadow-[1px_1px_0.5px_-1px_#FFFFFF_inset] shadow-[-1px_-1px_0px_-0.5px_#262626_inset] shadow-[1px_1px_0px_-0.5px_#333333_inset] shadow-[0px_1px_8px_0px_#0000001F] shadow-[0px_0px_2px_0px_#0000001A] pt-4 pb-8 px-3 lg:px-8 text-center text-white hover:-translate-y-2.5 transition-all h-full">
                <div className="gateaway-card-content p-3">
                  {item.icon && (
                    <div className="mb-3">
                      <img src={item.icon} alt={item.title} className="mb-2 w-[60px] h-[60px] mx-auto" />
                    </div>
                  )}
                  <div className="font-semibold text-[clamp(14px,2vw,20px)] leading-[clamp(20px,3vw,36px)] mb-2">{item.title}</div>
                  <div className="text-[clamp(12px,2vw,14px)] leading-[1.4] mb-2">{item.description}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Gateaway