import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import CustomerProfile from '../component/customer-profile'
import SearchableSelect from '../../component/searchable-select'

const API_TOKEN = 'CHPQ9LCXLZEEQ5UVPWLQ40U1X6URZVBTH64LP0CP';
const BASE_URL = '/customer-api';

const fetchHeaders = {
  'Content-Type': 'application/json',
  'Authorization': `Token ${API_TOKEN}`,
  'ngrok-skip-browser-warning': 'true',
};

const getCustomerEndpoints = (id) => [
  `${BASE_URL}/customer/customers/${id}/`,
  `${BASE_URL}/customer/${id}/`,
  `${BASE_URL}/customer/customer-detail/${id}/`,
  `${BASE_URL}/customer/detail/${id}/`,
];

const getBookingEndpoints = (id) => [
  `${BASE_URL}/customer/customers/${id}/bookings/`,
  `${BASE_URL}/customer/${id}/bookings/`,
  `${BASE_URL}/booking/bookings/?customer=${id}`,
  `${BASE_URL}/booking/customer/${id}/`,
];

const STATUS_STYLES = {
  completed: { bg: 'bg-[#ECFFEF]', text: 'text-[#16C032]' },
  confirmed: { bg: 'bg-[#EEF4FF]', text: 'text-[#007BFF]' },
  assigned: { bg: 'bg-[#EEF4FF]', text: 'text-[#007BFF]' },
  pending: { bg: 'bg-[#FFF8EC]', text: 'text-[#F5A700]' },
  cancelled: { bg: 'bg-[#FFF0F0]', text: 'text-[#dc3545]' },
  default: { bg: 'bg-[#F4F4F4]', text: 'text-[#8c8c8c]' },
};

function getStatusStyle(status = '') {
  const key = status.toLowerCase();
  return STATUS_STYLES[key] || STATUS_STYLES.default;
}
async function tryEndpoints(endpoints) {
  for (const url of endpoints) {
    try {
      const res = await fetch(url, { method: 'GET', headers: fetchHeaders });
      if (res.ok) {
        const data = await res.json();
        return data;
      }
    } catch (_) { }
  }
  return null;
}

function extractList(data) {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (data.results && Array.isArray(data.results)) return data.results;
  if (data.data && Array.isArray(data.data)) return data.data;
  if (data.bookings && Array.isArray(data.bookings)) return data.bookings;
  const arrays = Object.values(data).filter(Array.isArray);
  return arrays.length ? arrays[0] : [];
}

function CustomerView() {
  const { id } = useParams();

  const [customer, setCustomer] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loadingCustomer, setLoadingCustomer] = useState(true);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [errorCustomer, setErrorCustomer] = useState(null);
  const [errorBookings, setErrorBookings] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    if (!id) return;

    setLoadingCustomer(true);
    tryEndpoints(getCustomerEndpoints(id))
      .then((data) => {
        if (data) {
          const customer = data.customer || data.data || data;
          setCustomer(customer);
        } else {
          setErrorCustomer('Could not load customer details.');
        }
      })
      .catch(() => setErrorCustomer('Failed to fetch customer.'))
      .finally(() => setLoadingCustomer(false));

    setLoadingBookings(true);
    tryEndpoints(getBookingEndpoints(id))
      .then((data) => {
        const list = extractList(data);
        setBookings(list);
      })
      .catch(() => setErrorBookings('Failed to fetch bookings.'))
      .finally(() => setLoadingBookings(false));
  }, [id]);

  const filteredBookings = bookings.filter(booking => {
    if (statusFilter === 'All') return true;
    const status = (booking.status || booking.booking_status || '').toLowerCase();
    return status === statusFilter.toLowerCase();
  });

  return (
    <div className="grid grid-cols-12 gap-6 mt-3">
      <div className="col-span-12 lg:col-span-4"><CustomerProfile customer={customer} loading={loadingCustomer} /></div>
      <div className="col-span-12 lg:col-span-8">
        <div className="bg-white rounded-2xl shadow-[1px_0px_4px_0px_#00000014] overflow-hidden p-4 min-h-[480px]">
          <div className="flex flex-wrap items-center justify-between mb-4 pb-3 border-b border-[#e3e3e3] gap-3">
            <h2 className="font-semibold text-[16px] text-[#2A2A2A]">Booking History</h2>
            <div className="flex items-center gap-4">
              <div className="w-[180px]">
                <SearchableSelect options={['All', 'Pending', 'Assigned', 'Completed', 'Cancelled']} value={statusFilter} onChange={(val) => setStatusFilter(val)} placeholder="Select Option" searchPlaceholder="Search status..." align="right" />
              </div>
            </div>
          </div>
          {loadingBookings && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#007BFF]" />
            </div>
          )}
          {!loadingBookings && errorBookings && (
            <div className="text-center py-16">
              <p className="text-red-500 text-[13px] mb-3">{errorBookings}</p>
              <button onClick={() => window.location.reload()} className="px-5 py-2 bg-[#007BFF] text-white rounded-[8px] text-[12px] font-semibold">Retry</button>
            </div>
          )}
          {!loadingBookings && !errorBookings && filteredBookings.length === 0 && (
            <div className="text-center py-20"><p className="text-[#8c8c8c] text-[13px]">No bookings found for the selected status.</p></div>
          )}
          {!loadingBookings && !errorBookings && filteredBookings.length > 0 && (
            <div className="flex flex-col gap-4">
              {filteredBookings.map((booking, idx) => {
                const bookingId = booking.id || booking.booking_id || idx + 1;
                const packageName = booking.package_name || booking.package || booking.activity || 'N/A';
                const status = booking.status || booking.booking_status || 'Pending';
                const date = booking.booking_date || booking.date || booking.created_at || '';
                const guests = booking.guest_count || booking.num_guests || booking.guests || booking.no_of_guests || 'N/A';
                const totalPaid = booking.total_paid || booking.amount || booking.total_amount || booking.price || null;
                const vendor = booking.vendor_name || booking.vendor || null;
                let formattedDate = date;
                if (date) {
                  try {
                    formattedDate = new Date(date).toLocaleDateString('en-IN', {
                      day: '2-digit', month: 'short', year: 'numeric',
                    });
                  } catch (_) { formattedDate = date; }
                }
                const { bg, text } = getStatusStyle(status);
                return (
                  <div key={bookingId} className="py-5 px-5 lg:px-7 border border-[#E9E9E9] rounded-[18px]">
                    <div className="booking-item-header pb-4 border-b border-[#DADADA] mb-4">
                      <div className="flex flex-wrap justify-between items-center gap-3">
                        <div>
                          <div className="text-[16px] text-[#4A4A4B] mb-2">Package —{' '} <span className="font-bold text-[18px] text-[#0F2446]">{packageName}</span></div>
                          <div className="text-[14px] text-[#535353]">Booking ID :{' '} <span className="font-semibold">#{bookingId}</span></div>
                        </div>
                        <span className={`badge font-medium flex justify-center items-center text-[12px] py-1 px-4 rounded-full ${bg} ${text}`}>{status}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <div className="text-[12px] text-[#8c8c8c] mb-1">Date</div>
                        <div className="font-bold text-[14px] text-[#2A2A2A]">{formattedDate || '—'}</div>
                      </div>
                      <div>
                        <div className="text-[12px] text-[#8c8c8c] mb-1">Guests</div>
                        <div className="font-bold text-[14px] text-[#2A2A2A]">{guests}</div>
                      </div>
                      {totalPaid !== null && (
                        <div>
                          <div className="text-[12px] text-[#8c8c8c] mb-1">Total Paid</div>
                          <div className="font-bold text-[14px] text-[#2A2A2A]">₹{Number(totalPaid).toLocaleString('en-IN')}</div>
                        </div>
                      )}
                      {vendor && (
                        <div>
                          <div className="text-[12px] text-[#8c8c8c] mb-1">Vendor</div>
                          <div className="font-bold text-[14px] text-[#2A2A2A]">{vendor}</div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CustomerView;
