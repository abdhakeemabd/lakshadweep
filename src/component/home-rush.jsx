import React from 'react'
import Slider from "react-slick";
import AdventureBg from '../assets/bg/adventure-bg.webp'
import PlaneBg from '../assets/bg/paln-bg.webp'
import HeartIcon from '../assets/icons/like.svg'
import Map from '../assets/icons/map-w.svg'
import { Link } from 'react-router-dom';
function HomeRush() {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <section className='rush_sec py-5 lg:py-20 bg-[#122544]'>
      <div className="container m-auto px-3">
        <div className="grid grid-cols-12">
          <div className="col-span-12 text-center mb-3 md:mb-4 lg:mb-5">
            <h1 className='text-[50px] md:text-[60px] lg:text-[88px] text-white leading-[clamp(94%,3vw,85%)] font-medium mb-3'>Find Your <span className='text-[#FF5C1A]'>Rush</span></h1>
            <div className='text-[clamp(14px,1.5vw,17px)] text-white font-semibold mb-3 lg:mb-4'>We've curated the best experiences Lakshadweep has to offer. Your next story begins now.</div>
            <div className='text-[clamp(20px,22vw,24px)] text-white mb-3 font-semibold leading-[clamp(94%,3vw,85%)]'>Gorogue Exclusive</div>
          </div>
          <div className="col-span-12">
            <Slider className='slick_rush' {...settings}>
              <div className='slide'>
                <div className="rush-card hover:scale-102 transition-all duration-300 ease-in-out mx-3 lg:mx-4 xl:mx-5 relative overflow-hidden shadow-[0px_0px_4px_0px_#00000040] bg-white transition-all duration-[400ms] text-[#454545]">
                  <div className="card-head">
                    <div className="img-card relative aspect-[399/226] w-full">
                      <img className='w-full h-full object-cover' src={AdventureBg} alt="Activity" />
                      <div className="top-card items-strat flex gap-2 justify-between absolute top-3 z-1 left-3 right-3">
                        <div>
                          <div className="tag px-[13px] py-[8px] bg-[#EB0D0D] text-white font-['Poppins'] font-bold text-[11px] leading-none">GoRogue Exclusive</div>
                        </div>
                        <button className="Like-btn">
                          <img src={HeartIcon} alt="Heart Icon" />
                        </button>
                      </div>
                      <div className="cont absolute bottom-3 left-3 right-3 z-2">
                        <div className='text-white text-[clamp(20px,2vw,24px)] font-semibold mb-2'>Glass-Bottom Boat & Snorkel</div>
                        <div className="flex justify-between items-center gap-2">
                          <div className="flex items-center gap-2">
                            <img src={Map} alt="Location" />
                            <span className='text-white text-[clamp(10px,11px,11px)] font-medium'>Agatti</span>
                          </div>
                          <div className='text-white text-[clamp(10px,11px,11px)] font-medium'>(700+)</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='card-body px-3 py-3 bg-white'>
                    <div className='flex px-3 justify-between items-center'>
                      <div className="bg-[#F8F8F8] text-[clamp(10px,2vw,12px)] font-medium px-[10px] py-[5px] uppercase leading-[27px]">Travel & Tourism</div>
                      <div className="bg-[#F8F8F8] text-[clamp(10px,2vw,12px)] font-medium px-[10px] py-[5px] uppercase leading-[27px]">Coral Reef Exploration</div>
                    </div>
                    <div className="font-normal text-[13px] leading-[24px] tracking-normal align-middle mb-3 lg:mb-4 xl:mb-5">Enjoy a peaceful nature walk while learning about Lakshadweep’s marine life and sea turtle conservation.</div>
                    <div className="flex justify-between items-center gap-2 mt-5">
                      <div className='font-semibold text-black text-[clamp(14px,3vw,18px)] leading-[85%]'>₹8,900 / <span className='text-[clamp(9px,2vw,10px)] font-normal text-black leading-[85%]'>Per person</span></div>
                      <Link to="#" className='font-semibold bg-[#F8F8F8] border border-[#F4F4F4] text-[#3B2B3B] text-[14px] px-[20px] py-[10px] text-center rounded-none uppercase transition-all duration-[400ms] hover:bg-[#FF5C1A] hover:text-white transition-all duration-300 ease-in-out'>Book Now</Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className='slide'>
                <div className="rush-card hover:scale-102 transition-all duration-300 ease-in-out mx-3 lg:mx-4 xl:mx-5 relative overflow-hidden shadow-[0px_0px_4px_0px_#00000040] bg-white transition-all duration-[400ms] text-[#454545]">
                  <div className="card-head">
                    <div className="img-card relative aspect-[399/226] w-full">
                      <img className='w-full h-full object-cover' src={PlaneBg} alt="Activity" />
                      <div className="top-card items-strat flex gap-2 justify-between absolute top-3 z-1 left-3 right-3">
                        <div>
                          <div className="tag px-[13px] py-[8px] bg-[#EB0D0D] text-white font-['Poppins'] font-bold text-[11px] leading-none">GoRogue Exclusive</div>
                        </div>
                        <button className="Like-btn">
                          <img src={HeartIcon} alt="Heart Icon" />
                        </button>
                      </div>
                      <div className="cont absolute bottom-3 left-3 right-3 z-2">
                        <div className='text-white text-[clamp(20px,2vw,24px)] font-semibold mb-2'>Glass-Bottom Boat & Snorkel</div>
                        <div className="flex justify-between items-center gap-2">
                          <div className="flex items-center gap-2">
                            <img src={Map} alt="Location" />
                            <span className='text-white text-[clamp(10px,11px,11px)] font-medium'>Agatti</span>
                          </div>
                          <div className='text-white text-[clamp(10px,11px,11px)] font-medium'>(700+)</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='card-body px-3 py-3 bg-white'>
                    <div className='flex px-3 justify-between items-center'>
                      <div className="bg-[#F8F8F8] text-[clamp(10px,2vw,12px)] font-medium px-[10px] py-[5px] uppercase leading-[27px]">Travel & Tourism</div>
                      <div className="bg-[#F8F8F8] text-[clamp(10px,2vw,12px)] font-medium px-[10px] py-[5px] uppercase leading-[27px]">Coral Reef Exploration</div>
                    </div>
                    <div className="font-normal text-[13px] leading-[24px] tracking-normal align-middle mb-3 lg:mb-4 xl:mb-5">Enjoy a peaceful nature walk while learning about Lakshadweep’s marine life and sea turtle conservation.</div>
                    <div className="flex justify-between items-center gap-2 mt-5">
                      <div className='font-semibold text-black text-[clamp(14px,3vw,18px)] leading-[85%]'>₹8,900 / <span className='text-[clamp(9px,2vw,10px)] font-normal text-black leading-[85%]'>Per person</span></div>
                      <Link to="#" className='font-semibold bg-[#F8F8F8] border border-[#F4F4F4] text-[#3B2B3B] text-[14px] px-[20px] py-[10px] text-center rounded-none uppercase transition-all duration-[400ms] hover:bg-[#FF5C1A] hover:text-white transition-all duration-300 ease-in-out'>Book Now</Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className='slide'>
                <div className="rush-card hover:scale-102 transition-all duration-300 ease-in-out mx-3 lg:mx-4 xl:mx-5 relative overflow-hidden shadow-[0px_0px_4px_0px_#00000040] bg-white transition-all duration-[400ms] text-[#454545]">
                  <div className="card-head">
                    <div className="img-card relative aspect-[399/226] w-full">
                      <img className='w-full h-full object-cover' src={AdventureBg} alt="Activity" />
                      <div className="top-card items-strat flex gap-2 justify-between absolute top-3 z-1 left-3 right-3">
                        <div>
                          <div className="tag px-[13px] py-[8px] bg-[#EB0D0D] text-white font-['Poppins'] font-bold text-[11px] leading-none">GoRogue Exclusive</div>
                        </div>
                        <button className="Like-btn">
                          <img src={HeartIcon} alt="Heart Icon" />
                        </button>
                      </div>
                      <div className="cont absolute bottom-3 left-3 right-3 z-2">
                        <div className='text-white text-[clamp(20px,2vw,24px)] font-semibold mb-2'>Glass-Bottom Boat & Snorkel</div>
                        <div className="flex justify-between items-center gap-2">
                          <div className="flex items-center gap-2">
                            <img src={Map} alt="Location" />
                            <span className='text-white text-[clamp(10px,11px,11px)] font-medium'>Agatti</span>
                          </div>
                          <div className='text-white text-[clamp(10px,11px,11px)] font-medium'>(700+)</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='card-body px-3 py-3 bg-white'>
                    <div className='flex px-3 justify-between items-center'>
                      <div className="bg-[#F8F8F8] text-[clamp(10px,2vw,12px)] font-medium px-[10px] py-[5px] uppercase leading-[27px]">Travel & Tourism</div>
                      <div className="bg-[#F8F8F8] text-[clamp(10px,2vw,12px)] font-medium px-[10px] py-[5px] uppercase leading-[27px]">Coral Reef Exploration</div>
                    </div>
                    <div className="font-normal text-[13px] leading-[24px] tracking-normal align-middle mb-3 lg:mb-4 xl:mb-5">Enjoy a peaceful nature walk while learning about Lakshadweep’s marine life and sea turtle conservation.</div>
                    <div className="flex justify-between items-center gap-2 mt-5">
                      <div className='font-semibold text-black text-[clamp(14px,3vw,18px)] leading-[85%]'>₹8,900 / <span className='text-[clamp(9px,2vw,10px)] font-normal text-black leading-[85%]'>Per person</span></div>
                      <Link to="#" className='font-semibold bg-[#F8F8F8] border border-[#F4F4F4] text-[#3B2B3B] text-[14px] px-[20px] py-[10px] text-center rounded-none uppercase transition-all duration-[400ms] hover:bg-[#FF5C1A] hover:text-white transition-all duration-300 ease-in-out'>Book Now</Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className='slide'>
                <div className="rush-card hover:scale-102 transition-all duration-300 ease-in-out mx-3 lg:mx-4 xl:mx-5 relative overflow-hidden shadow-[0px_0px_4px_0px_#00000040] bg-white transition-all duration-[400ms] text-[#454545]">
                  <div className="card-head">
                    <div className="img-card relative aspect-[399/226] w-full">
                      <img className='w-full h-full object-cover' src={AdventureBg} alt="Activity" />
                      <div className="top-card items-strat flex gap-2 justify-between absolute top-3 z-1 left-3 right-3">
                        <div>
                          <div className="tag px-[13px] py-[8px] bg-[#EB0D0D] text-white font-['Poppins'] font-bold text-[11px] leading-none">GoRogue Exclusive</div>
                        </div>
                        <button className="Like-btn">
                          <img src={HeartIcon} alt="Heart Icon" />
                        </button>
                      </div>
                      <div className="cont absolute bottom-3 left-3 right-3 z-2">
                        <div className='text-white text-[clamp(20px,2vw,24px)] font-semibold mb-2'>Glass-Bottom Boat & Snorkel</div>
                        <div className="flex justify-between items-center gap-2">
                          <div className="flex items-center gap-2">
                            <img src={Map} alt="Location" />
                            <span className='text-white text-[clamp(10px,11px,11px)] font-medium'>Agatti</span>
                          </div>
                          <div className='text-white text-[clamp(10px,11px,11px)] font-medium'>(700+)</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='card-body px-3 py-3 bg-white'>
                    <div className='flex px-3 justify-between items-center'>
                      <div className="bg-[#F8F8F8] text-[clamp(10px,2vw,12px)] font-medium px-[10px] py-[5px] uppercase leading-[27px]">Travel & Tourism</div>
                      <div className="bg-[#F8F8F8] text-[clamp(10px,2vw,12px)] font-medium px-[10px] py-[5px] uppercase leading-[27px]">Coral Reef Exploration</div>
                    </div>
                    <div className="font-normal text-[13px] leading-[24px] tracking-normal align-middle mb-3 lg:mb-4 xl:mb-5">Enjoy a peaceful nature walk while learning about Lakshadweep’s marine life and sea turtle conservation.</div>
                    <div className="flex justify-between items-center gap-2 mt-5">
                      <div className='font-semibold text-black text-[clamp(14px,3vw,18px)] leading-[85%]'>₹8,900 / <span className='text-[clamp(9px,2vw,10px)] font-normal text-black leading-[85%]'>Per person</span></div>
                      <Link to="#" className='font-semibold bg-[#F8F8F8] border border-[#F4F4F4] text-[#3B2B3B] text-[14px] px-[20px] py-[10px] text-center rounded-none uppercase transition-all duration-[400ms] hover:bg-[#FF5C1A] hover:text-white transition-all duration-300 ease-in-out'>Book Now</Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className='slide'>
                <div className="rush-card hover:scale-102 transition-all duration-300 ease-in-out mx-3 lg:mx-4 xl:mx-5 relative overflow-hidden shadow-[0px_0px_4px_0px_#00000040] bg-white transition-all duration-[400ms] text-[#454545]">
                  <div className="card-head">
                    <div className="img-card relative aspect-[399/226] w-full">
                      <img className='w-full h-full object-cover' src={AdventureBg} alt="Activity" />
                      <div className="top-card items-strat flex gap-2 justify-between absolute top-3 z-1 left-3 right-3">
                        <div>
                          <div className="tag px-[13px] py-[8px] bg-[#EB0D0D] text-white font-['Poppins'] font-bold text-[11px] leading-none">GoRogue Exclusive</div>
                        </div>
                        <button className="Like-btn">
                          <img src={HeartIcon} alt="Heart Icon" />
                        </button>
                      </div>
                      <div className="cont absolute bottom-3 left-3 right-3 z-2">
                        <div className='text-white text-[clamp(20px,2vw,24px)] font-semibold mb-2'>Glass-Bottom Boat & Snorkel</div>
                        <div className="flex justify-between items-center gap-2">
                          <div className="flex items-center gap-2">
                            <img src={Map} alt="Location" />
                            <span className='text-white text-[clamp(10px,11px,11px)] font-medium'>Agatti</span>
                          </div>
                          <div className='text-white text-[clamp(10px,11px,11px)] font-medium'>(700+)</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='card-body px-3 py-3 bg-white'>
                    <div className='flex px-3 justify-between items-center'>
                      <div className="bg-[#F8F8F8] text-[clamp(10px,2vw,12px)] font-medium px-[10px] py-[5px] uppercase leading-[27px]">Travel & Tourism</div>
                      <div className="bg-[#F8F8F8] text-[clamp(10px,2vw,12px)] font-medium px-[10px] py-[5px] uppercase leading-[27px]">Coral Reef Exploration</div>
                    </div>
                    <div className="font-normal text-[13px] leading-[24px] tracking-normal align-middle mb-3 lg:mb-4 xl:mb-5">Enjoy a peaceful nature walk while learning about Lakshadweep’s marine life and sea turtle conservation.</div>
                    <div className="flex justify-between items-center gap-2 mt-5">
                      <div className='font-semibold text-black text-[clamp(14px,3vw,18px)] leading-[85%]'>₹8,900 / <span className='text-[clamp(9px,2vw,10px)] font-normal text-black leading-[85%]'>Per person</span></div>
                      <Link to="#" className='font-semibold bg-[#F8F8F8] border border-[#F4F4F4] text-[#3B2B3B] text-[14px] px-[20px] py-[10px] text-center rounded-none uppercase transition-all duration-[400ms] hover:bg-[#FF5C1A] hover:text-white transition-all duration-300 ease-in-out'>Book Now</Link>
                    </div>
                  </div>
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeRush