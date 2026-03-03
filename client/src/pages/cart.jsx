import ProfileSidebar from '../component/profile-sidebar'
import { NavLink } from 'react-router-dom'
import React, { useState } from 'react'
import CartItem from '../component/cart-item'
import PackageImage from "../assets/admin-panel-icon/img/default-image.jpg"
function CartPage() {

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      badge: "package_booking_badge",
      image: PackageImage,
      title: "Lakshadweep Coral Escape",
      location: "Minicoy",
      pricePerPerson: 1100,
      basePrice: 1320,
      payLaterPerPerson: 1300,
      payableNowPerPerson: 20,
      packageId: 3
    },
    {
      id: 2,
      badge: "adventure_badge",
      image: PackageImage,
      title: "Scuba Diving Adventure",
      location: "Agatti Island",
      pricePerPerson: 2500,
      basePrice: 2800,
      payLaterPerPerson: 2500,
      payableNowPerPerson: 300,
      packageId: 4
    }
  ]);

  const handleDelete = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <section className='pt-4 pb-10 lg:py-20 bg-[#F5F5F5] min-h-screen'>
      <div className="container mx-auto px-3">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-4 xl:col-span-3 hidden lg:block">
            <ProfileSidebar />
          </div>
          <div className="col-span-12 lg:col-span-8 xl:col-span-9 lg:mt-22 space-y-6">
            <NavLink to="/profile" className="lg:hidden flex items-center gap-2 px-1 text-[#0F2446] font-semibold mb-2">
              <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              Cart
            </NavLink>
            <div className="grid grid-cols-12 gap-6">
              {cartItems.map((item) => (
                <CartItem key={item.id} item={item} onDelete={handleDelete} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CartPage
