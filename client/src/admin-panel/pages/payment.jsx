import React, { useState } from 'react'
import SearchIcon from "../../assets/admin-panel-icon/icons/search.svg";
import ExportIcon from "../../assets/admin-panel-icon/icons/export.svg";
import DateRangeFilter from '../component/date-range-filter';
import { Link } from 'react-router-dom';
import SearchableSelect from '../../component/searchable-select';
import PaginationCard from '../component/pagination';

function Payment() {
  const [filterVendor, setFilterVendor] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  return (
    <div className="card relative flex flex-col bg-white bg-clip-border rounded-[1.25rem] shadow-[3px_4px_20px_0px_#0000000F] border-0 mt-3 py-3 px-3">
      <div className="card-header p-4 flex flex-wrap gap-3 md:gap-4 justify-between items-center border-b border-[#e3e3e3]">
        <div>
          <h1 className='font-poppins font-semibold text-[20px] md:text-[24px] leading-[100%] text-[#2A2A2A]'>Payments</h1>
        </div>
        <div className='flex flex-wrap items-center gap-3'>
          <DateRangeFilter />
          <button className='bg-[#007BFF] text-white flex items-center gap-2 justify-center py-2 min-w-[111px] h-[36px] text-[12px] rounded-[8px] cursor-pointer'>
            <img src={ExportIcon} alt="Export" />Export</button>
        </div>
      </div>
      <div className="card-sub-header p-4 flex flex-wrap gap-3 justify-between items-center">
        <div>
          <form action="" className='flex flex-wrap gap-3 md:gap-4 items-center'>
            <SearchableSelect options={["Vendor A", "Vendor B", "Vendor C"]} value={filterVendor} onChange={(val) => setFilterVendor(val)} placeholder="Vendor" searchPlaceholder="Search vendor..." />
            <SearchableSelect options={["Agatti", "Amini", "Andrott", "Bangaram", "Bitra", "Chetlat", "Kadmat", "Kalpeni", "Kavaratti", "Kiltan", "Minicoy"]} value={filterLocation} onChange={(val) => setFilterLocation(val)} placeholder="Location" searchPlaceholder="Search location..." />
            <SearchableSelect options={["Pending", "Paid", "Failed", "Refunded"]} value={filterStatus} onChange={(val) => setFilterStatus(val)} placeholder="Status" searchPlaceholder="Search status..." />
          </form>
        </div>
        <div className="inline-block">
          <form className="relative flex items-center">
            <input className="w-full border border-[#E5E5E5] rounded-lg px-3 py-2 text-[14px] focus:outline-none focus:ring-1 focus:ring-[#0F2446] bg-[#F4F4F4]" type="search" placeholder="Search" />
            <button type="button" className="absolute right-2 flex items-center justify-center">
              <img src={SearchIcon} alt="search" className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
      <div className="card-body py-4">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className='border-b border-[#dee2e6]'>
                <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">#</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">Booking ID</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">Date</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">Customer Name</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">Vendor</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">Package</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">Total Amount</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">Amount Paid</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">Paid to Vendor</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">Payment Status</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">Payment mode</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]"></th>
              </tr>
            </thead>
            <tbody>
              <tr className='border-b border-[#dee2e6] last:border-0'>
                <td className="px-4 py-2 text-[12px] text-[#383838]">1.</td>
                <td className="px-4 py-2 text-[12px] text-[#383838]">BKG0021</td>
                <td className="px-4 py-2 text-[12px] text-[#383838]">09/02/2026 05:30 a.m.</td>
                <td className="px-4 py-2 text-[12px] text-[#383838]">sharini Vinod</td>
                <td className="px-4 py-2 text-[12px] text-[#383838]">Sunset Shore Dining</td>
                <td className="px-4 py-2 text-[12px] text-[#383838]">Reef Exploration Snorkel Tour</td>
                <td className="px-4 py-2 text-[12px] text-[#383838]">5400.00</td>
                <td className="px-4 py-2 text-[12px] text-[#383838]">5000.00</td>
                <td className="px-4 py-2 text-[12px] text-[#383838]">400.00</td>
                <td className="px-4 py-2 text-[12px] text-[#383838]">Alexieser007@gmail.com</td>
                <td className="px-4 py-2 text-[12px] text-[#383838]">upi</td>
                <td className="px-4 py-2 text-[12px] text-[#383838]">
                  <Link to="/" className="text-[#007BFF] text-nowrap text-[14px] font-[500]">View Receipt</Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="card-footer p-3">
        <PaginationCard totalPages={1} currentPage={1} onPageChange={(page) => console.log(page)} />
      </div>
    </div>
  )
}

export default Payment;