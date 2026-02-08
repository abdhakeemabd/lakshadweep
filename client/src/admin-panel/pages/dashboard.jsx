import React from 'react';
import Slidebar from '../component/slidebar';
import Header from '../component/header';
import Money from '../../assets/admin-panel-icon/icons/money.svg';
import Booking from '../../assets/admin-panel-icon/icons/total-booking.svg';
import Vendor from '../../assets/admin-panel-icon/icons/total-vendors.svg';
import PendingBooking from '../../assets/admin-panel-icon/icons/pending-booking.svg';
function Dashboard() {

  return (
    <div>
       <div className="container-fluid mx-auto pr-3">
        <div className="flex gap-5">
          <div className="w-[262px]">
            <Slidebar />
          </div>
          <div className="w-full pt-3">
            <Header />
            <div className="card-group flex gap-3 lg:gap-5 items-center justify-center">
              <div className="card p-3 w-full rounded-[25px] min-w-[262px] min-h-[126px] py-3 lg:py-4 flex gap-3 items-start bg-[#0F2446] shadow-[0px_19px_56px_0px_#2E25860F]">
                <div>
                  <img src={Money} alt="Money" className='w-[50px] h-[50px]'/>
                </div>
                <div className="card-body">
                  <h5 className="card-title text-[14px] text-[#ffffff] leading-[24px]">Revenue Snapshot</h5>
                  <div className="price font-bold text-[#ffffff] text-[24px] mb-2 leading-[40px]">₹122,480</div>
                  <div className="badge text-[14px] text-[#ffffff] bg-[#54698C42] rounded-[15px] flex justify-center items-center p-[4px,8px,4px,8px] leading-[20px] min-w-[152px] min-h-[24px]">This month</div>
                </div>
              </div>
              <div className="card p-3 w-full rounded-[25px] min-w-[262px] min-h-[126px] py-3 lg:py-4 flex gap-3 items-start bg-[#1E3A8A] shadow-[0px_19px_56px_0px_#2E25860F]">
                <div>
                  <img src={Booking} alt="Money" className='w-[50px] h-[50px]'/>
                </div>
                <div className="card-body">
                  <h5 className="card-title text-[14px] text-[#ffffff] leading-[24px]">Total Booking</h5>
                  <div className="price font-bold text-[#ffffff] text-[24px] mb-2 leading-[40px]">120</div>
                  <div className="badge text-[14px] text-[#ffffff] bg-[#54698C42] rounded-[15px] flex justify-center items-center p-[4px,8px,4px,8px] leading-[20px] min-w-[152px] min-h-[24px]">245 Completed</div>
                </div>
              </div>
              <div className="card p-3 w-full rounded-[25px] min-w-[262px] min-h-[126px] py-3 lg:py-4 flex gap-3 items-start bg-[#0F766E] shadow-[0px_19px_56px_0px_#2E25860F]">
                <div>
                  <img src={Vendor} alt="Money" className='w-[50px] h-[50px]'/>
                </div>
                <div className="card-body">
                  <h5 className="card-title text-[14px] text-[#ffffff] leading-[24px]">Total Vendors</h5>
                  <div className="price font-bold text-[#ffffff] text-[24px] mb-2 leading-[40px]">₹122,480</div>
                  <div className="badge text-[14px] text-[#ffffff] bg-[#84EAE240] rounded-[15px] flex justify-center items-center p-[4px,8px,4px,8px] leading-[20px] min-w-[152px] min-h-[24px]">41 Active</div>
                </div>
              </div>
              <div className="card p-3 w-full rounded-[25px] min-w-[262px] min-h-[126px] py-3 lg:py-4 flex gap-3 items-start bg-[#B45309] shadow-[0px_19px_56px_0px_#2E25860F]">
                <div>
                  <img src={PendingBooking} alt="Money" className='w-[50px] h-[50px]'/>
                </div>
                <div className="card-body">
                  <h5 className="card-title text-[14px] text-[#ffffff] leading-[24px]">Pending Booking</h5>
                  <div className="price font-bold text-[#ffffff] text-[24px] mb-2 leading-[40px]">₹122,480</div>
                  <div className="badge text-[14px] text-[#ffffff] bg-[#FFE3CD30] rounded-[15px] flex justify-center items-center p-[4px,8px,4px,8px] leading-[20px] min-w-[152px] min-h-[24px]">Needs Attention</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
