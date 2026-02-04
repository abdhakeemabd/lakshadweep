import { Link } from 'react-router-dom'
import Whatsapp from '../assets/icons/whatsapp-icon.svg'
function Footer() {
  return (
    <footer className='py-5 lg:py-10 bg-[#0F2446] text-white'>
      <a href="https://wa.me/911234567890" target="_blank" rel="noreferrer" className="fixed bottom-6 right-6 w-14 h-14 rounded-full  flex items-center justify-center shadow-lg hover:scale-105 transition-transform ">
        <img src={Whatsapp} alt="whatsapp" />
      </a>
      <div className="container m-auto px-3">
         <div className="text-center mb-3">
            <p className="m-0 text-sm md:text-base">
              © 2026 Go Rogue. All Rights Reserved.
            </p>
          </div>
        <div className="flex flex-col md:flex-row items-center justify-center text-center">
          <div className="md:order-2 order-1 mb-3 md:mb-0 md:w-2/3">
            <ul className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
              <li><Link to="/gallery" aria-label="Gallery">Gallery</Link></li>
              <li><Link to="/about" aria-label="About Us">About Us</Link></li>
              <li><Link to="/faq" aria-label="FAQ">FAQ</Link></li>
              <li><Link to="/terms-of-services" aria-label="Terms of Service">Terms of Service</Link></li>
              <li><Link to="/contact" aria-label="Contact Us">Contact Us</Link></li>
              <li><Link to="/refund-policy" aria-label="Refund Policy">Refund Policy</Link></li>
              <li><Link to="/privacy-policy" aria-label="Privacy Policy">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer