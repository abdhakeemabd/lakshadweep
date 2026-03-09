import React, { useEffect, useState } from 'react'
import NotificationModal from '../component/notification-modal';
import filter from '../../assets/admin-panel-icon/icons/filter-icon.svg'
import { FiMoreVertical } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import SearchIcon from "../../assets/admin-panel-icon/icons/search.svg";
import ExportIcon from "../../assets/admin-panel-icon/icons/export.svg";
import { showDeleteAlert, showDeleteSuccess, showDeleteError, showActivateAlert, showActivateSuccess, showDeactivateAlert, showDeactivateSuccess, showError } from '../component/swal-delete';
import SearchableSelect from '../../component/searchable-select';

function PackagesList() {
  const [openIndex, setOpenIndex] = useState(null);
  const [filterCategory, setFilterCategory] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterVendor, setFilterVendor] = useState('');
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const response = await fetch('/package-api/package/packages/', {
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
      setError(null);
    } catch (err) {
      console.error('Error fetching packages:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
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
            <h1 className='font-poppins font-semibold text-[20px] md:text-[24px] leading-[100%] text-[#2A2A2A]'>Packages</h1>
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
                          <label className="text-[#2A2A2A] font-semibold text-[12px] leading-[100%]">Category</label>
                          <div className="mt-1">
                            <SearchableSelect options={["Watersports", "Adventure", "Eco Tourism", "Leisure"]} value={filterCategory} onChange={(val) => setFilterCategory(val)} placeholder="Select Category" searchPlaceholder="Search category..." />
                          </div>
                        </div>
                        <div className="items">
                          <label className="text-[#2A2A2A] font-semibold text-[12px] leading-[100%]">Location</label>
                          <div className="mt-1">
                            <SearchableSelect options={["Agatti", "Amini", "Andrott", "Bangaram", "Bitra", "Chetlat", "Kadmat", "Kalpeni", "Kavaratti", "Kiltan", "Minicoy"]} value={filterLocation} onChange={(val) => setFilterLocation(val)} placeholder="Select Location" searchPlaceholder="Search location..." />
                          </div>
                        </div>
                        <div className="items">
                          <label className="text-[#2A2A2A] font-semibold text-[12px] leading-[100%]">Vendor</label>
                          <div className="mt-1">
                            <SearchableSelect options={["Vendor A", "Vendor B", "Vendor C"]} value={filterVendor} onChange={(val) => setFilterVendor(val)} placeholder="Select Vendor" searchPlaceholder="Search vendor..." />
                          </div>
                        </div>
                        <div className="flex gap-3 mb-3">
                          <div className="items">
                            <label className="text-[#2A2A2A] font-semibold text-[12px] leading-[100%]">Price</label>
                            <div className="relative rounded-[8px] overflow-hidden">
                              <div className='absolute left-0 h-full top-0 bg-[#494949] w-[38px]'>
                                <span className='text-[12px] text-white flex items-center justify-center h-full'>Min</span>
                              </div>
                              <input type="text" className="ps-[45px] w-full border border-[#E5E5E5] rounded-lg pe-3 py-2 text-[14px] focus:outline-none focus:ring-[#0F2446] bg-[#F4F4F4]" />
                            </div>
                          </div>
                          <div className="items">
                            <label className="text-[#2A2A2A] font-semibold text-[12px] leading-[100%]">Price</label>
                            <div className="relative rounded-[8px] overflow-hidden">
                              <div className='absolute left-0 h-full top-0 bg-[#494949] w-[38px]'>
                                <span className='text-[12px] text-white flex items-center justify-center h-full'>Max</span>
                              </div>
                              <input type="text" className="ps-[45px] w-full border border-[#E5E5E5] rounded-lg pe-3 py-2 text-[14px] focus:outline-none focus:ring-[#0F2446] bg-[#F4F4F4]" />
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <button type='button' className='bg-[#EDEDED] font-[12px] w-[117px] h-[38px] px-5 cursor-pointer py-2 rounded-[8px] text-[#131313] font-semibold'>Reset</button>
                          <button type='button' className='bg-[#007BFF] font-[12px] w-[117px] h-[38px] px-5 cursor-pointer py-2 rounded-[8px] text-[#FFFFFF] font-semibold'>Apply</button>
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
                  <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">Category</th>
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

                    return (
                      <tr key={pId || index} className='border-b border-[#dee2e6] last:border-0'>
                        <td className="px-4 py-2 text-[12px] text-[#383838]">{index + 1}</td>
                        <td className="text-[#383838] text-[12px] leading-[100%] py-3">
                          <div className="font-medium text-[13px] mb-1 text-[#2A2A2A]">{pTitle}</div>
                          <div className="text-[#751CC2] font-medium text-[9px]">{pkg.package_code || pkg.code || `#PKG${String(pId || index + 1).padStart(4, '0')}`}</div>
                        </td>
                        <td className="px-4 py-2 text-[12px] text-[#383838]">{pkg.category_name || pkg.category || 'N/A'}</td>
                        <td className="px-4 py-2 text-[12px] text-[#383838]">{pkg.activity_name || pkg.activity || 'N/A'}</td>
                        <td className="px-4 py-2 text-[12px] text-[#383838]">{pkg.location_name || pkg.location || 'N/A'}</td>
                        <td className="px-4 py-2 text-[12px] text-[#383838]">{pkg.vendor_name || pkg.vendor || 'N/A'}</td>
                        <td className="px-4 py-2 text-[12px] text-[#383838]">INR {pkg.price || pkg.base_price || 0}</td>
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
      </div>
      <NotificationModal />
    </>
  )
}

export default PackagesList;