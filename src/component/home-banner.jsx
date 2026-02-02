import React from 'react'
import Slider from "react-slick";
import AdventureBg from '../assets/bg/adventure-bg.webp'
import PlaneBg from '../assets/bg/paln-bg.webp'
import { Link } from 'react-router-dom';
import RightArrow from '../assets/icons/right-top-arrow.svg'
function HomeBanner() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false
  };

  return (
    <div>
      <section className='home-banner overflow-hidden'>
        <Slider {...settings}>
          <div className='w-full h-[100vh]'>
            <img src={AdventureBg} alt="Adventure Banner" className='w-full h-full object-cover' />
          </div>
          <div className='w-full h-[100vh]'>
            <img src={PlaneBg} alt="Travel Banner" className='w-full h-full object-cover' />
          </div>
        </Slider>
      </section>
      <section className='home_about_sec py-5'>
        <div className="container m-auto px-3">
          <div className="grid grid-cols-12 items-center">
            <div className="col-span-12 mb-3 lg:mb-4 xl:mb-5">
              <h1 className='text-4xl md:text-6xl lg:text-8xl xl:text-[100px] font-medium text-black mb-3'>Define Your Adventure</h1>
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-5 xl:col-span-4">
              <h1 className='text-[14px] font-semibold text-gray-900 mb-3'>The ultimate Lakshadweep experience starts here. Handpicked adventures for the modern thrill seeker.</h1>
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-7 xl:col-span-8 md:text-right">
              <Link to="#" className='inline-flex items-stretch bg-[#122544] mb-3 group hover:opacity-95 transition-opacity'>
                <div className='flex items-center px-6 py-8'>
                  <span className='text-white text-xl md:text-2xl font-medium uppercase'>Get to know more about us</span>
                </div>
                <div className='bg-[#FF5C1A] flex items-center justify-center w-[90px]'>
                   <img className='h-[90px] p-1' src={RightArrow} alt="arrow-right" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomeBanner
