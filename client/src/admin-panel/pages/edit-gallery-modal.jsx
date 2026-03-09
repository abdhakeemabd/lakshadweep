import React, { useEffect, useRef, useState } from 'react'
import SearchableSelect from '../../component/searchable-select'

function EditGalleryModal({ itemId, onSuccess, onClose }) {
  const dialogRef = useRef(null)
  const [fileName, setFileName] = useState("No file chosen")
  const [isClosing, setIsClosing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(false)
  const [formData, setFormData] = useState({
    location: ''
  })
  const [locations, setLocations] = useState([])
  const [error, setError] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
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

  const fetchLocationsList = async () => {
    try {
      const response = await fetch('/setting-api/settings/gallery/', {
        method: 'GET',
        headers: {
          'Authorization': 'Token 8RWYE3BKLZCFIN2FHQNNQEAEWBNDY184TGNYTY6X',
          'Accept': 'application/json',
          'ngrok-skip-browser-warning': 'true',
        },
      });
      if (response.ok) {
        const data = await response.json();
        let locs = [];
        if (data.locations && Array.isArray(data.locations)) {
          locs = data.locations;
        } else if (data.data && Array.isArray(data.data.locations)) {
          locs = data.data.locations;
        } else if (data.results && Array.isArray(data.results.locations)) {
          locs = data.results.locations;
        }
        
        if (locs.length === 0) {
          let list = [];
          if (Array.isArray(data)) list = data;
          else if (data.gallery && Array.isArray(data.gallery)) list = data.gallery;
          else if (data.data && Array.isArray(data.data)) list = data.data;
          else if (data.results && Array.isArray(data.results)) list = data.results;
          else if (data.data && data.data.gallery && Array.isArray(data.data.gallery)) list = data.data.gallery;
          
          if (list.length > 0) {
            const extracted = list.map(item => item.location_name || item.location || item.destination).filter(Boolean);
            locs = [...new Set(extracted)].map(name => ({ id: name, name: name }));
          }
        }
        
        setLocations(locs);
      }
    } catch (err) {
      console.error('Error fetching locations list:', err);
    }
  };

  const handleCloseModal = () => {
    setIsClosing(true)
    setTimeout(() => {
      dialogRef.current?.close()
      setIsClosing(false)
      setFileName("No file chosen")
      setImagePreview(null)
      setError(null)
      if (onClose) onClose()
    }, 300)
  }

  useEffect(() => {
    fetchLocationsList();
  }, []);

  const fetchGalleryDetails = async () => {
    if (!itemId) return;
    try {
      setFetching(true);
      setError(null);
      const url = `/setting-api/settings/gallery-detail-view/${itemId}/`;
      console.log(`[REFIX v5] Fetching gallery details from: ${url}`);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': 'Token 8RWYE3BKLZCFIN2FHQNNQEAEWBNDY184TGNYTY6X',
          'Accept': 'application/json',
          'ngrok-skip-browser-warning': 'true',
        },
      });

      if (!response.ok) {
        throw new Error(`Detail fetch failed (${response.status})`);
      }

      const result = await response.json();
      console.log('Gallery details response full object:', result);
      
      const itemData = result.gallery_detail || result.gallery || result.data || result.location || result;
      const data = Array.isArray(itemData) ? itemData[0] : itemData;

      if (data) {
        // Advanced detection to handle string, ID, or full object
        let locVal = '';
        if (typeof data.location === 'object' && data.location !== null) {
          locVal = data.location.name || data.location.location_name || data.location.id || '';
        } else {
          locVal = data.location_name || data.location || data.location_id || data.destination || '';
        }

        console.log('Detected Initial Location Value:', locVal);
        const resolvedName = locVal;
        setFormData({ location: String(locVal) });
        
        let imgUrl = data.image || data.gallery_image || data.image_path || data.banner_image;
        if (imgUrl) {
          if (typeof imgUrl === 'string' && imgUrl.startsWith('http') && (imgUrl.includes('ngrok-free.dev') || imgUrl.includes('devtunnels.ms'))) {
             imgUrl = imgUrl.replace(/^https?:\/\/[^\/]+/, '/setting-api');
          } else if (typeof imgUrl === 'string' && !imgUrl.startsWith('http') && !imgUrl.startsWith('/setting-api')) {
             imgUrl = `/setting-api${imgUrl.startsWith('/') ? '' : '/'}${imgUrl}`;
          }
          const filename = typeof imgUrl === 'string' ? imgUrl.split('/').pop() : 'Image selected';
          setFileName(filename);
          setImagePreview(typeof imgUrl === 'string' ? imgUrl : null);
        }
      } else {
        throw new Error('No item data found in response');
      }
    } catch (err) {
      console.error('Error fetching gallery details:', err);
      setError(err.message);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    if (itemId) {
      fetchGalleryDetails();
    }
  }, [itemId]);

  useEffect(() => {
    const dialog = dialogRef.current

    const handleGlobalClick = (e) => {
      if (e.target.getAttribute('commandfor') === 'edit-gallery-modal') {
        if (!dialog?.open) {
          dialog?.showModal()
        }
      }

      if (
        e.target.getAttribute('command') === 'close' &&
        e.target.getAttribute('commandfor') === 'edit-gallery-modal'
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
      if (isId || typeof formData.location === 'string') {
        const matched = locations.find(l => 
          String(l.id || l.location_id) === String(formData.location) || 
          String(l.name || l.location_name).toLowerCase() === String(formData.location).toLowerCase()
        );
        if (matched) {
          const name = matched.name || matched.location_name || (typeof matched === 'string' ? matched : '');
          if (name && name !== formData.location) {
            console.log(`Resolver linked ${formData.location} to: ${name}`);
            setFormData(prev => ({ ...prev, location: name }));
          }
        }
      }
    }
  }, [locations, formData.location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.location) {
      alert("Please select a location");
      return;
    }

    setLoading(true);
    try {
      const data = new FormData();
      const selectedLoc = locations.find(l => (l.name || l.location_name) === formData.location);
      const locationValue = selectedLoc ? selectedLoc.id : formData.location;
      
      data.append('location', locationValue);
      if (fileInputRef.current.files[0]) {
        data.append('image', fileInputRef.current.files[0]);
      }

      const response = await fetch(`/setting-api/settings/gallery-update/${itemId}/`, {
        method: 'POST', // Kept as POST as per user requirement
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
        const errData = await response.json();
        alert(errData.message || 'Update failed');
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
      <dialog ref={dialogRef} id="edit-gallery-modal" aria-labelledby="edit-gallery-modal-title" className="fixed inset-0 z-[100] w-full h-full bg-transparent m-0 p-0 max-w-none max-h-none backdrop:bg-black/50 py-3 md:py-7">
        <div className="flex min-h-screen min-w-full items-center justify-center p-4">
          <div className={`modal-content relative w-full py-4 max-w-[420px] transform rounded-[15px] bg-white shadow-2xl ${isClosing ? 'closing' : ''}`}>
            <form onSubmit={handleSubmit}>
              <div className="modal-header border-b border-[#DEDCDC] px-6 py-3 flex justify-between">
                <h1 className="font-poppins font-bold text-[14px] md:text-[16px] text-[#2A2A2A]">Edit Image</h1>
                <button type="button" onClick={handleCloseModal} className="absolute top-1 right-1 p-1 rounded-full text-gray-500 bg-gray-100 flex items-center justify-center border-none cursor-pointer">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                </button>
              </div>
              <div className="modal-body px-6 py-4 bg-white">
                {fetching ? (
                  <div className="flex justify-center py-10">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#007BFF]"></div>
                  </div>
                ) : (
                  <div className="grid grid-cols-12 gap-4">
                    {error && <div className="col-span-12 text-red-500 text-xs">{error}</div>}
                    <div className="col-span-12">
                      <label className="text-[#3D3D3D] font-poppins font-medium text-[13px]">Select Location <span className="text-red-500">*</span></label>
                      <div className='mt-3'>
                        <SearchableSelect 
                          options={locations.map(loc => typeof loc === 'object' ? (loc.name || loc.location_name) : loc).filter(Boolean)} 
                          value={formData.location} 
                          onChange={(val) => handleSelectChange('location', val)} 
                          placeholder="Select Location" 
                          searchPlaceholder="Search location..." 
                        />
                      </div>
                    </div>
                    <div className="col-span-12 mb-2">
                      <label className="text-[#3D3D3D] font-poppins font-medium text-[14px] block mb-3">Upload Image</label>
                      <div className="flex items-center gap-4">
                        <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" id="banner-upload" />
                        <button type="button" onClick={() => fileInputRef.current?.click()} className="bg-[#393838] text-white px-3 py-2 rounded-[10px] min-w-[135px] text-[13px] font-medium cursor-pointer transition-colors border-none">
                          Choose File
                        </button>
                        <span className="text-[#989898] text-[12px] font-poppins truncate pr-2">{fileName}</span>
                      </div>
                    </div>
                    <div className="col-span-12 pt-4">
                      <button disabled={loading} type="submit" className='w-full bg-[#007BFF] text-white text-[16px] font-semibold py-2 px-3 rounded-[8px] flex justify-center items-center cursor-pointer'>
                        {loading ? <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div> : 'Save Changes'}
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

export default EditGalleryModal