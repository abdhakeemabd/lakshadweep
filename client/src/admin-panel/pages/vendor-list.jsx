import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiMoreVertical } from 'react-icons/fi'
import filter from '../../assets/admin-panel-icon/icons/filter-icon.svg'
import SearchIcon from "../../assets/admin-panel-icon/icons/search.svg";
import Export from "../../assets/admin-panel-icon/icons/excel.svg";
import Print from "../../assets/admin-panel-icon/icons/print.svg";
import SearchableSelect from '../../component/searchable-select';
import { showDeleteAlert, showDeleteSuccess, showDeleteError, showDeactivateAlert, showDeactivateSuccess, showActivateAlert, showActivateSuccess } from '../component/swal-delete';
import PaginationCard from '../component/pagination';

function VendorList() {
  const [openIndex, setOpenIndex] = useState(null);
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterCategory, setFilterCategory] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterVendor, setFilterVendor] = useState('');
  const [filterMinPrice, setFilterMinPrice] = useState('');
  const [filterMaxPrice, setFilterMaxPrice] = useState('');
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [categoryLabel, setCategoryLabel] = useState('Category');
  const [locationLabel, setLocationLabel] = useState('Location');
  const [vendorLabel, setVendorLabel] = useState('Vendor');
  const [activityLabel, setActivityLabel] = useState('Activity');

  const fetchVendors = async (overrides = null) => {
    try {
      setLoading(true);

      const params = new URLSearchParams();
      const cat = overrides?.category !== undefined ? overrides.category : filterCategory;
      const loc = overrides?.location !== undefined ? overrides.location : filterLocation;
      const ven = overrides?.vendor !== undefined ? overrides.vendor : filterVendor;
      const minP = overrides?.minPrice !== undefined ? overrides.minPrice : filterMinPrice;
      const maxP = overrides?.maxPrice !== undefined ? overrides.maxPrice : filterMaxPrice;

      if (cat) params.append('category', cat);
      if (loc) params.append('location', loc);
      if (ven) params.append('vendor', ven);
      if (minP) params.append('min_price', minP);
      if (maxP) params.append('max_price', maxP);

      const queryString = params.toString();
      const url = `/vendor-api/vendor/vendors/${queryString ? `?${queryString}` : ''}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': 'Token 8RWYE3BKLZCFIN2FHQNNQEAEWBNDY184TGNYTY6X',
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch vendors');
      }

      const data = await response.json();
      let vendorsList = [];
      if (Array.isArray(data)) {
        vendorsList = data;
      } else if (data.vendors && Array.isArray(data.vendors)) {
        vendorsList = data.vendors;
      } else if (data.results && Array.isArray(data.results)) {
        vendorsList = data.results;
      } else if (data.data) {
        if (Array.isArray(data.data)) {
          vendorsList = data.data;
        } else if (data.data.vendors && Array.isArray(data.data.vendors)) {
          vendorsList = data.data.vendors;
        } else if (data.data.results && Array.isArray(data.data.results)) {
          vendorsList = data.data.results;
        }
      } else {
        const arrays = Object.values(data).filter(val => Array.isArray(val));
        if (arrays.length > 0) {
          vendorsList = arrays[0];
        }
      }

      setVendors(vendorsList);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (vendorId) => {
    if (!vendorId) {
      showDeleteError();
      return;
    }

    const confirmed = await showDeleteAlert('vendor');
    if (!confirmed) return;

    const deleteEndpoints = [
      { url: `/vendor-api/vendor/vendor-delete/${vendorId}/`, method: 'DELETE' },
    ];

    let deleted = false;
    for (const endpoint of deleteEndpoints) {
      try {
        console.log(`Trying delete endpoint: ${endpoint.url}`);
        const response = await fetch(endpoint.url, {
          method: endpoint.method,
          headers: {
            'Authorization': 'Token 8RWYE3BKLZCFIN2FHQNNQEAEWBNDY184TGNYTY6X',
            'Accept': 'application/json',
            'ngrok-skip-browser-warning': 'true',
          },
        });

        console.log(`Endpoint ${endpoint.url} responded with: ${response.status}`);

        if (response.ok || response.status === 204) {
          deleted = true;
          break;
        }

        if (response.status !== 404 && response.status !== 405 && response.status !== 403) {
          break;
        }
      } catch (err) {
        console.warn(`Delete endpoint ${endpoint.url} error:`, err.message);
      }
    }

    // Soft-delete fallback via PATCH if no hard-delete endpoint worked
    if (!deleted) {
      const patchEndpoints = [
        `/vendor-api/vendor/vendors/${vendorId}/`,
        `/vendor-api/vendor/vendor-update/${vendorId}/`,
        `/vendor-api/vendor/${vendorId}/`,
      ];
      for (const url of patchEndpoints) {
        try {
          const body = JSON.stringify({ is_deleted: true, is_active: false, status: 'DELETED' });
          const res = await fetch(url, {
            method: 'PATCH',
            headers: {
              'Authorization': 'Token 8RWYE3BKLZCFIN2FHQNNQEAEWBNDY184TGNYTY6X',
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'ngrok-skip-browser-warning': 'true',
            },
            body,
          });
          if (res.ok) {
            deleted = true;
            break;
          }
        } catch (err) { }
      }
    }

    if (deleted) {
      showDeleteSuccess('Vendor');
      fetchVendors();
    } else {
      showDeleteError();
    }
  };

  const fetchFilters = async () => {
    try {
      const headers = {
        'Authorization': 'Token 8RWYE3BKLZCFIN2FHQNNQEAEWBNDY184TGNYTY6X',
        'Accept': 'application/json',
        'ngrok-skip-browser-warning': 'true'
      };

      // Fetch Categories and dynamic labels
      const catRes = await fetch('/category-api/settings/category-activities/', { headers });
      if (catRes.ok) {
        const catData = await catRes.json();
        if (catData.label) setCategoryLabel(catData.label);
        if (catData.category_label) setCategoryLabel(catData.category_label);
        if (catData.location_label) setLocationLabel(catData.location_label);
        if (catData.vendor_label) setVendorLabel(catData.vendor_label);
        if (catData.activity_label) setActivityLabel(catData.activity_label);

        let fetchedCategories = [];
        if (Array.isArray(catData)) {
          fetchedCategories = catData;
        } else if (catData.data && Array.isArray(catData.data)) {
          fetchedCategories = catData.data;
        } else if (catData.categories && Array.isArray(catData.categories)) {
          fetchedCategories = catData.categories;
        } else if (catData.results && Array.isArray(catData.results)) {
          fetchedCategories = catData.results;
        } else {
          const arrays = Object.values(catData).filter(v => Array.isArray(v));
          if (arrays.length > 0) fetchedCategories = arrays[0];
        }
        setCategories([...new Set(fetchedCategories.map(c => c.name || c.category_name).filter(Boolean))]);
      }

      // Fetch Locations
      const locRes = await fetch('/category-api/settings/location-category-activity/', { headers });
      if (locRes.ok) {
        const locData = await locRes.json();
        let fetchedLocs = [];
        if (Array.isArray(locData)) fetchedLocs = locData;
        else if (locData.locations && Array.isArray(locData.locations)) fetchedLocs = locData.locations;
        else if (locData.data && Array.isArray(locData.data)) fetchedLocs = locData.data;
        else if (locData.results && Array.isArray(locData.results)) fetchedLocs = locData.results;
        else {
          const arrays = Object.values(locData).filter(val => Array.isArray(val));
          if (arrays.length > 0) fetchedLocs = arrays[0];
        }
        setLocations([...new Set(fetchedLocs.map(l => l.name || l.location_name || (typeof l === 'string' ? l : '')).filter(Boolean))]);
      }
    } catch (err) {
      console.error('Error fetching filters:', err);
    }
  };

  useEffect(() => {
    fetchVendors();
    fetchFilters();
  }, []);

  const toggleDropdown = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleDeactivate = async (vendorId) => {
    if (!vendorId) return;
    const confirmed = await showDeactivateAlert('vendor');
    if (!confirmed) return;
    try {
      const response = await fetch(`/vendor-api/vendor/vendor-toggle-status/${vendorId}/`, {
        method: 'POST',
        headers: {
          'Authorization': 'Token 8RWYE3BKLZCFIN2FHQNNQEAEWBNDY184TGNYTY6X',
          'Accept': 'application/json',
          'ngrok-skip-browser-warning': 'true',
        },
      });

      if (response.ok) {
        showDeactivateSuccess('Vendor');
        fetchVendors();
      } else {
        console.error('Deactivation failed:', response.status);
      }
    } catch (err) {
      console.error('Error during deactivation:', err);
    }
  };

  const handleActivate = async (vendorId) => {
    if (!vendorId) return;
    const confirmed = await showActivateAlert('vendor');
    if (!confirmed) return;
    try {
      const response = await fetch(`/vendor-api/vendor/vendor-toggle-status/${vendorId}/`, {
        method: 'POST',
        headers: {
          'Authorization': 'Token 8RWYE3BKLZCFIN2FHQNNQEAEWBNDY184TGNYTY6X',
          'Accept': 'application/json',
          'ngrok-skip-browser-warning': 'true',
        },
      });

      if (response.ok) {
        showActivateSuccess('Vendor');
        fetchVendors();
      } else {
        console.error('Activation failed:', response.status);
      }
    } catch (err) {
      console.error('Error during activation:', err);
    }
  };
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".dropdown-container")) {
        setOpenIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const updateExportUrl = () => {
  };

  const printThis = () => {
    window.print();
  };

  return (
    <div className="card relative flex flex-col bg-white bg-clip-border rounded-[1.25rem] shadow-[3px_4px_20px_0px_#0000000F] border-0 mt-3 py-3 px-3">
      <div className="card-header py-4 px-2 flex gap-3 flex-wrap justify-between items-center border-b border-[#e3e3e3]">
        <div className='flex items-center gap-3'>
          <h1 className='font-poppins font-semibold text-[20px] md:text-[20px] leading-[100%] text-[#2A2A2A]'>{vendorLabel} List</h1>
        </div>
        <div className='flex gap-4'>
          <div className="relative dropdown-container">
            <button onClick={() => toggleDropdown('filter')} className="flex items-center gap-4 bg-[#26354D] rounded-[8px] py-[7px] px-[20px] text-white text-[12px] font-semibold cursor-pointer">
              Filters
              <img className='ms-4 w-[16px] h-[16px]' src={filter} alt="filter" />
            </button>
            {openIndex === "filter" && (
              <div className="relative">
                <div className="card min-w-[278px] shadow-[3px_4px_13px_0px_#0000001A] absolute right-0 z-10 bg-white p-3">
                  <div className="card-header py-3 border-b border-[#dedede]">
                    <div className='text-[#2A2A2A] font-bold text-[16px] leading-[100%] py-3 ps-3'>Filter Options</div>
                  </div>
                  <div className="card-body p-3">
                    <div className="flex flex-col gap-4">
                      <div className="item">
                        <label className="text-[#2A2A2A] font-semibold text-[12px] leading-[100%]">{categoryLabel}</label>
                        <div className="mt-1">
                          <SearchableSelect options={categories.length > 0 ? categories : ["Watersports", "Adventure", "Eco Tourism", "Leisure"]} value={filterCategory} onChange={(val) => setFilterCategory(val)} placeholder={`Select ${categoryLabel}`} searchPlaceholder={`Search ${categoryLabel.toLowerCase()}...`} />
                        </div>
                      </div>
                      <div className="items">
                        <label className="text-[#2A2A2A] font-semibold text-[12px] leading-[100%]">{locationLabel}</label>
                        <div className="mt-1">
                          <SearchableSelect options={locations.length > 0 ? locations : ["Agatti", "Amini", "Andrott", "Bangaram", "Bitra", "Chetlat", "Kadmat", "Kalpeni", "Kavaratti", "Kiltan", "Minicoy"]} value={filterLocation} onChange={(val) => setFilterLocation(val)} placeholder={`Select ${locationLabel}`} searchPlaceholder={`Search ${locationLabel.toLowerCase()}...`} />
                        </div>
                      </div>
                      <div className="items">
                        <label className="text-[#2A2A2A] font-semibold text-[12px] leading-[100%]">{vendorLabel}</label>
                        <div className="mt-1">
                          <SearchableSelect options={vendors.length > 0 ? [...new Set(vendors.map(v => v.name || v.vendor_name || '').filter(Boolean))] : []} value={filterVendor} onChange={(val) => setFilterVendor(val)} placeholder={`Select ${vendorLabel}`} searchPlaceholder={`Search ${vendorLabel.toLowerCase()}...`} />
                        </div>
                      </div>
                      <div className="flex gap-3 mb-3">
                        <div className="items">
                          <label className="text-[#2A2A2A] font-semibold text-[12px] leading-[100%]">Price</label>
                          <div className="relative rounded-[8px] overflow-hidden">
                            <div className='absolute left-0 h-full top-0 bg-[#494949] w-[38px] flex items-center justify-center'>
                              <span className='text-[12px] text-white'>Min</span>
                            </div>
                            <input
                              type="number"
                              value={filterMinPrice}
                              onChange={(e) => setFilterMinPrice(e.target.value)}
                              placeholder="0"
                              className="ps-[45px] w-full border border-[#E5E5E5] rounded-lg pe-3 py-2 text-[14px] focus:outline-none focus:ring-[#0F2446] bg-[#F4F4F4]"
                            />
                          </div>
                        </div>
                        <div className="items">
                          <label className="text-[#2A2A2A] font-semibold text-[12px] leading-[100%]">Price</label>
                          <div className="relative rounded-[8px] overflow-hidden">
                            <div className='absolute left-0 h-full top-0 bg-[#494949] w-[38px] flex items-center justify-center'>
                              <span className='text-[12px] text-white'>Max</span>
                            </div>
                            <input
                              type="number"
                              value={filterMaxPrice}
                              onChange={(e) => setFilterMaxPrice(e.target.value)}
                              placeholder="10000"
                              className="ps-[45px] w-full border border-[#E5E5E5] rounded-lg pe-3 py-2 text-[14px] focus:outline-none focus:ring-[#0F2446] bg-[#F4F4F4]"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <button
                          type='button'
                          onClick={() => {
                            setFilterCategory('');
                            setFilterLocation('');
                            setFilterVendor('');
                            setFilterMinPrice('');
                            setFilterMaxPrice('');
                            fetchVendors({ category: '', location: '', vendor: '', minPrice: '', maxPrice: '' });
                            setOpenIndex(null);
                          }}
                          className='bg-[#EDEDED] text-[12px] w-[117px] h-[38px] px-5 cursor-pointer py-2 rounded-[8px] text-[#131313] font-semibold'
                        >
                          Reset
                        </button>
                        <button
                          type='button'
                          onClick={() => {
                            fetchVendors();
                            setOpenIndex(null);
                          }}
                          className='bg-[#007BFF] text-[12px] w-[117px] h-[38px] px-5 cursor-pointer py-2 rounded-[8px] text-[#FFFFFF] font-semibold'
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <Link to="/admin/vendor/add" className="bg-[#007BFF] rounded-[8px] py-[7px] px-[20px] gap-[5px] text-white text-[12px] font-semibold cursor-pointer">+ Add Vendor</Link>
        </div>
      </div>
      <div className="card-sub-header py-6 flex align-center justify-end">
        <div className="inline-block mr-[15px]">
          <form className="relative flex items-center">
            <input className="w-full border border-[#E5E5E5] rounded-lg px-3 py-2 text-[14px] focus:outline-none focus:ring-1 focus:ring-[#0F2446] bg-[#F4F4F4]" type="search" placeholder="Search" />
            <button type="button" className="absolute right-2 flex items-center justify-center cursor-pointer">
              <img src={SearchIcon} alt="search" className="w-4 h-4" />
            </button>
          </form>
        </div>
        <div className="inline-flex items-center gap-2">
          <button title="excel" id="EXCEL" onClick={updateExportUrl} className="inline-flex items-center justify-center p-2 bg-[#f4f4f4] rounded-[10px] transition cursor-pointer">
            <img src={Export} alt="Excel" className="w-5 h-5" />
          </button>
          <button type="button" onClick={printThis} className="inline-flex items-center justify-center p-2 bg-[#f4f4f4] rounded-[10px] transition cursor-pointer">
            <img src={Print} alt="Print" className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="card-body">
        <div className="overflow-x-auto">
          <div className="table-responsive min-h-[400px]">
            <table className="w-full">
              <thead>
                <tr className='border-b border-[#e3e3e3]'>
                  <th className='text-[#383838] font-semibold text-[12px] leading-[100%] text-left py-3 ps-3'>#</th>
                  <th className='text-[#383838] font-semibold text-[12px] leading-[100%] text-left py-3'>Name</th>
                  <th className='text-[#383838] font-semibold text-[12px] leading-[100%] text-left py-3'>Phone</th>
                  <th className='text-[#383838] font-semibold text-[12px] leading-[100%] text-left py-3'>Email</th>
                  <th className='text-[#383838] font-semibold text-[12px] leading-[100%] text-left py-3'>{locationLabel}</th>
                  <th className='text-[#383838] font-semibold text-[12px] leading-[100%] text-left py-3'>{categoryLabel}</th>
                  <th className='text-[#383838] font-semibold text-[12px] leading-[100%] text-left py-3'>Status</th>
                  <th className='text-[#383838] font-semibold text-[12px] leading-[100%] text-left py-3'></th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="8" className="text-center py-20">
                      <div className="flex justify-center items-center">
                        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#007BFF]"></div>
                      </div>
                      <p className="mt-4 text-gray-500 font-medium">Loading vendors...</p>
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="8" className="text-center py-20">
                      <p className="text-red-500 font-semibold mb-2">Error: {error}</p>
                      <button
                        onClick={fetchVendors}
                        className="px-6 py-2 bg-[#007BFF] text-white rounded-[8px] text-[12px] font-semibold hover:bg-[#0069d9] transition-colors cursor-pointer"
                      >
                        Try Again
                      </button>
                    </td>
                  </tr>
                ) : vendors.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center py-20">
                      <p className="text-[#8c8c8c] font-medium mb-2">No vendors found.</p>
                      <Link to="/admin/vendor/add" className="text-[#007BFF] text-[14px] font-bold hover:underline cursor-pointer">Add your first vendor</Link>
                    </td>
                  </tr>
                ) : (
                  vendors.map((vendor, index) => {
                    console.log('Rendering vendor item:', vendor);
                    return (
                      <tr key={vendor.id || index} className='border-b border-[#e3e3e3] last:border-b-0'>
                        <td className='text-[#383838] text-[12px] leading-[100%] py-3 ps-3'>{index + 1}</td>
                        <td className='text-[#383838] text-[12px] leading-[100%] py-3'>
                          <div className='font-medium text-[13px] mb-1 text-[#2A2A2A]'>{vendor.name || vendor.vendor_name || 'Unnamed Vendor'}</div>
                          <div className='text-[#751CC2] font-medium text-[9px]'>{vendor.vendor_code || vendor.code || `#VND${String(vendor.id || index + 1).padStart(4, '0')}`}</div>
                        </td>
                        <td className='text-[#383838] text-[12px] py-3'>{vendor.phone || vendor.mobile_no || vendor.vendor_phone || 'N/A'}</td>
                        <td className='text-[#383838] text-[12px] py-3'>{vendor.email || vendor.vendor_email || 'N/A'}</td>
                        <td className='text-[#383838] text-[12px] py-3'>
                          {(() => {
                            if (Array.isArray(vendor.unique_islands) && vendor.unique_islands.length > 0) {
                              return vendor.unique_islands.join(', ');
                            }
                            return vendor.location || vendor.island_location || vendor.location_name || vendor.vendor_location || vendor.address_line_1 || (Array.isArray(vendor.activities) && vendor.activities[0]?.location) || 'N/A';
                          })()}
                        </td>
                        <td className='text-[#383838] text-[12px] py-3'>
                          {(() => {
                            if (Array.isArray(vendor.unique_categories) && vendor.unique_categories.length > 0) {
                              return vendor.unique_categories.join(', ');
                            }
                            if (vendor.category || vendor.activity || vendor.category_name || vendor.activity_name) {
                              return vendor.category || vendor.activity || vendor.category_name || vendor.activity_name;
                            }
                            if (Array.isArray(vendor.activities) && vendor.activities.length > 0) {
                              return vendor.activities.map(a => a.category || a.activity || a.name || a.activity_name || a).join(', ');
                            }
                            if (Array.isArray(vendor.activity_data)) {
                              return vendor.activity_data.map(a => a.name || a).join(', ');
                            }
                            return 'N/A';
                          })()}
                        </td>
                        <td className='text-[#383838] text-[12px] py-3'>
                          <div className={`badge px-2 justify-center flex items-center w-[68px] py-1 rounded-full text-[8px] font-semibold 
                                    ${(vendor.status?.toUpperCase() === "ACTIVE" || vendor.is_active)
                              ? "text-[#1C9762] bg-[#B5FFDF] border border-[#1C9762]"
                              : "text-[#dc3545] bg-[#ffd6d6] border border-[#dc3545]"}`}>
                            {vendor.status || (vendor.is_active ? "Active" : "Inactive")}
                          </div>
                        </td>
                        <td className='py-3'>
                          <div className="relative inline-block text-left dropdown-container">
                            <button onClick={() => toggleDropdown(index)} className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 focus:outline-none cursor-pointer ${openIndex === index ? 'bg-gray-100 text-[#007BFF]' : 'text-gray-400 hover:bg-gray-100 hover:text-gray-600'}`}>
                              <FiMoreVertical size={20} />
                            </button>
                            {openIndex === index && (
                              <div className="absolute right-0 mt-2 w-40 origin-top-right bg-white border border-gray-100 rounded-[12px] shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)] z-[100] overflow-hidden py-1">
                                {(() => {
                                  const vId = vendor.id || vendor.pk || vendor.vendor_id;
                                  return (
                                    <>
                                      <Link to={`/admin/vendor/view/${vId}`} className="flex items-center gap-3 px-4 py-2.5 text-[11px] font-medium text-[#8c8c8c] hover:text-[#3d3d3d] transition-colors cursor-pointer" onClick={() => setOpenIndex(null)}>View</Link>
                                      <Link to={`/admin/vendor/edit/${vId}`} className="flex items-center gap-3 px-4 py-2.5 text-[11px] font-medium text-[#8c8c8c] hover:text-[#3d3d3d] transition-colors w-full text-left cursor-pointer" onClick={() => setOpenIndex(null)}>Edit</Link>
                                      <div className="mx-2 my-1 border-t border-gray-100" />
                                      {(() => {
                                        const isActive = vendor.status?.toUpperCase() === "ACTIVE" || vendor.is_active;
                                        return isActive ? (
                                          <button className="flex items-center gap-3 px-4 py-2.5 text-[11px] font-medium text-[#8c8c8c] hover:text-[#3d3d3d] transition-colors w-full text-left cursor-pointer" onClick={() => { handleDeactivate(vId); setOpenIndex(null); }}>Deactivate</button>
                                        ) : (
                                          <button className="flex items-center gap-3 px-4 py-2.5 text-[11px] font-medium text-[#8c8c8c] hover:text-[#3d3d3d] transition-colors w-full text-left cursor-pointer" onClick={() => { handleActivate(vId); setOpenIndex(null); }}>Activate</button>
                                        );
                                      })()}
                                      <button className="flex items-center gap-3 px-4 py-2.5 text-[11px] font-medium text-[#dc3545] hover:text-[#dc3545] transition-colors w-full text-left cursor-pointer" onClick={() => { handleDelete(vId); setOpenIndex(null); }}>Delete</button>
                                    </>
                                  );
                                })()}
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="card-footer p-3">
        <PaginationCard totalPages={1} currentPage={1} onPageChange={(page) => console.log(page)} />
      </div>
    </div>
  );
}

export default VendorList;
