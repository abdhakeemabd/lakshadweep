import React, { useState, useEffect } from 'react'
import EditIcon from "../../assets/admin-panel-icon/icons/edit-icon.svg";
import DeleteIcon from "../../assets/admin-panel-icon/icons/delete-icon.svg";
import { NavLink, Link } from 'react-router-dom';
import DagableIcon from "../../assets/admin-panel-icon/icons/reorder.svg";
import Banner from "../../assets/admin-panel-icon/img/default-image.jpg";
import { FiMoreVertical } from 'react-icons/fi';
import AddBannerModal from './add-banner-modal';
import EditBannerModal from './edit-banner-modal';
import { Fancybox } from '@fancyapps/ui';
import {
  showDeleteAlert, showDeleteSuccess, showDeleteError,
  showDeactivateAlert, showDeactivateSuccess,
  showActivateAlert, showActivateSuccess,
  showSuccess, showError
} from '../component/swal-delete';
import SearchableSelect from '../../component/searchable-select';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const SortableRow = ({ item, index, handleDelete, setEditingBannerId, toggleDropdown, openIndex, handleToggleStatus, setOpenIndex, isReordering }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id || `temp-${index}` });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
    opacity: isDragging ? 0.8 : 1,
    position: 'relative',
    background: isDragging ? '#f8f9fa' : 'white',
  };

  return (
    <tr ref={setNodeRef} style={style} {...(isReordering ? { ...attributes, ...listeners } : {})}
      className={`border-b border-[#dee2e6] last:border-0 transition-colors ${isDragging ? 'shadow-lg ring-1 ring-black/5 z-50' : ''} ${isReordering ? 'cursor-grab active:cursor-grabbing hover:bg-gray-50' : ''}`}>
      <td className="px-4 py-2 text-[12px] text-[#383838]">
        <div className="p-2 inline-block">
          <img src={DagableIcon} alt="DagableIcon" className="w-[18px] h-[18px]" />
        </div>
      </td>
      <td className="px-4 py-2 text-[12px] text-[#3d3d3d] min-w-[150px]">
        <div className={`img-card relative max-w-[106px] aspect-[106/62] overflow-hidden ${isReordering ? 'pointer-events-none' : ''}`}>
          <a href={item.image} data-fancybox="banner" className="block w-full h-full">
            <img className="w-full h-full object-cover" src={item.image} alt="Banner" />
          </a>
        </div>
      </td>
      <td className="px-4 py-2 text-[12px] text-[#3d3d3d] font-medium">{item.title}</td>
      <td className="px-4 py-2 text-[12px] text-[#3d3d3d]">{item.activity_display}</td>
      <td className="px-4 py-2 text-[12px] text-[#3d3d3d]">{item.location_display}</td>
      <td className="px-4 py-2 text-[12px] text-[#3d3d3d]">
        <span className={`badge font-medium flex justify-center items-center text-[9px] w-[60px] h-[20px] rounded-full border ${item.status === 'Active' ? 'bg-[#B5FFDF] text-[#1C9762] border-[#1C9762]' : 'bg-[#FFD5D5] text-[#FF0000] border-[#FF0000]'}`}>{item.status}</span>
      </td>
      <td className="py-2 text-[12px] text-[#383838]">
        <div className={`flex justify-center gap-3 items-center dropdown-container relative ${isReordering ? 'pointer-events-none opacity-50' : ''}`}>
          <button className='cursor-pointer w-[17px] h-[20px]' type='button' onClick={(e) => { e.stopPropagation(); handleDelete(item.id, item.title); }}>
            <img className='img-fluid' src={DeleteIcon} alt="Delete" />
          </button>
          <button className='cursor-pointer w-[31px] h-[31px]' type='button' onClick={(e) => { e.stopPropagation(); setEditingBannerId(item.id); document.getElementById('edit-banner-modal')?.showModal(); }}>
            <img className='img-fluid' src={EditIcon} alt="Edit" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); toggleDropdown(index); }} className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 focus:outline-none ${openIndex === index ? 'text-[#383838]' : 'text-[#383838]'}`}>
            <FiMoreVertical size={20} />
          </button>
          {openIndex === index && (
            <ul className="absolute right-0 mt-2 top-full w-40 origin-top-right bg-white border border-gray-100 rounded-[12px] shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)] z-[100] overflow-hidden py-1">
              <li className='border-b border-[#E2E2E2]'>
                <button className="flex items-center gap-3 px-5 py-3 text-[11px] font-medium text-[#3D3D3D] hover:text-black hover:font-semibold transition-colors w-full text-left cursor-pointer" onClick={(e) => { e.stopPropagation(); handleToggleStatus(item.id, item.title, item.status); setOpenIndex(null); }}>{item.status === 'Active' ? 'Deactivate' : 'Activate'}</button>
              </li>
            </ul>
          )}
        </div>
      </td>
    </tr>
  );
};

function HomePageBanner() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openIndex, setOpenIndex] = useState(null);
  const [filterActivity, setFilterActivity] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [editingBannerId, setEditingBannerId] = useState(null);
  const [isReordering, setIsReordering] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setBanners((items) => {
        const oldIndex = items.findIndex((item) => (item.id || `temp-${items.indexOf(item)}`) === active.id);
        const newIndex = items.findIndex((item) => (item.id || `temp-${items.indexOf(item)}`) === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleSavePositions = async () => {
    try {
      setLoading(true);
      console.log("Saving new banner order for subjects:", banners.map(b => ({ id: b.id, title: b.title, pos: b.position })));
      for (let i = 0; i < banners.length; i++) {
        const banner = banners[i];
        const formData = new FormData();
        const newPosition = i + 1;

        formData.append('position', newPosition);
        if (banner.title) formData.append('title', banner.title);

        let locId = null;
        if (banner.location && typeof banner.location === 'object') {
          locId = banner.location.id || banner.location.pk;
        } else if (banner.location && !isNaN(banner.location)) {
          locId = banner.location;
        } else if (banner.location_display) {
          const matched = locations.find(l => (l.name || l.location_name) === banner.location_display);
          if (matched) locId = matched.id;
        }

        if (locId) {
          formData.append('location', locId);
          formData.append('destination', locId);
        }

        // resolve activity id
        let actId = null;
        if (banner.activity && typeof banner.activity === 'object') {
          actId = banner.activity.id || banner.activity.pk;
        } else if (banner.activity && !isNaN(banner.activity)) {
          actId = banner.activity;
        } else if (banner.activity_display) {
          const matched = dynamicActivities.find(a => a.name === banner.activity_display);
          if (matched) actId = matched.id;
        }

        if (actId) {
          formData.append('activity', actId);
          if (banner.activity_display) {
            formData.append('activity_name', banner.activity_display);
          }
        }

        // post as seen working in EditBannerModal.jsx
        console.log(`Updating banner ${banner.id} to position ${newPosition}...`);
        const response = await fetch(`/setting-api/settings/banner-edit/${banner.id}/`, {
          method: 'POST',
          headers: {
            'Authorization': 'Token 8RWYE3BKLZCFIN2FHQNNQEAEWBNDY184TGNYTY6X',
            'ngrok-skip-browser-warning': 'true',
          },
          body: formData
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error(`Update failed for banner ${banner.id}:`, errorText);
          throw new Error(`Failed to update banner ${banner.title || banner.id}`);
        }
      }

      setIsReordering(false);
      showSuccess('Success!', 'Positions updated successfully');
      fetchBanners();
    } catch (err) {
      console.error('Error in handleSavePositions:', err);
      showError('Error', err.message || 'Failed to save positions');
    } finally {
      setLoading(false);
    }
  };
  const [dynamicActivities, setDynamicActivities] = useState([]);
  const [locations, setLocations] = useState([]);

  const fetchBanners = async () => {
    try {
      setLoading(true);
      const response = await fetch('/setting-api/settings/banner/', {
        method: 'GET',
        headers: {
          'Authorization': 'Token 8RWYE3BKLZCFIN2FHQNNQEAEWBNDY184TGNYTY6X',
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch banners');
      }
      const data = await response.json();
      let bannerList = [];
      if (Array.isArray(data)) {
        bannerList = data;
      } else if (data.banners && Array.isArray(data.banners)) {
        bannerList = data.banners;
        if (Array.isArray(data.activities)) {
          const names = data.activities.map(a => a.name || a.title).filter(Boolean);
          setDynamicActivities([...new Set(names)]);
        }
      } else if (data.data && Array.isArray(data.data)) {
        bannerList = data.data;
      } else if (data.results && Array.isArray(data.results)) {
        bannerList = data.results;
      } else {
        const arrays = Object.values(data).filter(val => Array.isArray(val));
        if (arrays.length > 0) bannerList = arrays[0];
      }

      const processedList = bannerList.map(item => {
        let img = item.image || item.banner_image;

        if (img) {
          if (img.includes('ngrok-free.dev')) {
            img = img.replace(/^https?:\/\/[^\/]+/, '/setting-api');
          } else if (!img.startsWith('http') && !img.startsWith('/setting-api')) {
            img = `/setting-api${img.startsWith('/') ? '' : '/'}${img}`;
          }
        }

        const rawStatus = String(item.status || item.is_active || '').toUpperCase();
        let status = 'Deactive';
        if (rawStatus === 'ACTIVE' || rawStatus === 'TRUE' || item.is_active === true) {
          status = 'Active';
        }

        const locDisplay = (item.location && typeof item.location === 'object') ?
          (item.location.name || item.location.title) :
          (item.location_name || (locations.length > 0 && (locations.find(l => String(l.id) === String(item.location))?.name || locations.find(l => String(l.id) === String(item.location))?.location_name)) || item.location || item.destination || 'N/A');

        const actDisplay = (item.activity && typeof item.activity === 'object') ?
          (item.activity.name || item.activity.title) :
          (item.activity_name || (dynamicActivities.length > 0 && dynamicActivities.find(a => String(a.id) === String(item.activity))?.name) || item.activity || 'N/A');

        return {
          ...item,
          image: img || Banner,
          status: status,
          activity_display: actDisplay,
          location_display: locDisplay
        };
      });

      setBanners(processedList);
      setError(null);
    } catch (err) {
      console.error('Error fetching banners:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchActivities = async () => {
    try {
      const response = await fetch('/category-api/settings/category-activities/', {
        method: 'GET',
        headers: {
          'Authorization': 'Token 8RWYE3BKLZCFIN2FHQNNQEAEWBNDY184TGNYTY6X',
          'Accept': 'application/json',
          'ngrok-skip-browser-warning': 'true',
          'User-Agent': 'postman'
        },
      });
      if (response.ok) {
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

        if (categoriesList.length === 0) {
          console.warn('No categories found in activity response. Data received:', data);
        }

        const allActivities = categoriesList.reduce((acc, cat) => {
          if (typeof cat === 'string') return [...acc, { id: cat, name: cat }];

          if (cat && Array.isArray(cat.activities)) {
            cat.activities.forEach(act => {
              if (typeof act === 'object') {
                acc.push({
                  id: act.id || act.pk || act.activity_id || act.activity_name || act.name,
                  name: act.name || act.activity_name || act.title || act.label
                });
              } else {
                acc.push({ id: act, name: act });
              }
            });
          }
          else if (cat && cat.activity_names) {
            const field = cat.activity_names;
            const names = Array.isArray(field) ? field : (typeof field === 'string' ? field.split(',').map(s => s.trim()) : []);
            names.forEach(n => acc.push({ id: n, name: n }));
          }
          else if (cat && typeof cat === 'object' && (cat.activity_name || cat.title || cat.name)) {
            acc.push({
              id: cat.id || cat.pk || cat.activity_id || cat.activity_name || cat.name,
              name: cat.activity_name || cat.name || cat.title || cat.label
            });
          }
          return acc;
        }, []);

        const seen = new Set();
        const uniqueActivities = allActivities.filter(act => {
          const name = String(act.name || '').trim();
          if (!name || seen.has(name)) return false;
          seen.add(name);
          return true;
        });

        setDynamicActivities(uniqueActivities);
      }
    } catch (err) {
      console.error('Error in fetchActivities:', err);
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
    fetchBanners();
    fetchActivities();
    fetchLocations();
  }, []);
  const toggleDropdown = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleDelete = async (bannerId, bannerTitle) => {
    const confirmed = await showDeleteAlert(bannerTitle || 'banner');
    if (!confirmed) return;

    try {
      const response = await fetch(`/setting-api/settings/banner-delete/${bannerId}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Token 8RWYE3BKLZCFIN2FHQNNQEAEWBNDY184TGNYTY6X',
        },
      });

      if (response.ok) {
        showDeleteSuccess(bannerTitle || 'Banner');
        fetchBanners();
      } else {
        throw new Error('Delete failed');
      }
    } catch (err) {
      showDeleteError(err.message);
    }
  };

  const handleToggleStatus = async (bannerId, bannerTitle, currentStatus) => {
    const action = currentStatus === 'Active' ? 'Deactivate' : 'Activate';
    const alertFunc = currentStatus === 'Active' ? showDeactivateAlert : showActivateAlert;
    const successFunc = currentStatus === 'Active' ? showDeactivateSuccess : showActivateSuccess;

    const confirmed = await alertFunc(bannerTitle || 'banner');
    if (!confirmed) return;

    try {
      console.log(`Toggling status for banner ${bannerId} at /setting-api/settings/banner-toggle-status/${bannerId}/`);
      const response = await fetch(`/setting-api/settings/banner-toggle-status/${bannerId}/`, {
        method: 'GET',
        headers: {
          'Authorization': 'Token 8RWYE3BKLZCFIN2FHQNNQEAEWBNDY184TGNYTY6X',
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
      });

      if (response.ok) {
        successFunc(bannerTitle || 'Banner');
        fetchBanners();
      } else {
        const text = await response.text();
        console.error('Toggle status failed:', response.status, text);
        throw new Error(`Status update failed: ${response.status}`);
      }
    } catch (err) {
      console.error('Toggle status error:', err);
      alert(err.message);
    }
  };

  useEffect(() => {
    if ((locations.length > 0 || dynamicActivities.length > 0) && banners.length > 0) {
      const updatedBanners = banners.map(item => {
        let newItem = { ...item };
        let hasChange = false;

        const rawLoc = item.location || item.destination;
        if (rawLoc && (item.location_display === String(rawLoc) || !isNaN(item.location_display))) {
          const matched = locations.find(l => String(l.id) === String(rawLoc));
          if (matched) {
            const name = matched.name || matched.location_name;
            if (name && item.location_display !== name) {
              newItem.location_display = name;
              hasChange = true;
            }
          }
        }
        const rawAct = item.activity;
        if (rawAct && (item.activity_display === String(rawAct) || !isNaN(item.activity_display))) {
          const matched = dynamicActivities.find(a => String(a.id) === String(rawAct));
          if (matched) {
            const name = matched.name;
            if (name && item.activity_display !== name) {
              newItem.activity_display = name;
              hasChange = true;
            }
          }
        }

        return hasChange ? newItem : item;
      });

      const changed = updatedBanners.some((b, i) =>
        b.location_display !== banners[i].location_display ||
        b.activity_display !== banners[i].activity_display
      );

      if (changed) {
        setBanners(updatedBanners);
      }
    }
  }, [locations, dynamicActivities, banners]);

  useEffect(() => {
    Fancybox.bind("[data-fancybox]", {});
    return () => Fancybox.destroy();
  }, []);

  const filteredBanners = banners.filter(item => {
    const matchesActivity = !filterActivity || item.activity_display === filterActivity;
    const matchesStatus = !filterStatus || item.status === filterStatus;
    return matchesActivity && matchesStatus;
  });

  const uniqueActivities = [...new Set(banners.map(b => b.activity_display).filter(Boolean))];
  const uniqueStatus = [...new Set(banners.map(b => b.status_display).filter(Boolean))];

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
      <div className='text-[24px] text-[#2A2A2A] font-semibold mt-3'>Content Management</div>
      <div className="card relative flex flex-col bg-white bg-clip-border rounded-[1.25rem] shadow-[3px_4px_20px_0px_#0000000F] border-0 mt-3 py-3 px-3">
        <div className="card-header p-2 lg:p-4 flex gap-3 flex-wrap justify-between items-center border-b border-[#e3e3e3]">
          <div className='flex items-center gap-3 bg-[#E9E9EA] rounded-full p-[4px] border border-[#E9E9EA]'>
            <NavLink to="/admin/setting/content-management" className={({ isActive }) => `w-[160px] md:w-[170px] font-medium text-center text-[12px] md:text-[14px] rounded-full transition-all px-2 py-2 ${isActive ? 'bg-[#0F2446] text-white border border-[#2F68C5] font-semibold' : 'text-[#393939] bg-transparent'}`}>Homepage Banner</NavLink>
            <NavLink to="/admin/setting/content-gallery" className={({ isActive }) => `w-[160px] md:w-[170px] font-medium text-center text-[12px] md:text-[14px] rounded-full transition-all px-2 py-2 ${isActive ? 'bg-[#0F2446] text-white border border-[#2F68C5] font-semibold' : 'text-[#393939] bg-transparent'}`}>Gallery</NavLink>
          </div>
          <div className='flex items-center gap-3 flex-wrap'>
            <button command="show-modal" commandfor="add-banner-modal" type="button" className="flex min-w-[147px] h-[36px] text-[12px] items-center justify-center gap-4 bg-[#007BFF] rounded-[8px] py-[7px] px-[20px] text-white font-semibold cursor-pointer transition-all hover:bg-[#0069D9]">+ Add</button>
            <button
              onClick={() => {
                if (isReordering) {
                  handleSavePositions();
                } else {
                  setIsReordering(true);
                }
              }}
              type="button"
              className={`flex min-w-[147px] h-[36px] text-[12px] items-center justify-center gap-4 rounded-[8px] py-[7px] px-[20px] text-white font-semibold cursor-pointer transition-all ${isReordering ? 'bg-[#1C9762] hover:bg-[#157347]' : 'bg-[#007BFF] hover:bg-[#0069D9]'}`}
            >
              {isReordering ? 'Save Position' : '+ Change Position'}
            </button>
            {isReordering && (
              <button
                onClick={() => {
                  setIsReordering(false);
                  fetchBanners();
                }}
                type="button"
                className="flex min-w-[100px] h-[36px] text-[12px] items-center justify-center bg-gray-500 rounded-[8px] py-[7px] px-[20px] text-white font-semibold cursor-pointer transition-all hover:bg-gray-600"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
        <div className={`card-sub-header p-4 flex gap-3 items-center ${isReordering ? 'opacity-50 pointer-events-none' : ''}`}>
          <div>
            <SearchableSelect options={dynamicActivities.map(act => act.name).filter(Boolean)} value={filterActivity} onChange={(val) => setFilterActivity(val)} placeholder="All Activities" searchPlaceholder="Search activity..." />
          </div>
          <div>
            <SearchableSelect options={['Active', 'Deactive']} value={filterStatus} onChange={(val) => setFilterStatus(val)} placeholder="Status" searchPlaceholder="Search Status..." />
          </div>
        </div>
        <div className="card-body py-4">
          <div className="overflow-x-auto min-h-[400px]">
            <table className="w-full">
              <thead>
                <tr className='border-b border-[#dee2e6]'>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]"></th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">Banner</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">Title</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">Activity</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">Location</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">Status</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]"></th>
                  <th className="py-2 text-left text-xs font-semibold text-[#383838]"></th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="8" className="text-center py-20">
                      <div className="flex justify-center items-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#007BFF]"></div>
                      </div>
                      <p className="mt-4 text-gray-500 text-[12px]">Loading banners...</p>
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="8" className="text-center py-20 text-red-500 text-[12px]">
                      Error: {error}
                      <button onClick={fetchBanners} className="ml-3 text-[#007BFF] underline cursor-pointer">Try Again</button>
                    </td>
                  </tr>
                ) : filteredBanners.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center py-20 text-gray-500 text-[12px]">
                      No banners found matching your filters.
                    </td>
                  </tr>
                ) : isReordering ? (
                  <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={banners.map(b => b.id || `temp-${banners.indexOf(b)}`)} strategy={verticalListSortingStrategy}>
                      {banners.map((item, index) => (
                        <SortableRow key={item.id || `temp-${index}`} item={item} index={index} handleDelete={handleDelete} setEditingBannerId={setEditingBannerId} toggleDropdown={toggleDropdown} openIndex={openIndex} handleToggleStatus={handleToggleStatus} setOpenIndex={setOpenIndex} isReordering={isReordering} />
                      ))}
                    </SortableContext>
                  </DndContext>
                ) : (
                  filteredBanners.map((item, index) => (
                    <SortableRow key={item.id || `temp-${index}`} item={item} index={index} handleDelete={handleDelete} setEditingBannerId={setEditingBannerId} toggleDropdown={toggleDropdown} openIndex={openIndex} handleToggleStatus={handleToggleStatus} setOpenIndex={setOpenIndex} isReordering={isReordering} />
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <AddBannerModal onSuccess={fetchBanners} />
      <EditBannerModal bannerId={editingBannerId} onSuccess={fetchBanners} onClose={() => setEditingBannerId(null)} />
    </>
  )
}

export default HomePageBanner;