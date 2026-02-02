import React from 'react'

function MissionAndVision() {
  return (
    <>
      <section className='py-10 lg:py-20'>
        <div className="bg-[#0F2446] text-white me-25 [clip-path:polygon(0_0,calc(100%-70px)_0,100%_60px,100%_100%,0_100%)]">
          <img src="" alt="" />
          <div className="container mx-auto px-3">
            <div className="grid grid-cols-12 justify-center">
              <div className="col-span-12 mb-8 lg:mb-12">
                <h1 className='pt-md-5 pt-3 text-[clamp(28px,calc(28px+(35-28)*((100vw-320px)/(1440-320))),35px)] font-medium mb-5 text-white'>Our Story</h1>
                <div className="pt-0 text-[clamp(14px,2vw,18px)] text-white font-normal">
                  GoRogue was born from a simple, shared passion: a deep love for the Lakshadweep islands and an insatiable thirst for adventure. Our founders, a group of local islanders and seasoned travelers, saw the need for an authentic, safe, and exhilarating way for people to experience this hidden gem.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default MissionAndVision