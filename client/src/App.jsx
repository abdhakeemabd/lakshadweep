import { useEffect } from 'react'
import './App.css'
import Header from './component/header'
import Home from './pages/home'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { Route, Routes, useLocation } from 'react-router-dom'
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
import VendorView from './admin-panel/pages/vendor-view';
import VendorEdit from './admin-panel/pages/vendor-edit';
import AddVendor from './admin-panel/pages/add-vendor';
import Dashboard from './admin-panel/pages/dashboard';
import ProtectedRoute from './component/protected-route';
import AdminLogin from './admin-panel/pages/admin-login';
import AllCustomer from './admin-panel/pages/all-customer';
import UserList from './admin-panel/pages/user-list';
import Enquiries from './admin-panel/pages/Enquiries';
import CustomerView from './admin-panel/pages/customer-view';
import Payment from './admin-panel/pages/payment';
import Notification from './admin-panel/pages/notification';
function App() {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

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
      {!isAdminPath && <Header />}
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
        <Route path='/admin' element={<ProtectedRoute />}>
          <Route index element={<Dashboard />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='vendor/list' element={<VendorList />} />
          <Route path='vendor/view/:id' element={<VendorView />} />
          <Route path='vendor/edit/:id' element={<VendorEdit />} />
          <Route path='vendor/add' element={<AddVendor />} />
          <Route path='packages-list' element={<VendorList />} />
          <Route path='slots-list' element={<VendorList />} />
          <Route path='bookings-list' element={<VendorList />} />
          <Route path='customers-list' element={<VendorList />} />
          <Route path='all-customer' element={<AllCustomer />} />
          <Route path='customer-view' element={<CustomerView />} />
          <Route path='users' element={<UserList />} />
          <Route path='enquiries' element={<Enquiries />} />
          <Route path='notifications-list' element={<Notification />} />
          <Route path='setting/categories' element={<VendorList />} />
          <Route path='setting/content-management' element={<VendorList />} />
          <Route path='payments-list' element={<Payment />} />
        </Route>

        <Route path='/user/login' element={<AdminLogin />} />

      </Routes>

      {!isAdminPath && <Footer />}
    </>
  )
}

export default App
