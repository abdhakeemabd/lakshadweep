import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import SearchableSelect from '../../component/searchable-select'
import { showSuccess, showError } from '../component/swal-delete'
import AddImageIcon from '../../assets/admin-panel-icon/icons/cam.svg'

import DeleteIcon from '../../assets/admin-panel-icon/icons/delete-icon.svg'

function VendorEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [imageFile, setImageFile] = useState(null);
  const [islandLoading, setIslandLoading] = useState(false);
  const [activitiesLoading, setActivitiesLoading] = useState(false);
  const activityOptions = ["Kayakking", "Snorkeling", "Scuba Diving", "Parasailing", "Glass Bottom Boat", "Wind Surfing", "Water Skiing", "Deep Sea Fishing", "Island Hopping", "Dolphin Watching"];
  const [activitiesData, setActivitiesData] = useState([]);
  const [islandOptionsList, setIslandOptionsList] = useState(["Agatti", "Amini", "Andrott", "Bangaram", "Bitra", "Chetlat", "Kadmat", "Kalpeni", "Kavaratti", "Kiltan", "Minicoy"]);
  const [statesList, setStatesList] = useState([]);
  const [statesLoading, setStatesLoading] = useState(false);
  const [activityOptionsList, setActivityOptionsList] = useState(["Kayakking", "Snorkeling", "Scuba Diving", "Parasailing", "Glass Bottom Boat", "Wind Surfing", "Water Skiing", "Deep Sea Fishing", "Island Hopping", "Dolphin Watching"]);
  const [activityRows, setActivityRows] = useState([
    { island_location: '', activity: '', documents: [] }
  ]);
  const [fullIslandData, setFullIslandData] = useState([]);
  const [fullStatesData, setFullStatesData] = useState([]);

  const indiaStates = [
    "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", 
    "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Goa", 
    "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", 
    "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", 
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab", "Rajasthan", 
    "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ];



  const addActivityRow = () => {
    setActivityRows(prev => [...prev, { island_location: '', activity: '', documents: [] }]);
  };

  const removeActivityRow = (index) => {
    setActivityRows(prev => prev.filter((_, i) => i !== index));
  };

  const updateActivityRow = (index, field, value) => {
    setActivityRows(prev => {
      const updated = [...prev];
      if (field === 'activity') {
        const selectedAct = activitiesData.find(a => a.name.trim().toLowerCase() === value.trim().toLowerCase());
        const docs = selectedAct ? selectedAct.documents.map(d => ({
          name: d.name,
          isMandatory: d.isMandatory || false,
          file: null
        })) : [];
        updated[index] = { ...updated[index], activity: value, documents: docs };
      } else {
        updated[index] = { ...updated[index], [field]: value };
      }
      return updated;
    });
  };

  const handleRowDocChange = (rowIdx, docIdx, file) => {
    setActivityRows(prev => {
      const updated = [...prev];
      const updatedDocs = [...updated[rowIdx].documents];
      updatedDocs[docIdx] = { ...updatedDocs[docIdx], file };
      updated[rowIdx] = { ...updated[rowIdx], documents: updatedDocs };
      return updated;
    });
  };

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

        const candidates = [
          `/vendor-api/vendor/vendor-details/${id}/`,
          `/vendor-api/vendor/vendor-edit-detail/${id}/`,
          `/vendor-api/vendor/vendor-update/${id}/`,
        ];

        let success = false;
        let lastError = '';

        for (const url of candidates) {
          try {
            console.log(`Trying to fetch vendor details from: ${url}`);
            const response = await fetch(url, {
              method: 'GET',
              headers: {
                'Authorization': 'Token 8RWYE3BKLZCFIN2FHQNNQEAEWBNDY184TGNYTY6X',
                'Accept': 'application/json',
                'ngrok-skip-browser-warning': 'true',
              },
            });

            if (response.ok) {
              const result = await response.json();
              let data = result;
              if (result.status === true || result.status === 'success') {
                data = result.data || result.vendor || result.vendor_details || result.page_obj || result;
              }
              if (Array.isArray(data)) data = data[0];
              if (data && data.page_obj && Array.isArray(data.page_obj)) data = data.page_obj[0];

              if (!data) {
                console.warn("Fetch succeeded but no data found in response.");
                continue;
              }

              const phoneVal = String(data.phone || data.mobile_no || data.vendor_phone || '');
              let phoneDigits = phoneVal.replace(/\D/g, '');
              let phoneCode = '+91';

              if (phoneVal.startsWith('+')) {
                if (phoneVal.startsWith('+91')) {
                  phoneDigits = phoneDigits.slice(2);
                  phoneCode = '+91';
                } else {
                  const detectedCode = phoneVal.match(/^\+(\d+)/);
                  if (detectedCode) {
                    phoneCode = `+${detectedCode[1]}`;  
                    phoneDigits = phoneDigits.replace(detectedCode[1], '');
                  }
                }
              } else if (phoneDigits.startsWith('91') && phoneDigits.length > 10) {
                phoneDigits = phoneDigits.slice(2);
                phoneCode = '+91';
              }
              let locationVal = '';
              let activityVal = '';
              
              const rawLocation = data.location || data.island_location || (Array.isArray(data.unique_islands) && data.unique_islands.length > 0 ? data.unique_islands[0] : '');
              const rawActivity = data.activity || data.category || (Array.isArray(data.unique_categories) && data.unique_categories.length > 0 ? data.unique_categories[0] : '');

              locationVal = rawLocation || '';
              activityVal = rawActivity || '';

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

              setActivityRows([
                { island_location: locationVal || '', activity: activityVal || '', documents: [] }
              ]);

              let imageUrl = data.image || data.photo || data.vendor_image || data.profile_picture;
              if (imageUrl && typeof imageUrl === 'string') {
                if (!imageUrl.startsWith('http')) {
                  // Ensure relative path starts with /media to hit the proxy
                  if (!imageUrl.startsWith('/media') && !imageUrl.startsWith('media')) {
                    imageUrl = imageUrl.startsWith('/') ? `/media${imageUrl}` : `/media/${imageUrl}`;
                  } else {
                    imageUrl = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`;
                  }
                }
                setPreview(imageUrl);
                console.log("Image preview set to:", imageUrl);
              }
              success = true;
              break;
            } else {
              const text = await response.text();
              console.warn(`Endpoint ${url} failed with ${response.status}.`);
              lastError = text || `Status ${response.status}`;
            }
          } catch (e) {
            lastError = e.message;
          }
        }

        if (!success) {
          showError('Load Failed', `Failed to load vendor details. Last error: ${lastError}`);
          navigate('/admin/vendor/list');
        }
      } catch (error) {
        showError('Unexpected Error', 'An unexpected error occurred while loading vendor details.');
      } finally {
        setFetching(false);
      }
    };

    const fetchStates = async () => {
      try {
        setStatesLoading(true);
        const response = await fetch('/vendor-api/user/states/?country=India', {
          method: 'GET',
          headers: {
            'Authorization': 'Token 8RWYE3BKLZCFIN2FHQNNQEAEWBNDY184TGNYTY6X',
            'Accept': 'application/json',
            'ngrok-skip-browser-warning': 'true',
          },
        });
        if (response.ok) {
          const data = await response.json();
          let list = [];
          if (Array.isArray(data)) list = data;
          else if (data.data && Array.isArray(data.data)) list = data.data;
          else if (data.states && Array.isArray(data.states)) list = data.states;
          else if (data.results && Array.isArray(data.results)) list = data.results;

          if (list && list.length > 0) {
            setFullStatesData(list);
            const mapped = list.map(s => {
              if (typeof s === 'string') return s;
              return s.name || s.state_name || s.state || '';
            }).filter(Boolean);
            if (mapped.length > 0) {
              const filtered = mapped.filter(s => 
                indiaStates.some(is => is.toLowerCase() === s.toLowerCase())
              );
              setStatesList([...new Set(filtered)]);
            }
          }
        }
      } catch (err) {
        console.error('Error fetching states:', err);
      } finally {
        setStatesLoading(false);
      }
    };

    const fetchOptions = async () => {
      try {
        setIslandLoading(true);
        const response = await fetch('/category-api/settings/location-category-activity/', {
          method: 'GET',
          headers: {
            'Authorization': 'Token 8RWYE3BKLZCFIN2FHQNNQEAEWBNDY184TGNYTY6X',
            'Accept': 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          let list = [];
          if (Array.isArray(data)) list = data;
          else if (data.data && Array.isArray(data.data)) list = data.data;
          else if (data.results && Array.isArray(data.results)) list = data.results;
          else {
            const arrays = Object.values(data).filter(val => Array.isArray(val));
            if (arrays.length > 0) list = arrays[0];
          }

          if (list.length > 0) {
            setFullIslandData(list);
            const mapped = list.map(loc => {
              if (typeof loc === 'string') return loc.trim();
              if (typeof loc === 'object' && loc !== null) {
                return loc.name || loc.location_name || loc.island_name || loc.location || loc.place || '';
              }
              return '';
            }).filter(Boolean);
            setIslandOptionsList(mapped.length > 0 ? [...new Set(mapped)] : islandOptionsList);
          }
        }
      } catch (err) { console.error('Error fetching locations:', err); }
      finally { setIslandLoading(false); }

      try {
        setActivitiesLoading(true);
        const response = await fetch('/category-api/settings/category-activities/', {
          method: 'GET',
          headers: {
            'Authorization': 'Token 8RWYE3BKLZCFIN2FHQNNQEAEWBNDY184TGNYTY6X',
            'Accept': 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          let categoriesList = [];
          if (Array.isArray(data)) categoriesList = data;
          else if (data.data && Array.isArray(data.data)) categoriesList = data.data;
          else if (data.categories && Array.isArray(data.categories)) categoriesList = data.categories;
          else if (data.results && Array.isArray(data.results)) categoriesList = data.results;
          else {
            const arrays = Object.values(data).filter(val => Array.isArray(val));
            if (arrays.length > 0) categoriesList = arrays[0];
          }

          if (categoriesList.length > 0) {
            const activityMap = new Map();
            categoriesList.forEach(cat => {
              const rawActs = cat.activity_data || cat.activities_data || cat.activities || [];
              let acts = [];
              if (Array.isArray(rawActs)) {
                acts = rawActs;
              } else if (typeof rawActs === 'string' && rawActs.trim()) {
                acts = rawActs.split(',').map(n => ({ name: n.trim() }));
              } else if (cat.activity_names) {
                acts = cat.activity_names.split(',').map(n => ({ name: n.trim() }));
              }

              acts.forEach(a => {
                const name = (typeof a === 'object' && a !== null)
                  ? (a.name || a.activity_name || a.activity || a.title || '').trim()
                  : a?.toString().trim();

                if (!name) return;

                const actId = (typeof a === 'object' && a !== null) ? (a.id || a.activity_id) : null;

                const rawDocs = (typeof a === 'object' && a !== null)
                  ? (a.documents || a.vendor_documents || a.vendorDocs || a.vendor_docs || a.vendor_doc_data || [])
                  : [];

                const docs = Array.isArray(rawDocs) ? rawDocs.map(doc => ({
                  name: doc.document_name || doc.name || doc.doc_name || doc.docName || doc.title || '',
                  isMandatory: doc.options === 'required' || doc.is_mandatory || doc.docType === 'Mandatory' || doc.doc_type === 'Mandatory' || false
                })).filter(d => d.name) : [];

                if (!activityMap.has(name.toLowerCase())) {
                  activityMap.set(name.toLowerCase(), { id: actId, name, documents: docs });
                } else {
                  const existing = activityMap.get(name.toLowerCase());
                  if (actId && !existing.id) existing.id = actId;
                  docs.forEach(d => {
                    const alreadyExists = existing.documents.some(ed => ed.name.trim().toLowerCase() === d.name.trim().toLowerCase());
                    if (!alreadyExists) {
                      existing.documents.push(d);
                    }
                  });
                }
              });
            });

            const processedList = Array.from(activityMap.values());
            setActivitiesData(processedList);
            setActivityOptionsList(processedList.map(a => a.name).sort());
          }
        }
      } catch (err) { }
      finally { setActivitiesLoading(false); }
    };

    if (id) {
      fetchVendorDetails();
    }
    fetchStates();
    fetchOptions();
  }, [id, navigate]);

  useEffect(() => {
    if (activitiesData.length > 0 && activityRows.length > 0) {
      setActivityRows(prev => prev.map(row => {
        if (row.activity && (!row.documents || row.documents.length === 0)) {
          const selectedAct = activitiesData.find(a => a.name.trim().toLowerCase() === row.activity.trim().toLowerCase());
          if (selectedAct) {
            return {
              ...row,
              documents: selectedAct.documents.map(d => ({
                name: d.name,
                isMandatory: d.isMandatory || false,
                file: null
              }))
            };
          }
        }
        return row;
      }));
    }
  }, [activitiesData]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (id, value) => {
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

    // Basic Validation
    if (!formData.vendor_name || !formData.vendor_email || !formData.mobile_no || !formData.vendor_state || !formData.vendor_pin_code) {
      showError('Validation Error', 'Please fill in all required fields marked with *');
      return;
    }

    setLoading(true);

    const fullPhone = `${formData.country_code}${formData.mobile_no}`;

    const data = new FormData();
    data.append('vendor_name', formData.vendor_name);
    data.append('email', formData.vendor_email);
    data.append('mobile_no', fullPhone);
    data.append('address1', formData.vendor_address_line_1 || '');
    data.append('address2', formData.vendor_address_line_2 || '');
    data.append('pincode', formData.vendor_pin_code);
    data.append('latitude', formData.vendor_latitude || '');
    data.append('longitude', formData.vendor_longitude || '');
    data.append('description', formData.vendor_description || '');

    // State ID mapping
    if (formData.vendor_state) {
      const stateMatch = fullStatesData.find(s => {
        const sName = (s.name || s.state_name || s.state || '').toLowerCase().trim();
        return sName === formData.vendor_state.toLowerCase().trim();
      });
      if (stateMatch && stateMatch.id) {
        data.append('state', stateMatch.id);
        data.append('state_id', stateMatch.id);
      } else {
        data.append('state', formData.vendor_state);
      }
    }

    // Location and Activity IDs mapping
    if (activityRows.length > 0) {
      const firstRow = activityRows[0];
      
      const selectedIsland = fullIslandData.find(i => {
         const iName = (i.name || i.location_name || i.island_name || i.island || i.place || '').toLowerCase().trim();
         return iName === (firstRow.island_location || '').toLowerCase().trim();
      });

      const selectedActivity = activitiesData.find(a => 
         (a.name || '').toLowerCase().trim() === (firstRow.activity || '').toLowerCase().trim()
      );
      
      if (selectedIsland && selectedIsland.id) {
        data.append('location_id', selectedIsland.id);
        data.append('island_id', selectedIsland.id);
      } else if (firstRow.island_location) {
        data.append('location', firstRow.island_location);
        data.append('island_location', firstRow.island_location);
      }

      if (selectedActivity && selectedActivity.id) {
        data.append('activity_id', selectedActivity.id);
        data.append('activity_ids', selectedActivity.id);
        data.append('category_id', selectedActivity.id);
      } else if (firstRow.activity) {
        data.append('activity', firstRow.activity);
        data.append('category', firstRow.activity);
      }
    }
    
    // Add image with multiple potential keys
    if (imageFile) {
      data.append('image', imageFile);
      data.append('profile_picture', imageFile);
      data.append('vendor_image', imageFile);
      data.append('vendor_logo', imageFile);
      data.append('photo', imageFile);
      data.append('logo', imageFile);
    }

    // Add document files
    activityRows.forEach((row, index) => {
      row.documents.forEach((doc, docIdx) => {
        if (doc.file) {
          data.append(`vendor_doc_${index + 1}_${docIdx + 1}`, doc.file);
          const docKey = (doc.name || "").toLowerCase().replace(/\s+/g, '_');
          if (docKey) data.append(docKey, doc.file);
        }
      });
    });

    try {
      const response = await fetch(`/vendor-api/vendor/vendor-update/${id}/`, {
        method: 'PUT',
        headers: {
          'Authorization': 'Token 8RWYE3BKLZCFIN2FHQNNQEAEWBNDY184TGNYTY6X',
          'Accept': 'application/json',
          'ngrok-skip-browser-warning': 'true',
        },
        body: data,
      });

      if (response.ok) {
        const resData = await response.json();
        if (resData.status === false || resData.success === false) {
           throw new Error(resData.message || 'Server returned logical failure');
        }
        await showSuccess('Vendor Updated!', 'The vendor has been updated successfully.');
        navigate('/admin/vendor/list');
      } else {
        const text = await response.text();
        let errorMsg = text;
        try {
          const errJson = JSON.parse(text);
          errorMsg = errJson.message || JSON.stringify(errJson);
        } catch(e) {}
        showError('Update Failed', errorMsg);
      }
    } catch (error) {
      showError('Unexpected Error', error.message || 'An error occurred while connecting to the server.');
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
      <div className="card relative flex flex-col wrap-break-word bg-white bg-clip-border rounded-[1.25rem] shadow-[3px_4px_20px_0px_#0000000F] border-0 mt-3 py-3 px-3">
        <div className="card-header p-4 flex justify-between items-center border-b border-[#e3e3e3] mb-3">
          <div className="flex items-center gap-3">
            <Link to="/admin/vendor/list" className="w-[34px] h-[34px] bg-[#f9f9f9] rounded-xl flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
            </Link>
            <div className="font-semibold text-[24px] leading-none tracking-normal text-[#2A2A2A]">Edit Vendor</div>
          </div>
          <div className='flex gap-4'>
            <button onClick={handleSubmit} disabled={loading} className="bg-[#007BFF] rounded-[8px] py-[7px] px-[30px] gap-[5px] text-white text-[12px] font-semibold hover:bg-blue-600 transition-colors disabled:opacity-50">{loading ? 'Saving...' : 'Save'}</button>
          </div>
        </div>
        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-12 gap-5 lg:gap-x-6 lg:gap-y-5">
              <div className="col-span-12 sm:col-span-6 lg:col-span-4">
                <label htmlFor="vendor_name" className="block mb-2 text-[14px] font-medium text-[#3d3d3d]">Vendor Name <span className='text-red-700 font-semibold'>*</span></label>
                <input type="text" id="vendor_name" value={formData.vendor_name} onChange={handleInputChange} className="w-full rounded-[10px] px-3 py-2 text-[14px] border-0 focus:outline-none bg-[#f5f5f5] text-[#414141]" placeholder='Enter Vendor Name' required />
              </div>
              <div className="col-span-12 sm:col-span-6 lg:col-span-4">
                <label htmlFor="vendor_latitude" className="block mb-2 text-[14px] font-medium text-[#3d3d3d]">Vendor Latitude</label>
                <input type="text" id="vendor_latitude" value={formData.vendor_latitude} onChange={handleInputChange} className="w-full rounded-[10px] px-3 py-2 text-[14px] border-0 focus:outline-none bg-[#f5f5f5] text-[#414141]" placeholder='Enter Vendor Latitude' />
              </div>
              <div className="col-span-12 sm:col-span-6 lg:col-span-4">
                <label htmlFor="vendor_longitude" className="block mb-2 text-[14px] font-medium text-[#3d3d3d]">Vendor Longitude</label>
                <input type="text" id="vendor_longitude" value={formData.vendor_longitude} onChange={handleInputChange} className="w-full rounded-[10px] px-3 py-2 text-[14px] border-0 focus:outline-none bg-[#f5f5f5] text-[#414141]" placeholder='Enter Vendor Longitude' />
              </div>
              <div className="col-span-12 sm:col-span-6 lg:col-span-4">
                <label htmlFor="vendor_phone" className="block mb-2 text-[14px] font-medium text-[#3d3d3d]">Phone <span className='text-red-700 font-semibold'>*</span></label>
                <div className="relative">
                  <PhoneInput country={formData.country_code.replace('+', '').toLowerCase() === '91' ? 'in' : ''} value={formData.country_code + formData.mobile_no} onChange={(val, country) => { const dial = country.dialCode; let strippedVal = val; if (val.startsWith(dial)) { strippedVal = val.slice(dial.length); } setFormData(prev => ({ ...prev, mobile_no: strippedVal, country_code: `+${dial}` })); }} enableSearch={true} searchPlaceholder="Search country..." placeholder="Enter Vendor Phone" disableCountryCode={true} disableCountryGuess={false} inputProps={{ name: 'phone', required: true, autoFocus: false, id: 'vendor_phone' }} containerClass="!w-full" inputClass="!w-full !h-[42px] !pl-[95px] !pr-4 !py-2 !border-0 !rounded-[10px] !text-[14px] !bg-[#f5f5f5] !text-[#414141] focus:!outline-none !transition-all" buttonClass="!bg-transparent !border-none !rounded-l-[10px] hover:!bg-gray-200" dropdownClass="!w-80 !max-h-[200px] !rounded-lg !shadow-xl !border !border-gray-200" searchClass="!p-3 !sticky !top-0 !bg-white !border-b !border-gray-200" />
                  <div className="absolute left-[45px] top-1/2 -translate-y-1/2 flex items-center pointer-events-none select-none">
                    <span className="text-gray-900 font-medium text-[14px]">{formData.country_code}</span>
                    <div className="w-px h-5 bg-gray-300 mx-3"></div>
                  </div>
                </div>
              </div>
              <div className="col-span-12 sm:col-span-6 lg:col-span-4">
                <label htmlFor="vendor_address_line_1" className="block mb-2 text-[14px] font-medium text-[#3d3d3d]">Vendor Address Line 1</label>
                <input type="text" id="vendor_address_line_1" value={formData.vendor_address_line_1} onChange={handleInputChange} className="w-full rounded-[10px] px-3 py-2 text-[14px] border-0 focus:outline-none bg-[#f5f5f5] text-[#414141]" placeholder='Enter Vendor Address Line 1' />
              </div>
              <div className="col-span-12 sm:col-span-6 lg:col-span-4">
                <label htmlFor="vendor_address_line_2" className="block mb-2 text-[14px] font-medium text-[#3d3d3d]">Vendor Address Line 2</label>
                <input type="text" id="vendor_address_line_2" value={formData.vendor_address_line_2} onChange={handleInputChange} className="w-full rounded-[10px] px-3 py-2 text-[14px] border-0 focus:outline-none bg-[#f5f5f5] text-[#414141]" placeholder='Enter Vendor Address Line 2' />
              </div>
              <div className="col-span-12 sm:col-span-6 lg:col-span-4">
                <label htmlFor="vendor_email" className="block mb-2 text-[14px] font-medium text-[#3d3d3d]">Email <span className='text-red-700 font-semibold'>*</span></label>
                <input type="email" id="vendor_email" value={formData.vendor_email} onChange={handleInputChange} className="w-full rounded-[10px] px-3 py-2 text-[14px] border-0 focus:outline-none bg-[#f5f5f5] text-[#414141]" placeholder='Enter Vendor Email' required />
              </div>
              <div className="col-span-12 sm:col-span-6 lg:col-span-4">
                <label htmlFor="vendor_state" className="block mb-2 text-[14px] font-medium text-[#3d3d3d]">Vendor State <span className='text-red-700 font-semibold'>*</span></label>
                <SearchableSelect 
                  options={statesList} 
                  value={formData.vendor_state} 
                  onChange={(val) => handleSelectChange('vendor_state', val)} 
                  placeholder="Select State" 
                  searchPlaceholder="Search state..." 
                  loading={statesLoading}
                />
              </div>
              <div className="col-span-12 sm:col-span-6 lg:col-span-4">
                <label htmlFor="vendor_pin_code" className="block mb-2 text-[14px] font-medium text-[#3d3d3d]">Vendor Pin code <span className='text-red-700 font-semibold'>*</span></label>
                <input type="number" id="vendor_pin_code" value={formData.vendor_pin_code} onChange={handleInputChange} className="w-full rounded-[10px] px-3 py-2 text-[14px] border-0 focus:outline-none bg-[#f5f5f5] text-[#414141]" placeholder='Enter Vendor Pin code' required />
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
              <div className="col-span-12 md:col-span-9">
                <div className="flex-1 space-y-8">
                  {activityRows.map((row, idx) => (
                    <div key={idx} className="mt-3 p-6 shadow-[3px_4px_20px_0px_#0000000F] rounded-3xl last:p-0 last:shadow-none">
                      <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-4 items-end">
                        <div>
                          <label className="block mb-2 text-[14px] font-medium text-[#3d3d3d]">Island Location <span className="text-red-700 font-semibold">*</span></label>
                          <SearchableSelect options={islandOptionsList} value={row.island_location} onChange={(val) => updateActivityRow(idx, 'island_location', val)} placeholder="Select Island" searchPlaceholder="Search island..." loading={islandLoading} />
                        </div>
                        <div>
                          <label className="block mb-2 text-[14px] font-medium text-[#3d3d3d]">Activity <span className="text-red-700 font-semibold">*</span></label>
                          <SearchableSelect options={activityOptionsList} value={row.activity} onChange={(val) => updateActivityRow(idx, 'activity', val)} placeholder="Select Activity" searchPlaceholder="Search activity..." loading={activitiesLoading} />
                        </div>
                        {idx === activityRows.length - 1 ? (
                          <button type="button" onClick={addActivityRow} disabled={!row.island_location || !row.activity} className="h-[42px] px-6 rounded-[10px] bg-[#007BFF] text-white text-[12px] font-semibold hover:bg-blue-600 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed">+ Add</button>
                        ) : (
                          <button type="button" onClick={() => removeActivityRow(idx)} className="h-[42px] px-6">
                            <img src={DeleteIcon} alt="" />
                          </button>
                        )}
                      </div>
                      {row.documents && row.documents.length > 0 && (
                        <div className="mt-4">
                          <div className="text-[14px] font-bold text-[#3D3D3D] mb-[15px] mt-[20px]"> Upload Document</div>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 border-t border-gray-50 pt-2">
                            {row.documents.map((doc, docIdx) => (
                              <div key={docIdx}>
                                <input id={`doc-${idx}-${docIdx}`} type="file" accept=".pdf,.jpg,.jpeg,.png" hidden onChange={(e) => handleRowDocChange(idx, docIdx, e.target.files[0])} />
                                <button type="button" onClick={() => document.getElementById(`doc-${idx}-${docIdx}`).click()} className="w-full h-[42px] rounded-[10px] px-3 py-2 text-[14px] border border-[#DCEAFF] bg-[#343434] text-white font-medium hover:bg-black transition flex items-center justify-center gap-2 overflow-hidden">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
                                  <span className="truncate">{doc.file ? (typeof doc.file === 'string' ? doc.file.split('/').pop() : (doc.file.name || 'File Selected')) : (doc.name.toLowerCase().includes('licen') ? 'Uploaded Documents' : doc.name)}</span>
                                </button>
                                {doc.file && (
                                  <p className="mt-2 text-[12px] text-[#0267FE] font-medium truncate bg-blue-50 p-2 rounded-md" title={typeof doc.file === 'string' ? doc.file.split('/').pop() : doc.file.name}>
                                    {typeof doc.file === 'string' ? doc.file.split('/').pop() : doc.file.name}
                                  </p>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-span-12 lg:col-span-8">
                <label htmlFor="vendor_description" className="block mb-2 text-[14px] font-medium text-[#3d3d3d]">Vendor Description</label>
                <textarea id="vendor_description" value={formData.vendor_description} onChange={handleInputChange} className="w-full rounded-[10px] px-3 py-2 text-[14px] focus:outline-none  bg-[#f5f5f5] text-[#414141] min-h-[100px]" placeholder='Enter Description'></textarea>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default VendorEdit;