import React from 'react'
import AboutImg from '../assets/img/blue-frame.png';
import AboutImg2 from '../assets/img/orange-frame.png';
import AboutResImg1 from '../assets/img/blueframesmall.png';
import AboutResImg2 from '../assets/img/orangeframesmall.png';
function MissionAndVision() {
  return (
    <>
      <section className='py-10'>
        <div className="bg-[#0F2446] text-white lg:me-25 me-3 [clip-path:polygon(0_0,calc(100%-70px)_0,100%_120px,100%_100%,0_100%)]">
          <img src="" alt="" />
          <div className="grid grid-cols-12 justify-center">
            <div className="hidden lg:block col-span-2">
              <div className="img-card relative w-full h-full">
                <img className='w-full h-full' src={AboutImg} alt="" />
              </div>
            </div>
            <div className="col-span-12 lg:col-span-10 flex lg:block mb-8 lg:mb-12"  data-aos="fade-up" data-aos-delay="400">
              <div className="img-card absolute lg:hidden">
                <img className='w-full h-full object-cover' src={AboutResImg1} alt="" />
              </div>
              <div className="card py-5 min-h-90 lg:min-h-120 relative z-10 pe-4 ps-2 lg:pe-10 lg:ps-12">
                <h1 className='pt-md-5 pt-3 text-[clamp(28px,calc(28px+(35-28)*((100vw-320px)/(1440-320))),35px)] font-medium mb-5 text-white'>Our Story</h1>
                <div className="pt-0 text-[clamp(14px,2vw,18px)] text-white font-normal mb-3 lg:mb-5">
                  GoRogue was born from a simple, shared passion: a deep love for the Lakshadweep islands and an insatiable thirst for adventure. Our founders, a group of local islanders and seasoned travelers, saw the need for an authentic, safe, and exhilarating way for people to experience this hidden gem.
                </div>
                <div className="pt-0 text-[clamp(14px,2vw,18px)] text-white font-normal">
                  We're not just a booking platform; we're curators of experience. We've paddled the quietest lagoons, dived the most vibrant reefs, and shared meals in local homes, all to build a collection of adventures that we're proud to put our name on.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='pb-10'>
        <div className="relative ms-3 lg:ms-30 bg-[#FF5C1A] text-white [clip-path:polygon(0_0,100%_0,100%_100%,40px_100%,0_calc(100%-40px))]">
          <img src="" alt="" />
          <div className="grid grid-cols-12 justify-center">
            <div className="col-span-12 lg:col-span-10 flex lg:block mb-8 lg:mb-12" data-aos="fade-up" data-aos-delay="400">
              <div className="img-card absolute top-0 right-0 lg:hidden">
                <img className='w-full h-full' src={AboutResImg2} alt="" />
              </div>
              <div className="card py-5 min-h-90 lg:min-h-120 relative z-10 ps-4 pe-2 lg:pe-10 lg:ps-12">
                <h1 className='pt-md-5 pt-3 text-[clamp(28px,calc(28px+(35-28)*((100vw-320px)/(1440-320))),35px)] font-medium mb-5 text-white'>Our Mission</h1>
                <div className="pt-0 text-[clamp(14px,2vw,18px)] text-white font-normal mb-3 lg:mb-5">
                  GoRogue was born from a simple, shared passion: a deep love for the Lakshadweep islands and an insatiable thirst for adventure. Our founders, a group of local islanders and seasoned travelers, saw the need for an authentic, safe, and exhilarating way for people to experience this hidden gem.
                </div>
                <div className="pt-0 text-[clamp(14px,2vw,18px)] text-white font-normal mb-3 lg:mb-5">
                  We're not just a booking platform; we're curators of experience. We've paddled the quietest lagoons, dived the most vibrant reefs, and shared meals in local homes, all to build a collection of adventures that we're proud to put our name on.
                </div>
                <div className="pt-0 text-[clamp(14px,2vw,18px)] text-white font-normal">
                  We're not just a booking platform; we're curators of experience. We've paddled the quietest lagoons, dived the most vibrant reefs, and shared meals in local homes, all to build a collection of adventures that we're proud to put our name on.
                </div>
              </div>
            </div>
            <div className="hidden lg:block col-span-2">
              <div className="img-card relative w-full h-full">
                <img className='w-full h-full ' src={AboutImg2} alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default MissionAndVision