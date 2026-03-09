import React, { useEffect, useState } from "react";
import GalleryImg from "../assets/bg/adventure-bg.webp";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

function Gallery() {

  const API_TOKEN = "8RWYE3BKLZCFIN2FHQNNQEAEWBNDY184TGNYTY6X";

  const [galleryData, setGalleryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🔹 Fancybox Init
  useEffect(() => {
    Fancybox.bind("[data-fancybox]", {});
    return () => {
      Fancybox.destroy();
    };
  }, []);

  // 🔹 Fetch gallery
  useEffect(() => {
    fetchGalleryData();
  }, []);

  const fetchGalleryData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        "/homepage-api/homepage/gallery/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${API_TOKEN}`,
            "ngrok-skip-browser-warning": "true",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch gallery: ${response.status}`);
      }

      const data = await response.json();
      console.log("Gallery API Response:", data);

      let galleryList = [];

      if (data.gallery && typeof data.gallery === "object" && !Array.isArray(data.gallery)) {
        galleryList = Object.entries(data.gallery).flatMap(([location, items]) =>
          Array.isArray(items) ? items.map(item => ({ ...item, location })) : []
        );
      } else if (Array.isArray(data)) {
        galleryList = data;
      } else if (data.gallery && Array.isArray(data.gallery)) {
        galleryList = data.gallery;
      } else if (data.data && Array.isArray(data.data)) {
        galleryList = data.data;
      } else if (data.results && Array.isArray(data.results)) {
        galleryList = data.results;
      } else if (data.data?.gallery && Array.isArray(data.data.gallery)) {
        galleryList = data.data.gallery;
      }

      setGalleryData(galleryList);

    } catch (err) {
      console.error("Gallery Fetch Error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-10 lg:py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex flex-col items-center">
          <div className="w-full text-center mb-10 lg:mb-16" data-aos="fade-up">
            <h1 className="text-[clamp(40px,6vw,88px)] font-medium mb-4 text-[#0F2446] leading-tight">Our Gallery</h1>
            <div className="max-w-4xl mx-auto text-[clamp(14px,1.5vw,18px)] text-[#0F2446]/80 font-normal">
              We've curated the best experiences Lakshadweep has to offer. Your next story begins now.
            </div>
          </div>
          <div className="grid grid-cols-12 gap-4 lg:gap-6 w-full">
            {loading && (
              <div className="col-span-12 flex flex-col items-center justify-center py-24">
                <div className="w-12 h-12 border-4 border-[#0F2446]/10 border-t-[#0F2446] rounded-full animate-spin mb-4"></div>
                <p className="text-[#0F2446] font-medium animate-pulse">Loading breathtaking views...</p>
              </div>
            )}
            {error && !loading && (
              <div className="col-span-12 text-center py-16 bg-red-50 rounded-2xl border border-red-100">
                <p className="text-red-500 font-medium mb-3">Unable to load gallery</p>
                <p className="text-red-400 text-sm mb-6">{error}</p>
                <button onClick={fetchGalleryData} className="px-6 py-2 bg-[#FF5C1A] text-white rounded-full hover:shadow-lg hover:shadow-orange-500/30 transition-all font-medium">Try Again</button>
              </div>
            )}
            {!loading && !error &&
              galleryData.map((item, index) => {
                let imageUrl = item.image || item.gallery_image || GalleryImg;
                if (typeof imageUrl === 'string') {
                  if (imageUrl.includes('localhost:8000') || imageUrl.includes('ngrok-free.dev') || imageUrl.includes('devtunnels.ms')) {
                    imageUrl = imageUrl.replace(/^https?:\/\/[^\/]+/, '');
                  }
                  if (!imageUrl.startsWith('http') && !imageUrl.startsWith('/') && imageUrl !== GalleryImg) {
                    imageUrl = `/${imageUrl}`;
                  }
                }
                return (
                  <div key={item.id || index} className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3" data-aos="fade-up" data-aos-delay={(index % 4) * 100}>
                    <div className="group relative overflow-hidden hover:shadow-xl transition-all duration-500 aspect-3/4">
                      <a href={imageUrl} data-fancybox="gallery" data-caption={item.caption || item.location || "Lakshadweep Gallery"} className="block w-full h-full">
                        <img src={imageUrl} alt={item.caption || item.alt || "gallery"} onError={(e) => { e.target.onerror = null; e.target.src = GalleryImg; }} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      </a>
                    </div>
                  </div>
                );
              })}
            {!loading && !error && galleryData.length === 0 && (
              <div className="col-span-12 text-center py-24 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                <div className="text-5xl mb-4">📸</div>
                <h2 className="text-[#0F2446] text-xl font-semibold mb-2">The Gallery is currently empty</h2>
                <p className="text-gray-500 max-w-md mx-auto">
                  Our team is busy capturing the stunning beauty of Lakshadweep.
                  Check back soon for new additions to our collection.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Gallery;