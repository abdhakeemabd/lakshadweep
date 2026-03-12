import React, { useEffect, useState } from 'react'
import NotificationModal from '../component/notification-modal';
import filter from '../../assets/admin-panel-icon/icons/filter-icon.svg'
import { FiMoreVertical } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import SearchIcon from "../../assets/admin-panel-icon/icons/search.svg";
import ExportIcon from "../../assets/admin-panel-icon/icons/export.svg";
import { showDeleteAlert, showDeleteSuccess, showDeleteError, showActivateAlert, showActivateSuccess, showDeactivateAlert, showDeactivateSuccess, showError } from '../component/swal-delete';
import SearchableSelect from '../../component/searchable-select';
import PaginationCard from '../component/pagination';

function PackagesList() {
  const [openIndex, setOpenIndex] = useState(null);
  const [filterCategory, setFilterCategory] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterVendor, setFilterVendor] = useState('');
  const [filterMinPrice, setFilterMinPrice] = useState('');
  const [filterMaxPrice, setFilterMaxPrice] = useState('');
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [vendorObjsList, setVendorObjsList] = useState([]);

  const [packageLabel, setPackageLabel] = useState('Packages');
  const [categoryLabel, setCategoryLabel] = useState('Category');
  const [locationLabel, setLocationLabel] = useState('Location');
  const [vendorLabel, setVendorLabel] = useState('Vendor');
  const [activityLabel, setActivityLabel] = useState('Activity');

  const fetchPackages = async (overrides = null) => {
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
      const url = `/package-api/package/packages/${queryString ? `?${queryString}` : ''}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': 'Token 8RWYE3BKLZCFIN2FHQNNQEAEWBNDY184TGNYTY6X',
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch packages');
      }

      const data = await response.json();
      let packagesList = [];
      if (Array.isArray(data)) {
        packagesList = data;
      } else if (data.packages && Array.isArray(data.packages)) {
        packagesList = data.packages;
      } else if (data.results && Array.isArray(data.results)) {
        packagesList = data.results;
      } else if (data.data) {
        if (Array.isArray(data.data)) {
          packagesList = data.data;
        } else if (data.data.packages && Array.isArray(data.data.packages)) {
          packagesList = data.data.packages;
        } else if (data.data.results && Array.isArray(data.data.results)) {
          packagesList = data.data.results;
        }
      } else {
        const arrays = Object.values(data).filter((val) => Array.isArray(val));
        if (arrays.length > 0) {
          packagesList = arrays[0];
        }
      }

      setPackages(packagesList);
      if (data.vendor_objs && Array.isArray(data.vendor_objs)) {
        setVendorObjsList(data.vendor_objs);
      }
      setError(null);
    } catch (err) {
      console.error('Error fetching packages:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchFilters = async () => {
    try {
      const headers = {
        'Authorization': 'Token 8RWYE3BKLZCFIN2FHQNNQEAEWBNDY184TGNYTY6X',
        'Accept': 'application/json',
      };

      // Fetch Categories and dynamic labels
      const catRes = await fetch('/category-api/settings/category-activities/', { headers });
      if (catRes.ok) {
        const catData = await catRes.json();

        // Try to derive labels from API response if possible
        if (catData.label) setCategoryLabel(catData.label);
        if (catData.package_label) setPackageLabel(catData.package_label);
        if (catData.category_label) setCategoryLabel(catData.category_label);
        if (catData.location_label) setLocationLabel(catData.location_label);
        if (catData.vendor_label) setVendorLabel(catData.vendor_label);
        if (catData.activity_label) setActivityLabel(catData.activity_label);
        if (catData.destination_label) setLocationLabel(catData.destination_label);

        let fetchedCategories = [];
        if (Array.isArray(catData)) {
          fetchedCategories = catData;
        } else if (catData.category_objs && Array.isArray(catData.category_objs)) {
          fetchedCategories = catData.category_objs;
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
        if (Array.isArray(locData)) {
          fetchedLocs = locData;
        } else if (locData.location_objs && Array.isArray(locData.location_objs)) {
          fetchedLocs = locData.location_objs;
        } else if (locData.locations && Array.isArray(locData.locations)) {
          fetchedLocs = locData.locations;
        } else if (locData.data && Array.isArray(locData.data)) {
          fetchedLocs = locData.data;
        } else if (locData.results && Array.isArray(locData.results)) {
          fetchedLocs = locData.results;
        } else {
          // Final fallback: find any array in the response
          const arrays = Object.values(locData).filter(val => Array.isArray(val));
          if (arrays.length > 0) fetchedLocs = arrays[0];
        }
        setLocations([...new Set(fetchedLocs.map(l => l.name || l.location_name || (typeof l === 'string' ? l : '')).filter(Boolean))]);
      }

      // Fetch Vendors
      const venRes = await fetch('/vendor-api/vendor/vendors/', { headers });
      if (venRes.ok) {
        const venData = await venRes.json();
        let fetchedVendors = [];
        if (Array.isArray(venData)) {
          fetchedVendors = venData;
        } else if (venData.vendor_objs && Array.isArray(venData.vendor_objs)) {
          fetchedVendors = venData.vendor_objs;
        } else if (venData.vendors && Array.isArray(venData.vendors)) {
          fetchedVendors = venData.vendors;
        } else if (venData.data && Array.isArray(venData.data)) {
          fetchedVendors = venData.data;
        } else if (venData.data?.vendors && Array.isArray(venData.data.vendors)) {
          fetchedVendors = venData.data.vendors;
        } else if (venData.results && Array.isArray(venData.results)) {
          fetchedVendors = venData.results;
        } else {
          const arrays = Object.values(venData).filter(val => Array.isArray(val));
          if (arrays.length > 0) fetchedVendors = arrays[0];
        }

        if (fetchedVendors.length > 0) {
          setVendorObjsList(fetchedVendors);
          setVendors([...new Set(fetchedVendors.map(v => v.vendor_name || v.name || v.shop_name || (typeof v === 'string' ? v : '')).filter(Boolean))]);
        }
      }
    } catch (err) {
      console.error('Error fetching filters:', err);
    }
  };

  useEffect(() => {
    fetchPackages();
    fetchFilters();
  }, []);
  const toggleDropdown = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const handleDelete = async (packageId, packageTitle) => {
    const confirmed = await showDeleteAlert(packageTitle || 'this package');
    if (confirmed) {
      try {
        const response = await fetch(`/package-api/package/package-delete/${packageId}/`, {
          method: 'DELETE',
          headers: {
            'Authorization': 'Token 8RWYE3BKLZCFIN2FHQNNQEAEWBNDY184TGNYTY6X',
            'Accept': 'application/json',
          },
        });

        if (!response.ok && response.status !== 204) {
          throw new Error('Failed to delete package');
        }

        console.log('Deleted package:', packageId);
        showDeleteSuccess(packageTitle || 'Package');
        fetchPackages();
      } catch (error) {
        console.error('Error deleting package:', error);
        showDeleteError(error.message || 'Failed to delete package');
      }
    }
  };

  const handleActivate = async (packageId, packageTitle) => {
    if (!packageId) return;
    const confirmed = await showActivateAlert(packageTitle || 'this package');
    if (!confirmed) return;
    try {
      const response = await fetch(`/package-api/package/package-activate/${packageId}/`, {
        method: 'POST',
        headers: {
          'Authorization': 'Token 8RWYE3BKLZCFIN2FHQNNQEAEWBNDY184TGNYTY6X',
          'Accept': 'application/json',
        },
      });
      if (response.ok) {
        showActivateSuccess(packageTitle || 'Package');
        fetchPackages();
      } else {
        showError('Error', 'Failed to activate package');
      }
    } catch (err) {
      console.error(err);
      showError('Error', 'An unexpected error occurred while activating');
    }
  };

  const handleDeactivate = async (packageId, packageTitle) => {
    if (!packageId) return;
    const confirmed = await showDeactivateAlert(packageTitle || 'this package');
    if (!confirmed) return;
    try {
      const response = await fetch(`/package-api/package/${packageId}/deactivate/`, {
        method: 'POST',
        headers: {
          'Authorization': 'Token 8RWYE3BKLZCFIN2FHQNNQEAEWBNDY184TGNYTY6X',
          'Accept': 'application/json',
        },
      });
      if (response.ok) {
        showDeactivateSuccess(packageTitle || 'Package');
        fetchPackages();
      } else {
        showError('Error', 'Failed to deactivate package');
      }
    } catch (err) {
      console.error(err);
      showError('Error', 'An unexpected error occurred while deactivating');
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
  return (
    <>
      <div className="card relative flex flex-col bg-white bg-clip-border rounded-[1.25rem] shadow-[3px_4px_20px_0px_#0000000F] border-0 mt-3 py-3 px-3">
        <div className="card-header p-4  flex gap-3 flex-wrap justify-between items-center border-b border-[#e3e3e3]">
          <div>
            <h1 className='font-poppins font-semibold text-[20px] md:text-[24px] leading-[100%] text-[#2A2A2A]'>{packageLabel}</h1>
          </div>
          <div className='flex flex-wrap items-center gap-3'>
            <button className='bg-[#007BFF] text-white flex items-center gap-2 justify-center py-2 min-w-[111px] h-[36px] text-[12px] rounded-[8px] cursor-pointer'>
              <img src={ExportIcon} alt="Export" />Export</button>
            <div className="relative dropdown-container">
              <button onClick={() => toggleDropdown('filter')} className="flex items-center gap-4 bg-[#26354D] rounded-[8px] py-[7px] px-[20px] text-white text-[12px] font-semibold cursor-pointer">
                Filters
                <img className='ms-4 w-[16px] h-[16px]' src={filter} alt="filter" />
              </button>
              {openIndex === "filter" && (
                <div className="relative">
                  <div className="card min-w-[278px] shadow-[3px_4px_13px_0px_#0000001A] absolute right-0 z-10 bg-white p-3 rounded-[10px]">
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
                            <SearchableSelect options={vendors.length > 0 ? vendors : ["Vendor A", "Vendor B", "Vendor C"]} value={filterVendor} onChange={(val) => setFilterVendor(val)} placeholder={`Select ${vendorLabel}`} searchPlaceholder={`Search ${vendorLabel.toLowerCase()}...`} />
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
                              fetchPackages({ category: '', location: '', vendor: '', minPrice: '', maxPrice: '' });
                              setOpenIndex(null);
                            }}
                            className='bg-[#EDEDED] font-[12px] w-[117px] h-[38px] px-5 cursor-pointer py-2 rounded-[8px] text-[#131313] font-semibold'
                          >
                            Reset
                          </button>
                          <button
                            type='button'
                            onClick={() => {
                              fetchPackages();
                              setOpenIndex(null);
                            }}
                            className='bg-[#007BFF] font-[12px] w-[117px] h-[38px] px-5 cursor-pointer py-2 rounded-[8px] text-[#FFFFFF] font-semibold'
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
            <Link to="/admin/packages/add" className="flex items-center gap-4 bg-[#007BFF] rounded-[8px] py-[7px] px-[20px] text-white text-[12px] font-semibold cursor-pointer">
              + Create Package
            </Link>
          </div>
        </div>
        <div className="card-sub-header p-4 flex justify-end items-center">
          <div className="inline-block">
            <form className="relative flex items-center">
              <input className="w-full border border-[#E5E5E5] rounded-lg px-3 py-2 text-[14px] focus:outline-none focus:ring-1 focus:ring-[#0F2446] bg-[#F4F4F4]" type="search" placeholder="Search" />
              <button type="button" className="absolute right-2 flex items-center justify-center cursor-pointer">
                <img src={SearchIcon} alt="search" className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
        <div className="card-body py-4">
          <div className="overflow-x-auto min-h-[400px]">
            <table className="w-full">
              <thead>
                <tr className='border-b border-[#dee2e6]'>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">#</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">Title </th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">{categoryLabel}</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">Activity</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">Location</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">Vendor</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">Price</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">Status</th>
                  <th className="py-2 text-left text-xs font-semibold text-[#383838]"></th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="9" className="text-center py-20">
                      <div className="flex justify-center items-center">
                        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#007BFF]"></div>
                      </div>
                      <p className="mt-4 text-gray-500 font-medium">Loading packages...</p>
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="9" className="text-center py-20">
                      <p className="text-red-500 font-semibold mb-2">Error: {error}</p>
                      <button
                        onClick={fetchPackages}
                        className="px-6 py-2 bg-[#007BFF] text-white rounded-[8px] text-[12px] font-semibold hover:bg-[#0069d9] transition-colors cursor-pointer"
                      >
                        Try Again
                      </button>
                    </td>
                  </tr>
                ) : packages.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="text-center py-20">
                      <p className="text-[#8c8c8c] font-medium mb-2">No packages found.</p>
                      <Link to="/admin/packages/add" className="text-[#007BFF] text-[14px] font-bold hover:underline cursor-pointer">Create your first package</Link>
                    </td>
                  </tr>
                ) : (
                  packages.map((pkg, index) => {
                    const pId = pkg.id || pkg.pk || pkg.package_id;
                    const pTitle = pkg.name || pkg.title || pkg.package_name || 'Package';
                    const isActive = pkg.status === 'Active' || pkg.status?.toLowerCase() === 'active' || pkg.is_active;
                    const extrName = (val) => val && typeof val === 'object' ? (val.name || val.category_name || val.activity_name || val.location_name || val.vendor_name || val.title) : val;

                    return (
                      <tr key={pId || index} className='border-b border-[#dee2e6] last:border-0'>
                        <td className="px-4 py-2 text-[12px] text-[#383838]">{index + 1}</td>
                        <td className="text-[#383838] text-[12px] leading-[100%] py-3">
                          <div className="font-medium text-[13px] mb-1 text-[#2A2A2A]">{pTitle}</div>
                          <div className="text-[#751CC2] font-medium text-[9px]">{pkg.package_code || pkg.code || `#PKG${String(pId || index + 1).padStart(4, '0')}`}</div>
                        </td>
                        <td className="px-4 py-2 text-[12px] text-[#383838]">{extrName(pkg.category) || pkg.category_name || 'N/A'}</td>
                        <td className="px-4 py-2 text-[12px] text-[#383838]">{extrName(pkg.activity) || pkg.activity_name || 'N/A'}</td>
                        <td className="px-4 py-2 text-[12px] text-[#383838]">{extrName(pkg.island) || pkg.island_location_name || 'N/A'}</td>
                        <td className="px-4 py-2 text-[12px] text-[#383838]">
                          {(() => {
                            const vObj = vendorObjsList.find(v => String(v.id) === String(pId));
                            return vObj ? vObj.vendor_name : (extrName(pkg.vendor) || pkg.vendor_name || pkg.shop_name || 'N/A');
                          })()}
                        </td>
                        <td className="px-4 py-2 text-[12px] text-[#383838]">INR {pkg.default_price || pkg.price || pkg.base_price || 0}</td>
                        <td className="py-2 text-[12px] text-[#383838]">
                          <span className={`badge font-semibold text-[9px] py-[5px] px-4 rounded-[22px] ${isActive ? 'bg-[#B5FFDF] text-[#1C9762] border border-[#1C9762]' : 'bg-[#ffd6d6] text-[#dc3545] border border-[#dc3545]'}`}>
                            {pkg.status || (isActive ? 'Active' : 'Inactive')}
                          </span>
                        </td>
                        <td className="px-4 py-2 text-[12px] text-[#383838]">
                          <div className="relative inline-block text-left dropdown-container">
                            <button onClick={() => toggleDropdown(index)} className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 focus:outline-none cursor-pointer ${openIndex === index ? 'bg-gray-100 text-[#007BFF]' : 'text-gray-400 hover:bg-gray-100 hover:text-gray-600'}`}>
                              <FiMoreVertical size={20} />
                            </button>
                            {openIndex === index && (
                              <ul className="absolute right-0 mt-2 w-40 origin-top-right bg-white border border-[#E2E2E2] rounded-[12px] shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)] z-100 overflow-hidden py-1">
                                <li className='border-b border-[#e2e2e2]'>
                                  <Link to={`/admin/packages/view/${pId}`} className="flex items-center gap-3 px-4 py-2.5 text-[11px] font-medium text-[#8c8c8c] hover:text-[#3d3d3d] transition-colors cursor-pointer" onClick={() => setOpenIndex(null)}>View</Link>
                                </li>
                                <li className='border-b border-[#e2e2e2]'>
                                  <Link to={`/admin/packages/edit/${pId}`} className="flex items-center gap-3 px-4 py-2.5 text-[11px] font-medium text-[#8c8c8c] hover:text-[#3d3d3d] transition-colors w-full text-left cursor-pointer" onClick={() => setOpenIndex(null)}>Edit</Link>
                                </li>
                                {isActive ? (
                                  <li className='border-b border-[#e2e2e2]'>
                                    <button className="flex items-center gap-3 px-4 py-2.5 text-[11px] font-medium text-[#8c8c8c] hover:text-[#3d3d3d] transition-colors w-full text-left cursor-pointer" onClick={() => { handleDeactivate(pId, pTitle); setOpenIndex(null); }}>Deactivate</button>
                                  </li>
                                ) : (
                                  <li className='border-b border-[#e2e2e2]'>
                                    <button className="flex items-center gap-3 px-4 py-2.5 text-[11px] font-medium text-[#8c8c8c] hover:text-[#3d3d3d] transition-colors w-full text-left cursor-pointer" onClick={() => { handleActivate(pId, pTitle); setOpenIndex(null); }}>Activate</button>
                                  </li>
                                )}
                                <li>
                                  <button className="flex items-center gap-3 px-4 py-2.5 text-[11px] font-medium text-[#dc3545] hover:text-[#dc3545] transition-colors w-full text-left cursor-pointer" onClick={() => { handleDelete(pId, pTitle); setOpenIndex(null); }}> Delete
                                  </button>
                                </li>
                              </ul>
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
        <div className="card-footer p-3">
         <PaginationCard totalPages={1} currentPage={1} onPageChange={(page) => console.log(page)} />
        </div>
      </div>
      <NotificationModal />
    </>
  )
}

export default PackagesList;