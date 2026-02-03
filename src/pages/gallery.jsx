import React from 'react'
import GalleryImg from '../assets/bg/adventure-bg.webp'

function Gallery() {
  // 🔹 Gallery Data (Ready for backend integration)
  const galleryData = [
    {
      id: 1,
      image: GalleryImg,
      alt: "Lakshadweep Beach View"
    },
    {
      id: 2,
      image: GalleryImg,
      alt: "Crystal Clear Waters"
    },
    {
      id: 3,
      image: GalleryImg,
      alt: "Island Paradise"
    },
    {
      id: 4,
      image: GalleryImg,
      alt: "Coral Reef Adventure"
    },
    {
      id: 5,
      image: GalleryImg,
      alt: "Sunset View"
    },
    {
      id: 6,
      image: GalleryImg,
      alt: "Water Sports"
    },
    {
      id: 7,
      image: GalleryImg,
      alt: "Beach Activities"
    },
    {
      id: 8,
      image: GalleryImg,
      alt: "Island Exploration"
    }
  ];

  return (
    <>
      <section className='py-10 lg:py-20'>
        <div className="container mx-auto px-3">
          <div className="grid grid-cols-12 justify-center">
            <div className="col-span-12 text-center mb-8 lg:mb-12" data-aos="fade-up" data-aos-delay="400">
              <h1 className='pt-md-5 pt-3 text-[clamp(58px,6vw,88px)] font-medium mb-5 text-[#0F2446]'>Our Gallery</h1>
              <div className="pt-0 text-[clamp(14px,2vw,18px)] text-[#0F2446] font-normal">
                We've curated the best experiences Lakshadweep has to offer. Your next story begins now.
              </div>
            </div>
            {galleryData.map((item) => (
              <div key={item.id} className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 mb-3 lg:mb-4 mx-2" data-aos="fade-up" data-aos-delay="400">
                <div className="gallery-card overflow-hidden hover:translate-y-[-5px] transition-transform duration-300 aspect-[315/416]">
                  <img src={item.image} alt={item.alt} className="w-full h-full object-cover aspect-square" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Gallery