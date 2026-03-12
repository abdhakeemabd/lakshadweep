import React, { useState, useEffect, useMemo } from 'react'
import SearchIcon from "../../assets/admin-panel-icon/icons/search.svg";
import ExportIcon from "../../assets/admin-panel-icon/icons/export.svg";
import { Link } from 'react-router-dom';
import SearchableSelect from '../../component/searchable-select';
import PaginationCard from '../component/pagination';

const API_URL = '/customer-api/customer/customers/';
const API_TOKEN = '8RWYE3BKLZCFIN2FHQNNQEAEWBNDY184TGNYTY6X';

function AllCustomer() {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedActivity, setSelectedActivity] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    let filtered = customers;

    if (searchQuery.trim() !== '') {
      filtered = filtered.filter(customer => {
        const searchLower = searchQuery.toLowerCase();
        const name = customer.full_name || customer.name || '';
        const email = customer.email || '';
        const phone = customer.phone || customer.phone_number || '';
        const customerId = customer.id ? customer.id.toString() : '';

        return (
          name.toLowerCase().includes(searchLower) ||
          email.toLowerCase().includes(searchLower) ||
          phone.toLowerCase().includes(searchLower) ||
          customerId.toLowerCase().includes(searchLower)
        );
      });
    }

    if (selectedActivity !== '') {
      console.log('Filtering by activity:', selectedActivity);
      filtered = filtered.filter(customer => {
        const activities = customer.distinct_activities;
        if (activities) {
          if (Array.isArray(activities)) {
            const hasActivity = activities.some(activity => activity === selectedActivity);
            return hasActivity;
          } else {
            return activities === selectedActivity;
          }
        } else {
          const fallbackActivity = customer.activities || customer.activity;
          return fallbackActivity === selectedActivity;
        }
      });
      console.log('Filtered customers by activity:', filtered.length);
    }

    if (selectedLocation !== '') {
      console.log('Filtering by location:', selectedLocation);
      filtered = filtered.filter(customer => {
        const location = customer.location || customer.island_location;
        return location === selectedLocation;
      });
      console.log('Filtered customers by location:', filtered.length);
    }

    console.log('Final filtered count:', filtered.length);
    setFilteredCustomers(filtered);
  }, [searchQuery, selectedActivity, selectedLocation, customers]);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${API_TOKEN}`,
          'ngrok-skip-browser-warning': 'true',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch customers: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Customers data:', data);

      let customerList = [];
      if (Array.isArray(data)) {
        customerList = data;
      } else if (data.items && Array.isArray(data.items)) {
        customerList = data.items;
      } else if (data.data && Array.isArray(data.data)) {
        customerList = data.data;
      } else if (data.results && Array.isArray(data.results)) {
        customerList = data.results;
      }

      console.log('Extracted customer list:', customerList);
      console.log('Total customers found:', customerList.length);

      setCustomers(customerList);
      setFilteredCustomers(customerList);
    } catch (err) {
      console.error('Error fetching customers:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  const uniqueActivities = useMemo(() => {
    const activitiesSet = new Set();
    customers.forEach(customer => {
      const activities = customer.distinct_activities;
      if (activities) {
        if (Array.isArray(activities)) {
          activities.forEach(activity => {
            if (activity && activity !== 'N/A') {
              activitiesSet.add(activity.trim());
            }
          });
        } else if (typeof activities === 'string' && activities !== 'N/A') {
          activitiesSet.add(activities.trim());
        }
      } else {
        const fallbackActivity = customer.activities || customer.activity;
        if (fallbackActivity && fallbackActivity !== 'N/A') {
          activitiesSet.add(fallbackActivity.trim());
        }
      }
    });
    return Array.from(activitiesSet).sort();
  }, [customers]);

  const uniqueLocations = useMemo(() => {
    const locationsSet = new Set();
    customers.forEach(customer => {
      const location = customer.location || customer.island_location;
      if (location && location !== 'N/A') {
        locationsSet.add(location.trim());
      }
    });
    return Array.from(locationsSet).sort();
  }, [customers]);

  const handleActivityChange = (val) => {
    setSelectedActivity(val);
  };

  const handleLocationChange = (val) => {
    setSelectedLocation(val);
  };

  return (
    <div className="card relative flex flex-col bg-white bg-clip-border rounded-[1.25rem] shadow-[3px_4px_20px_0px_#0000000F] border-0 mt-3 py-3 px-3">
      <div className="card-header p-4 flex flex-wrap justify-between items-center border-b border-[#e3e3e3]">
        <div>
          <h1 className='font-poppins font-semibold text-[20px] md:text-[24px] leading-[100%] text-[#2A2A2A]'>All Customers</h1>
        </div>
        <div className='flex flex-wrap items-center gap-3'>
          <button className='bg-[#007BFF] text-white flex items-center gap-2 justify-center py-2 min-w-[111px] h-[36px] text-[12px] rounded-[8px] cursor-pointer'>
            <img src={ExportIcon} alt="Export" />Export</button>
        </div>
      </div>
      <div className="card-sub-header p-4 flex gap-3 justify-between flex-wrap items-center">
        <div>
          <form action="" className='flex flex-wrap gap-3 items-center'>
            <SearchableSelect options={uniqueActivities.length > 0 ? uniqueActivities : ["Kayakking", "Snorkeling", "Scuba Diving", "Parasailing", "Glass Bottom Boat", "Wind Surfing", "Water Skiing", "Deep Sea Fishing", "Island Hopping", "Dolphin Watching"]} value={selectedActivity} onChange={handleActivityChange} placeholder="All Activities" searchPlaceholder="Search activity..." />
            <SearchableSelect options={uniqueLocations.length > 0 ? uniqueLocations : ["Agatti", "Amini", "Andrott", "Bangaram", "Bitra", "Chetlat", "Kadmat", "Kalpeni", "Kavaratti", "Kiltan", "Minicoy"]} value={selectedLocation} onChange={handleLocationChange} placeholder="All Locations" searchPlaceholder="Search location..." />
          </form>
        </div>
        <div className="inline-block">
          <form className="relative flex items-center" onSubmit={handleSearchSubmit}>
            <input className="w-full border border-[#E5E5E5] rounded-lg px-3 py-2 text-[14px] focus:outline-none focus:ring-1 focus:ring-[#0F2446] bg-[#F4F4F4]" type="search" placeholder="Search" value={searchQuery} onChange={handleSearchChange} />
            <button type="button" className="absolute right-2 flex items-center justify-center cursor-pointer">
              <img src={SearchIcon} alt="search" className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
      <div className="card-body py-4">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="text-center py-8">
              <p className="text-[#383838]">Loading customers...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-500">Error: {error}</p>
              <button
                onClick={fetchCustomers}
                className="mt-4 bg-[#007BFF] text-white px-4 py-2 rounded-lg cursor-pointer"
              >
                Retry
              </button>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className='border-b border-[#e3e3e3]'>
                  <th className="pl-10 px-4 py-2 text-left text-xs font-semibold text-[#383838]">ID</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">Customer Name</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">Phone</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">Email</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">No of Bookings</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">Activities</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">Location</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]"></th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center py-8 text-[#383838]">
                      {searchQuery || selectedActivity || selectedLocation ? 'No customers found matching your filters.' : 'No customers available.'}
                    </td>
                  </tr>
                ) : (
                  filteredCustomers.map((customer, index) => {
                    const customerId = customer.id || customer.customer_id;
                    const customerName = customer.full_name || customer.name || 'N/A';
                    const phone = customer.phone || customer.phone_number || 'N/A';
                    const email = customer.email || 'N/A';
                    const bookings = customer.booking_count || customer.bookings_count || customer.no_of_bookings || 0;
                    const activities = customer.distinct_activities
                      ? (Array.isArray(customer.distinct_activities)
                        ? customer.distinct_activities.join(', ')
                        : customer.distinct_activities)
                      : (customer.activities || customer.activity || 'N/A');
                    const location = customer.location || customer.island_location || 'N/A';
                    return (
                      <tr key={customerId || index} className="border-b border-[#e3e3e3] last:border-0">
                        <td className="pl-10 px-4 py-2 text-[12px] text-[#383838]">{index + 1}.</td>
                        <td className="px-4 py-2 text-[12px] text-[#383838]">
                          <div className='item'>
                            <div className='text-[#313131] text-[11px] font-medium leading[22px]'>
                              {customerName}
                            </div>
                            {customerId && (
                              <div className='text-[#751CC2] text-[9px] font-medium leading[22px]'>
                                #{customerId}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-2 text-[12px] text-[#383838]">{phone}</td>
                        <td className="px-4 py-2 text-[12px] text-[#383838]">{email}</td>
                        <td className="px-4 py-2 text-[12px] text-[#383838]">{bookings}</td>
                        <td className="px-4 py-2 text-[12px] text-[#383838]">{activities}</td>
                        <td className="px-4 py-2 text-[12px] text-[#383838]">{location}</td>
                        <td className="px-4 py-2"><Link className='text-[#007BFF] font-medium text-[13px] cursor-pointer' to={`/admin/customer-view/${customerId}`}>View</Link></td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <div className="card-footer p-3">
        <PaginationCard totalPages={1} currentPage={1} onPageChange={(page) => console.log(page)} />
      </div>
    </div>
  );
}

export default AllCustomer;