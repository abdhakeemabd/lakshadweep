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
import PackagesList from './admin-panel/pages/packages-list';
import CreatePackage from './admin-panel/pages/package-create';
import PackageView from './admin-panel/pages/package-view';
import AllSlot from './admin-panel/pages/all-slot';
import EntityManagement from './admin-panel/pages/Entity-Management';
import AddCatagory from './admin-panel/pages/add-catagory';
import DayShadule from './admin-panel/pages/day-shadule';
import BookingList from './admin-panel/pages/booking-list';
import UpdateCatagory from './admin-panel/pages/update-catatory';
import Location from './admin-panel/pages/location';
import HomePageBanner from './admin-panel/pages/home-page-banner';
import AdminGallery from './admin-panel/pages/admin-gallery';
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import AdminLayout from './admin-panel/component/admin-layout';
import UpdatePackage from './admin-panel/pages/package-edit';
import CartPage from './pages/cart';
import ProfileEdit from './pages/profile-edit';

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
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/gallery' element={<Gallery />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/faq' element={<Faq />} />
        <Route path='/packages' element={<Packages />} />
        <Route path='/profile' element={<Profile hubMode={true} />} />
        <Route path='/upcoming-bookings' element={<Profile />} />
        <Route path='/booking-history' element={<BookingHistory />} />
        <Route path='/saved-experiences' element={<SavedExperiences />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/profile-edit' element={<ProfileEdit />} />
        <Route path='/admin' element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route index element={<Dashboard />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='vendor/list' element={<VendorList />} />
          <Route path='vendor/view/:id' element={<VendorView />} />
          <Route path='vendor/edit/:id' element={<VendorEdit />} />
          <Route path='vendor/add' element={<AddVendor />} />
          <Route path='packages-list' element={<PackagesList />} />
          <Route path='packages/add' element={<CreatePackage />} />
          <Route path='packages/edit' element={<UpdatePackage />} />
          <Route path='packages/view' element={<PackageView />} />
          <Route path='all-slots' element={<AllSlot />} />
          <Route path='day-schedule' element={<DayShadule />} />
          <Route path='bookings-list' element={<BookingList />} />
          <Route path='customers-list' element={<VendorList />} />
          <Route path='all-customer' element={<AllCustomer />} />
          <Route path='customer-view' element={<CustomerView />} />
          <Route path='users' element={<UserList />} />
          <Route path='enquiries' element={<Enquiries />} />
          <Route path='notifications-list' element={<Notification />} />
          <Route path='setting/categories' element={<EntityManagement />} />
          <Route path='setting/add-catagory' element={<AddCatagory />} />
          <Route path='setting/edit-catagory' element={<UpdateCatagory />} />
          <Route path='setting/location' element={<Location />} />
          <Route path='setting/content-management' element={<HomePageBanner />} />
          <Route path='setting/content-gallery' element={<AdminGallery />} />
          <Route path='payments-list' element={<Payment />} />
        </Route>


        <Route path='/user/login' element={<AdminLogin />} />

      </Routes>

      {!isAdminPath && !isLoginPath && <Footer />}
    </>
  )
}

export default App
