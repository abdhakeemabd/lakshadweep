import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import AdventureBg from "../assets/bg/adventure-bg.webp";
import HeartIcon from "../assets/icons/like.svg";
import Map from "../assets/icons/map-w.svg";

function HomeRush() {
  const [rushData, setRushData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExclusivePackages = async () => {
      try {
        let allPackages = [];
        let currentPage = 1;
        let hasNextPage = true;

        while (hasNextPage) {
          const response = await fetch(`/homepage-api/homepage/packages/?page=${currentPage}`, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'ngrok-skip-browser-warning': 'true',
            },
          });
          
          if (!response.ok) throw new Error('Failed to fetch packages');

          const data = await response.json();
          
          if (data.status && Array.isArray(data.packages)) {
            allPackages = [...allPackages, ...data.packages];
          }
          
          if (data.has_next) {
            currentPage += 1;
          } else {
            hasNextPage = false;
          }
        }
        setRushData(allPackages);
      } catch (err) {
        console.error('Error fetching packages:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchExclusivePackages();
  }, []);

  const settings = {
    dots: true,
    infinite: rushData.length > 3,
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
          infinite: rushData.length > 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: rushData.length > 1,
        },
      },
    ],
  };

  const stripHtml = (html) => {
    if (!html) return "";
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };

  return (
    <section className="rush_sec py-20 bg-[#122544]">
      <div className="container m-auto px-3">
        <div className="grid grid-cols-12">
          <div className="col-span-12 text-center mb-3 md:mb-4 lg:mb-5" data-aos="fade-up" data-aos-delay="400">
            <h1 className="text-[50px] md:text-[60px] lg:text-[88px] text-white leading-[clamp(94%,3vw,85%)] font-medium mb-3">Find Your <span className="text-[#FF5C1A]">Rush</span></h1>
            <p className="text-[clamp(14px,1.5vw,17px)] text-white font-semibold mb-3 lg:mb-4">We've curated the best experiences Lakshadweep has to offer. Your next story begins now.</p>
            <div className="text-[clamp(20px,22vw,24px)] text-white mb-3 font-semibold leading-[clamp(94%,3vw,85%)]">Gorogue Exclusive</div>
          </div>
          <div className="col-span-12">
            {loading ? (
              <div className="flex justify-center items-center py-10">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white"></div>
              </div>
            ) : rushData.length > 0 ? (
              <Slider className="slick_rush" {...settings}>
                {rushData.map((item) => {
                  let img = item.image || item.package_banner || item.banner || item.image_url || item.package_image;
                  let imageUrl = AdventureBg;
                  
                  if (img && typeof img === 'string') {
                    if (img.startsWith('http')) {
                      if (img.includes('localhost') || img.includes('127.0.0.1') || img.includes('ngrok-free.dev') || img.includes('devtunnels.ms')) {
                         // Convert absolute local/dev URL to relative for the proxy
                         try {
                           const urlObj = new URL(img);
                           imageUrl = urlObj.pathname + urlObj.search;
                         } catch(e) { imageUrl = img; }
                      } else {
                         imageUrl = img;
                      }
                    } else {
                      imageUrl = img;
                    }

                    // Ensure relative paths start with /media if needed
                    if (typeof imageUrl === 'string' && !imageUrl.startsWith('http')) {
                      if (!imageUrl.startsWith('/media') && !imageUrl.startsWith('media')) {
                        imageUrl = imageUrl.startsWith('/') ? `/media${imageUrl}` : `/media/${imageUrl}`;
                      } else {
                        imageUrl = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`;
                      }
                    }
                  }
                  
                  const tags = [item.category, item.activity].filter(Boolean);
                  const priceStr = item.price ? `₹${item.price.toLocaleString('en-IN')}` : "Contact for price";
                  
                  return (
                    <div className="slide h-full" key={item.id} data-aos="fade-up" data-aos-delay="400">
                      <div className="rush-card h-full flex flex-col transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.03] hover:shadow-xl transform-gpu mx-3 lg:mx-4 xl:mx-5 relative overflow-hidden bg-white text-[#454545]">
                        <div className="img-card relative w-full overflow-hidden aspect-[340/192] lg:aspect-[399/226]">
                          <img src={imageUrl} alt={item.title} className="w-full h-full object-cover" />
                          <div className="flex justify-between absolute top-3 left-3 right-3 z-10">
                            <div>
                              <div className="tag px-[13px] py-[8px] bg-[#EB0D0D] text-white font-bold text-[11px]">GoRogue Exclusive</div>
                            </div>
                            <button className="Like-btn"><img src={HeartIcon} alt="Like" /></button>
                          </div>
                          <div className="absolute bottom-3 left-3 right-3 z-10">
                            <h3 className="text-white text-[clamp(20px,2vw,24px)] font-semibold mb-2">{item.title}</h3>
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <img src={Map} alt="Location" />
                                <span className="text-white text-[11px] font-medium">{item.island || 'N/A'}</span>
                              </div>
                              <span className="text-white text-[11px] font-medium">({item.reviews || '700+'})</span>
                            </div>
                          </div>
                        </div>
                        <div className="card-body flex flex-col flex-grow p-4">
                          <div className="flex flex-wrap gap-2 mb-3">
                            {tags.map((tag, index) => (
                              <div key={index} className="bg-[#F8F8F8] text-[11px] font-medium px-[10px] py-[5px] uppercase">{tag}</div>
                            ))}
                          </div>
                          <p className="text-[13px] leading-[22px] mb-4 flex-grow text-[#666] line-clamp-3">{stripHtml(item.description)}</p>
                          <div className="flex justify-between items-center mt-auto">
                            <div className='font-semibold text-black text-[clamp(14px,3vw,18px)] leading-[85%]'>{priceStr} / <span className='text-[clamp(9px,2vw,10px)] font-normal text-black leading-[85%]'>Per person</span></div>
                            <Link to="/packages" className="font-semibold bg-[#F8F8F8] border border-[#F4F4F4] text-[#3B2B3B] text-[14px] px-[20px] py-[10px] uppercase hover:bg-[#FF5C1A] hover:text-white transition-all duration-300"> Book Now</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </Slider>
            ) : (
              <p className="text-white text-center py-10 font-medium">No exclusive packages found.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeRush;
