import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../component/protected-route';
import AdminLayout from '../admin-panel/component/admin-layout';

import Home from '../pages/home';
import Gallery from '../pages/gallery';
import About from '../pages/about';
import Contact from '../pages/contact';
import Faq from '../pages/faq';
import Packages from '../pages/packages';
import Profile from '../pages/profile';
import BookingHistory from '../pages/booking-history';
import SavedExperiences from '../pages/saved-experiences';
import CartPage from '../pages/cart';
import ProfileEdit from '../pages/profile-edit';

import Dashboard from '../admin-panel/pages/dashboard';
import VendorList from '../admin-panel/pages/vendor-list';
import VendorView from '../admin-panel/pages/vendor-view';
import VendorEdit from '../admin-panel/pages/vendor-edit';
import AddVendor from '../admin-panel/pages/add-vendor';
import AdminLogin from '../admin-panel/pages/admin-login';
import AllCustomer from '../admin-panel/pages/all-customer';
import UserList from '../admin-panel/pages/user-list';
import Enquiries from '../admin-panel/pages/Enquiries';
import CustomerView from '../admin-panel/pages/customer-view';
import Payment from '../admin-panel/pages/payment';
import Notification from '../admin-panel/pages/notification';
import PackagesList from '../admin-panel/pages/packages-list';
import CreatePackage from '../admin-panel/pages/package-create';
import PackageView from '../admin-panel/pages/package-view';
import AllSlot from '../admin-panel/pages/all-slot';
import EntityManagement from '../admin-panel/pages/Entity-Management';
import AddCatagory from '../admin-panel/pages/add-catagory';
import DayShadule from '../admin-panel/pages/day-shadule';
import BookingList from '../admin-panel/pages/booking-list';
import UpdateCatagory from '../admin-panel/pages/update-catatory';
import Location from '../admin-panel/pages/location';
import HomePageBanner from '../admin-panel/pages/home-page-banner';
import AdminGallery from '../admin-panel/pages/admin-gallery';
import UpdatePackage from '../admin-panel/pages/package-edit';

const AppRoutes = () => {
  return (
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
        <Route path='packages/edit/:id' element={<UpdatePackage />} />
        <Route path='packages/view/:id' element={<PackageView />} />
        <Route path='all-slots' element={<AllSlot />} />
        <Route path='day-schedule' element={<DayShadule />} />
        <Route path='bookings-list' element={<BookingList />} />
        <Route path='customers-list' element={<VendorList />} />
        <Route path='all-customer' element={<AllCustomer />} />
        <Route path='customer-view/:id' element={<CustomerView />} />
        <Route path='users' element={<UserList />} />
        <Route path='enquiries' element={<Enquiries />} />
        <Route path='notifications-list' element={<Notification />} />
        <Route path='setting/categories' element={<EntityManagement />} />
        <Route path='setting/add-catagory' element={<AddCatagory />} />
        <Route path='setting/edit-catagory/:id' element={<UpdateCatagory />} />
        <Route path='setting/location' element={<Location />} />
        <Route path='setting/content-management' element={<HomePageBanner />} />
        <Route path='setting/content-gallery' element={<AdminGallery />} />
        <Route path='payments-list' element={<Payment />} />
      </Route>
      <Route path='/user/login' element={<AdminLogin />} />
    </Routes>
  );
};

export default AppRoutes;
