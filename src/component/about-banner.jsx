import React from 'react'

function AboutBanner() {
  return (
    <section className='bg-[#D9D9D9] py-10 md:py-20 lg:py-30'>
      <div className="container mx-auto px-3">
        <div className="grid grid-cols-12">
          <div className="col-span-12 text-center">
            <h1 className='text-[clamp(58px,calc(58px+(128-58)*((100vw-320px)/(1440-320))),128px)] font-medium font-poppins text-[#122544]'>We Are  <span className='text-[#FF5C1A]'>GoRogue</span></h1>
            <div className='text-[clamp(14px,calc(14px+(18-14)*((100vw-320px)/(1440-320))),18px)] font-normal font-inter text-[#0F2446] leading-[154%] lg:max-w-[600px] mx-auto'>
              Your trusted partner in crafting unforgettable adventures in the pristine paradise of Lakshadweep.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutBanner