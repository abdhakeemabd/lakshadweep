import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import Slidebar from '../component/slidebar'
import Header from '../component/header'

function VendorEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [imageFile, setImageFile] = useState(null);

  const [formData, setFormData] = useState({
    vendor_name: '',
    vendor_latitude: '',
    vendor_longitude: '',
    vendor_address_line_1: '',
    vendor_address_line_2: '',
    vendor_email: '',
    vendor_state: '',
    vendor_pin_code: '',
    island_location: '',
    activity: '',
    vendor_description: '',
    mobile_no: '',
    country_code: '+91',
  });

  useEffect(() => {
    const fetchVendorDetails = async () => {
      try {
        setFetching(true);
        
        // Define candidate endpoints to try for fetching (GET)
        const candidates = [
          `/vendor-api/vendor/vendor-details/${id}/`,
          `/vendor-api/vendor/${id}/`,
          `/vendor-api/vendor/vendor-detail/${id}/`,
          `/vendor-api/vendor/details/${id}/`,
          `/vendor-api/vendor/detail/${id}/`,
          `/vendor-api/vendor/${id}/details/`,
          `/vendor-api/vendor-details/${id}/`,
          `/vendor-api/vendor-detail/${id}/`
        ];
        
        let success = false;
        let lastError = '';

        for (const url of candidates) {
          try {
            console.log(`Attempting to fetch from: ${url}`);
            const response = await fetch(url, {
              method: 'GET',
              headers: {
                'Authorization': 'Token D9SIHYWOO9FC8BYFBTQC2STOKF33FZ6GDL047A4Q',
                'Accept': 'application/json',
                'ngrok-skip-browser-warning': 'true',
              },
            });

            if (response.ok) {
              const result = await response.json();
              console.log(`Successfully fetched from ${url}:`, result);
              
              // Data extraction logic
              let data = result;
              if (result.status === true || result.status === 'success') {
                data = result.data || result.vendor || result.vendor_details || result.page_obj || result;
              }
              // If page_obj is an array, take the first element (common in some serializers)
              if (Array.isArray(data)) data = data[0];
              if (data && data.page_obj && Array.isArray(data.page_obj)) data = data.page_obj[0];
              
              if (!data) {
                console.warn("Fetch succeeded but no data found in response.");
                continue;
              }

              // Phone number normalization
              const phoneVal = String(data.phone || data.mobile_no || data.vendor_phone || '');
              let phoneDigits = phoneVal.replace(/\D/g, ''); // Extract only digits
              let phoneCode = '+91';
              
              if (phoneVal.startsWith('+')) {
                // If it starts with + (e.g., +919876543210)
                if (phoneVal.startsWith('+91')) {
                  phoneDigits = phoneDigits.slice(2); // digit string is '91987...' after \D/g, so slice(2) is '987...'
                  phoneCode = '+91';
                } else {
                  // Fallback for other countries if detected
                  const detectedCode = phoneVal.match(/^\+(\d+)/);
                  if (detectedCode) {
                    phoneCode = `+${detectedCode[1]}`;
                    phoneDigits = phoneDigits.replace(detectedCode[1], '');
                  }
                }
              } else if (phoneDigits.startsWith('91') && phoneDigits.length > 10) {
                // If it starts with 91 but no + (e.g., 919876543210)
                phoneDigits = phoneDigits.slice(2);
                phoneCode = '+91';
              }

              const islandOptions = ["Agatti", "Amini", "Andrott", "Bangaram", "Bitra", "Chetlat", "Kadmat", "Kalpeni", "Kavaratti", "Kiltan", "Minicoy"];
              const activityOptions = ["Kayakking", "Snorkeling", "Scuba Diving", "Parasailing", "Glass Bottom Boat", "Wind Surfing", "Water Skiing", "Deep Sea Fishing", "Island Hopping", "Dolphin Watching"];

              let locationVal = '';
              let activityVal = '';

              // Get raw values from data
              const rawLocation = data.location || data.island_location || '';
              const rawActivity = data.activity || data.category || '';

              // Clean and normalize values for matching dropdowns
              if (rawLocation) {
                const cleanedLoc = String(rawLocation).trim().toLowerCase();
                const matched = islandOptions.find(opt => opt.toLowerCase() === cleanedLoc);
                if (matched) locationVal = matched;
              }

              if (rawActivity) {
                const cleanedAct = String(rawActivity).trim().toLowerCase();
                const matched = activityOptions.find(opt => opt.toLowerCase() === cleanedAct);
                if (matched) activityVal = matched;
              }

              setFormData({
                vendor_name: data.name || data.vendor_name || '',
                vendor_latitude: data.latitude || data.vendor_latitude || '',
                vendor_longitude: data.longitude || data.vendor_longitude || '',
                vendor_address_line_1: data.address_line_1 || data.address1 || '',
                vendor_address_line_2: data.address_line_2 || data.address2 || '',
                vendor_email: data.email || data.vendor_email || '',
                vendor_state: data.state || data.vendor_state || '',
                vendor_pin_code: data.pin_code || data.pincode || '',
                island_location: locationVal || '',
                activity: activityVal || '',
                vendor_description: data.description || data.vendor_description || '',
                mobile_no: phoneDigits,
                country_code: phoneCode,
              });

              // Image path normalization
              let imageUrl = data.image || data.photo || data.vendor_image || data.profile_picture;
              if (imageUrl && typeof imageUrl === 'string') {
                // If the URL is relative (e.g., starts with /media/), prefix it with the backend URL
                if (imageUrl.startsWith('/')) {
                   const baseUrl = 'https://z71mwq0q-8000.inc1.devtunnels.ms';
                   imageUrl = `${baseUrl}${imageUrl}`;
                }
                setPreview(imageUrl);
              }
              
              success = true;
              break;
            } else {
              const text = await response.text();
              console.warn(`Endpoint ${url} failed with ${response.status}. Body: ${text.substring(0, 100)}`);
              lastError = text || `Status ${response.status}`;
            }
          } catch (e) {
            console.warn(`Error fetching from ${url}:`, e);
            lastError = e.message;
          }
        }

        if (!success) {
          console.error('All fetch attempts failed.');
          alert(`Failed to load vendor details. Last error: ${lastError}`);
          navigate('/admin/vendor/list');
        }
      } catch (error) {
        console.error('Outer fetch error:', error);
        alert('An unexpected error occurred while loading vendor details.');
      } finally {
        setFetching(false);
      }
    };

    if (id) {
      fetchVendorDetails();
    }
  }, [id, navigate]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  const removeImage = () => {
    setPreview(null);
    setImageFile(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);

    const data = new FormData();
    // Use the EXACT field names and mapping from the working add-vendor.jsx
    data.append('name', formData.vendor_name);
    data.append('latitude', formData.vendor_latitude);
    data.append('longitude', formData.vendor_longitude);
    
    // Exact phone format from add-vendor
    const fullPhone = `${formData.country_code}${formData.mobile_no}`;
    data.append('phone', fullPhone);
    
    // Address fields mapping from add-vendor
    data.append('address_line_1', formData.vendor_address_line_1);
    data.append('address_line_2', formData.vendor_address_line_2);
    data.append('email', formData.vendor_email);
    data.append('state', formData.vendor_state);
    data.append('pin_code', formData.vendor_pin_code);
    data.append('location', formData.island_location);
    data.append('category', formData.activity);
    data.append('description', formData.vendor_description);
    
    // Include identifiers in body just in case
    data.append('id', id);
    data.append('vendor_id', id);

    if (imageFile) {
      // Send under all possible keys to ensure the backend receives it
      data.append('image', imageFile);
      data.append('photo', imageFile);
      data.append('vendor_image', imageFile);
    }

    try {
      // Prioritize POST as many simple backends use it for everything, including updates.
      // We try the user-provided pattern /vendor/ID/update/ first.
      const updateCandidates = [
        { url: `/vendor-api/vendor/${id}/update/`, method: 'POST' },
        { url: `/vendor-api/vendor/${id}/update/`, method: 'PATCH' },
        { url: `/vendor-api/vendor/${id}/update/`, method: 'PUT' },
        { url: `/vendor-api/vendor/update-vendor/${id}/`, method: 'POST' },
        { url: `/vendor-api/vendor/update-vendor/${id}/`, method: 'PUT' },
        { url: `/vendor-api/vendor/vendor-update/${id}/`, method: 'PATCH' },
        { url: `/vendor-api/vendor/edit-vendor/${id}/`, method: 'POST' },
        { url: `/vendor-api/vendor/${id}/`, method: 'PATCH' }
      ];

      let lastResponse;
      let updateSuccess = false;
      let resultBody = null;

      for (const candidate of updateCandidates) {
        try {
          console.log(`🌐 Trying to SAVE via ${candidate.method} to ${candidate.url}...`);
          
          const response = await fetch(candidate.url, {
            method: candidate.method,
            headers: {
              'Authorization': 'Token D9SIHYWOO9FC8BYFBTQC2STOKF33FZ6GDL047A4Q',
              'Accept': 'application/json',
              'ngrok-skip-browser-warning': 'true',
              'X-HTTP-Method-Override': candidate.method // Help some servers recognize PATCH/PUT
            },
            body: data,
          });

          lastResponse = response;
          const responseText = await response.text();
          
          if (response.ok) {
            console.log(`✅ SUCCESS on ${candidate.url}! Server response:`, responseText.substring(0, 200));
            try {
              resultBody = JSON.parse(responseText);
            } catch (e) {
              resultBody = { message: "Success (no JSON)" };
            }
            updateSuccess = true;
            break;
          } else {
            console.warn(`❌ FAILED on ${candidate.url} with status ${response.status}. Response:`, responseText.substring(0, 100));
          }
        } catch (e) {
          console.error(`💥 Error during save attempt to ${candidate.url}:`, e);
        }
      }

      if (updateSuccess) {
        alert('Vendor updated successfully!');
        // Allow a slight buffer for server persistence
        setTimeout(() => navigate('/admin/vendor/list'), 100);
      } else {
        const response = lastResponse;
        const text = await (response ? response.text() : "No response from any candidate server");
        let errorMsg = 'Failed to update vendor';
        try {
          const errorData = JSON.parse(text);
          if (typeof errorData === 'object') {
            errorMsg = Object.entries(errorData)
              .map(([field, msgs]) => `${field}: ${Array.isArray(msgs) ? msgs.join(', ') : msgs}`)
              .join('\n');
          } else {
            errorMsg = JSON.stringify(errorData);
          }
        } catch {
          errorMsg = text.substring(0, 300) || `HTTP ${response?.status}`;
        }
        alert(`Failed to update vendor. All endpoints rejected the changes.\nDetails: ${errorMsg}`);
      }
    } catch (error) {
      console.error('❌ Outer Shell Save Error:', error);
      alert('An unexpected error occurred while saving.');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#007BFF]"></div>
        <span className="ml-3 text-lg font-medium text-gray-600">Loading vendor details...</span>
      </div>
    );
  }

  return (
    <>
      <style>{`
        .react-tel-input .country-list .search-emoji { display: none; }
        .react-tel-input .country-list .search-box { width: 100% !important; margin: 0 !important; padding: 8px 12px !important; }
      `}</style>
      <div className="container-fluid mx-auto pr-3">
        <div className="flex gap-2">
          <div className="w-[262px]">
            <Slidebar />
          </div>
          <div className=" w-full pt-3">
            <Header />
            <div className="card relative flex flex-col break-words bg-white bg-clip-border rounded-[1.25rem] shadow-[3px_4px_20px_0px_#0000000F] border-0 mt-3 py-3 px-3">
              <div className="card-header p-4 flex justify-between items-center border-b border-[#e3e3e3] mb-3">
                <div className="flex items-center gap-3">
                  <Link to="/admin/vendor/list" className="w-[34px] h-[34px] bg-[#f9f9f9] rounded-xl flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
                  </Link>
                  <div className="font-semibold text-[24px] leading-none tracking-normal text-[#2A2A2A]">Edit Vendor</div>
                </div>
                <div className='flex gap-4'>
                  <button 
                    onClick={handleSubmit} 
                    disabled={loading}
                    className="bg-[#007BFF] rounded-[8px] py-[7px] px-[30px] gap-[5px] text-white text-[12px] font-semibold hover:bg-blue-600 transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Saving...' : 'Save'}
                  </button>
                </div>
              </div>
              <div className="card-body p-4">
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-12 gap-5 lg:gap-x-6 lg:gap-y-5">
                    <div className="col-span-12 sm:col-span-6 lg:col-span-4">
                      <label htmlFor="vendor_name" className="block mb-2 text-[14px] font-medium text-[#3d3d3d]">Vendor Name <span className='text-red-700 font-semibold'>*</span></label>
                      <input 
                        type="text" 
                        id="vendor_name" 
                        value={formData.vendor_name}
                        onChange={handleInputChange}
                        className="w-full border rounded-[10px] px-3 py-2 text-[14px] border-0 focus:outline-none  bg-[#f5f5f5] text-[#414141]" 
                        placeholder='Enter Vendor Name' 
                        required 
                      />
                    </div>
                    <div className="col-span-12 sm:col-span-6 lg:col-span-4">
                      <label htmlFor="vendor_latitude" className="block mb-2 text-[14px] font-medium text-[#3d3d3d]">Vendor Latitude</label>
                      <input 
                        type="text" 
                        id="vendor_latitude" 
                        value={formData.vendor_latitude}
                        onChange={handleInputChange}
                        className="w-full border rounded-[10px] px-3 py-2 text-[14px] border-0 focus:outline-none  bg-[#f5f5f5] text-[#414141]" 
                        placeholder='Enter Vendor Latitude' 
                      />
                    </div>
                    <div className="col-span-12 sm:col-span-6 lg:col-span-4">
                      <label htmlFor="vendor_longitude" className="block mb-2 text-[14px] font-medium text-[#3d3d3d]">Vendor Longitude</label>
                      <input 
                        type="text" 
                        id="vendor_longitude" 
                        value={formData.vendor_longitude}
                        onChange={handleInputChange}
                        className="w-full border rounded-[10px] px-3 py-2 text-[14px] border-0 focus:outline-none  bg-[#f5f5f5] text-[#414141]" 
                        placeholder='Enter Vendor Longitude' 
                      />
                    </div>
                    <div className="col-span-12 sm:col-span-6 lg:col-span-4">
                      <label htmlFor="vendor_phone" className="block mb-2 text-[14px] font-medium text-[#3d3d3d]">Phone <span className='text-red-700 font-semibold'>*</span></label>
                      <div className="relative">
                        <PhoneInput
                          country={formData.country_code.replace('+', '').toLowerCase() === '91' ? 'in' : ''}
                          value={formData.country_code + formData.mobile_no}
                          onChange={(val, country) => {
                            const dial = country.dialCode;
                            let strippedVal = val;
                            if (val.startsWith(dial)) {
                              strippedVal = val.slice(dial.length);
                            }
                            setFormData(prev => ({ ...prev, mobile_no: strippedVal, country_code: `+${dial}` }));
                          }}
                          enableSearch={true}
                          searchPlaceholder="Search country..."
                          placeholder="Enter Vendor Phone"
                          disableCountryCode={true}
                          disableCountryGuess={false}
                          inputProps={{ name: 'phone', required: true, autoFocus: false, id: 'vendor_phone' }}
                          containerClass="!w-full"
                          inputClass="!w-full !h-[42px] !pl-[95px] !pr-4 !py-2 !border-0 !rounded-[10px] !text-[14px] !bg-[#f5f5f5] !text-[#414141] focus:!outline-none !transition-all"
                          buttonClass="!bg-transparent !border-none !rounded-l-[10px] hover:!bg-gray-200"
                          dropdownClass="!w-80 !max-h-[200px] !rounded-lg !shadow-xl !border !border-gray-200"
                          searchClass="!p-3 !sticky !top-0 !bg-white !border-b !border-gray-200"
                        />
                        <div className="absolute left-[45px] top-1/2 -translate-y-1/2 flex items-center pointer-events-none select-none">
                          <span className="text-gray-900 font-medium text-[14px]">{formData.country_code}</span>
                          <div className="w-[1px] h-5 bg-gray-300 mx-3"></div>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-12 sm:col-span-6 lg:col-span-4">
                      <label htmlFor="vendor_address_line_1" className="block mb-2 text-[14px] font-medium text-[#3d3d3d]">Vendor Address Line 1</label>
                      <input 
                        type="text" 
                        id="vendor_address_line_1" 
                        value={formData.vendor_address_line_1}
                        onChange={handleInputChange}
                        className="w-full border rounded-[10px] px-3 py-2 text-[14px] border-0 focus:outline-none  bg-[#f5f5f5] text-[#414141]" 
                        placeholder='Enter Vendor Address Line 1' 
                      />
                    </div>
                    <div className="col-span-12 sm:col-span-6 lg:col-span-4">
                      <label htmlFor="vendor_address_line_2" className="block mb-2 text-[14px] font-medium text-[#3d3d3d]">Vendor Address Line 2</label>
                      <input 
                        type="text" 
                        id="vendor_address_line_2" 
                        value={formData.vendor_address_line_2}
                        onChange={handleInputChange}
                        className="w-full border rounded-[10px] px-3 py-2 text-[14px] border-0 focus:outline-none  bg-[#f5f5f5] text-[#414141]" 
                        placeholder='Enter Vendor Address Line 2' 
                      />
                    </div>
                    <div className="col-span-12 sm:col-span-6 lg:col-span-4">
                      <label htmlFor="vendor_email" className="block mb-2 text-[14px] font-medium text-[#3d3d3d]">Email <span className='text-red-700 font-semibold'>*</span></label>
                      <input 
                        type="email" 
                        id="vendor_email" 
                        value={formData.vendor_email}
                        onChange={handleInputChange}
                        className="w-full border rounded-[10px] px-3 py-2 text-[14px] border-0 focus:outline-none  bg-[#f5f5f5] text-[#414141]" 
                        placeholder='Enter Vendor Email' 
                        required 
                      />
                    </div>
                    <div className="col-span-12 sm:col-span-6 lg:col-span-4">
                      <label htmlFor="vendor_state" className="block mb-2 text-[14px] font-medium text-[#3d3d3d]">Vendor State <span className='text-red-700 font-semibold'>*</span></label>
                      <input 
                        type="text" 
                        id="vendor_state" 
                        value={formData.vendor_state}
                        onChange={handleInputChange}
                        className="w-full border rounded-[10px] px-3 py-2 text-[14px] border-0 focus:outline-none  bg-[#f5f5f5] text-[#414141]" 
                        placeholder='Enter Vendor State' 
                        required 
                      />
                    </div>
                    <div className="col-span-12 sm:col-span-6 lg:col-span-4">
                      <label htmlFor="vendor_pin_code" className="block mb-2 text-[14px] font-medium text-[#3d3d3d]">Vendor Pin code <span className='text-red-700 font-semibold'>*</span></label>
                      <input 
                        type="number" 
                        id="vendor_pin_code" 
                        value={formData.vendor_pin_code}
                        onChange={handleInputChange}
                        className="w-full border rounded-[10px] px-3 py-2 text-[14px] border-0 focus:outline-none  bg-[#f5f5f5] text-[#414141]" 
                        placeholder='Enter Vendor Pin code' 
                        required 
                      />
                    </div>
                    <div className="col-span-12 lg:col-span-3">
                      <div className="xl:flex gap-6">
                        {/* Upload Box */}
                        <div className="mb-4 xl:mb-0">
                          <label className="relative w-[160px] h-[160px] flex flex-col items-center justify-center border-2 border-dashed border-[#E5E5E5] rounded-[16px] cursor-pointer hover:border-[#FF5C1A] transition bg-[#fafafa] overflow-hidden">
                            <input
                              ref={fileRef}
                              type="file"
                              accept="image/*"
                              hidden
                              onChange={handleImageChange}
                            />

                            {!preview && (
                              <>
                                <img src="/icons/cam.svg" alt="" className="w-8 h-8 mb-2 opacity-70" />
                                <span className="text-[13px] text-[#777] font-medium">
                                  Upload Profile
                                </span>
                              </>
                            )}

                            {preview && (
                              <>
                                <img
                                  src={preview}
                                  alt="Preview"
                                  className="w-full h-full object-cover rounded-[16px]"
                                />
                                <button
                                  type="button"
                                  onClick={removeImage}
                                  className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-red-50 transition"
                                >
                                  <img src="/icons/deletegallery.svg" alt="" className="w-4 h-4" />
                                </button>
                              </>
                            )}
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-8">
                      <div className="flex-1 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-4 items-end">
                          <div>
                            <label className="block mb-2 text-[14px] font-medium text-[#3d3d3d]">
                              Island Location <span className="text-red-700 font-semibold">*</span>
                            </label>
                            <select 
                              id="island_location"
                              value={formData.island_location}
                              onChange={handleInputChange}
                              className="w-full rounded-[10px] px-3 py-2 text-[14px] border-0 bg-[#f5f5f5] text-[#414141] focus:outline-none"
                              required
                            >
                              <option value="">Select Island</option>
                              <option value="Agatti">Agatti</option>
                              <option value="Amini">Amini</option>
                              <option value="Andrott">Andrott</option>
                              <option value="Bangaram">Bangaram</option>
                              <option value="Bitra">Bitra</option>
                              <option value="Chetlat">Chetlat</option>
                              <option value="Kadmat">Kadmat</option>
                              <option value="Kalpeni">Kalpeni</option>
                              <option value="Kavaratti">Kavaratti</option>
                              <option value="Kiltan">Kiltan</option>
                              <option value="Minicoy">Minicoy</option>
                            </select>
                          </div>
                          <div>
                            <label className="block mb-2 text-[14px] font-medium text-[#3d3d3d]">
                              Activity <span className="text-red-700 font-semibold">*</span>
                            </label>
                            <select 
                              id="activity"
                              value={formData.activity}
                              onChange={handleInputChange}
                              className="w-full rounded-[10px] px-3 py-2 text-[14px] border-0 bg-[#f5f5f5] text-[#414141] focus:outline-none disabled:opacity-60"
                              required
                            >
                              <option value="">Select Activity</option>
                              <option value="Kayakking">Kayakking</option>
                              <option value="Snorkeling">Snorkeling</option>
                              <option value="Scuba Diving">Scuba Diving</option>
                              <option value="Parasailing">Parasailing</option>
                              <option value="Glass Bottom Boat">Glass Bottom Boat</option>
                              <option value="Wind Surfing">Wind Surfing</option>
                              <option value="Water Skiing">Water Skiing</option>
                              <option value="Deep Sea Fishing">Deep Sea Fishing</option>
                              <option value="Island Hopping">Island Hopping</option>
                              <option value="Dolphin Watching">Dolphin Watching</option>
                            </select>
                          </div>
                          <button type="button" className="h-[42px] px-5 rounded-[10px] bg-[#DCEAFF] text-[#0267FE] text-[12px] font-semibold hover:bg-[#DCEAFF] transition">+ Add</button>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-12 lg:col-span-8">
                      <label htmlFor="vendor_description" className="block mb-2 text-[14px] font-medium text-[#3d3d3d]">Vendor Description</label>
                      <textarea 
                        id="vendor_description" 
                        value={formData.vendor_description}
                        onChange={handleInputChange}
                        className="w-full border rounded-[10px] px-3 py-2 text-[14px] border-0 focus:outline-none  bg-[#f5f5f5] text-[#414141] min-h-[100px]" 
                        placeholder='Enter Description' 
                      ></textarea>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default VendorEdit