import React from "react";

export default function ContactPage() {
  return (
    <section className="w-full bg-white py-10 md:py-16 px-4">
      <div className="container-fluid mx-auto px-3 lg:px-20">
        <div className="md:text-center mb-14" data-aos="fade-up" data-aos-delay="400">
          <h1 className="text-[clamp(42px,5.5vw+0.5rem,60px)] font-semibold text-[#0F2446] mb-4">
            Get in Touch
          </h1>
          <p className="text-[clamp(12px,3vw,17px)] text-[#0F2446]/80 max-w-2xl mx-auto leading-relaxed">
            We'd love to hear from you. Whether you have a question about our adventures,
            pricing, or anything else, our team is ready to answer all your questions.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" data-aos="fade-up" data-aos-delay="400">
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 p-5 md:p-8 shadow-sm">
            <h3 className="text-[clamp(20px,2vw,26px)] font-semibold text-[#0F2446] mb-6">Send us a Message</h3>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#0F2446] mb-2">Full Name</label>
                <input type="text" placeholder="Enter Full Name" className="w-full h-11 rounded-lg border border-gray-200 px-4 text-sm outline-none focus:border-[#122544] focus:ring-1 focus:ring-[#122544]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#0F2446] mb-2">Email Address</label>
                <input type="email" placeholder="Enter Email" className="w-full h-11 rounded-lg border border-gray-200 px-4 text-sm outline-none focus:border-[#122544] focus:ring-1 focus:ring-[#122544]" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#0F2446] mb-2">Subject</label>
                <input type="text" placeholder="Question about package" className="w-full h-11 rounded-lg border border-gray-200 px-4 text-sm outline-none focus:border-[#122544] focus:ring-1 focus:ring-[#122544]" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#0F2446] mb-2">Message</label>
                <textarea rows="5" placeholder="Your message here" className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#122544] focus:ring-1 focus:ring-[#122544] resize-none" />
              </div>

              <div className="md:col-span-2 flex justify-end">
                <button type="submit" className="flex items-center gap-2 bg-[#122544] text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-[#0f1e36] transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M22 2L11 13" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M22 2L15 22 11 13 2 9l20-7z" />
                  </svg>
                  Send Message
                </button>
              </div>
            </form>
          </div>
          <div className="flex flex-col gap-6">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 flex gap-4 items-start order-3 md:order-1">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5s-3 1.343-3 3 1.343 3 3 3z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 11c0 7.5-7.5 11-7.5 11S4.5 18.5 4.5 11a7.5 7.5 0 1115 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-[#0F2446] mb-1">Our Office</h4>
                <p className="text-sm text-gray-600 leading-relaxed">Cyberpark, Park Centre, Kozhikode, <br />  Kerala 673016, India</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-6 flex gap-4 items-start order-1 md:order-2">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8" />
                  <rect width="18" height="14" x="3" y="5" rx="2" ry="2" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-[#0F2446] mb-1">Email Us</h4>
                <p className="text-sm text-gray-600">contact@gorogue.com</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-6 flex gap-4 items-start order-2 md:order-3">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2 5.5A2.5 2.5 0 014.5 3h2a2.5 2.5 0 012.5 2.5v1a2.5 2.5 0 01-2.5 2.5h-.5a11 11 0 005.5 5.5v-.5A2.5 2.5 0 0116.5 12h1a2.5 2.5 0 012.5 2.5v2A2.5 2.5 0 0117.5 19h-.5A14.5 14.5 0 012 4.5v1z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-[#0F2446] mb-1">Call Us</h4>
                <p className="text-sm text-gray-600">+91 123 456 7890</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
