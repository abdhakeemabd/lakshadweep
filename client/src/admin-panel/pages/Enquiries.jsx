import React, { useEffect, useState } from 'react'
import SearchIcon from "../../assets/admin-panel-icon/icons/search.svg";
import ExportIcon from "../../assets/admin-panel-icon/icons/export.svg";

function Enquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const response = await fetch("/customer-api/customer/enquiries/", {
        headers: {
          'Authorization': 'Token 8RWYE3BKLZCFIN2FHQNNQEAEWBNDY184TGNYTY6X',
          'Accept': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        }
      });

      const data = await response.json();
      if (data?.status) {
        setEnquiries(data.enquiries || []);
      } else {
        setEnquiries([]);
      }
    } catch (error) {
      console.error("Error fetching enquiries:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const filteredEnquiries = enquiries.filter(item => 
    item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.message?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="card relative flex flex-col bg-white bg-clip-border rounded-[1.25rem] shadow-[3px_4px_20px_0px_#0000000F] border-0 mt-3 py-3 px-3">
      <div className="card-header p-4 flex justify-between items-center border-b border-[#e3e3e3]">
        <div>
          <h1 className='font-poppins font-semibold text-[20px] md:text-[24px] leading-[100%] text-[#2A2A2A]'>Enquiries</h1>
        </div>
        <div className='flex items-center gap-3'>
          <button className='bg-[#007BFF] text-white flex items-center gap-2 justify-center py-2 min-w-[111px] h-[36px] text-[12px] rounded-[8px] cursor-pointer'>
            <img src={ExportIcon} alt="Export" />Export</button>
        </div>
      </div>
      <div className="card-sub-header p-4 flex justify-end items-center">
        <div className="inline-block">
          <div className="relative flex items-center">
            <input 
              className="w-full border border-[#E5E5E5] rounded-lg px-3 py-2 text-[14px] focus:outline-none focus:ring-1 focus:ring-[#0F2446] bg-[#F4F4F4]" 
              type="search" 
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} 
            />
            <button type="button" className="absolute right-2 flex items-center justify-center">
              <img src={SearchIcon} alt="search" className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      <div className="card-body py-4">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className='border-b border-[#e3e3e3]'>
                <th className="pl-10 pr-4 py-2 text-left text-xs font-semibold text-[#383838]">ID</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">Name</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">Email</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">Subject</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">Message</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center py-10 text-[12px] text-gray-400 italic">Loading enquiries...</td>
                </tr>
              ) : filteredEnquiries.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-10 text-[12px] text-gray-400 italic">No enquiries found.</td>
                </tr>
              ) : (
                filteredEnquiries.map((item, index) => (
                  <tr key={item.id || index} className='border-b border-[#f0f0f0] last:border-0 hover:bg-gray-50 transition-colors'>
                    <td className="pl-10 pr-4 py-3 text-[12px] text-[#383838]">{index + 1}.</td>
                    <td className="px-4 py-3 text-[12px] text-[#383838] font-medium">{item.name}</td>
                    <td className="px-4 py-3 text-[12px] text-[#383838]">{item.email}</td>
                    <td className="px-4 py-3 text-[12px] text-[#383838]">{item.subject}</td>
                    <td className="px-4 py-3 text-[12px] text-[#383838] leading-relaxed max-w-[300px] truncate">{item.message}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Enquiries;