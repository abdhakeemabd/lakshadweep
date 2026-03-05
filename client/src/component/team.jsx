import React from 'react'
import Slider from "react-slick"
import User from '../assets/icons/default-user-icon.png'

const staticBlogs = [
  {
    id: 1,
    title: "Alexis mishwells",
    catagory_name:"Founder & Chief Explorer",
    description: "Discover the most thrilling adventure destinations in Lakshadweep, from scuba diving in crystal-clear lagoons to kayaking through mangroves.",
    image: null,
  },
  {
    id: 2,
    title: "Alexis mishwells",
   catagory_name:"Founder & Chief Explorer",
    description: "Everything you need to know about island hopping in Lakshadweep — permits, ferries, best times to visit, and must-see islands.",
    image: null,
  },
  {
    id: 3,
    title: "Alexis mishwells",
    catagory_name:"Founder & Chief Explorer",
    description: "A beginner-friendly breakdown of snorkeling and scuba diving to help you choose the right underwater experience for your trip.",
    image: null,
  },
  {
    id: 4,
    title: "Alexis mishwells",
    catagory_name:"Founder & Chief Explorer",
    description: "Plan your perfect getaway by knowing the ideal season, weather conditions, and peak vs off-peak travel windows for Lakshadweep.",
    image: null,
  },
  {
    id: 5,
    title: "Alexis mishwells",
   catagory_name:"Founder & Chief Explorer",
    description: "From fresh seafood curries to coconut-infused delights, explore the authentic flavors that make Lakshadweep's food culture unique.",
    image: null,
  },
  {
    id: 6,
    title: "Alexis mishwells",
   catagory_name:"Founder & Chief Explorer",
    description: "Learn how eco-tourism initiatives are helping preserve the pristine coral reefs and biodiversity of this stunning island territory.",
    image: null,
  },
];

function Team() {
  const settings = {
    dots: false,
    infinite: staticBlogs.length > 4,
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
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className='pb-10 lg:py-20 bg-[#F5F5F5]'>
      <div className="container mx-auto px-3">
        <div className="grid grid-cols-12" data-aos="fade-up" data-aos-delay="400">
          <div className="col-span-12 mb-8">
            <h1 className='font-poppins text-[clamp(24px,4vw,35px)] text-center mb-3 lg:mb-5 font-medium text-[#0F2446]'>Meet the Core Team</h1>
          </div>
          <div className="col-span-12">
            <Slider {...settings} className='pt-3 team-slider'>
              {staticBlogs.map((team) => (
                <div key={team.id} className="px-3 mb-6 h-full">
                  <div className="team-card bg-white p-8 pb-2 text-center shadow-lg transition-all duration-500 ease-in-out hover:shadow-2xl hover:-translate-y-2 h-full flex flex-col items-center">
                    <div className="w-[124px] h-[124px] mb-6 rounded-full overflow-hidden shadow-[0_4px_10px_rgba(0,0,0,0.1)] border-4 border-white">
                      <img src={team.image ? `https://lms.studyjam.in/media/${team.image}` : User} alt={team.title} className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <h3 className="text-[clamp(14px,1.2vw,16px)] font-bold mb-1 text-[#0F2446] line-clamp-1">{team.title}</h3>
                    <div className="text-[#0F2446] font-medium text-sm mb-4 text-[clamp(13px,1vw,14px)]">{team.catagory_name}</div>
                    <p className="text-[#0F2446] text-[clamp(11px,0.9vw,12px)] leading-relaxed line-clamp-3">{team.description}</p>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Team
