import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import VendorProfile from '../component/vendor-profile'
import DateRangeFilter from '../component/date-range-filter'
import SearchableSelect from '../../component/searchable-select';

function VendorView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("home");
  const [currentRange, setCurrentRange] = useState([null, null]);
  const [startDate, endDate] = currentRange;
  const [statusFilter, setStatusFilter] = useState("all");

  const [vendorData, setVendorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVendorData = async () => {
      try {
        setLoading(true);
        const candidates = [
          `/vendor-api/vendor/vendor-details/${id}/`,
          `/vendor-api/vendor/${id}/`,
          `/vendor-api/vendor/vendor-detail/${id}/`
        ];

        let fetchedData = null;
        let success = false;

        for (const url of candidates) {
          try {
            const response = await fetch(url, {
              method: 'GET',
              headers: {
                'Authorization': 'Token D9SIHYWOO9FC8BYFBTQC2STOKF33FZ6GDL047A4Q',
                'Accept': 'application/json',
              },
            });

            if (response.ok) {
              const result = await response.json();
              fetchedData = result;
              if (result.status === true || result.status === 'success') {
                fetchedData = result.data || result.vendor || result.vendor_details || result.page_obj || result;
              }
              if (Array.isArray(fetchedData)) fetchedData = fetchedData[0];
              if (fetchedData && fetchedData.page_obj && Array.isArray(fetchedData.page_obj)) fetchedData = fetchedData.page_obj[0];

              if (fetchedData) {
                success = true;
                break;
              }
            }
          } catch (e) {
            console.warn(`Failed to fetch from ${url}:`, e);
          }
        }

        if (success) {
          setVendorData(fetchedData);
          setError(null);
        } else {
          setError("Failed to load vendor details from any endpoint.");
        }
      } catch (err) {
        console.error('Error fetching vendor data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchVendorData();
    }
  }, [id]);

  const tabClass = (tab) =>
    `pb-2 px-[24px] py-[6px] rounded-[29px] text-[12px] font-semibold transition-all duration-300 ${activeTab === tab
      ? "text-white bg-[#0F2446] shadow-[0px_3px_1px_0px_#0000000F] shadow-[0px_3px_8px_0px_#00000026]"
      : "text-[#8c8c8c] hover:text-[#2A2A2A]"
    }`;
  const bookings = vendorData?.bookings || [
    {
      id: 1,
      title: "Lagoon Explorer",
      bookingId: "#123456789",
      status: "Completed",
      statusBg: "bg-[#ECFFEF]",
      statusText: "text-[#16C032]",
      date: "20 Oct 2025",
      guest: 1,
      totalPaid: "₹2,725",
      customer: "Go Rogue Team",
      note: "Vendor not available please contact support",
      receiptUrl: "/receipt/123.pdf",
    },
    {
      id: 2,
      title: "Island Kayaking",
      bookingId: "#987654321",
      status: "Booking Cancelled",
      statusBg: "bg-[#FFB9B94D]",
      statusText: "text-[#EB0D0D]",
      date: "25 Nov 2025",
      guest: 2,
      totalPaid: "₹5,200",
      customer: "Lakshadweep Tours",
      note: "",
      receiptUrl: "/receipt/987.pdf",
    },
  ];

  const filteredBookings = startDate && endDate
    ? bookings.filter(booking => {
      const bDate = new Date(booking.date);
      return bDate >= startDate && bDate <= endDate;
    })
    : bookings;

  const assignedPackages = vendorData?.assigned_packages || vendorData?.packages || [
    {
      id: 1,
      title: "Premium Lagoon Villa",
      bookingId: "#PKG-998877",
      status: "Active",
      statusBg: "bg-[#ECFFEF]",
      statusText: "text-[#16C032]",
      date: "15 Jan 2026",
      guest: 4,
      totalPaid: "₹48,000",
      customer: "John Doe",
    },
    {
      id: 2,
      title: "Deep Sea Diving Session",
      bookingId: "#PKG-554433",
      status: "Active",
      statusBg: "bg-[#ECFFEF]",
      statusText: "text-[#16C032]",
      date: "18 Feb 2026",
      guest: 2,
      totalPaid: "₹9,000",
      customer: "Sarah J.",
    },
    {
      id: 3,
      title: "Island Kayaking",
      bookingId: "#PKG-112233",
      status: "Cancelled",
      statusBg: "bg-[#FFB9B94D]",
      statusText: "text-[#EB0D0D]",
      date: "20 Mar 2026",
      guest: 3,
      totalPaid: "₹15,000",
      customer: "Mike T.",
    },
  ];

  const filteredAssignedPackages = assignedPackages.filter(pkg => {
    return statusFilter === "all" || pkg.status.toLowerCase() === statusFilter.toLowerCase();
  });

  return (
    <div className="grid grid-cols-12 gap-6 mt-3">
      <div className="col-span-12 lg:col-span-4">
        <VendorProfile vendor={vendorData} loading={loading} />
      </div>
      <div className="col-span-12 lg:col-span-8">
        {error ? (
          <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
            <div className="text-red-500 font-semibold mb-4 text-lg">{error}</div>
            <button onClick={() => navigate('/admin/vendor/list')} className="px-6 py-2 bg-[#0F2446] text-white rounded-lg font-medium">Back to List</button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-[1px_0px_4px_0px_#00000014] overflow-hidden p-3">
            <div className="card-header md:px-6 py-5 flex flex-wrap gap-3 justify-between items-center">
              <nav className="flex border border-[#E5E5E5] rounded-[35px] w-max px-1 py-1 bg-[#E9E9EA]">
                <button onClick={() => setActiveTab("home")} className={tabClass("home")}>Booking History</button>
                <button onClick={() => setActiveTab("profile")} className={tabClass("profile")}>Assigned Packages</button>
              </nav>
              <div className="flex flex-wrap items-center gap-3">
                {activeTab === "profile" ? (
                  <div className="relative">
                    <SearchableSelect options={["all", "active", "cancelled"]} value={statusFilter} onChange={(val) => setStatusFilter(val)} placeholder="Status" searchPlaceholder="Search status..." />
                  </div>
                ) : (
                  <DateRangeFilter onRangeChange={(range) => setCurrentRange(range)} />
                )}
              </div>
            </div>
            {activeTab === "home" ? (
              <div>
                {loading ? (
                  <div className="p-20 text-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#0F2446] mx-auto mb-4"></div>
                    <div className="text-[#8c8c8c] font-medium">Loading bookings...</div>
                  </div>
                ) : filteredBookings.length > 0 ? (
                  filteredBookings.map((item, index) => (
                    <div key={item.id || index} className={`py-6 px-6 lg:px-8 border border-[#E9E9E9] rounded-[18px] mb-3`}>
                      <div className="booking-item-header pb-4 border-b border-[#DADADA] mb-5">
                        <div className="flex flex-wrap justify-between items-center gap-4">
                          <div>
                            <div className="text-[18px] text-[#4A4A4B] mb-3">
                              Package -   <span className='font-bold text-[20px] text-[#0F2446]'>{item.title}</span>
                            </div>
                            <div className="text-[16px] text-[#535353]">
                              Booking ID : <span className="font-semibold">{item.bookingId}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className={`badge font-semibold text-[14px] ${item.statusBg} ${item.statusText} py-2 px-6 rounded-full inline-block`}>
                              {item.status}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-3">
                        <div>
                          <div className="text-[14px] text-[#8c8c8c] mb-1">Date</div>
                          <div className="font-bold text-[16px] text-[#2A2A2A]">{item.date}</div>
                        </div>
                        <div>
                          <div className="text-[14px] text-[#8c8c8c] mb-1">Guest</div>
                          <div className="font-bold text-[16px] text-[#2A2A2A]">{item.guest}</div>
                        </div>
                        <div>
                          <div className="text-[14px] text-[#8c8c8c] mb-1">Total Paid</div>
                          <div className="font-bold text-[16px] text-[#2A2A2A]">{item.totalPaid}</div>
                        </div>
                        <div>
                          <div className="text-[14px] text-[#8c8c8c] mb-1">Customer</div>
                          <div className="font-bold text-[16px] text-[#2A2A2A]">{item.customer}</div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-20 text-center">
                    <div className="text-[#8c8c8c] font-medium mb-2">No bookings found for this search.</div>
                    <button onClick={() => setCurrentRange([null, null])} className="text-[#FF5C1A] text-[14px] font-bold hover:underline">Show all bookings</button>
                  </div>
                )}
              </div>
            ) : (
              <div>
                {loading ? (
                  <div className="p-20 text-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#0F2446] mx-auto mb-4"></div>
                    <div className="text-[#8c8c8c] font-medium">Loading packages...</div>
                  </div>
                ) : filteredAssignedPackages.length > 0 ? (
                  filteredAssignedPackages.map((item, index) => (
                    <div key={item.id || index} className={`py-6 px-6 lg:px-8 border border-[#E9E9E9] rounded-[18px] mb-3`}>
                      <div className="booking-item-header pb-4 border-b border-[#DADADA] mb-5">
                        <div className="flex flex-wrap justify-between items-center gap-4">
                          <div>
                            <div className="text-[18px] text-[#4A4A4B] mb-3">
                              Package -   <span className='font-bold text-[20px] text-[#0F2446]'>{item.title}</span>
                            </div>
                            <div className="text-[16px] text-[#535353]">
                              Booking ID : <span className="font-semibold">{item.bookingId}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className={`badge font-semibold text-[14px] ${item.statusBg} ${item.statusText} py-2 px-6 rounded-full inline-block`}>
                              {item.status}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-3">
                        <div>
                          <div className="text-[14px] text-[#8c8c8c] mb-1">Date</div>
                          <div className="font-bold text-[16px] text-[#2A2A2A]">{item.date}</div>
                        </div>
                        <div>
                          <div className="text-[14px] text-[#8c8c8c] mb-1">Guest</div>
                          <div className="font-bold text-[16px] text-[#2A2A2A]">{item.guest}</div>
                        </div>
                        <div>
                          <div className="text-[14px] text-[#8c8c8c] mb-1">Total Paid</div>
                          <div className="font-bold text-[16px] text-[#2A2A2A]">{item.totalPaid}</div>
                        </div>
                        <div>
                          <div className="text-[14px] text-[#8c8c8c] mb-1">Customer</div>
                          <div className="font-bold text-[16px] text-[#2A2A2A]">{item.customer}</div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-20 text-center">
                    <div className="text-[#8c8c8c] font-medium mb-2">No packages found for this status.</div>
                    <button onClick={() => {
                      setStatusFilter("all");
                      setCurrentRange([null, null]);
                    }} className="text-[#FF5C1A] text-[14px] font-bold hover:underline">Reset all filters</button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default VendorView;
