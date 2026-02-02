import React from 'react'
import Slider from "react-slick"
import User from '../assets/icons/default-user-icon.png'

function Team() {
  const teamData = [
    {
      id: 1,
      image: User,
      name: "Alexis Mishwells",
      position: "Founder & Chief Explorer",
      description: "A native islander with a passion for showing the world the true spirit of Lakshadweep."
    },
    {
      id: 2,
      image: User,
      name: "Sarah Johnson",
      position: "Adventure Coordinator",
      description: "Expert in crafting personalized island experiences with over 10 years of tourism expertise."
    },
    {
      id: 3,
      image: User,
      name: "Rahul Sharma",
      position: "Marine Life Specialist",
      description: "Certified diving instructor passionate about marine conservation and underwater exploration."
    },
    {
      id: 4,
      image: User,
      name: "Priya Menon",
      position: "Cultural Experience Manager",
      description: "Dedicated to preserving and sharing the rich cultural heritage of Lakshadweep islands."
    }
  ];

  // 🔹 Slider Settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <section className='py-10 lg:py-20 bg-[#F5F5F5]'>
      <div className="container mx-auto px-3">
        <div className="grid grid-cols-12">
          <div className="col-span-12 mb-8 lg:mb-12">
            <h1 className='font-poppins font-medium text-[clamp(24px,calc(24px+(35-24)*((100vw-320px)/(1440-320))),35px)] text-center mb-3 lg:mb-5 font-semibold'>
              Meet the Core Team
            </h1>
          </div>
          <div className="col-span-12">
            <Slider {...settings} className='pt-3'>
              {teamData.map((member) => (
                <div key={member.id} className="px-3 mb-3">
                  <div className="team-card bg-[#FEFEFE] p-[20px_15px] text-center shadow-[0px_1px_4px_rgba(0,0,0,0.16)] transition-all duration-300 ease-in-out hover:shadow-[0px_4px_12px_rgba(0,0,0,0.2)] hover:-translate-y-1 h-full">
                    <img 
                      src={member.image} 
                      loading="lazy" 
                      alt={member.name} 
                      className='w-[124px] aspect-square rounded-full object-cover mb-5 border-4 border-white shadow-[0_4px_10px_rgba(0,0,0,0.1)] mx-auto'
                    />
                    <div className="text-[clamp(14px,1.2vw,16px)] font-bold mb-2 text-[#0F2446]">
                      {member.name}
                    </div>
                    <div className="text-[clamp(13px,1vw,14px)] text-[#0F2446] font-medium mb-3">
                      {member.position}
                    </div>
                    <p className="text-[clamp(11px,0.9vw,12px)] font-weight-[300] text-[#0F2446] leading-[1.5] mb-3">
                      {member.description}
                    </p>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Team