import React, { useEffect, useRef, useState } from 'react'
import SearchableSelect from '../../component/searchable-select'

function EditBannerModal({ bannerId, onSuccess, onClose }) {
  const dialogRef = useRef(null)
  const [fileName, setFileName] = useState("No file chosen")
  const [isClosing, setIsClosing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(false)
  const [activities, setActivities] = useState([])
  const [locations, setLocations] = useState([])
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    activity: ''
  })
  const fileInputRef = useRef(null)

  const handleSelectChange = (id, value) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFileName(file.name)
    } else {
      setFileName("No file chosen")
    }
  }

  const handleCloseModal = () => {
    setIsClosing(true)
    setTimeout(() => {
      dialogRef.current?.close()
      setIsClosing(false)
      setFileName("No file chosen")
      setFormData({
        title: '',
        location: '',
        activity: ''
      })
      if (onClose) onClose()
    }, 300)
  }

  const fetchBannerDetails = async () => {
    if (!bannerId) return;
    try {
      setFetching(true);
      setFileName("No file chosen");
      setFormData({
        title: '',
        location: '',
        activity: ''
      });
      const response = await fetch(`/setting-api/settings/banner-edit/${bannerId}/`, {
        method: 'GET',
        headers: {
          'Authorization': 'Token 8RWYE3BKLZCFIN2FHQNNQEAEWBNDY184TGNYTY6X',
          'Accept': 'application/json',
        },
      });

      if (response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          const bannerData = data.data || data.banner || data;
          let locVal = bannerData.location || bannerData.destination || '';

          if (typeof locVal === 'number' || (!isNaN(locVal) && locVal !== '')) {
            const matched = locations.find(l => String(l.id) === String(locVal));
            if (matched) locVal = matched.name || matched.location_name;
          }

          setFormData({
            title: bannerData.title || '',
            location: locVal,
            activity: bannerData.activity_name || bannerData.activity || ''
          });
          if (bannerData.image) {
            const parts = bannerData.image.split('/');
            setFileName(parts[parts.length - 1]);
          }
        } else {
          console.error('Expected JSON but got:', await response.text());
        }
      } else {
        console.error('Fetch banner details failed:', response.status);
      }
    } catch (err) {
      console.error('Error fetching banner details:', err);
    } finally {
      setFetching(false);
    }
  };

  const fetchActivities = async () => {
    try {
      const response = await fetch('/setting-api/settings/category-activities/', {
        method: 'GET',
        headers: {
          'Authorization': 'Token 8RWYE3BKLZCFIN2FHQNNQEAEWBNDY184TGNYTY6X',
          'Accept': 'application/json',
          'ngrok-skip-browser-warning': 'true',
          'User-Agent': 'postman'
        },
      });
      if (response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          let categoriesList = [];

          if (Array.isArray(data)) {
            categoriesList = data;
          } else if (data.data && Array.isArray(data.data)) {
            categoriesList = data.data;
          } else if (data.categories && Array.isArray(data.categories)) {
            categoriesList = data.categories;
          } else if (data.results && Array.isArray(data.results)) {
            categoriesList = data.results;
          } else {
            const arrays = Object.values(data).filter(val => Array.isArray(val));
            if (arrays.length > 0) {
              categoriesList = arrays[0];
            }
          }

          // Extract all activities from all categories and flatten them
          const allActivities = categoriesList.reduce((acc, cat) => {
            // Case 1: cat is just a name string
            if (typeof cat === 'string') return [...acc, { id: cat, name: cat }];
            
            // Case 2: cat is an activity object
            if (typeof cat === 'object' && (cat.activity_name || cat.name || cat.title)) {
              acc.push({
                id: cat.id || cat.pk || cat.activity_id || cat.activity_name || cat.name || cat.title,
                name: cat.activity_name || cat.name || cat.title
              });
            }

            // Case 3: cat is a category object containing an activities array
            if (cat && Array.isArray(cat.activities)) {
              cat.activities.forEach(act => {
                if (typeof act === 'object') {
                  acc.push({
                    id: act.id || act.pk || act.activity_id || act.activity_name || act.name || act.title || act.label,
                    name: act.activity_name || act.name || act.title || act.label
                  });
                } else {
                  acc.push({ id: act, name: act });
                }
              });
            } 
            
            // Case 4: Other singular activity fields
            else if (cat && cat.activity) {
              const act = cat.activity;
              const name = typeof act === 'object' ? (act.activity_name || act.name || act.title) : act;
              const id = typeof act === 'object' ? (act.id || act.pk || name) : name;
              acc.push({ id, name });
            } 
            
            // Case 5: Comma-separated names
            else if (cat && (cat.activity_names || cat.activities_name)) {
              const field = cat.activity_names || cat.activities_name;
              const names = Array.isArray(field) ? field : (typeof field === 'string' ? field.split(',').map(s => s.trim()) : []);
              names.forEach(n => acc.push({ id: n, name: n }));
            }
            return acc;
          }, []);

          // Unique by name
          const seen = new Set();
          const uniqueActivities = allActivities.filter(act => {
            const name = String(act.name || '').trim();
            if (!name || seen.has(name)) return false;
            seen.add(name);
            return true;
          });
          
          setActivities(uniqueActivities);
        } else {
          const text = await response.text();
          console.error('Expected JSON for activities but got:', text.substring(0, 100));
        }
      }
    } catch (err) {
      console.error('Error fetching activities:', err);
    }
  };

  const fetchLocations = async () => {
    try {
      const response = await fetch('/category-api/settings/location-category-activity/', {
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
        if (data.locations && Array.isArray(data.locations)) {
          list = data.locations;
        } else if (Array.isArray(data)) {
          list = data;
        } else {
          const arrays = Object.values(data).filter(val => Array.isArray(val));
          if (arrays.length > 0) list = arrays[0];
        }
        setLocations(list);
      }
    } catch (err) {
      console.error('Error fetching locations:', err);
    }
  };

  useEffect(() => {
    fetchActivities();
    fetchLocations();
  }, []);

  useEffect(() => {
    if (bannerId) {
      fetchBannerDetails();
    }
  }, [bannerId]);

  useEffect(() => {
    const dialog = dialogRef.current

    const handleGlobalClick = (e) => {
      if (e.target.getAttribute('commandfor') === 'edit-banner-modal') {
        if (!dialog?.open) {
          dialog?.showModal()
        }
      }

      if (
        e.target.getAttribute('command') === 'close' &&
        e.target.getAttribute('commandfor') === 'edit-banner-modal'
      ) {
        handleCloseModal()
      }
    }

    document.addEventListener('click', handleGlobalClick)
    return () => document.removeEventListener('click', handleGlobalClick)
  }, [])

  // Resolve Location ID to Name automatically
  useEffect(() => {
    if (formData.location && locations.length > 0) {
      // Check if current value is an ID (number or string number)
      const isId = !isNaN(formData.location) && String(formData.location).trim() !== '';
      if (isId) {
        const matched = locations.find(l => String(l.id) === String(formData.location));
        if (matched) {
          const name = matched.name || matched.location_name;
          if (name) {
            setFormData(prev => ({ ...prev, location: name }));
          }
        }
      }
    }
  }, [locations, formData.location]);

  // Resolve Activity ID to Name automatically
  useEffect(() => {
    if (formData.activity && activities.length > 0) {
      // Check if current value is an ID (likely number)
      const isId = !isNaN(formData.activity) && String(formData.activity).trim() !== '';
      if (isId) {
        const matched = activities.find(a => String(a.id) === String(formData.activity));
        if (matched) {
          const name = matched.name;
          if (name) {
            setFormData(prev => ({ ...prev, activity: name }));
          }
        }
      }
    }
  }, [activities, formData.activity]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title) {
      alert("Please enter a title");
      return;
    }
    if (loading) return;

    setLoading(true);
    try {
      const data = new FormData();
      
      // Map names back to IDs for submission
      const selectedLoc = locations.find(l => (l.name || l.location_name) === formData.location);
      const locValue = selectedLoc ? selectedLoc.id : formData.location;
      
      const selectedAct = activities.find(a => a.name === formData.activity);
      const actValue = selectedAct ? selectedAct.id : formData.activity;
      
      // Sending variations to be safe against backend revisions
      data.append('title', formData.title);
      data.append('location', locValue);
      data.append('destination', locValue);
      data.append('activity', actValue);
      data.append('activity_name', formData.activity);
      if (fileInputRef.current.files[0]) {
        data.append('image', fileInputRef.current.files[0]);
      }

      const response = await fetch(`/setting-api/settings/banner-edit/${bannerId}/`, {
        method: 'POST', // or PATCH
        headers: {
          'Authorization': 'Token 8RWYE3BKLZCFIN2FHQNNQEAEWBNDY184TGNYTY6X',
          'ngrok-skip-browser-warning': 'true',
        },
        body: data,
      });

      if (response.ok) {
        handleCloseModal();
        if (onSuccess) onSuccess();
      } else {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const errData = await response.json();
          // Extract specific field errors if present (DRF format)
          let errorMsg = 'Invalid Data:';
          
          const errors = errData.errors || errData.data?.errors || errData;
          if (typeof errors === 'object' && !Array.isArray(errors)) {
            Object.entries(errors).forEach(([field, msgs]) => {
              if (field !== 'status' && field !== 'message') {
                errorMsg += `\n• ${field}: ${Array.isArray(msgs) ? msgs.join(', ') : msgs}`;
              }
            });
          } else {
            errorMsg = errData.message || 'Failed to update banner';
          }
          throw new Error(errorMsg);
        } else {
          const text = await response.text();
          throw new Error('Server Error: ' + (text.substring(0, 50) || 'Unknown error'));
        }
      }
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <dialog ref={dialogRef} id="edit-banner-modal" aria-labelledby="edit-banner-modal-title" className="fixed inset-0 z-[100] w-full h-full bg-transparent m-0 p-0 max-w-none max-h-none backdrop:bg-black/50 py-3 md:py-7">
        <div className="flex min-h-screen min-w-full items-center justify-center p-4">
          <div className={`modal-content relative w-full py-4 max-w-[490px] transform rounded-[15px] bg-white shadow-2xl ${isClosing ? 'closing' : ''}`}>
            <form onSubmit={handleSubmit}>
              <div className="modal-header border-b border-[#DEDCDC] px-6 py-3 flex justify-between">
                <h1 className="font-poppins font-bold text-[14px] md:text-[16px] leading-[100%] text-[#2A2A2A]">Edit Banner</h1>
                <button type="button" onClick={handleCloseModal} className="absolute top-1 right-1 z-50 p-1 rounded-full text-gray-500 bg-gray-100 hover:bg-gray-200 hover:text-gray-900 transition-all duration-300 cursor-pointer hover:rotate-90 flex items-center justify-center border-none">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                </button>
              </div>
              <div className="modal-body px-6 py-4 bg-white">
                {fetching ? (
                  <div className="flex justify-center py-10">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#007BFF]"></div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-5">
                    <div className="col-span-12 mb-2">
                      <label htmlFor='title' className="text-[#3D3D3D] font-poppins font-medium text-[13px] block mb-3">Banner Title <span className="text-red-500">*</span></label>
                      <input 
                        type="text" 
                        id="title"
                        className="w-full h-[45px] rounded-xl border border-gray-200 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-poppins text-gray-900"
                        placeholder="Enter banner title"
                        value={formData.title || ''}
                        onChange={(e) => handleSelectChange('title', e.target.value)}
                        required
                      />
                    </div>

                    <div className="col-span-12 mb-2">
                      <label htmlFor='Location' className="text-[#3D3D3D] font-poppins font-medium text-[13px] block mb-3">Select Destination </label>
                      <SearchableSelect 
                        options={locations.map(loc => loc.name || loc.location_name).filter(Boolean)} 
                        value={formData.location} 
                        onChange={(val) => handleSelectChange('location', val)} 
                        placeholder="Select Destination" 
                        searchPlaceholder="Search destination..." 
                      />
                    </div>
                    <div className="col-span-12 mb-2 text-[#3D3D3D] font-poppins font-medium text-[13px]">
                      <label htmlFor='Activity' className="block mb-3">Select Activity </label>
                      <SearchableSelect options={activities.map(act => act.name).filter(Boolean)} value={formData.activity} onChange={(val) => handleSelectChange('activity', val)} placeholder="Select Activity" searchPlaceholder="Search activity..." />
                    </div>
                    <div className="col-span-12 mb-2">
                      <label htmlFor='banner' className="text-[#3D3D3D] font-poppins font-medium text-[14px] block mb-3">Upload Image <span className="text-red-500">*</span></label>
                      <div className="flex items-center gap-4">
                        <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" id="banner-upload" />
                        <button type="button" onClick={() => fileInputRef.current?.click()} className="bg-[#393838] text-white px-6 py-3 rounded-[10px] min-w-[155px] text-[13px] font-medium cursor-pointer transition-colors hover:bg-[#2A2A2A] border-none">
                          Choose File
                        </button>
                        <span className="text-[#989898] text-[12px] font-poppins">{fileName}</span>
                      </div>
                      <div className=' mt-3 text-[#8C8C8C] font-poppins text-normal text-[10px]'>(The image size should be 1440px X 505px & less than 2 mb)</div>
                    </div>
                    <div className="col-span-12">
                      <button disabled={loading} type="submit" className='w-full bg-[#007BFF] text-white text-[16px] font-semibold py-2 px-3 rounded-[8px] flex justify-center items-center'>
                        {loading ? <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div> : 'Save'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </>
  )
}

export default EditBannerModal
