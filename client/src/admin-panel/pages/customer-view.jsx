import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import VendorProfile from '../component/vendor-profile'
import Slidebar from '../component/slidebar'
import Header from '../component/header'
import DateRangeFilter from '../component/date-range-filter'

function CustomerView() {
  return (
    <>
      <div className="container-fluid mx-auto pr-3 bg-[#f6f6f7] min-h-screen">
        <div className="flex gap-2">
          <div className="w-[262px]">
            <Slidebar />
          </div>
          <div className=" w-full pt-3">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12">
                <Header />
              </div>
              <div className="col-span-12 lg:col-span-4">
                <VendorProfile />
              </div>
              <div className="col-span-12 lg:col-span-8">
                <div className="bg-white rounded-2xl shadow-[1px_0px_4px_0px_#00000014] overflow-hidden p-3">
                  <div className={`py-6 px-6 lg:px-8 border-1 border-[#E9E9E9] rounded-[18px] mb-3`}>
                    <div className="booking-item-header pb-4 border-b border-[#DADADA] mb-5">
                      <div className="flex flex-wrap justify-between items-center gap-4">
                        <div>
                          <div className="text-[18px] text-[#4A4A4B] mb-3">
                            Package -   <span className='font-bold text-[20px] text-[#0F2446]'>1</span>
                          </div>
                          <div className="text-[16px] text-[#535353]">
                            Booking ID : <span className="font-semibold">1</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-3">
                      <div>
                        <div className="text-[14px] text-[#8c8c8c] mb-1">Date</div>
                        <div className="font-bold text-[16px] text-[#2A2A2A]">1</div>
                      </div>
                      <div>
                        <div className="text-[14px] text-[#8c8c8c] mb-1">Guest</div>
                        <div className="font-bold text-[16px] text-[#2A2A2A]">1</div>
                      </div>
                      <div>
                        <div className="text-[14px] text-[#8c8c8c] mb-1">Total Paid</div>
                        <div className="font-bold text-[16px] text-[#2A2A2A]">1</div>
                      </div>
                      <div>
                        <div className="text-[14px] text-[#8c8c8c] mb-1">Customer</div>
                        <div className="font-bold text-[16px] text-[#2A2A2A]">1</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className={`py-6 px-6 lg:px-8 border-1 border-[#E9E9E9] rounded-[18px] mb-3`}>
                      <div className="booking-item-header pb-4 border-b border-[#DADADA] mb-5">
                        <div className="flex flex-wrap justify-between items-center gap-4">
                          <div>
                            <div className="text-[18px] text-[#4A4A4B] mb-3">
                              Package -   <span className='font-bold text-[20px] text-[#0F2446]'>11</span>
                            </div>
                            <div className="text-[16px] text-[#535353]">
                              Booking ID : <span className="font-semibold">11</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className={`badge font-semibold text-[14px] py-2 px-6 rounded-full inline-block`}>
                              11
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-3">
                        <div>
                          <div className="text-[14px] text-[#8c8c8c] mb-1">Date</div>
                          <div className="font-bold text-[16px] text-[#2A2A2A]">11</div>
                        </div>
                        <div>
                          <div className="text-[14px] text-[#8c8c8c] mb-1">Guest</div>
                          <div className="font-bold text-[16px] text-[#2A2A2A]">11</div>
                        </div>
                        <div>
                          <div className="text-[14px] text-[#8c8c8c] mb-1">Total Paid</div>
                          <div className="font-bold text-[16px] text-[#2A2A2A]">111</div>
                        </div>
                        <div>
                          <div className="text-[14px] text-[#8c8c8c] mb-1">Customer</div>
                          <div className="font-bold text-[16px] text-[#2A2A2A]">1</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CustomerView

