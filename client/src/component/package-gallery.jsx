import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Packages from "../assets/bg/adventure-bg.webp";
import { Fancybox } from "@fancyapps/ui";

function PackageGallery() {

  useEffect(() => {
    Fancybox.bind("[data-fancybox]", {});
    return () => Fancybox.destroy();
  }, []);

  return (
    <section>
      <div className="container mx-auto px-3 py-18">
        <div className="grid grid-cols-12 justify-center gap-3">
          <div className="col-span-12 mb-3 md:mb-4 lg:mb-5" data-aos="fade-up" data-aos-delay="400">
            <nav className="flex gap-2 text-[16px] font-[Inter]">
              <Link to="/" className="text-[clamp(13px,1.9vw,18.22px)] text-[#A1A2A3] font-medium">Home</Link>
              <span className="text-black text-[clamp(13px,1.9vw,18.22px)] font-semibold">›</span>
              <Link to="/packages" className="text-[clamp(13px,1.9vw,18.22px)] text-[#A1A2A3] font-medium">Packages</Link>
              <span className="text-black text-[clamp(13px,1.9vw,18.22px)] font-semibold">›</span>
              <span className="text-black text-[clamp(13px,1.9vw,18.22px)] font-semibold">
                Kayak & Paddle – Kavaratti Lagoon
              </span>
            </nav>
          </div>
          <div className="col-span-12 lg:col-span-6" data-aos="fade-up" data-aos-delay="400">
            <div className="img-card aspect-[658/504] w-full overflow-hidden">
              <a href={Packages} data-fancybox="gallery">
                <img src={Packages} alt="Packages" className="w-full h-full object-cover cursor-zoom-in transition-transform duration-300 hover:scale-105" />
              </a>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-6" data-aos="fade-up" data-aos-delay="400">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 md:col-span-6">
                <div className="img-card aspect-[658/504] w-full overflow-hidden">
                  <a href={Packages} data-fancybox="gallery">
                    <img src={Packages} alt="Packages" className="w-full h-full object-cover cursor-zoom-in transition-transform duration-300 hover:scale-105" />
                  </a>
                </div>
              </div>
              <div className="col-span-12 md:col-span-6" data-aos="fade-up" data-aos-delay="400">
                <div className="img-card aspect-[658/504] w-full overflow-hidden">
                  <a href={Packages} data-fancybox="gallery">
                    <img src={Packages} alt="Packages" className="w-full h-full object-cover cursor-zoom-in transition-transform duration-300 hover:scale-105" />
                  </a>
                </div>
              </div>
              <div className="col-span-12 md:col-span-6" data-aos="fade-up" data-aos-delay="400">
                <div className="img-card aspect-[658/504] w-full overflow-hidden">
                  <a href={Packages} data-fancybox="gallery">
                    <img src={Packages} alt="Packages" className="w-full h-full object-cover cursor-zoom-in transition-transform duration-300 hover:scale-105" />
                  </a>
                </div>
              </div>
              <div className="col-span-12 md:col-span-6" data-aos="fade-up" data-aos-delay="400">
                <div className="img-card aspect-[658/504] w-full overflow-hidden">
                  <a href={Packages} data-fancybox="gallery">
                    <img src={Packages} alt="Packages" className="w-full h-full object-cover cursor-zoom-in transition-transform duration-300 hover:scale-105" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PackageGallery;
