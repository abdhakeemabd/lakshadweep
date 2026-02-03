import React, { useState } from 'react';
import Arrow from '../assets/icons/arr-btm-b.svg'
function Faq() {
  const accordionData = [
    {
      title: "Do I need a permit to visit Lakshadweep?",
      content:
        "When planning an adventure trip to Lakshadweep, it’s essential to know that the entire archipelago falls under restricted‐area regulations meaning all visitors, whether Indian nationals or foreign tourists, must obtain an entry permit from the Lakshadweep Administration before travel.",
    },
    {
      title: "What is the best time of year to visit?",
      content:
        "When planning an adventure trip to Lakshadweep, it’s essential to know that the entire archipelago falls under restricted‐area regulations meaning all visitors, whether Indian nationals or foreign tourists, must obtain an entry permit from the Lakshadweep Administration before travel.",
    },
    {
      title: "Are there ATMs available on the islands?",
      content:
        "When planning an adventure trip to Lakshadweep, it’s essential to know that the entire archipelago falls under restricted‐area regulations meaning all visitors, whether Indian nationals or foreign tourists, must obtain an entry permit from the Lakshadweep Administration before travel.",
    },
     {
      title: "What kind of mobile network connectivity can I expect?",
      content:
        "When planning an adventure trip to Lakshadweep, it’s essential to know that the entire archipelago falls under restricted‐area regulations meaning all visitors, whether Indian nationals or foreign tourists, must obtain an entry permit from the Lakshadweep Administration before travel.",
    },
     {
      title: "What is the cancellation policy for bookings?",
      content:
        "When planning an adventure trip to Lakshadweep, it’s essential to know that the entire archipelago falls under restricted‐area regulations meaning all visitors, whether Indian nationals or foreign tourists, must obtain an entry permit from the Lakshadweep Administration before travel.",
    },
     {
      title: "Are GoRogue Exclusive packages different from regular ones?",
      content:
        "When planning an adventure trip to Lakshadweep, it’s essential to know that the entire archipelago falls under restricted‐area regulations meaning all visitors, whether Indian nationals or foreign tourists, must obtain an entry permit from the Lakshadweep Administration before travel.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section>
      <div className="container mx-auto px-3 py-10 lg:py-20">
        <div className="grid grid-cols-12 justify-content-center">
          <div className="col-span-12  text-center mb-8 lg:mb-12" data-aos="fade-up" data-aos-delay="400">
            <h1 className="font-medium text-[60px] text-center leading-[85%] tracking-[-0.06em] mb-4 lg:mb-5">
              Frequently Asked Questions
            </h1>
            <div className="text-[#0F2446] font-inter text-base font-normal max-w-[600px] m-auto">
              Have questions? We've got answers. If you can't find what you're looking for, feel free to contact us.
            </div>
          </div>

          <div className="col-span-12 max-w-[900px] mx-auto space-y-4">
            {accordionData.map((item, index) => (
              <div key={index} className="border border-[#F1F2F9] rounded-[16px] p-[1.4rem] align-center overflow-hidden hover:translate-y-[-4px] shadow-[0_4px_10px_rgba(13,72,168,0.2)] duration-300">
                <button onClick={() => toggleAccordion(index)} className="w-full flex justify-between items-center text-left font-medium  transition">
                  <span className='text-[clamp(17px,2.5vw,20px)] font-semibold text-[#122544]'>{item.title}</span>
                  <span className={`transform transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`}>
                    <img className='bg-[#F1F2F9] p-3 rounded-full' src={Arrow} alt="Arrow" />
                  </span>
                </button>
                <div className={`px-4 overflow-hidden transition-all duration-300 ${ openIndex === index ? "max-h-40 py-3" : "max-h-0"}`}>
                  <p className="text-gray-600">{item.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Faq;
