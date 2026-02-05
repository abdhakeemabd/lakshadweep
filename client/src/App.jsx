import { useEffect } from 'react'
import './App.css'
import Header from './component/header'
import Home from './pages/home'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { Route, Routes } from 'react-router-dom'
import Footer from './component/footer';
import Gallery from './pages/gallery';
import About from './pages/about';
import Contact from './pages/contact';
import ScrollToTop from './component/scroll-to-top';
import ScrollTopButton from './component/scroll-top-button';
import Faq from './pages/faq';
import Packages from './pages/packages';
import Profile from './pages/profile';
import BookingHistory from './pages/booking-history';
import SavedExperiences from './pages/saved-experiences';
import VendorList from './admin-panel/pages/vendor-list';
function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      offset: 10,
    });
  }, []);
  return (
    <>
      <ScrollToTop />
      <ScrollTopButton />
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/gallery' element={<Gallery />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/faq' element={<Faq />} />
        <Route path='/packages' element={<Packages />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/booking-history' element={<BookingHistory />} />
        <Route path='/saved-experiences' element={<SavedExperiences />} />
        <Route path='/admin/vendors-list' element={<VendorList />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App
