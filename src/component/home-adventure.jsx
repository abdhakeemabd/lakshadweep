import React, { useState, useEffect } from 'react'
import bg from "../assets/bg/adventure-bg.webp";
import Slider from "react-slick";
import squre3 from "../assets/icons/squre-3.svg";

function HomeAdventure() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // 🔹 Adventure Cards Data (Ready for backend integration)
  const adventureData = [
    {
      id: 1,
      title: "Safety First, Always",
      description: "Your well-being is our top priority. All our partners are rigorously vetted, and our own trips adhere to the highest safety standards.",
      icon: squre3
    },
    {
      id: 2,
      title: "Exclusive Experiences",
      description: "From hidden caves to private dinners, our GoRogue Exclusive packages offer unique access and perks you won't find anywhere else.",
      icon: squre3
    },
    {
      id: 3,
      title: "Local & Authentic",
      description: "We partner with the best local vendors to provide authentic cultural experiences that support the community and respect the environment.",
      icon: squre3
    }
  ];

  const settings = {
    dots: false,
    infinite: false,
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
          slidesToScroll: 1,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true
        }
      }
    ]
  };

  return (
    <section className="bg-cover bg-center bg-no-repeat py-15 lg:py-20" style={{ backgroundImage: `url(${bg})` }}>
      <div className="container m-auto px-3">
        <div className="grid grid-cols-12">
          <div className="col-span-12 md:col-span-6 lg:col-span-8 mb-3 lg:mb-4 xl:mb-5" data-aos="fade-up" data-aos-delay="200">
            <h1 className='text-[50px] md:text-[60px] lg:text-[88px] text-white leading-[clamp(94%,3vw,85%)] font-medium mb-3'>
              Live the <span className='text-[#FF5C1A]'>#Adventure</span>, Redefined
            </h1>
          </div>
          <div className="col-span-12 min-w-0" data-aos="fade-up" data-aos-delay="400">
            {mounted && (
              <Slider {...settings} className='advanture-slider'>
                {adventureData.map((item) => (
                  <div key={item.id} className="slide h-full">
                    <div className="advanture-card h-full flex flex-col px-[25px] py-[26px] min-h-[200px] text-white bg-[#0f0f0f69] bg-blend-luminosity backdrop-blur-[12px] transition-all duration-[400ms] shadow-[0_0_16px_0_#F2F2F2_inset, 0_0_3px_0_#FFFFFF80_inset, -1px_-1px_0.5px_-1px_#FFFFFF_inset, 1px_1px_0.5px_-1px_#FFFFFF_inset, -1px_-1px_0px_-0.5px_#262626_inset, 1px_1px_0px_-0.5px_#333333_inset, 0_1px_8px_0_#0000001F, 0_0_2px_0_#0000001A] mx-3 relative">
                      <div className='font-medium capitalize text-[clamp(30px,3vw,33px)] mb-3'>
                        {item.title}
                      </div>
                      <div className='text-[clamp(14px,1.5vw,17px)] mb-2'>
                        {item.description}
                      </div>
                      <img className="bottom-card absolute bottom-[5px] right-[5px] h-[58px] w-[58px]" src={item.icon} alt={item.title} />
                    </div>
                  </div>
                ))}
              </Slider>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeAdventure