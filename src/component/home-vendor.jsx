import React, { useState } from 'react'
import Slider from "react-slick";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AdventureBg from '../assets/bg/adventure-bg.webp'
import PlaneBg from '../assets/bg/paln-bg.webp'
import HeartIcon from '../assets/icons/like.svg'
import Map from '../assets/icons/map-w.svg'
import { Link } from 'react-router-dom';

function HomeVendor() {
  const [startDate, setStartDate] = useState(null);
  const [selectedIsland, setSelectedIsland] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  const vendorList = [
    {
      img: AdventureBg,
      tag: "GoRogue Exclusive",
      title: "Glass-Bottom Boat & Snorkel",
      location: "Agatti",
      count: "(700+)",
      categories: ["Travel & Tourism", "Coral Reef Exploration"],
      description: "Enjoy a peaceful nature walk while learning about Lakshadweep’s marine life and sea turtle conservation.",
      price: "₹8,900",
      unit: "Per person"
    },
    {
      img: PlaneBg,
      tag: "GoRogue Exclusive",
      title: "Scuba Diving Adventure",
      location: "Kavaratti",
      count: "(500+)",
      categories: ["Water Sports", "Adventure"],
      description: "Experience the vibrant underwater world with our professional scuba diving instructors.",
      price: "₹4,500",
      unit: "Per person"
    },
    {
      img: AdventureBg,
      tag: "GoRogue Exclusive",
      title: "Island Hopping Tour",
      location: "Minicoy",
      count: "(300+)",
      categories: ["Sightseeing", "Cultural"],
      description: "Explore the beautiful islands of Lakshadweep and immerse yourself in the local culture.",
      price: "₹12,000",
      unit: "Per group"
    },
    {
      img: AdventureBg,
      tag: "GoRogue Exclusive",
      title: "Kayak Rental Service",
      location: "Kadmat",
      count: "(150+)",
      categories: ["Rentals", "Paddle Sports"],
      description: "Rent a kayak and paddle through the crystal clear lagoons at your own pace.",
      price: "₹1,200",
      unit: "Per hour"
    },
    {
      img: AdventureBg,
      tag: "GoRogue Exclusive",
      title: "Sunset Cruise",
      location: "Kalpeni",
      count: "(400+)",
      categories: ["Relaxation", "Cruise"],
      description: "Witness the breathtaking sunset over the horizon from the comfort of our luxury boat.",
      price: "₹3,000",
      unit: "Per person"
    },
  ];
  const Card = ({ data }) => (
    <div className="rush-card hover:scale-102 transition-all duration-300 ease-in-out relative overflow-hidden shadow-[0px_0px_4px_0px_#00000040] bg-white transition-all duration-[400ms] text-[#454545] mx-3 mx-sm-0" data-aos="fade-up" data-aos-delay="400">
      <div className="card-head">
        <div className="img-card relative aspect-[399/226] w-full">
          <img className='w-full h-full object-cover' src={data.img} alt={data.title} />
          <div className="top-card items-strat flex gap-2 justify-between absolute top-3 z-1 left-3 right-3">
            <div>
              <div className="tag px-[13px] py-[8px] bg-[#EB0D0D] text-white font-bold text-[11px] leading-none">{data.tag}</div>
            </div>
            <button className="Like-btn">
              <img src={HeartIcon} alt="Heart Icon" />
            </button>
          </div>
          <div className="cont absolute bottom-3 left-3 right-3 z-2">
            <div className='text-white text-[clamp(20px,2vw,24px)] font-semibold mb-2'>{data.title}</div>
            <div className="flex justify-between items-center gap-2">
              <div className="flex items-center gap-2">
                <img src={Map} alt="Location" />
                <span className='text-white text-[clamp(10px,11px,11px)] font-medium'>{data.location}</span>
              </div>
              <div className='text-white text-[clamp(10px,11px,11px)] font-medium'>{data.count}</div>
            </div>
          </div>
        </div>
      </div>
      <div className='card-body px-3 py-3 bg-white'>
        <div className='flex flex-wrap px-3 gap-3 justify-between items-center mb-3'>
          {data.categories.map((cat, idx) => (
            <div key={idx} className="bg-[#F8F8F8] text-[clamp(10px,2vw,12px)] font-medium px-[10px] py-[5px] uppercase leading-[27px]">{cat}</div>
          ))}
        </div>
        <div className="font-normal text-[13px] leading-[24px] tracking-normal align-middle mb-3 lg:mb-4 xl:mb-5">{data.description}</div>
        <div className="flex justify-between items-center gap-2 mt-5">
          <div className='font-semibold text-black text-[clamp(14px,3vw,18px)] leading-[85%]'>
            {data.price} / <span className='text-[clamp(9px,2vw,10px)] font-normal text-black leading-[85%]'>{data.unit}</span>
          </div>
          <Link to="/packages" className='font-semibold bg-[#F8F8F8] border border-[#F4F4F4] text-[#3B2B3B] text-[14px] px-[20px] py-[10px] text-center rounded-none uppercase transition-all duration-[400ms] hover:bg-[#FF5C1A] hover:text-white transition-all duration-300 ease-in-out'>Book Now</Link>
        </div>
      </div>
    </div>
  );
  return (
    <section className='rush_sec py-18'>
      <div className="container m-auto px-3">
        <div className="grid grid-cols-12 justify-center">
          <div className="col-span-12 text-center mb-3 md:mb-4 lg:mb-5 max-w-2xl mx-auto w-full">
            <h1 className='text-[24px] md:text-[30px] lg:text-[35px] text-black leading-[clamp(94%,3vw,85%)] font-medium mb-3' data-aos="fade-up" data-aos-delay="400">Go Rogue <span className='text-[#FF5C1A]'>Verified</span> Vendors</h1>
            <div className="relative max-w-4xl mx-auto mt-6 mb-10 z-[10] group">
              <div className="flex bg-white border border-blue-200 shadow-sm overflow-hidden focus-within:ring-2 focus-within:ring-blue-100" data-aos="fade-up" data-aos-delay="400">
                <input type="text" placeholder="Where do you want to go?" className="flex-1 px-5 py-3 text-gray-700 placeholder-gray-400 outline-none text-base" />
                <button className="bg-[#FF5C1A] text-white px-6 py-3 hover:bg-[#ff4500] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
                </button>
              </div>
              <div className="absolute top-full left-0 right-0 mt-2 bg-white shadow-xl border border-gray-100 p-6 z-[20] hidden group-focus-within:block hover:block text-left">
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Islands</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Agatti Island', 'Kavaratti Island', 'Minicoy', 'Androth', 'Kalpeni', 'Thinnakara Island', 'Amini Island', 'Chetlat Island', 'Minicoy Island', 'Kalpeni Island', 'Amitti Island', 'Suheli Par'].map((island, index) => (
                      <button key={index} onClick={() => setSelectedIsland(island)} className={`px-5 py-3 min-w-[130px] mb-2 rounded-full text-sm font-medium transition-colors border ${selectedIsland === island ? 'border-[#FF5C1A] text-[#FF5C1A] bg-[#FFF5F2]' : 'bg-gray-100 border-transparent text-gray-700 hover:bg-gray-200'}`}>{island}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Watersports', 'Island Adventure', 'Rentals', 'Experiences', 'Honeymoon', 'Culture & Wellness', 'Solo Traveller', 'Family & Kids Activities'].map((category, index) => (
                      <button key={index} onClick={() => setSelectedCategory(category)} className={`px-5 py-3 min-w-[130px] rounded-full text-sm font-medium transition-colors border ${selectedCategory === category ? 'border-[#FF5C1A] text-[#FF5C1A] bg-[#FFF5F2]' : 'bg-gray-100 border-transparent text-gray-700 hover:bg-gray-200'}`}>{category}</button>
                    ))}
                  </div>
                </div>
                <div className="mt-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Date</h3>
                  <div className="bg-[#F8F8F8] p-3 rounded-lg inline-block w-full max-w-xs relative custom-datepicker-container">
                    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} placeholderText="DD/MM/YYYY" className="bg-transparent outline-none w-full text-gray-600 font-medium placeholder-gray-400 cursor-pointer" dateFormat="dd/MM/yyyy" />
                  </div>
                </div>
                <div className="mt-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Price</h3>
                  <div className="py-4">
                    <div className="relative h-1 bg-gray-200 rounded">
                      <div className="absolute top-0 bottom-0 left-0 right-[20%] bg-[#FF5C1A] rounded"></div>
                      <div className="absolute top-1/2 -mt-2 -ml-2 left-0 w-5 h-5 bg-white border border-gray-200 rounded-full shadow cursor-pointer"></div>
                      <div className="absolute top-1/2 -mt-2 -ml-2 right-[20%] w-5 h-5 bg-white border border-gray-200 rounded-full shadow cursor-pointer"></div>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-4">
                    <div className="flex items-center bg-[#F8F8F8] rounded-md overflow-hidden p-1">
                      <span className="bg-[#3B3B3B] text-white px-3 py-1 text-sm rounded text-[13px] font-medium leading-[26px]">Min</span>
                      <input type="text" defaultValue="10" className="w-16 bg-transparent border-none text-center text-sm font-medium focus:outline-none" />
                    </div>
                    <div className="flex items-center bg-[#F8F8F8] rounded-md overflow-hidden p-1">
                      <span className="bg-[#3B3B3B] text-white px-3 py-1 text-sm rounded text-[13px] font-medium leading-[26px]">Max</span>
                      <input type="text" defaultValue="35000" className="w-16 bg-transparent border-none text-center text-sm font-medium focus:outline-none" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-12" data-aos="fade-up" data-aos-delay="400">
            <div className="block md:hidden">
              <Slider className='slick_rush' {...settings}>
                {vendorList.map((item, index) => (
                  <div key={index}>
                    <Card data={item} />
                  </div>
                ))}
              </Slider>
            </div>
            <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6">
              {vendorList.map((item, index) => (
                <Card key={index} data={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeVendor