import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import JoditEditor from 'jodit-react';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import SearchableSelect from '../../component/searchable-select'
import { showSuccess, showError } from '../component/swal-delete'

function UpdatePackage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [categoriesList, setCategoriesList] = useState([]);
  const [activitiesList, setActivitiesList] = useState([]);
  const [locationsList, setLocationsList] = useState([]);

  const [formData, setFormData] = useState({
    package_name: '',
    category: '',
    activity: '',
    island_location: '',
    activity_info: '',
    whats_included: '',
    whats_excluded: '',
    package_badge: '',
    package_bookings_badge: '',
    duration: '',
    default_price: '',
    commission: '',
    terms: '',
    description: '',
    is_exclusive: false,
  });

  useEffect(() => {
    const fetchPackageDetails = async () => {
      try {
        setFetching(true);
        const response = await fetch(`/package-api/package/package-details/${id}/`, {
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
            data = result.data || result.package || result.package_details || result;
          }

          const extrName = (val) => val && typeof val === 'object' ? (val.name || val.category_name || val.activity_name || val.location_name) : val;

          setFormData({
            package_name: data.package_name || data.name || data.title || '',
            category: extrName(data.category) || data.category_name || '',
            activity: extrName(data.activity) || data.activity_name || '',
            island_location: extrName(data.island) || extrName(data.island_location) || data.island_name || '',
            activity_info: data.activity_info || '',
            whats_included: data.whats_included || '',
            whats_excluded: data.whats_excluded || '',
            package_badge: data.package_badge || '',
            package_bookings_badge: data.package_booking_badge || '',
            duration: data.duration || '',
            default_price: data.default_price || data.price || data.base_price || '',
            commission: data.commission || '',
            terms: data.terms_and_condition || data.terms || '',
            description: data.package_description || '',
            is_exclusive: data.is_exclusive || false,
          });

          let imageUrl = data.package_banner || data.banner || data.image || data.package_image || data.package_image_url;
          if (imageUrl && typeof imageUrl === 'string') {
            if (!imageUrl.startsWith('http')) {
              if (!imageUrl.startsWith('/media') && !imageUrl.startsWith('media')) {
                imageUrl = imageUrl.startsWith('/') ? `/media${imageUrl}` : `/media/${imageUrl}`;
              } else {
                imageUrl = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`;
              }
            }
            setPreview(imageUrl);
          }

          return data;
        } else {
          console.error("Failed to fetch package details");
          return null;
        }
      } catch (err) {
        console.error("Error fetching package details:", err);
        return null;
      }
    };

    const fetchDropdownsAndData = async () => {
      setFetching(true);
      try {
        // Fetch Categories
        const catRes = await fetch('/category-api/settings/category-activities/', {
          headers: {
            'Authorization': 'Token 8RWYE3BKLZCFIN2FHQNNQEAEWBNDY184TGNYTY6X',
            'Accept': 'application/json',
          }
        });
        let fetchedCategories = [];
        if (catRes.ok) {
          const catData = await catRes.json();
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
          setCategoriesList(fetchedCategories);
        }

        // Fetch Locations
        const locRes = await fetch('/category-api/settings/location-category-activity/', {
          headers: {
            'Authorization': 'Token 8RWYE3BKLZCFIN2FHQNNQEAEWBNDY184TGNYTY6X',
            'Accept': 'application/json',
          }
        });
        if (locRes.ok) {
          const locData = await locRes.json();
          let parsedLocs = [];
          if (Array.isArray(locData)) {
            parsedLocs = locData;
          } else if (locData.data && Array.isArray(locData.data)) {
            parsedLocs = locData.data;
          } else if (locData.results && Array.isArray(locData.results)) {
            parsedLocs = locData.results;
          } else {
            const arrays = Object.values(locData).filter(val => Array.isArray(val));
            if (arrays.length > 0) parsedLocs = arrays[0];
          }
          setLocationsList(parsedLocs);
        }

        if (id) {
          const pacData = await fetchPackageDetails();
          // Prepopulate the activities dropdown if the package has a category
          if (pacData && (pacData.category || pacData.category_name)) {
            const catObj = pacData.category;
            const catName = (catObj && typeof catObj === 'object' ? (catObj.name || catObj.category_name) : catObj) || pacData.category_name;
            const matchedCategory = fetchedCategories.find(c =>
              (c.name || c.category_name || '').toLowerCase() === (catName || '').toLowerCase()
            );
            if (matchedCategory) {
              let exActs = [];
              if (Array.isArray(matchedCategory.activities)) {
                exActs = matchedCategory.activities;
              } else if (matchedCategory.activity_names && typeof matchedCategory.activity_names === 'string') {
                exActs = matchedCategory.activity_names.split(',').map(name => ({ name: name.trim() }));
              }
              setActivitiesList(exActs);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching dependencies:", error);
      } finally {
        setFetching(false);
      }
    };

    fetchDropdownsAndData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSelectChange = (id, value) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append('title', formData.package_name);

    // Find IDs from lists
    const selectedCategory = categoriesList.find(c => (c.name || c.category_name || '').toLowerCase() === (formData.category || '').toLowerCase());
    const selectedActivity = activitiesList.find(a => (typeof a === 'object' ? (a.name || a.activity_name) : a).toLowerCase() === (formData.activity || '').toLowerCase());
    const selectedLocation = locationsList.find(l => (l.name || l.location_name || '').toLowerCase() === (formData.island_location || '').toLowerCase());

    if (selectedCategory) data.append('category_id', selectedCategory.id);
    if (selectedActivity) data.append('activity_id', typeof selectedActivity === 'object' ? (selectedActivity.id || '') : '');
    if (selectedLocation) data.append('island_id', selectedLocation.id);

    data.append('activity_info', formData.activity_info);
    data.append('whats_included', formData.whats_included);
    data.append('whats_excluded', formData.whats_excluded);
    data.append('package_badge', formData.package_badge);
    data.append('package_booking_badge', formData.package_bookings_badge);
    data.append('duration', formData.duration);
    data.append('default_price', formData.default_price);
    data.append('commission', formData.commission);
    data.append('terms_and_condition', formData.terms);
    data.append('package_description', formData.description);
    data.append('is_exclusive', formData.is_exclusive ? 'True' : 'False');

    if (selectedFile) {
      data.append('package_banner', selectedFile);
      data.append('banner', selectedFile);
    }

    try {
      const response = await fetch(`/package-api/package/package-update/${id}/`, {
        method: 'PUT',
        headers: {
          'Authorization': 'Token 8RWYE3BKLZCFIN2FHQNNQEAEWBNDY184TGNYTY6X',
          'Accept': 'application/json',
          'ngrok-skip-browser-warning': 'true',
        },
        body: data,
      });

      if (response.ok) {
        await showSuccess('Package Updated!', 'The package has been updated successfully.');
        navigate('/admin/packages-list');
      } else {
        const text = await response.text();
        console.error("Update failed:", text);

        let errorMsg = "Something went wrong while updating the package.";
        try {
          const errData = JSON.parse(text);
          const reason = errData.reason || errData.message || "";
          if (reason.includes("Duplicate entry")) {
            errorMsg = "A duplicate ID was detected. Please check your data and try again.";
          } else if (reason) {
            errorMsg = reason.split('.')[0] + '.'; 
          }
        } catch (e) { }

        await showError('Update Failed', errorMsg);
      }
    } catch (err) {
      console.error("Error updating package:", err);
      await showError('Unexpected Error', 'An unexpected error occurred while saving.');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#007BFF]"></div>
        <span className="ml-3 text-lg font-medium text-gray-600">Loading package details...</span>
      </div>
    );
  }

  return (
    <div className="card relative flex flex-col bg-white bg-clip-border rounded-[1.25rem] shadow-[3px_4px_20px_0px_#0000000F] border-0 mt-3 py-3 px-3">
      <div className="card-header p-4 flex justify-between items-center border-b border-[#e3e3e3] mb-3 lg:mb-5">
        <div className="flex items-center gap-3">
          <Link to="/admin/packages-list" className="w-[34px] h-[34px] bg-[#f9f9f9] rounded-xl flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
          </Link>
          <div className="font-semibold text-[24px] leading-none tracking-normal text-[#2A2A2A]">Edit Package</div>
        </div>
      </div>
      <div className="card-body px-4 py-1">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="col-span-1 md:col-span-8 mb-3">
              <label htmlFor="package_name" className="block text-[13px] font-medium text-[#3D3D3D] mb-3">Package Name</label>
              <input type="text" id="package_name" name="package_name" value={formData.package_name} onChange={handleInputChange} className="mt-1 block w-full bg-[#f5f5f5] p-[8px_15px] min-h-[42px] rounded-[10px]" />
            </div>
            <div className="col-span-1 md:col-span-4 mb-3">
              <label htmlFor="package_banner" className="block text-[13px] font-medium text-[#3D3D3D] mb-3">Package Banner</label>
              <div className="flex flex-col gap-3">
                <div className="relative">
                  <input type="file" id="package_banner" name="package_banner" onChange={handleFileChange} className="hidden" accept="image/*" />
                  <label htmlFor="package_banner" className="flex items-center w-max bg-transparent min-h-[42px] rounded-[10px] overflow-hidden cursor-pointer">
                    <span className="bg-[#3D3D3D] text-white px-10 py-2 text-[13px] font-medium whitespace-nowrap rounded-[10px]">Choose file</span>
                    <span className="px-3 text-[11px] text-[#8C8C8C] truncate max-w-[150px] inline-block">
                      {selectedFile ? selectedFile.name : (preview ? preview.split('/').pop() : 'No file chosen')}
                    </span>
                  </label>
                </div>
                {preview && (
                  <div className="relative w-[120px] h-[80px] rounded-[10px] overflow-hidden border border-[#e3e3e3]">
                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </div>
            <div className="col-span-1 md:col-span-6 lg:col-span-4 mb-3">
              <label htmlFor="category" className="block text-[13px] font-medium text-[#3D3D3D] mb-3">Category <span className='text-red-600'>*</span> </label>
              <div className="relative inline-block w-full">
                <SearchableSelect
                  options={[...new Set(categoriesList.map(c => c.name || c.category_name).filter(Boolean))]}
                  value={formData.category}
                  onChange={(val) => {
                    handleSelectChange('category', val);
                    const selCat = categoriesList.find(c => (c.name || c.category_name) === val);
                    let exActs = [];
                    if (selCat) {
                      if (Array.isArray(selCat.activities)) {
                        exActs = selCat.activities;
                      } else if (selCat.activity_names) {
                        exActs = [selCat.activity_names];
                      }
                    }
                    setActivitiesList(exActs);
                    handleSelectChange('activity', '');
                  }}
                  placeholder="Select Category" searchPlaceholder="Search category..." />
              </div>
            </div>
            <div className="col-span-1 md:col-span-6 lg:col-span-4 mb-3">
              <label htmlFor="activity" className="block text-[13px] font-medium text-[#3D3D3D] mb-3">Activity<span className='text-red-600'>*</span> </label>
              <div className="relative inline-block w-full">
                <SearchableSelect
                  options={[...new Set(activitiesList.map(a => typeof a === 'object' ? (a.name || a.activity_name) : a).filter(Boolean))]}
                  value={formData.activity}
                  onChange={(val) => handleSelectChange('activity', val)}
                  placeholder="Select Activity" searchPlaceholder="Search activity..." />
              </div>
            </div>
            <div className="col-span-1 md:col-span-6 lg:col-span-4 mb-3">
              <label htmlFor="island_location" className="block text-[13px] font-medium text-[#3D3D3D] mb-3">Island/Location<span className='text-red-600'>*</span> </label>
              <div className="relative inline-block w-full">
                <SearchableSelect
                  options={[...new Set(locationsList.length > 0 ? locationsList.map(l => l.name || l.location_name).filter(Boolean) : ["Agatti", "Amini", "Andrott", "Bangaram", "Bitra", "Chetlat", "Kadmat", "Kalpeni", "Kavaratti", "Kiltan", "Minicoy"])]}
                  value={formData.island_location}
                  onChange={(val) => handleSelectChange('island_location', val)}
                  placeholder="Select Island" searchPlaceholder="Search island..." />
              </div>
            </div>
            <div className="col-span-1 md:col-span-6 mb-3">
              <label htmlFor="activity_info" className="block text-[13px] font-medium text-[#3D3D3D] mb-3">Activity info<span className='text-red-600'>*</span> </label>
              <div className="mt-1 bg-[#f5f5f5] rounded-[10px] overflow-hidden">
                <JoditEditor
                  value={formData.activity_info}
                  config={{ height: 300, uploader: { insertImageAsBase64URI: true } }}
                  onBlur={(val) => handleSelectChange('activity_info', val)}
                />
              </div>
            </div>
            <div className="col-span-1 md:col-span-6 mb-3">
              <label htmlFor="whats_included" className="block text-[13px] font-medium text-[#3D3D3D] mb-3">What's Included <span className='text-red-600'>*</span> (Max 10 items, comma separated)</label>
              <textarea type="text" id="whats_included" name="whats_included" value={formData.whats_included} onChange={handleInputChange} className="mt-1 block w-full bg-[#f5f5f5] p-[8px_15px] min-h-[180px] rounded-[10px]" />
            </div>
            <div className="col-span-1 md:col-span-6 mb-3">
              <label htmlFor="whats_excluded" className="block text-[13px] font-medium text-[#3D3D3D] mb-3">What's Excluded (Max 10 items, comma separated) </label>
              <textarea type="text" id="whats_excluded" name="whats_excluded" value={formData.whats_excluded} onChange={handleInputChange} className="mt-1 block w-full bg-[#f5f5f5] p-[8px_15px] min-h-[180px] rounded-[10px]" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="col-span-1 md:col-span-6 lg:col-span-4 mb-3">
              <label htmlFor="package_badge" className="block text-[13px] font-medium text-[#3D3D3D] mb-3">Package Badge <span className='text-red-600'>*</span> </label>
              <input type="text" id="package_badge" name="package_badge" value={formData.package_badge} onChange={handleInputChange} className="mt-1 block w-full bg-[#f5f5f5] p-[8px_15px] min-h-[42px] rounded-[10px]" />
            </div>
            <div className="col-span-1 md:col-span-6 lg:col-span-4 mb-3">
              <label htmlFor="package_bookings_badge" className="block text-[13px] font-medium text-[#3D3D3D] mb-3">Package Bookings Badge </label>
              <input type="text" id="package_bookings_badge" name="package_bookings_badge" value={formData.package_bookings_badge} onChange={handleInputChange} className="mt-1 block w-full bg-[#f5f5f5] p-[8px_15px] min-h-[42px] rounded-[10px]" />
            </div>
            <div className="col-span-1 md:col-span-6 lg:col-span-4 mb-3">
              <label htmlFor="duration" className="block text-[13px] font-medium text-[#3D3D3D] mb-3">Duration  </label>
              <input type="text" id="duration" name="duration" value={formData.duration} onChange={handleInputChange} className="mt-1 block w-full bg-[#f5f5f5] p-[8px_15px] min-h-[42px] rounded-[10px]" />
            </div>
            <div className="col-span-1 md:col-span-6 lg:col-span-4 mb-3">
              <label htmlFor="default_price" className="block text-[13px] font-medium text-[#3D3D3D] mb-3">Default Price <span className='text-red-600'>*</span>(per person/unit)  </label>
              <input type="text" id="default_price" name="default_price" value={formData.default_price} onChange={handleInputChange} className="mt-1 block w-full bg-[#f5f5f5] p-[8px_15px] min-h-[42px] rounded-[10px]" />
            </div>
            <div className="col-span-1 md:col-span-6 lg:col-span-4 mb-3">
              <label htmlFor="commission" className="block text-[13px] font-medium text-[#3D3D3D] mb-3">Commission and Convenience fee <span className='text-red-600'>*</span> (per person)</label>
              <input type="text" id="commission" name="commission" value={formData.commission} onChange={handleInputChange} className="mt-1 block w-full bg-[#f5f5f5] p-[8px_15px] min-h-[42px] rounded-[10px]" />
            </div>
            <div className="col-span-1 md:col-span-6 mb-3">
              <label htmlFor="terms" className="block text-[13px] font-medium text-[#3D3D3D] mb-3">Terms & Conditions</label>
              <div className="mt-1 bg-[#f5f5f5] rounded-[10px] overflow-hidden">
                <JoditEditor
                  value={formData.terms}
                  config={{ height: 300, uploader: { insertImageAsBase64URI: true } }}
                  onBlur={(val) => handleSelectChange('terms', val)}
                />
              </div>
            </div>
            <div className="col-span-1 md:col-span-6 mb-3">
              <label htmlFor="description" className="block text-[13px] font-medium text-[#3D3D3D] mb-3">Package Description <span className='text-red-600'>*</span></label>
              <div className="mt-1 bg-[#f5f5f5] rounded-[10px] overflow-hidden">
                <JoditEditor
                  value={formData.description}
                  config={{ height: 300, uploader: { insertImageAsBase64URI: true } }}
                  onBlur={(val) => handleSelectChange('description', val)}
                />
              </div>
            </div>
            <div className="col-span-1 md:col-span-6 mb-3">
              <FormControlLabel control={<Switch name="is_exclusive" checked={!!formData.is_exclusive} onChange={handleInputChange} />} label={<span className="text-[#171920] font-bold text-[14px]">Set as Gorogue Exclusive</span>} />
            </div>
            <div className="col-span-1 md:col-span-12 text-end items-center">
              <button disabled={loading} type="submit" className='bg-[#007BFF] text-white px-4 py-2 rounded-[8px] text-[14px] font-semibold w-[137px] h-[36px] cursor-pointer disabled:opacity-50'>{loading ? 'Saving...' : 'Save'}</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdatePackage;