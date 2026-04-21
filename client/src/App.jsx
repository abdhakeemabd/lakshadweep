import { useEffect } from 'react';
import './App.css';
import Header from './component/header';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useLocation } from 'react-router-dom';
import Footer from './component/footer';
import ScrollToTop from './component/scroll-to-top';
import ScrollTopButton from './component/scroll-top-button';
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import AppRoutes from './routes/AppRoutes';

function App() {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');
  const isLoginPath = location.pathname === '/user/login';
  const isProfilePage = ['/profile', '/upcoming-bookings', '/booking-history', '/saved-experiences', '/cart', '/profile-edit'].includes(location.pathname);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      offset: 10,
    });
  }, []);

  useEffect(() => {
    if (isAdminPath) {
      document.body.style.backgroundColor = '#f6f6f7';
    } else {
      document.body.style.backgroundColor = '#fff';
    }
  }, [isAdminPath]);

  return (
    <>
      <ScrollToTop />
      <ScrollTopButton />

      {!isAdminPath && !isLoginPath && (
        <div className={isProfilePage ? "hidden lg:block" : ""}>
          <Header />
        </div>
      )}

      <AppRoutes />

      {!isAdminPath && !isLoginPath && <Footer />}
    </>
  );
}

export default App;

