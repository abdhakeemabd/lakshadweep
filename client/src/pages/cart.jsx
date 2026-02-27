import ProfileSidebar from '../component/profile-sidebar'
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
    <section className='py-10 lg:py-20 bg-[#F5F5F5]'>
      <div className="container mx-auto px-3">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-3">
            <ProfileSidebar />
          </div>
          <div className="col-span-12 lg:col-span-9 lg:mt-22 space-y-6">
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
