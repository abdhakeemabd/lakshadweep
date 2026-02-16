import React, { useState, useEffect } from 'react'
import Header from '../component/header'
import Slidebar from '../component/slidebar'
import SearchIcon from "../../assets/admin-panel-icon/icons/search.svg";
import ExportIcon from "../../assets/admin-panel-icon/icons/export.svg";

function UserList() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch users from API
  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter users based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(user => {
        const searchLower = searchTerm.toLowerCase();
        return (
          (user.mobile_no && user.mobile_no.toLowerCase().includes(searchLower)) ||
          (user.username && user.username.toLowerCase().includes(searchLower)) ||
          (user.email && user.email.toLowerCase().includes(searchLower)) ||
          (user.pincode && user.pincode.toString().includes(searchLower))
        );
      });
      setFilteredUsers(filtered);
    }
  }, [searchTerm, users]);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/customer-api/customer/users/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token CHPQ9LCXLZEEQ5UVPWLQ40U1X6URZVBTH64LP0CP',
          'ngrok-skip-browser-warning': 'true',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Handle different response formats
      const usersData = Array.isArray(data) ? data : (data.users || data.data || []);
      console.log('API Response:', data);
      console.log('First user data:', usersData[0]);
      setUsers(usersData);
      setFilteredUsers(usersData);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'N/A';
    return date.toLocaleDateString('en-GB');
  };

  const handleExport = () => {
    // TODO: Implement export functionality
    console.log('Export clicked');
  };

  return (
    <>
      <div className="container-fluid mx-auto pr-3">
        <div className="flex gap-5">
          <div className="w-[262px]">
            <Slidebar />
          </div>
          <div className=" w-full pt-3">
            <Header />
            <div className="card relative flex flex-col break-words bg-white bg-clip-border rounded-[1.25rem] shadow-[3px_4px_20px_0px_#0000000F] border-0 mt-3 py-3 px-3">
              <div className="card-header p-4 flex justify-between items-center border-b border-[#e3e3e3]">
                <div>
                  <h1 className='font-poppins font-semibold text-[20px] md:text-[24px] leading-[100%] text-[#2A2A2A]'>
                    Users {!loading && `(${filteredUsers.length})`}
                  </h1>
                </div>
                <div className='flex items-center gap-3'>
                  <button 
                    onClick={handleExport}
                    className='bg-[#007BFF] text-white flex items-center gap-2 justify-center py-2 min-w-[111px] h-[36px] text-[12px] rounded-[8px] hover:bg-[#0056b3] transition-colors'>
                    <img src={ExportIcon} alt="Export" />Export
                  </button>
                </div>
              </div>
              <div className="card-sub-header p-4 flex justify-end items-center">
                <div className="inline-block">
                  <form className="relative flex items-center" onSubmit={(e) => e.preventDefault()}>
                    <input 
                      className="w-full border border-[#E5E5E5] rounded-lg px-3 py-2 text-[14px] focus:outline-none focus:ring-1 focus:ring-[#0F2446] bg-[#F4F4F4]" 
                      type="search" 
                      placeholder="Search by phone, name, email, or pincode" 
                      value={searchTerm}
                      onChange={handleSearch}
                    />
                    <button type="button" className="absolute right-2 flex items-center justify-center">
                      <img src={SearchIcon} alt="search" className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </div>
              <div className="card-body py-4">
                <div className="overflow-x-auto">
                  {loading ? (
                    <div className="text-center py-8">
                      <p className="text-[#383838]">Loading users...</p>
                    </div>
                  ) : error ? (
                    <div className="text-center py-8">
                      <p className="text-red-500">Error: {error}</p>
                      <button 
                        onClick={fetchUsers}
                        className="mt-4 bg-[#007BFF] text-white px-4 py-2 rounded-lg hover:bg-[#0056b3] transition-colors">
                        Retry
                      </button>
                    </div>
                  ) : filteredUsers.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-[#383838]">
                        {searchTerm ? 'No users found matching your search.' : 'No users available.'}
                      </p>
                    </div>
                  ) : (
                    <table className="w-full">
                      <thead>
                        <tr className='border-b border-[#e3e3e3]'>
                          <th className="pl-10 px-4 py-2 text-left text-xs font-semibold text-[#383838]">ID</th>
                          <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">Phone</th>
                          <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">User Name</th>
                          <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">Email</th>
                          <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">Pincode</th>
                          <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers.map((user, index) => (
                          <tr key={user.id || index} className="border-b border-[#f0f0f0] hover:bg-[#f9f9f9] transition-colors">
                            <td className="pl-10 px-4 py-2 text-[12px] text-[#383838]">{index + 1}.</td>
                            <td className="px-4 py-2 text-[12px] text-[#383838]">
                              {user.mobile_no || 'N/A'}
                            </td>
                            <td className="px-4 py-2 text-[12px] text-[#383838]">
                              {user.username || user.name || user.user_name || 'N/A'}
                            </td>
                            <td className="px-4 py-2 text-[12px] text-[#383838]">
                              {user.email || 'N/A'}
                            </td>
                            <td className="px-4 py-2 text-[12px] text-[#383838]">
                              {user.pincode || 'N/A'}
                            </td>
                            <td className="px-4 py-2 text-[12px] text-[#383838]">
                              {formatDate(user.created)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserList