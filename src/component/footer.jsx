import React from 'react'
import Whatsapp from '../assets/icons/whatsapp-icon.svg'
function Footer() {
  return (
    <footer className='py-5 lg:py-10 bg-[#0F2446] text-white'>
      <a href="https://wa.me/911234567890" target="_blank" rel="noreferrer" className="fixed bottom-6 right-6 w-14 h-14 rounded-full  flex items-center justify-center shadow-lg hover:scale-105 transition-transform ">
        <img src={Whatsapp} alt="whatsapp" />
      </a>
      <div className="container m-auto px-3">
         <div class="text-center mb-3">
            <p class="m-0 text-sm md:text-base">
              © 2026 Go Rogue. All Rights Reserved.
            </p>
          </div>
        <div class="flex flex-col md:flex-row items-center justify-center text-center">
          <div class="md:order-2 order-1 mb-3 md:mb-0 md:w-2/3">
            <ul class="flex flex-wrap justify-center gap-4 text-sm md:text-base">
              <li><a href="/gallery/" aria-label="Gallery" class="hover:underline">Gallery</a></li>
              <li><a href="/about/" aria-label="About Us" class="hover:underline">About Us</a></li>
              <li><a href="/faq/" aria-label="FAQ" class="hover:underline">FAQ</a></li>
              <li><a href="/terms-of-services/" aria-label="Terms of Service" class="hover:underline">Terms of Service</a></li>
              <li><a href="/contact/" aria-label="Contact Us" class="hover:underline">Contact Us</a></li>
              <li><a href="/refund-policy/" aria-label="Refund Policy" class="hover:underline">Refund Policy</a></li>
              <li><a href="/privacy-policy/" aria-label="Privacy Policy" class="hover:underline">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer