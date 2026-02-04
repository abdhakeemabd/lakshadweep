import React from 'react'
import ProfileSidebar from '../component/profile-sidebar'
import DownloadIcon from '../assets/icons/document-download.svg'

function Profile() {

  const bookings = [
    {
      id: 1,
      title: "Deep Sea Discovery",
      bookingId: "#123456789",
      status: "Slot Confirmed",
      statusBg: "bg-[#E0FFE6]",
      statusText: "text-[#408004]",
      date: "20 Oct 2025",
      guest: 1,
      totalPaid: "₹2,725",
      pendingAmount: "₹4,000",
      vendor: "Go Rogue Team",
      note: "Preferred Slot is not available",
      slotTime: "8:00 am - 9:00 am",
      receiptUrl: "/receipt/123.pdf",
    },
    {
      id: 2,
      title: "Island Kayaking",
      bookingId: "#987654321",
      status: "Payment Pending",
      statusBg: "bg-[#FFF3E0]",
      statusText: "text-[#FF9800]",
      date: "25 Nov 2025",
      guest: 2,
      totalPaid: "₹5,200",
      pendingAmount: "₹1,500",
      vendor: "Lakshadweep Tours",
      note: "Slot updated by vendor",
      slotTime: "10:00 am - 11:00 am",
      receiptUrl: "/receipt/987.pdf",
    },
  ]

  return (
    <section className='py-10 lg:py-20 bg-[#F5F5F5]'>
      <div className="container mx-auto px-3">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-3">
            <ProfileSidebar />
          </div>
          <div className="col-span-12 lg:col-span-9 lg:mt-24 space-y-6">
            {bookings.map((item) => (
              <div key={item.id} className="booking-card bg-white py-6 px-6 lg:px-8 rounded-2xl shadow-[1px_0px_4px_0px_#00000014]">
                <div className="booking-card-header pb-4 border-b border-[#DADADA] mb-3 lg:mb-5">
                  <div className="booking-card-header-content grid grid-cols-12 gap-3 items-center">

                    <div className="col-span-12 lg:col-span-9">
                      <div className="booking-card-header-content-title font-poppins font-bold mb-3 text-[24px] leading-[100%] tracking-[-0.02em] text-[#0F2446]">
                        {item.title}
                      </div>

                      <div className="booking-card-header-content-item-title font-normal text-[16px] leading-[100%] tracking-[-0.02em] text-[#535353]">
                        Booking ID : <span className="ml-2 booking-card-header-content-item-value font-semibold text-[16px] leading-[100%] tracking-[-0.02em] text-[#535353]">
                          {item.bookingId}
                        </span>
                      </div>
                    </div>
                    <div className="col-span-12 lg:col-span-3 lg:text-right">
                      <span className={`badge font-semibold text-[15px] ${item.statusBg} ${item.statusText} py-2 px-6 rounded-[22px] inline-block`}>{item.status}</span>
                    </div>
                  </div>
                </div>
                <div className="booking-card-body pb-4 border-b border-[#DADADA] mb-3 lg:mb-5">
                  <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                    <div>
                      <div className="font-medium text-[16px] text-[#535353] mb-3">Date</div>
                      <div className="font-bold text-[16px] text-[#212121]">{item.date}</div>
                    </div>
                    <div>
                      <div className="font-medium text-[16px] text-[#535353] mb-3">Guest</div>
                      <div className="font-bold text-[16px] text-[#212121]">{item.guest}</div>
                    </div>
                    <div>
                      <div className="font-medium text-[16px] text-[#535353] mb-3">Total Paid</div>
                      <div className="font-bold text-[16px] text-[#212121]">{item.totalPaid}</div>
                    </div>
                    <div>
                      <div className="font-medium text-[16px] text-[#535353] mb-3">Pending Amount</div>
                      <div className="font-bold text-[16px] text-[#212121]">{item.pendingAmount}</div>
                    </div>
                    <div>
                      <div className="font-medium text-[16px] text-[#535353] mb-3">Vendor</div>
                      <div className="font-bold text-[16px] text-[#212121]">{item.vendor}</div>
                    </div>
                  </div>
                </div>
                <div className="booking-card-footer grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-12 lg:col-span-9">
                    <div className='font-medium text-[16px] text-[#535353] mb-3'> Note : <span className='font-semibold text-[#E64545]'> {item.note} </span></div>
                    <div className='font-medium text-[15px] text-[#434343]'> Assigned Time Slot: <span className='font-semibold text-[#212121]'> {item.slotTime} </span></div>
                  </div>
                  <div className="col-span-12 lg:col-span-3 lg:text-right">
                    <a href={item.receiptUrl} download className='inline-flex gap-2 items-center bg-[#007BFF] text-white font-[15px] font-medium px-6 py-2 rounded-[10px]'>
                      <img src={DownloadIcon} alt="Download" /> Download Receipt
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Profile
