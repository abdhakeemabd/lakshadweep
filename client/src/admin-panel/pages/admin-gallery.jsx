import React, { useState, useEffect } from 'react'
import Gallery from '../../assets/admin-panel-icon/img/default-image.jpg';
import DeleteIcon from '../../assets/admin-panel-icon/icons/deletegallery.svg';
import EditIcon from '../../assets/admin-panel-icon/icons/share.svg';
import { NavLink } from 'react-router-dom';
import { Fancybox } from "@fancyapps/ui";
import AddGalleryModal from './add-gallery-modal';
import EditGalleryModal from './edit-gallery-modal';
import { showDeleteAlert, showDeleteSuccess, showDeleteError } from '../component/swal-delete';
import SearchableSelect from '../../component/searchable-select';

function AdminGallery() {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingItemId, setEditingItemId] = useState(null);
  const [filterLocation, setFilterLocation] = useState('');
  const [locationsList, setLocationsList] = useState([]);

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const response = await fetch('/setting-api/settings/gallery/', {
        method: 'GET',
        headers: {
          'Authorization': 'Token 8RWYE3BKLZCFIN2FHQNNQEAEWBNDY184TGNYTY6X',
          'Accept': 'application/json',
          'ngrok-skip-browser-warning': 'true',
          'User-Agent': 'postman'
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch gallery');
      }

      const data = await response.json();
      
      // Extract gallery items based on provided structure
      let list = data.gallery || [];
      
      // Extract locations for the filter
      let locs = [];
      if (Array.isArray(data.locations)) {
        locs = data.locations.map(l => typeof l === 'object' ? l.name : l).filter(Boolean);
      }
      setLocationsList(locs);

      const processedList = list.map(item => {
        let img = item.image || item.gallery_image;
        if (img) {
          if (img.includes('ngrok-free.dev')) {
            img = img.replace(/^https?:\/\/[^\/]+/, '/setting-api');
          } else if (!img.startsWith('http') && !img.startsWith('/setting-api')) {
            img = `/setting-api${img.startsWith('/') ? '' : '/'}${img}`;
          }
        }
        return {
          ...item,
          image: img || Gallery,
          location_display: item.location_name || item.location || 'N/A'
        };
      });

      setGalleryItems(processedList);
      setError(null);
    } catch (err) {
      console.error('Error fetching gallery:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleDelete = async (itemId, itemLocation) => {
    const confirmed = await showDeleteAlert(`gallery image (${itemLocation || 'this item'})`);
    if (!confirmed) return;

    try {
      const response = await fetch(`/setting-api/settings/gallery-delete/${itemId}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Token 8RWYE3BKLZCFIN2FHQNNQEAEWBNDY184TGNYTY6X',
        },
      });

      if (response.ok) {
        showDeleteSuccess('Gallery image');
        fetchGallery();
      } else {
        throw new Error('Delete failed');
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    Fancybox.bind("[data-fancybox]", {});
    return () => Fancybox.destroy();
  }, []);

  const uniqueLocations = locationsList.length > 0 
    ? [...new Set(locationsList)] 
    : [...new Set(galleryItems.map(item => item.location_display).filter(Boolean))];

  const filteredGallery = galleryItems.filter(item => !filterLocation || item.location_display === filterLocation);

  return (
    <>
      <div className='text-[24px] text-[#2A2A2A] font-semibold mt-3'>Content Management</div>
      <div className="card relative flex flex-col bg-white bg-clip-border rounded-[1.25rem] shadow-[3px_4px_20px_0px_#0000000F] border-0 mt-3  py-3 px-3">
        <div className="card-header p-2 lg:p-4 flex gap-3 flex-wrap justify-between items-center border-b border-[#e3e3e3]">
          <div className='flex items-center gap-3 bg-[#E9E9EA] rounded-full p-[4px] border-1 border-[#E9E9EA]'>
            <NavLink to="/admin/setting/content-management" className={({ isActive }) => `w-[160px] md:w-[170px] font-medium text-center text-[12px] md:text-[14px] rounded-full transition-all px-2 py-2 ${isActive ? 'bg-[#0F2446] text-white border border-[#2F68C5] font-semibold' : 'text-[#393939] bg-transparent'}`}>Homepage Banner</NavLink>
            <NavLink to="/admin/setting/content-gallery" className={({ isActive }) => `w-[160px] md:w-[170px] font-medium text-center text-[12px] md:text-[14px] rounded-full transition-all px-2 py-2 ${isActive ? 'bg-[#0F2446] text-white border border-[#2F68C5] font-semibold' : 'text-[#393939] bg-transparent'}`}>Gallery</NavLink>
          </div>
          <div className='flex items-center gap-3'>
            <button command="show-modal" commandfor="add-gallery-modal" type="button" className="flex min-w-[147px] h-[36px] text-[12px] items-center justify-center gap-4 bg-[#007BFF] rounded-[8px] py-[7px] px-[20px] text-white font-semibold cursor-pointer">+ Add</button>
          </div>
        </div>
        <div className="card-sub-header p-4 flex gap-3 items-center">
          <div>
            <SearchableSelect options={uniqueLocations} value={filterLocation} onChange={(val) => setFilterLocation(val)} placeholder="Location" searchPlaceholder="Search location..." />
          </div>
        </div>
        <div className="card-body py-4">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#007BFF]"></div>
            </div>
          ) : error ? (
            <div className="text-center py-20 text-red-500">
              Error: {error}
              <button onClick={fetchGallery} className="ml-3 text-[#007BFF] underline cursor-pointer">Try Again</button>
            </div>
          ) : filteredGallery.length === 0 ? (
            <div className="text-center py-20 text-gray-500">No gallery images found matching your filter.</div>
          ) : (
            <div className='grid gap-3 lg:gap-4 grid-cols-12'>
              {filteredGallery.map((item) => (
                <div key={item.id} className="col-span-12 md:col-span-4 lg:col-span-3 mb-3">
                  <div className="rounded-[3px] relative overflow-hidden">
                    <div className="img-card relative w-full aspect-[260/237]">
                      <button className='absolute top-2 right-2 cursor-pointer' onClick={() => handleDelete(item.id, item.location)}>
                        <img src={DeleteIcon} alt="" />
                      </button>
                      <a className='' href={item.image} data-fancybox="gallery">
                        <img className='w-full h-full object-cover' src={item.image} alt="Gallery" />
                      </a>
                      <div className="footer flex justify-between items-center px-3 py-3 bg-[#0F2446] text-white">
                        <div className='text-[11px] font-light'>Location: <span className='font-medium'>{item.location_display}</span></div>
                        <button type='button' onClick={() => { setEditingItemId(item.id); document.getElementById('edit-gallery-modal')?.showModal(); }} className=' cursor-pointer'>
                          <img src={EditIcon} alt="Edit" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <AddGalleryModal onSuccess={fetchGallery} />
      <EditGalleryModal itemId={editingItemId} onSuccess={fetchGallery} onClose={() => setEditingItemId(null)} />
    </>
  )
}

export default AdminGallery;