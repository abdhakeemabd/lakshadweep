import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";

// Images
import AdventureBg from "../assets/bg/adventure-bg.webp";
import PlaneBg from "../assets/bg/paln-bg.webp";

// Icons
import HeartIcon from "../assets/icons/like.svg";
import Map from "../assets/icons/map-w.svg";

function HomeRush() {
  // 🔹 Slider Settings
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
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // 🔹 Card Data
  const rushData = [
    {
      id: 1,
      image: AdventureBg,
      title: "Glass-Bottom Boat & Snorkel",
      location: "Agatti",
      reviews: "700+",
      price: "₹8,900",
      tags: ["Travel & Tourism", "Coral Reef Exploration"],
      description:
        "Enjoy a peaceful nature walk while learning about Lakshadweep’s marine life and sea turtle conservation.",
    },
    {
      id: 2,
      image: PlaneBg,
      title: "Glass-Bottom Boat & Snorkel",
      location: "Agatti",
      reviews: "700+",
      price: "₹8,900",
      tags: ["Travel & Tourism", "Coral Reef Exploration"],
      description:
        "Enjoy a peaceful nature walk while learning about Lakshadweep’s marine life and sea turtle conservation.",
    },
    {
      id: 3,
      image: AdventureBg,
      title: "Glass-Bottom Boat & Snorkel",
      location: "Agatti",
      reviews: "700+",
      price: "₹8,900",
      tags: ["Travel & Tourism", "Coral Reef Exploration"],
      description:
        "Enjoy a peaceful nature walk while learning about Lakshadweep’s marine life and sea turtle conservation.",
    },
    {
      id: 4,
      image: AdventureBg,
      title: "Glass-Bottom Boat & Snorkel",
      location: "Agatti",
      reviews: "700+",
      price: "₹8,900",
      tags: ["Travel & Tourism", "Coral Reef Exploration"],
      description:
        "Enjoy a peaceful nature walk while learning about Lakshadweep’s marine life and sea turtle conservation.",
    },
  ];

  return (
    <section className="rush_sec py-20 bg-[#122544]">
      <div className="container m-auto px-3">
        <div className="grid grid-cols-12">
          {/* 🔹 Heading */}
          <div className="col-span-12 text-center mb-3 md:mb-4 lg:mb-5">
            <h1 className="text-[50px] md:text-[60px] lg:text-[88px] text-white leading-[clamp(94%,3vw,85%)] font-medium mb-3">
              Find Your <span className="text-[#FF5C1A]">Rush</span>
            </h1>

            <p className="text-[clamp(14px,1.5vw,17px)] text-white font-semibold mb-3 lg:mb-4">
              We've curated the best experiences Lakshadweep has to offer. Your
              next story begins now.
            </p>

            <div className="text-[clamp(20px,22vw,24px)] text-white mb-3 font-semibold leading-[clamp(94%,3vw,85%)]">
              Gorogue Exclusive
            </div>
          </div>
          <div className="col-span-12">
            <Slider className="slick_rush" {...settings}>
              {rushData.map((item) => (
                <div className="slide" key={item.id}>
                  <div className="rush-card hover:scale-102 transition-all duration-300 ease-in-out mx-3 lg:mx-4 xl:mx-5 relative overflow-hidden shadow-[0px_0px_4px_0px_#00000040] bg-white text-[#454545]">
                    <div className="img-card relative aspect-[399/226] w-full">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      <div className="flex justify-between absolute top-3 left-3 right-3 z-10">
                        <div>
                          <div className="tag px-[13px] py-[8px] bg-[#EB0D0D] text-white font-bold text-[11px]">
                            GoRogue Exclusive
                          </div>
                        </div>
                        <button className="Like-btn">
                          <img src={HeartIcon} alt="Like" />
                        </button>
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 z-10">
                        <h3 className="text-white text-[clamp(20px,2vw,24px)] font-semibold mb-2">
                          {item.title}
                        </h3>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <img src={Map} alt="Location" />
                            <span className="text-white text-[11px] font-medium">
                              {item.location}
                            </span>
                          </div>
                          <span className="text-white text-[11px] font-medium">
                            ({item.reviews})
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="px-3 py-3">
                      <div className="flex px-3 gap-2 mb-3">
                        {item.tags.map((tag, index) => (
                          <div key={index} className="bg-[#F8F8F8] text-[12px] font-medium px-[10px] py-[5px] uppercase">{tag}</div>
                        ))}
                      </div>
                      <p className="text-[13px] leading-[24px] mb-4">{item.description}
                      </p>
                      <div className="flex justify-between items-center mt-4">
                        <div className='font-semibold text-black text-[clamp(14px,3vw,18px)] leading-[85%]'>
                          {item.price} / <span className='text-[clamp(9px,2vw,10px)] font-normal text-black leading-[85%]'>Per person</span>
                        </div>
                        <Link to="#" className="font-semibold bg-[#F8F8F8] border border-[#F4F4F4] text-[#3B2B3B] text-[14px] px-[20px] py-[10px] uppercase hover:bg-[#FF5C1A] hover:text-white transition-all duration-300"> Book Now
                        </Link>
                      </div>
                    </div>
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

export default HomeRush;
