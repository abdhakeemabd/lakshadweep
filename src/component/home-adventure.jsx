import React, { useState, useEffect } from 'react'
import bg from "../assets/bg/adventure-bg.webp";
import Slider from "react-slick";
import squre3 from "../assets/icons/squre-3.svg";
function HomeAdventure() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

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

    <section
      className="bg-cover bg-center bg-no-repeat py-5 lg:py-10" style={{ backgroundImage: `url(${bg})` }}>
      <div className="container m-auto px-3">
        <div className="grid grid-cols-12">
          <div className="col-span-12 md:col-span-6 lg:col-span-8 mb-3 lg:mb-4 xl:mb-5">
            <h1 className='text-[50px] md:text-[60px] lg:text-[88px] text-white leading-[clamp(94%,3vw,85%)] font-medium mb-3'>Live the <span className='text-[#FF5C1A]'>#Adventure</span>, Redefined</h1>
          </div>
          <div className="col-span-12 min-w-0">
           {mounted && <Slider {...settings}>
            <div className="slide h-full">
              <div className="advanture-card px-[25px] py-[26px] min-h-[200px] text-white bg-[#0f0f0f69] bg-blend-luminosity backdrop-blur-[12px] transition-all duration-[400ms] shadow-[0_0_16px_0_#F2F2F2_inset, 0_0_3px_0_#FFFFFF80_inset, -1px_-1px_0.5px_-1px_#FFFFFF_inset, 1px_1px_0.5px_-1px_#FFFFFF_inset, -1px_-1px_0px_-0.5px_#262626_inset, 1px_1px_0px_-0.5px_#333333_inset, 0_1px_8px_0_#0000001F, 0_0_2px_0_#0000001A] mx-3 h-full">
                <div className='font-medium capitalize text-[clamp(30px,3vw,33px)] mb-3'>Safety First, Always</div>
                <div className='text-[clamp(14px,1.5vw,17px)] mb-2'>Your well-being is our top priority. All our partners are rigorously vetted, and our own trips adhere to the highest safety standards.</div>
                <img className="bottom-card absolute bottom-[5px] right-[5px] h-[58px] w-[58px]" src={squre3} alt="squre-3"></img>
              </div>
            </div>
            <div className="slide h-full">
              <div className="advanture-card px-[25px] py-[26px] min-h-[200px] text-white bg-[#0f0f0f69] bg-blend-luminosity backdrop-blur-[12px] transition-all duration-[400ms] shadow-[0_0_16px_0_#F2F2F2_inset, 0_0_3px_0_#FFFFFF80_inset, -1px_-1px_0.5px_-1px_#FFFFFF_inset, 1px_1px_0.5px_-1px_#FFFFFF_inset, -1px_-1px_0px_-0.5px_#262626_inset, 1px_1px_0px_-0.5px_#333333_inset, 0_1px_8px_0_#0000001F, 0_0_2px_0_#0000001A] mx-3 h-full">
                <div className='font-medium capitalize text-[clamp(30px,3vw,33px)] mb-3'>Exclusive Experiences</div>
                <div className='text-[clamp(14px,1.5vw,17px)] mb-2'>From hidden caves to private dinners, our GoRogue Exclusive packages offer unique access and perks you won't find anywhere else.</div>
                <img className="bottom-card absolute bottom-[5px] right-[5px] h-[58px] w-[58px]" src={squre3} alt="squre-3"></img>
              </div>
            </div>
            <div className="slide h-full">
              <div className="advanture-card px-[25px] py-[26px] min-h-[200px] text-white bg-[#0f0f0f69] bg-blend-luminosity backdrop-blur-[12px] transition-all duration-[400ms] shadow-[0_0_16px_0_#F2F2F2_inset, 0_0_3px_0_#FFFFFF80_inset, -1px_-1px_0.5px_-1px_#FFFFFF_inset, 1px_1px_0.5px_-1px_#FFFFFF_inset, -1px_-1px_0px_-0.5px_#262626_inset, 1px_1px_0px_-0.5px_#333333_inset, 0_1px_8px_0_#0000001F, 0_0_2px_0_#0000001A] mx-3 h-full">
                <div className='font-medium capitalize text-[clamp(30px,3vw,33px)] mb-3'>Local & Authentic</div>
                <div className='text-[clamp(14px,1.5vw,17px)] mb-2'>We partner with the best local vendors to provide authentic cultural experiences that support the community and respect the environment.</div>
                <img className="bottom-card absolute bottom-[5px] right-[5px] h-[58px] w-[58px]" src={squre3} alt="squre-3"></img>
              </div>
            </div>
           </Slider>}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeAdventure