import React, { useEffect, useState } from 'react';
import Slidebar from '../component/slidebar';
import Header from '../component/header';
import Money from '../../assets/admin-panel-icon/icons/money.svg';
import Booking from '../../assets/admin-panel-icon/icons/total-booking.svg';
import Vendor from '../../assets/admin-panel-icon/icons/total-vendors.svg';
import PendingBooking from '../../assets/admin-panel-icon/icons/pending-booking.svg';
import UserIcon from '../../assets/admin-panel-icon/icons/user-default.jpeg';
import Star from '../../assets/admin-panel-icon/icons/star-dashboard.svg';
import Chart from "react-apexcharts";

function Dashboard() {
  const [bookingOverview, setBookingOverview] = useState([]);
  useEffect(() => {
    const apiData = [12, 25, 9, 32, 18, 40, 22, 15, 29, 10, 5, 17];
    setBookingOverview(apiData);
  }, []);

  const packages = [
    { name: "Lakshadweep Coral Escape", bookings: 4 },
    { name: "Lakshadweep Coral Escape", bookings: 4 },
    { name: "Lakshadweep Coral Escape", bookings: 4 },
    { name: "Lakshadweep Coral Escape", bookings: 4 },
    { name: "Lakshadweep Coral Escape", bookings: 4 },
  ];
  const upcomingBooking = [
    {
      customer: "user_+918899885555",
      bookingId: "#BKG0018",
      package: "John Doe",
      vendor: "2022-01-01",
      dateTime: "Completed",
      status: "Completed"
    },
    {
      customer: "user_+918899885555",
      bookingId: "#BKG0018",
      package: "John Doe",
      vendor: "2022-01-01",
      dateTime: "Completed",
      status: "Completed"
    },
    {
      customer: "user_+918899885555",
      bookingId: "#BKG0018",
      package: "John Doe",
      vendor: "2022-01-01",
      dateTime: "Completed",
      status: "Completed"
    },
    {
      customer: "user_+918899885555",
      bookingId: "#BKG0018",
      package: "John Doe",
      vendor: "2022-01-01",
      dateTime: "Completed",
      status: "Completed"
    },
    {
      customer: "user_+918899885555",
      bookingId: "#BKG0018",
      package: "John Doe",
      vendor: "2022-01-01",
      dateTime: "Completed",
      status: "Completed"
    },
  ];
  const todaysSchedule = [
    {
      activity: "Deep Sea Scuba Diving",
      customer: "user_+918899885555",
      bookingId: "#BKG0018",
      vendor: "Coral Shore Rentals"
    },
    {
      activity: "Deep Sea Scuba Diving",
      customer: "user_+918899885555",
      bookingId: "#BKG0018",
      vendor: "Coral Shore Rentals"
    },
    {
      activity: "Deep Sea Scuba Diving",
      customer: "user_+918899885555",
      bookingId: "#BKG0018",
      vendor: "Coral Shore Rentals"
    },
    {
      activity: "Deep Sea Scuba Diving",
      customer: "user_+918899885555",
      bookingId: "#BKG0018",
      vendor: "Coral Shore Rentals"
    },
    {
      activity: "Deep Sea Scuba Diving",
      customer: "user_+918899885555",
      bookingId: "#BKG0018",
      vendor: "Coral Shore Rentals"
    },
  ];

  const series = [
    {
      name: "Bookings",
      data: bookingOverview.length ? bookingOverview : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
  ];

  const options = {
    chart: {
      type: 'bar',
      height: 250,
      width: '100%',
      toolbar: { show: false },
      animations: { enabled: true },
    },

    legend: { show: false },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: { colors: '#6B7280', fontSize: '13px' }
      }
    },

    yaxis: { show: false },
    grid: { show: false },
    dataLabels: { enabled: false },

    plotOptions: {
      bar: {
        columnWidth: '60%',
        borderRadius: 6.9,
        distributed: false
      }
    },

    colors: [
      ({ value, w }) => {
        const maxValue = Math.max(...w.config.series[0].data);
        return value === maxValue ? '#4C64D4' : '#E9E9E9';
      }
    ],

    states: {
      hover: { filter: { type: 'none' } },
      active: { filter: { type: 'none' } }
    },

    responsive: [
      {
        breakpoint: 600,
        options: {
          chart: { height: 220 },
          plotOptions: { bar: { columnWidth: '70%' } },
          xaxis: { labels: { style: { fontSize: '12px' } } }
        }
      },
      {
        breakpoint: 420,
        options: {
          chart: { height: 200 },
          plotOptions: { bar: { columnWidth: '75%' } },
          xaxis: { labels: { style: { fontSize: '11px' } } }
        }
      },
      {
        breakpoint: 412,
        options: {
          chart: { height: 190 },
          plotOptions: { bar: { columnWidth: '78%' } },
          xaxis: { labels: { style: { fontSize: '11px' } } }
        }
      }
    ]
  };

  return (
    <div>
      <div className="container-fluid mx-auto pr-3">
        <div className="flex gap-5">
          <div className="w-[262px]">
            <Slidebar />
          </div>
          <div className="w-full pt-3">
            <Header />
            <div className="card shadow-[3px_4px_20px_0px_#0000000F] p-3 rounded-[1.25rem]">
              <div className="card-header mb-3 flex gap-3 lg:gap-5 items-center justify-center">
                <div className="card p-3 w-full rounded-[25px] min-w-[262px] min-h-[126px] py-3 lg:py-4 flex gap-3 items-start bg-[#0F2446] shadow-[0px_19px_56px_0px_#2E25860F]">
                  <img src={Money} alt="Money" className='w-[50px] h-[50px]' />
                  <div className="card-body">
                    <h5 className="card-title text-[14px] text-[#ffffff] leading-[24px]">Revenue Snapshot</h5>
                    <div className="price font-bold text-[#ffffff] text-[24px] mb-2 leading-[40px]">₹122,480</div>
                    <div className="badge text-[14px] text-[#ffffff] bg-[#54698C42] rounded-[15px] flex justify-center items-center p-[4px,8px,4px,8px] leading-[20px] min-w-[152px] min-h-[24px]">This month</div>
                  </div>
                </div>
                <div className="card p-3 w-full rounded-[25px] min-w-[262px] min-h-[126px] py-3 lg:py-4 flex gap-3 items-start bg-[#1E3A8A] shadow-[0px_19px_56px_0px_#2E25860F]">
                  <img src={Booking} alt="Booking" className='w-[50px] h-[50px]' />
                  <div className="card-body">
                    <h5 className="card-title text-[14px] text-[#ffffff] leading-[24px]">Total Booking</h5>
                    <div className="price font-bold text-[#ffffff] text-[24px] mb-2 leading-[40px]">120</div>
                    <div className="badge text-[14px] text-[#ffffff] bg-[#54698C42] rounded-[15px] flex justify-center items-center p-[4px,8px,4px,8px] leading-[20px] min-w-[152px] min-h-[24px]">245 Completed</div>
                  </div>
                </div>
                <div className="card p-3 w-full rounded-[25px] min-w-[262px] min-h-[126px] py-3 lg:py-4 flex gap-3 items-start bg-[#0F766E] shadow-[0px_19px_56px_0px_#2E25860F]">
                  <img src={Vendor} alt="Vendor" className='w-[50px] h-[50px]' />
                  <div className="card-body">
                    <h5 className="card-title text-[14px] text-[#ffffff] leading-[24px]">Total Vendors</h5>
                    <div className="price font-bold text-[#ffffff] text-[24px] mb-2 leading-[40px]">41</div>
                    <div className="badge text-[14px] text-[#ffffff] bg-[#84EAE240] rounded-[15px] flex justify-center items-center p-[4px,8px,4px,8px] leading-[20px] min-w-[152px] min-h-[24px]">41 Active</div>
                  </div>
                </div>
                <div className="card p-3 w-full rounded-[25px] min-w-[262px] min-h-[126px] py-3 lg:py-4 flex gap-3 items-start bg-[#B45309] shadow-[0px_19px_56px_0px_#2E25860F]">
                  <img src={PendingBooking} alt="Pending" className='w-[50px] h-[50px]' />
                  <div className="card-body">
                    <h5 className="card-title text-[14px] text-[#ffffff] leading-[24px]">Pending Booking</h5>
                    <div className="price font-bold text-[#ffffff] text-[24px] mb-2 leading-[40px]">12</div>
                    <div className="badge text-[14px] text-[#ffffff] bg-[#FFE3CD30] rounded-[15px] flex justify-center items-center p-[4px,8px,4px,8px] leading-[20px] min-w-[152px] min-h-[24px]">Needs Attention</div>
                  </div>
                </div>
              </div>
              <div className="card-body p-3">
                <div className="grid grid-cols-12 gap-6">
                  <div className="col-span-12 lg:col-span-8">
                    <div className="card shadow-[3px_4px_20px_0px_#0000000F] p-3 rounded-[1.25rem]">
                      <div className="card-header">
                        <div className="card-title text-[20px] font-semibold text-[#2A2A2A]">Booking Overview</div>
                      </div>
                      <div className="card-body pt-10 relative">
                        <div className='absolute top-10 right-0 left-10 right-10 top-0 border-t-2 border-dashed border-[#4C64D4]'>
                          <div className='text-[12px] font-bold absolute right-0'>MAX</div>
                        </div>
                        <Chart options={options} series={series} type="bar" height={280} />
                      </div>
                    </div>
                  </div>
                  <div className="col-span-12 lg:col-span-4">
                    <div className="card shadow-[3px_4px_20px_0px_#0000000F] p-3 rounded-[1.25rem]">
                      <div className="card-header py-3">
                        <h5 className="card-title text-[18px] font-semibold text[#353535]">Top Packages</h5>
                      </div>
                      <div className="card-body py-5 max-h-[300px] overflow-y-auto pr-3">
                        {packages.map((item, index) => (
                          <div key={index} className="flex gap-3 justify-between py-4 border-b border-[#E9E9E9] last:border-b-0">
                            <div className="card-text font-medium text-[13px] leading-[22px] text-[#121212]">{item.name}</div>
                            <div className='font-light text-[12px] leading-[22px] text-[#121212]'>{item.bookings} Bookings</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="col-span-12 lg:col-span-8">
                    <div className="card shadow-[3px_4px_20px_0px_#0000000F] p-3 rounded-[1.25rem]">
                      <div className="card-header mb-3 lg:mb-5">
                        <div className="card-title text-[20px] font-semibold text-[#2A2A2A]">Upcoming Booking</div>
                      </div>
                      <div className="card-body pr-3">
                        <div className="table-responsive max-h-[335px] min-h-[300px] overflow-y-auto w-full">
                          <table className="table w-full border-collapse">
                            <thead className='sticky top-0 bg-white border-b border-[#e7e7e7] z-10'>
                              <tr>
                                <th className='text-left text-[#383838] font-semibold text-[12px] leading-[100%] py-3'>Customer</th>
                                <th className='text-left text-[#383838] font-semibold text-[12px] leading-[100%] py-3'>Package</th>
                                <th className='text-left text-[#383838] font-semibold text-[12px] leading-[100%] py-3'>Vendor</th>
                                <th className='text-left text-[#383838] font-semibold text-[12px] leading-[100%] py-3'>Date & Time</th>
                                <th className='text-left text-[#383838] font-semibold text-[12px] leading-[100%] py-3'>Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {upcomingBooking.map((item, index) => (
                                <tr key={index} className='border-b border-[#e7e7e7] last:border-b-0'>
                                  <td className='py-3'>
                                    <div className='username'>
                                      <div className='text-[#313131] font-medium text-[11px] leading-[22px]'>{item.customer}</div>
                                      <div className='text-[#751CC2] font-medium text-[8px]'>{item.bookingId}</div>
                                    </div>
                                  </td>
                                  <td className='text-[12px] text-[#545454] font-light py-3'>{item.package}</td>
                                  <td className='text-[12px] text-[#545454] font-light py-3'>{item.vendor}</td>
                                  <td className='text-[12px] text-[#545454] font-light py-3'>{item.dateTime}</td>
                                  <td className='py-3'>
                                    <div className='bg-[#B5FFDF] flex justify-center text-[9px] items-center w-[70px] h-[20px] text-[#1C9762] rounded-full border-[0.5px] border-[#1C9762] px-2 py-1'>{item.status}</div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-12 lg:col-span-4">
                    <div className="card shadow-[3px_4px_20px_0px_#0000000F] p-3 rounded-[1.25rem]">
                      <div className="card-header py-3">
                        <div className="card-title text-[18px] font-semibold text[#353535]">Today's Schedule</div>
                      </div>
                      <div className="card-body py-5 max-h-[330px] overflow-y-auto">
                        {todaysSchedule.map((item, index) => (
                          <div key={index} className="bg-white space-y-3 relative border border-[#E7E7E7] rounded-[14px] p-[20px_16px_16px] mb-4">
                            <span className="absolute top-[-12px] left-[20px] bg-[#FFEDDC] text-[#A5610A] text-[12px] font-normal px-[12px] py-[5px] rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.06)]">TBD</span>
                            <div className="text-[14px] font-semibold text-[#383838] m-[8px_0_12px]">{item.activity}</div>
                            <div className="flex items-center gap-3">
                              <div className="relative w-[35px] h-[35px]">
                                <img src={UserIcon} alt="Profile" className="w-full h-full rounded-full object-cover" />
                                <img src={Star} alt="Verified" className="absolute -bottom-1 left-1 w-[13px] h-[13px]" />
                              </div>
                              <div>
                                <div className="text-[11px] font-medium text-[#3D3D3D]">{item.customer}</div>
                                <div className="text-[10px] font-medium text-[#2C4FA1]">{item.bookingId}</div>
                                <div className="text-[11px] font-normal text-[#3D3D3D]">Vendor: {item.vendor}</div>
                              </div>
                            </div>
                          </div>
                        ))}
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
  );
}

export default Dashboard;
