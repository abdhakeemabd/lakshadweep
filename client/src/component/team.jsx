import React, { useState, useEffect } from 'react'
import Slider from "react-slick"
import User from '../assets/icons/default-user-icon.png'

function Team() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/blogs");
      if (!res.ok) throw new Error("Failed to fetch blog data");
      const data = await res.json();
      
      if (data.status) {
        // Combine latest blog and side blogs into one array
        const allBlogs = [];
        if (data.latest_blog) allBlogs.push(data.latest_blog);
        if (data.side_blogs) allBlogs.push(...data.side_blogs);
        setBlogs(allBlogs);
      } else {
        setBlogs([]);
      }
      setError(null);
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Helper function to strip HTML tags from description
  const stripHtml = (html) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  // 🔹 Slider Settings
  const settings = {
    dots: true,
    infinite: blogs.length > 4,
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
          <div className="col-span-12 mb-8 lg:mb-12" data-aos="fade-up">
            <h1 className='font-poppins text-[clamp(24px,4vw,35px)] text-center mb-3 lg:mb-5 font-bold text-[#0F2446]'>
              Our Latest Blogs
            </h1>
            <p className='text-center text-gray-600 max-w-2xl mx-auto'>
              Stay updated with the latest news, guides, and stories from our experts.
            </p>
          </div>

          <div className="col-span-12">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF5C1A]"></div>
              </div>
            ) : error ? (
              <div className="text-center py-20 text-red-500">
                <p>Error: {error}</p>
                <button 
                  onClick={fetchBlogs}
                  className="mt-4 px-6 py-2 bg-[#FF5C1A] text-white rounded-full hover:bg-[#e65217] transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <Slider {...settings} className='pt-3 team-slider'>
                {blogs.map((blog) => (
                  <div key={blog.id} className="px-3 mb-6 h-full">
                    <div className="team-card bg-white p-8 rounded-2xl text-center shadow-lg transition-all duration-500 ease-in-out hover:shadow-2xl hover:-translate-y-2 h-full flex flex-col items-center">
                      <div className="w-24 h-24 mb-6 rounded-full overflow-hidden border-4 border-[#FF5C1A]/10 p-1">
                        <img 
                          src={blog.image ? `https://lms.studyjam.in/media/${blog.image}` : User} 
                          alt={blog.title} 
                          className="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-300"
                        />
                      </div>
                      <h3 className="text-xl font-bold mb-1 text-[#0F2446] line-clamp-1">{blog.title}</h3>
                      <div className="text-[#FF5C1A] font-semibold text-sm mb-4 tracking-wide uppercase">{blog.category__name}</div>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow line-clamp-3">
                        {stripHtml(blog.description)}
                      </p>
                      <div className="flex gap-3 justify-center mt-auto">
                        <span className="text-xs text-gray-400">{blog.created_date}</span>
                      </div>
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

export default Team
