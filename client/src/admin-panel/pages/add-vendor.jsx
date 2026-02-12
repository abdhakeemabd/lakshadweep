import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import Slidebar from '../component/slidebar'
import AddImageIcon from '../../assets/admin-panel-icon/icons/cam.svg'
import Header from '../component/header'

function AddVendor() {
  const fileRef = useRef(null);
  const licenseFileRef1 = useRef(null);
  const licenseFileRef2 = useRef(null);
  const licenseFileRef3 = useRef(null);
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [licenseFile1, setLicenseFile1] = useState(null);
  const [licenseFile2, setLicenseFile2] = useState(null);
  const [licenseFile3, setLicenseFile3] = useState(null);

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
    if (fileRef.current) fileRef.current.value = '';
  };

  const handleLicenseFile1Change = (e) => {
    const file = e.target.files[0];
    if (file) setLicenseFile1(file);
  };

  const handleLicenseFile2Change = (e) => {
    const file = e.target.files[0];
    if (file) setLicenseFile2(file);
  };

  const handleLicenseFile3Change = (e) => {
    const file = e.target.files[0];
    if (file) setLicenseFile3(file);
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append('name', formData.vendor_name);
    data.append('latitude', formData.vendor_latitude);
    data.append('longitude', formData.vendor_longitude);

    // Combine country code and mobile number
    const fullPhone = `${formData.country_code}${formData.mobile_no}`;
    data.append('phone', fullPhone);

    data.append('address_line_1', formData.vendor_address_line_1);
    data.append('address_line_2', formData.vendor_address_line_2);
    data.append('email', formData.vendor_email);
    data.append('state', formData.vendor_state);
    data.append('pin_code', formData.vendor_pin_code);
    data.append('location', formData.island_location);
    data.append('category', formData.activity);
    data.append('description', formData.vendor_description);

    if (licenseFile1) data.append('instructor_license_1', licenseFile1);
    if (licenseFile2) data.append('instructor_license_2', licenseFile2);
    if (licenseFile3) data.append('instructor_license_3', licenseFile3);

    if (imageFile) {
      data.append('image', imageFile);
    } else if (fileRef.current?.files[0]) {
      data.append('image', fileRef.current.files[0]);
    }

    try {
      const response = await fetch('/vendor-api/vendor/create-vendor/', {
        method: 'POST',
        headers: {
          'Authorization': 'Token D9SIHYWOO9FC8BYFBTQC2STOKF33FZ6GDL047A4Q',
          'Accept': 'application/json',
          'ngrok-skip-browser-warning': 'true',
        },
        body: data,
      });

      if (response.ok) {
        alert('Vendor added successfully!');
        navigate('/admin/vendor/list');
      } else {
        const text = await response.text();
        let errorMsg = 'Failed to add vendor';
        try {
          const errorData = JSON.parse(text);
          console.error('❌ API Error Detail:', errorData);
          if (typeof errorData === 'object' && !errorData.message) {
            errorMsg = Object.entries(errorData)
              .map(([field, msgs]) => `${field}: ${Array.isArray(msgs) ? msgs.join(', ') : msgs}`)
              .join('\n');
          } else {
            errorMsg = errorData.message || JSON.stringify(errorData);
          }
        } catch {
          errorMsg = text.substring(0, 300) || `HTTP ${response.status}`;
        }
        alert(`Failed to add vendor:\n${errorMsg}`);
      }
    } catch (error) {
      console.error('❌ Network/Fetch Error:', error);
      alert('Network error. Please check your connection or console for details.');
    } finally {
      setLoading(false);
    }
  };


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
          <div className="w-full pt-3">
            <Header />
            <div className="card relative flex flex-col break-words bg-white bg-clip-border rounded-[1.25rem] shadow-[3px_4px_20px_0px_#0000000F] border-0 mt-3 py-3 px-3">
              <div className="card-header p-4 flex justify-between items-center border-b border-[#e3e3e3] mb-3">
                <div className="flex items-center gap-3">
                  <Link to="/admin/vendor/list" className="w-[34px] h-[34px] bg-[#f9f9f9] rounded-xl flex items-center justify-center transition-colors hover:bg-gray-200">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
                  </Link>
                  <div className="font-semibold text-[24px] leading-none tracking-normal text-[#2A2A2A]">
                    Add Vendor
                  </div>
                </div>
                <div className='flex gap-4'>
                  <button onClick={handleSubmit} disabled={loading} className="bg-[#007BFF] rounded-[8px] py-[7px] px-[30px] gap-[5px] text-white text-[12px] font-semibold hover:bg-blue-600 transition-colors disabled:opacity-50">
                    {loading ? 'Saving...' : 'Save'}
                  </button>
                </div>
              </div>
              <div className="card-body p-4">
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-12 gap-5 lg:gap-x-6 lg:gap-y-5">
                    <div className="col-span-12 sm:col-span-6 lg:col-span-4">
                      <label htmlFor="vendor_name" className="block mb-2 text-[14px] font-medium text-[#3d3d3d]">Vendor Name <span className='text-red-700 font-semibold'>*</span></label>
                      <input type="text" id="vendor_name" value={formData.vendor_name} onChange={handleInputChange} className="w-full border rounded-[10px] px-3 py-2 text-[14px] border-0 focus:outline-none bg-[#f5f5f5] text-[#414141]" placeholder='Enter Vendor Name' required />
                    </div>
                    <div className="col-span-12 sm:col-span-6 lg:col-span-4">
                      <label htmlFor="vendor_latitude" className="block mb-2 text-[14px] font-medium text-[#3d3d3d]">Vendor Latitude</label>
                      <input type="text" id="vendor_latitude" value={formData.vendor_latitude} onChange={handleInputChange} className="w-full border rounded-[10px] px-3 py-2 text-[14px] border-0 focus:outline-none bg-[#f5f5f5] text-[#414141]" placeholder='Enter Vendor Latitude' />
                    </div>
                    <div className="col-span-12 sm:col-span-6 lg:col-span-4">
                      <label htmlFor="vendor_longitude" className="block mb-2 text-[14px] font-medium text-[#3d3d3d]">Vendor Longitude</label>
                      <input type="text" id="vendor_longitude" value={formData.vendor_longitude} onChange={handleInputChange} className="w-full border rounded-[10px] px-3 py-2 text-[14px] border-0 focus:outline-none bg-[#f5f5f5] text-[#414141]" placeholder='Enter Vendor Longitude' />
                    </div>
                    <div className="col-span-12 sm:col-span-6 lg:col-span-4">
                      <label htmlFor="vendor_phone" className="block mb-2 text-[14px] font-medium text-[#3d3d3d]">Phone <span className="text-red-700 font-semibold">*</span></label>
                      <div className="relative">
                        <PhoneInput country="in" value={formData.mobile_no} onChange={(val, country) => {
                          const dial = country.dialCode;
                          let strippedVal = val;
                          if (val.startsWith(dial)) {
                            strippedVal = val.slice(dial.length);
                          }
                          setFormData(prev => ({ ...prev, mobile_no: strippedVal, country_code: `+${dial}` }));
                        }} enableSearch searchPlaceholder="Search country..." placeholder="Enter Vendor Phone" disableCountryCode disableCountryGuess inputProps={{ name: 'mobile_no', required: true, autoFocus: false, id: 'vendor_phone', }}
                          containerClass="!w-full" inputClass="!w-full !h-[42px] !pl-[95px] !pr-4 !py-2 !border-0 !rounded-[10px] !text-[14px] !bg-[#f5f5f5] !text-[#414141] focus:!outline-none !transition-all" buttonClass="!bg-transparent !border-none !rounded-l-[10px] hover:!bg-gray-200" dropdownClass="!w-80 !max-h-[200px] !rounded-lg !shadow-xl !border !border-gray-200" searchClass="!p-3 !sticky !top-0 !bg-white !border-b !border-gray-200" />
                        <div className="absolute left-[45px] top-1/2 -translate-y-1/2 flex items-center pointer-events-none select-none">
                          <span className="text-gray-900 font-medium text-[14px]">{formData.country_code}</span>
                          <div className="w-[1px] h-5 bg-gray-300 mx-3"></div>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-12 sm:col-span-6 lg:col-span-4">
                      <label htmlFor="vendor_address_line_1" className="block mb-2 text-[14px] font-medium text-[#3d3d3d]">Vendor Address Line 1</label>
                      <input type="text" id="vendor_address_line_1" value={formData.vendor_address_line_1} onChange={handleInputChange} className="w-full border rounded-[10px] px-3 py-2 text-[14px] border-0 focus:outline-none bg-[#f5f5f5] text-[#414141]" placeholder='Enter Vendor Address Line 1' />
                    </div>
                    <div className="col-span-12 sm:col-span-6 lg:col-span-4">
                      <label htmlFor="vendor_address_line_2" className="block mb-2 text-[14px] font-medium text-[#3d3d3d]">Vendor Address Line 2</label>
                      <input type="text" id="vendor_address_line_2" value={formData.vendor_address_line_2} onChange={handleInputChange} className="w-full border rounded-[10px] px-3 py-2 text-[14px] border-0 focus:outline-none bg-[#f5f5f5] text-[#414141]" placeholder='Enter Vendor Address Line 2' />
                    </div>
                    <div className="col-span-12 sm:col-span-6 lg:col-span-4">
                      <label htmlFor="vendor_email" className="block mb-2 text-[14px] font-medium text-[#3d3d3d]">Email <span className='text-red-700 font-semibold'>*</span></label>
                      <input type="email" id="vendor_email" value={formData.vendor_email} onChange={handleInputChange} className="w-full border rounded-[10px] px-3 py-2 text-[14px] border-0 focus:outline-none bg-[#f5f5f5] text-[#414141]" placeholder='Enter Vendor Email' required />
                    </div>
                    <div className="col-span-12 sm:col-span-6 lg:col-span-4">
                      <label htmlFor="vendor_state" className="block mb-2 text-[14px] font-medium text-[#3d3d3d]">Vendor State <span className='text-red-700 font-semibold'>*</span></label>
                      <input type="text" id="vendor_state" value={formData.vendor_state} onChange={handleInputChange} className="w-full border rounded-[10px] px-3 py-2 text-[14px] border-0 focus:outline-none bg-[#f5f5f5] text-[#414141]" placeholder='Enter Vendor State' required />
                    </div>
                    <div className="col-span-12 sm:col-span-6 lg:col-span-4">
                      <label htmlFor="vendor_pin_code" className="block mb-2 text-[14px] font-medium text-[#3d3d3d]">Vendor Pin code <span className='text-red-700 font-semibold'>*</span></label>
                      <input type="number" id="vendor_pin_code" value={formData.vendor_pin_code} onChange={handleInputChange} className="w-full border rounded-[10px] px-3 py-2 text-[14px] border-0 focus:outline-none bg-[#f5f5f5] text-[#414141]" placeholder='Enter Vendor Pin code' required />
                    </div>
                    <div className="col-span-12 lg:col-span-3">
                      <div className="xl:flex gap-6">
                        <div className="mb-4 xl:mb-0">
                          <label className="relative w-[160px] h-[160px] flex flex-col items-center justify-center border-2 border-dashed border-[#79A4F9E8] rounded-[16px] cursor-pointer hover:border-[#FF5C1A] transition bg-[#fafafa] overflow-hidden">
                            <input ref={fileRef} type="file" accept="image/*" hidden onChange={handleImageChange} />
                            {!preview && (
                              <>
                                <img src={AddImageIcon} alt="" className="w-8 h-8 mb-2 opacity-70" />
                                <span className="text-[13px] text-[#777] font-medium">Upload Profile</span>
                              </>
                            )}
                            {preview && (
                              <>
                                <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-[16px]" />
                                <button type="button" onClick={removeImage} className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-red-50 transition">
                                  <img src="/icons/deletegallery.svg" alt="" className="w-4 h-4" />
                                </button>
                              </>
                            )}
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-12 lg:col-span-8">
                      <div className="flex-1 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-4 items-end">
                          <div>
                            <label className="block mb-2 text-[14px] font-medium text-[#3d3d3d]">Island Location <span className="text-red-700 font-semibold">*</span></label>
                            <select id="island_location" value={formData.island_location} onChange={handleInputChange} className="w-full rounded-[10px] px-3 py-2 text-[14px] border-0 bg-[#f5f5f5] text-[#414141] focus:outline-none" required>
                              <option value="">Select Option</option>
                              <option value="Kavaratti">Kavaratti</option>
                              <option value="Agatti">Agatti</option>
                              <option value="Minicoy">Minicoy</option>
                            </select>
                          </div>
                          <div>
                            <label className="block mb-2 text-[14px] font-medium text-[#3d3d3d]">Activity <span className="text-red-700 font-semibold">*</span></label>
                            <select id="activity" value={formData.activity} onChange={handleInputChange} className="w-full rounded-[10px] px-3 py-2 text-[14px] border-0 bg-[#f5f5f5] text-[#414141] focus:outline-none" required>
                              <option value="">Select Option</option>
                              <option value="Kayakking">Kayakking</option>
                              <option value="Snorkeling">Snorkeling</option>
                              <option value="Scuba Diving">Scuba Diving</option>
                            </select>
                          </div>
                          <button type="button" className="h-[42px] px-5 rounded-[10px] bg-[#DCEAFF] text-[#0267FE] text-[12px] font-semibold hover:bg-[#DCEAFF] transition">+ Add</button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          <div className="col-span-1 sm:col-span-1 lg:col-span-1">
                            <label className="block mb-2 text-[14px] font-medium text-[#3d3d3d]">Instructor License 1</label>
                            <input ref={licenseFileRef1} type="file" accept=".pdf,.jpg,.jpeg,.png" hidden onChange={handleLicenseFile1Change} />
                            <button type="button" onClick={() => licenseFileRef1.current?.click()} className="w-full h-[42px] rounded-[10px] px-3 py-2 text-[14px] border-0 bg-[#DCEAFF] text-[#0267FE] font-medium hover:bg-[#C5DBFF] transition flex items-center justify-center gap-2">
                              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                              Choose File
                            </button>
                            {licenseFile1 && (
                              <p className="mt-2 text-[12px] text-[#666] truncate" title={licenseFile1.name}>
                                {licenseFile1.name}
                              </p>
                            )}
                          </div>
                          <div className="col-span-1 sm:col-span-1 lg:col-span-1">
                            <label className="block mb-2 text-[14px] font-medium text-[#3d3d3d]">Instructor License 2</label>
                            <input ref={licenseFileRef2} type="file" accept=".pdf,.jpg,.jpeg,.png" hidden onChange={handleLicenseFile2Change} />
                            <button type="button" onClick={() => licenseFileRef2.current?.click()} className="w-full h-[42px] rounded-[10px] px-3 py-2 text-[14px] border-0 bg-[#DCEAFF] text-[#0267FE] font-medium hover:bg-[#C5DBFF] transition flex items-center justify-center gap-2">
                              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                              Choose File
                            </button>
                            {licenseFile2 && (
                              <p className="mt-2 text-[12px] text-[#666] truncate" title={licenseFile2.name}>
                                {licenseFile2.name}
                              </p>
                            )}
                          </div>
                          <div className="col-span-1 sm:col-span-1 lg:col-span-1">
                            <label className="block mb-2 text-[14px] font-medium text-[#3d3d3d]">Instructor License 3</label>
                            <input ref={licenseFileRef3} type="file" accept=".pdf,.jpg,.jpeg,.png" hidden onChange={handleLicenseFile3Change} />
                            <button type="button" onClick={() => licenseFileRef3.current?.click()} className="w-full h-[42px] rounded-[10px] px-3 py-2 text-[14px] border-0 bg-[#DCEAFF] text-[#0267FE] font-medium hover:bg-[#C5DBFF] transition flex items-center justify-center gap-2">
                              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                              Choose File
                            </button>
                            {licenseFile3 && (
                              <p className="mt-2 text-[12px] text-[#666] truncate" title={licenseFile3.name}>
                                {licenseFile3.name}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-12 lg:col-span-8">
                      <label htmlFor="vendor_description" className="block mb-2 text-[14px] font-medium text-[#3d3d3d]">Vendor Description</label>
                      <textarea id="vendor_description" value={formData.vendor_description} onChange={handleInputChange} className="w-full border rounded-[10px] px-3 py-2 text-[14px] border-0 focus:outline-none bg-[#f5f5f5] text-[#414141] min-h-[100px]" placeholder='Enter Description'></textarea>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddVendor
