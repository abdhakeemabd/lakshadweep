import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiMoreVertical } from 'react-icons/fi'
import Slidebar from '../component/slidebar'
import Header from '../component/header'
import filter from '../../assets/admin-panel-icon/icons/filter-icon.svg'
import SearchIcon from "../../assets/admin-panel-icon/icons/search.svg";
import Export from "../../assets/admin-panel-icon/icons/excel.svg";
import Print from "../../assets/admin-panel-icon/icons/print.svg";
function VendorList() {
  const [openIndex, setOpenIndex] = useState(null);
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchVendors = async () => {
    try {
      setLoading(true);
      const response = await fetch('/vendor-api/vendor/vendors/', {
        method: 'GET',
        headers: {
          'Authorization': 'Token CHPQ9LCXLZEEQ5UVPWLQ40U1X6URZVBTH64LP0CP',
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch vendors');
      }

      const data = await response.json();
      console.log('Raw API Response:', data);
      
      // Extensive data discovery
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
        // Look for any property that contains an array
        const arrays = Object.values(data).filter(val => Array.isArray(val));
        if (arrays.length > 0) {
          vendorsList = arrays[0]; 
        }
      }
      
      setVendors(vendorsList);
      setError(null);
    } catch (err) {
      console.error('Error fetching vendors:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  const toggleDropdown = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const toggleFilterDropdown = () => {
    setOpenIndex(openIndex === "filter" ? null : "filter");
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
    console.log("Export clicked");
  };

  const printThis = () => {
    window.print();
  };
  
  return (
    <section>
      <div className="container-fluid mx-auto pr-3">
        <div className="flex gap-2">
          <div className="w-[262px]">
            <Slidebar />
          </div>
          <div className=" w-full pt-3">
            <Header />
            <div className="card relative flex flex-col break-words bg-white bg-clip-border rounded-[1.25rem] shadow-[3px_4px_20px_0px_#0000000F] border-0 mt-3 py-3 px-3">
              <div className="card-header p-4 flex justify-between items-center border-b border-[#e3e3e3]">
                <div className='flex items-center gap-3'>
                  <h1 className='font-poppins font-semibold text-[20px] md:text-[24px] leading-[100%] text-[#2A2A2A]'>Vendor List</h1>
                  {!loading && (
                    <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded text-[12px] font-bold">
                      Total: {vendors.length}
                    </span>
                  )}
                  <button 
                    onClick={fetchVendors} 
                    disabled={loading}
                    className={`p-1.5 rounded-full hover:bg-gray-100 transition-colors ${loading ? 'animate-spin text-gray-400' : 'text-[#007BFF]'}`}
                    title="Refresh List"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 4v6h-6"/><path d="M1 20v-6h6"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
                  </button>
                </div>
                <div className='flex gap-4'>
                  <div className="relative dropdown-container">
                    <button onClick={toggleFilterDropdown} className="flex items-center gap-4 bg-[#26354D] rounded-[8px] py-[7px] px-[20px] text-white text-[12px] font-semibold">
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
                                <label className="text-[#2A2A2A] font-semibold text-[12px] leading-[100%]">Category</label>
                                <select name="category" id="category" className="w-full appearance-none border border-[#E5E5E5] rounded-lg px-3 py-2 mt-1 text-[14px] text-[#414242] bg-[#F4F4F4] focus:outline-none focus:ring-1 focus:ring-[#0F2446] focus:border-[#0F2446] cursor-pointer" defaultValue="">
                                  <option value="" disabled>Select Category</option>
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                </select>
                              </div>
                              <div className="items">
                                <label className="text-[#2A2A2A] font-semibold text-[12px] leading-[100%]">Location</label>
                                <select name="category" id="category" className="w-full appearance-none border border-[#E5E5E5] rounded-lg px-3 py-2 mt-1 text-[14px] text-[#414242] bg-[#F4F4F4] focus:outline-none focus:ring-1 focus:ring-[#0F2446] focus:border-[#0F2446] cursor-pointer" defaultValue="">
                                  <option value="" disabled>Select Category</option>
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                </select>
                              </div>
                              <div className="items">
                                <label className="text-[#2A2A2A] font-semibold text-[12px] leading-[100%]">Vendor</label>
                                <select name="category" id="category" className="w-full appearance-none border border-[#E5E5E5] rounded-lg px-3 py-2 mt-1 text-[14px] text-[#414242] bg-[#F4F4F4] focus:outline-none focus:ring-1 focus:ring-[#0F2446] focus:border-[#0F2446] cursor-pointer" defaultValue="">
                                  <option value="" disabled>Select Category</option>
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                </select>
                              </div>
                              <div className="flex gap-3 mb-3">
                                <div className="items">
                                  <label className="text-[#2A2A2A] font-semibold text-[12px] leading-[100%]">Price</label>
                                  <div className="relative rounded-[8px] overflow-hidden">
                                    <div className='absolute left-0 h-full top-0 bg-[#494949] w-[38px] h-[20px]'>
                                      <span className='text-[12px] text-white flex items-center justify-center h-full'>Min</span>
                                    </div>
                                    <input type="text" className="ps-[45px] w-full border border-[#E5E5E5] rounded-lg pe-3 py-2 text-[14px] focus:outline-none focus:ring-[#0F2446] bg-[#F4F4F4]" />
                                  </div>
                                </div>
                                <div className="items">
                                  <label className="text-[#2A2A2A] font-semibold text-[12px] leading-[100%]">Price</label>
                                  <div className="relative rounded-[8px] overflow-hidden">
                                    <div className='absolute left-0 h-full top-0 bg-[#494949] w-[38px] h-[20px]'>
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
                  <Link to="/admin/add-vendor" className="bg-[#007BFF] rounded-[8px] py-[7px] px-[20px] gap-[5px] text-white text-[12px] font-semibold">+ Add Vendor</Link>
                </div>
              </div>
              <div className="card-sub-header py-6 flex align-center justify-end">
                <div className="inline-block mr-[15px]">
                  <form className="relative flex items-center">
                    <input className="w-full border border-[#E5E5E5] rounded-lg px-3 py-2 text-[14px] focus:outline-none focus:ring-1 focus:ring-[#0F2446] bg-[#F4F4F4]" type="search" placeholder="Search" />
                    <button type="button" className="absolute right-2 flex items-center justify-center">
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
                          <th className='text-[#383838] font-semibold text-[12px] leading-[100%] text-left py-3'>Island /Location</th>
                          <th className='text-[#383838] font-semibold text-[12px] leading-[100%] text-left py-3'>Category</th>
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
                                className="px-6 py-2 bg-[#007BFF] text-white rounded-[8px] text-[12px] font-semibold hover:bg-[#0069d9] transition-colors"
                              >
                                Try Again
                              </button>
                            </td>
                          </tr>
                        ) : vendors.length === 0 ? (
                          <tr>
                            <td colSpan="8" className="text-center py-20">
                              <p className="text-[#8c8c8c] font-medium mb-2">No vendors found.</p>
                              <Link to="/admin/add-vendor" className="text-[#007BFF] text-[14px] font-bold hover:underline">Add your first vendor</Link>
                            </td>
                          </tr>
                        ) : (
                          vendors.map((vendor, index) => (
                            <tr key={vendor.id || index} className='border-b border-[#e3e3e3] last:border-b-0'>
                              <td className='text-[#383838] text-[12px] leading-[100%] py-3 ps-3'>{index + 1}</td>
                              <td className='text-[#383838] text-[12px] leading-[100%] py-3'>
                                <div className='font-medium text-[13px] mb-1 text-[#2A2A2A]'>{vendor.name || vendor.vendor_name || 'Unnamed Vendor'}</div>
                                <div className='text-[#751CC2] font-medium text-[9px]'>{vendor.vendor_code || vendor.code || `#VND${String(vendor.id || index + 1).padStart(4, '0')}`}</div>
                              </td>
                              <td className='text-[#383838] text-[12px] py-3'>{vendor.phone || vendor.mobile_no || vendor.vendor_phone || 'N/A'}</td>
                              <td className='text-[#383838] text-[12px] py-3'>{vendor.email || vendor.vendor_email || 'N/A'}</td>
                              <td className='text-[#383838] text-[12px] py-3'>{vendor.location || vendor.island_location || vendor.address_line_1 || 'N/A'}</td>
                              <td className='text-[#383838] text-[12px] py-3'>{vendor.category || vendor.activity || 'N/A'}</td>
                              <td className='text-[#383838] text-[12px] py-3'>
                                <div className={`badge px-2 justify-center flex items-center w-[65px] h-[22px] rounded-full text-[10px] font-semibold 
                                  ${(vendor.status === "Active" || vendor.is_active || vendor.vendor_status === "Active")
                                    ? "text-[#1C9762] bg-[#B5FFDF] border border-[#1C9762]"
                                    : "text-[#dc3545] bg-[#ffd6d6] border border-[#dc3545]"}`}>
                                  {vendor.status || (vendor.is_active ? "Active" : "Inactive")}
                                </div>
                              </td>
                              <td className='py-3'>
                                <div className="relative inline-block text-left dropdown-container">
                                  <button onClick={() => toggleDropdown(index)} className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 focus:outline-none ${openIndex === index ? 'bg-gray-100 text-[#007BFF]' : 'text-gray-400 hover:bg-gray-100 hover:text-gray-600'}`}>
                                    <FiMoreVertical size={20} />
                                  </button>
                                  {openIndex === index && (
                                    <div className="absolute right-0 mt-2 w-40 origin-top-right bg-white border border-gray-100 rounded-[12px] shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)] z-[100] overflow-hidden py-1">
                                      <Link to={`/admin/vendors-view`} className="flex items-center gap-3 px-4 py-2.5 text-[11px] font-medium text-[#8c8c8c] hover:text-[#3d3d3d] transition-colors" onClick={() => setOpenIndex(null)}>View</Link>
                                      <Link to={`/admin/vendors-edit`} className="flex items-center gap-3 px-4 py-2.5 text-[11px] font-medium text-[#8c8c8c] hover:text-[#3d3d3d] transition-colors w-full text-left cursor-pointer" onClick={() => setOpenIndex(null)}>Edit</Link>
                                      <div className="mx-2 my-1 border-t border-gray-100" />
                                      <button className="flex items-center gap-3 px-4 py-2.5 text-[11px] font-medium text-[#8c8c8c] hover:text-[#3d3d3d] transition-colors w-full text-left cursor-pointer" onClick={() => setOpenIndex(null)}>Deactivate</button>
                                      <button className="flex items-center gap-3 px-4 py-2.5 text-[11px] font-medium text-[#dc3545] hover:text-[#dc3545] transition-colors w-full text-left cursor-pointer" onClick={() => setOpenIndex(null)}>Delete</button>
                                    </div>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default VendorList
