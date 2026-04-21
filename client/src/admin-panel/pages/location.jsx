import React, { useState, useEffect } from 'react'
import EditIcon from "../../assets/admin-panel-icon/icons/edit-icon.svg";
import DeleteIcon from "../../assets/admin-panel-icon/icons/delete-icon.svg";
import { NavLink, Link } from 'react-router-dom';
import AddLocationModal from '../component/add-location-modal';
import EditLocationModal from '../component/edit-location-modal';
import { showDeleteAlert, showDeleteSuccess, showDeleteError } from '../component/swal-delete';
import PaginationCard from '../component/pagination';

function Location() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLocationId, setSelectedLocationId] = useState(null);

  const fetchLocations = async () => {
    try {
      setLoading(true);
      const response = await fetch('/category-api/settings/location-category-activity/', {
        method: 'GET',
        headers: {
          'Authorization': 'Token 8RWYE3BKLZCFIN2FHQNNQEAEWBNDY184TGNYTY6X',
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch locations');
      }

      const data = await response.json();
      let locationsList = [];

      if (Array.isArray(data)) {
        locationsList = data;
      } else if (data.data && Array.isArray(data.data)) {
        locationsList = data.data;
      } else if (data.results && Array.isArray(data.results)) {
        locationsList = data.results;
      } else {
        const arrays = Object.values(data).filter(val => Array.isArray(val));
        if (arrays.length > 0) {
          locationsList = arrays[0];
        }
      }

      setLocations(locationsList);
      setError(null);
    } catch (err) {
      console.error('Error fetching locations:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const handleDelete = async (id, name) => {
    if (!id) {
      showDeleteError('Invalid Location ID');
      return;
    }

    const confirmed = await showDeleteAlert(name || 'location');
    if (!confirmed) return;

    try {
      const response = await fetch('/category-api/settings/location-category-activity/', {
        method: 'POST',
        headers: {
          'Authorization': 'Token 8RWYE3BKLZCFIN2FHQNNQEAEWBNDY184TGNYTY6X',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ location_id: id })
      });

      if (response.status === 204 || response.status === 200 || response.ok) {
        showDeleteSuccess(name || 'Location');
        fetchLocations();
      } else {
        const text = await response.text();
        throw new Error(text || 'Delete failed');
      }
    } catch (err) {
      console.error(err);
      showDeleteError(err.message);
    }
  };

  const handleEditClick = (id) => {
    setSelectedLocationId(id);
    // The modal will respond to the command attribute, but we need to ensure it has the correct ID
  };

  return (
    <>
      <div className="card relative flex flex-col bg-white bg-clip-border rounded-[1.25rem] shadow-[3px_4px_20px_0px_#0000000F] border-0 mt-3 py-3 px-3">
        <div className="card-header p-1 lg:p-4 flex gap-3 flex-wrap justify-between items-center border-b border-[#e3e3e3]">
          <div className='flex items-center gap-3 bg-[#E9E9EA] rounded-full p-[4px] border border-[#E9E9EA]'>
            <NavLink to="/admin/setting/categories" className={({ isActive }) => `w-[160px] md:w-[170px] font-medium text-center text-[12px] md:text-[14px] rounded-full transition-all px-2 py-2 ${isActive ? 'bg-[#0F2446] text-white border border-[#2F68C5] font-semibold' : 'text-[#393939] bg-transparent'}`}>Category & Activities</NavLink>
            <NavLink to="/admin/setting/location" className={({ isActive }) => `w-[160px] md:w-[170px] font-medium text-center text-[12px] md:text-[14px] rounded-full transition-all px-2 py-2 ${isActive ? 'bg-[#0F2446] text-white border border-[#2F68C5] font-semibold' : 'text-[#393939] bg-transparent'}`}>Location</NavLink>
          </div>
          <div className='flex items-center gap-3'>
            <button command="show-modal" commandfor="add-location-modal" type="button" className="flex min-w-[147px] h-[36px] text-[12px] items-center justify-center gap-4 bg-[#007BFF] rounded-[8px] py-[7px] px-[20px] text-white font-semibold cursor-pointer">+ Add</button>
          </div>
        </div>
        <div className="card-body py-4">
          <div className="overflow-x-auto min-h-[400px]">
            <table className="w-full">
              <thead>
                <tr className='border-b border-[#dee2e6]'>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">Location</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">No of Vendors</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">No of Packages</th>
                  <th className="py-2 text-left text-xs font-semibold text-[#383838]"></th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="4" className="text-center py-20">
                      <div className="flex justify-center items-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#007BFF]"></div>
                      </div>
                      <p className="mt-4 text-gray-500 text-[12px]">Loading locations...</p>
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="4" className="text-center py-20 text-red-500 text-[12px]">
                      Error: {error}
                      <button onClick={fetchLocations} className="ml-3 text-[#007BFF] underline cursor-pointer">Try Again</button>
                    </td>
                  </tr>
                ) : locations.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center py-20 text-gray-500 text-[12px]">
                      No locations found.
                    </td>
                  </tr>
                ) : (
                  locations.map((loc, index) => (
                    <tr key={loc.id || index} className='border-b border-[#dee2e6] last:border-0'>
                      <td className="px-4 py-2 text-[12px] text-[#383838] font-medium">{loc.name || loc.location_name || 'N/A'}</td>
                      <td className="px-4 py-2 text-[12px] text-[#3d3d3d]">{loc.vendor_count || 0}</td>
                      <td className="px-4 py-2 text-[12px] text-[#3d3d3d]">{loc.package_count || 0}</td>
                      <td className="py-2 text-[12px] text-[#383838]">
                        <div className='flex justify-center gap-3 items-center'>
                          <button 
                            className='cursor-pointer border-none bg-transparent p-0' 
                            type='button' 
                            command="show-modal" 
                            commandfor="edit-location-modal"
                            onClick={() => handleEditClick(loc.id)}
                          >
                            <img className='img-fluid' src={EditIcon} alt="Edit" />
                          </button>
                          <button 
                            className='cursor-pointer border-none bg-transparent p-0' 
                            type='button' 
                            onClick={() => handleDelete(loc.id, loc.name || loc.location_name)}
                          >
                            <img className='img-fluid' src={DeleteIcon} alt="Delete" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card-footer p-3">
          <PaginationCard totalPages={1} currentPage={1} onPageChange={(page) => console.log(page)} />
        </div>
      </div>
      <AddLocationModal onSuccess={fetchLocations} />
      <EditLocationModal locationId={selectedLocationId} onSuccess={fetchLocations} />
    </>
  )
}

export default Location;
