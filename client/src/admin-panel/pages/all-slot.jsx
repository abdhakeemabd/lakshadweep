import { useEffect, useState } from 'react'
import AddSlotModal from '../component/add-slot-modal';
import { showDeleteAlert, showDeleteSuccess, showDeleteError } from '../component/swal-delete';
import EditIcon from "../../assets/admin-panel-icon/icons/edit-icon.svg";
import EditSlotModal from '../component/edit-solt';

function AllSlot() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggleDropdown = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const toggleFilterDropdown = () => {
    setOpenIndex(openIndex === "filter" ? null : "filter");
  };
  const handleDelete = async (packageId, packageTitle) => {
    const confirmed = await showDeleteAlert(packageTitle || 'this package');
    if (confirmed) {
      try {
        // TODO: Replace with your actual API endpoint
        // const response = await fetch(`/api/packages/${packageId}`, {
        //   method: 'DELETE',
        //   headers: {
        //     'Authorization': `Bearer ${token}`,
        //   },
        // });
        // 
        // if (!response.ok) {
        //   throw new Error('Failed to delete package');
        // }

        // For now, just show success (remove this when you implement actual API call)
        console.log('Deleting package:', packageId);
        showDeleteSuccess(packageTitle || 'Package');
      } catch (error) {
        console.error('Error deleting package:', error);
        showDeleteError(error.message || 'Failed to delete package');
      }
    }
  };
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
      <div className="card relative flex flex-col break-words bg-white bg-clip-border rounded-[1.25rem] shadow-[3px_4px_20px_0px_#0000000F] border-0 mt-3 py-3 px-3">
        <div className="card-header p-4 flex justify-between items-center border-b border-[#e3e3e3]">
          <div>
            <h1 className='font-poppins font-semibold text-[20px] md:text-[24px] leading-[100%] text-[#2A2A2A]'>Slots</h1>
          </div>
          <div className='flex items-center gap-3'>
            <button type='button' commandfor="add-slot-modal" className="flex items-center gap-4 bg-[#007BFF] rounded-[8px] py-[7px] px-[20px] text-white text-[12px] font-semibold">
              + Create Slot
            </button>
          </div>
        </div>
        <div className="card-sub-header p-4 flex justify-between items-center">
          <div>
             <form action="" className='flex gap-3 items-center'>
              <select className='text-[12px] py-2 pl-4 pr-10 bg-[#F4F4F4] rounded-[10px] min-w-[113px] focus:border-0 focus:outline-none' name="" id="">
                <option className='text-[12px]' value="">Vendor</option>
                <option className='text-[12px]' value="">111</option>
              </select>
              <select className='text-[12px] py-2 pl-4 pr-10 bg-[#F4F4F4] rounded-[10px] min-w-[113px] focus:border-0 focus:outline-none' name="" id="">
                <option className='text-[12px]' value="">Package</option>
                <option className='text-[12px]' value="">111</option>
              </select>
            </form>
          </div>
        </div>
        <div className="card-body py-4">
          <div className="overflow-x-auto min-h-[400px]">
            <table className="w-full">
              <thead>
                <tr className='border-b border-[#dee2e6]'>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">#</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">Package</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">Vendor</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">Slot Type</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">Number of Slots</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">Capacity ( per slot)</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">Current Price( per Person)</th>
                  <th className="py-2 text-left text-xs font-semibold text-[#383838]"></th>
                </tr>
              </thead>
              <tbody>
                <tr className='border-b border-[#dee2e6] last:border-0'>
                  <td className="px-4 py-2 text-[12px] text-[#383838]">1</td>
                  <td className="text-[#383838] text-[12px] leading-[100%] py-3"> Summer Package A</td>
                  <td className="px-4 py-2 text-[12px] text-[#383838]">David Beckham</td>
                  <td className="px-4 py-2 text-[12px] text-[#383838]">Default Slot</td>
                  <td className="px-4 py-2 text-[12px] text-[#383838]">3</td>
                  <td className="px-4 py-2 text-[12px] text-[#383838]">3</td>
                  <td className="px-4 py-2 text-[12px] text-[#383838]">3</td>
                  <td className="py-2 text-[12px] text-[#383838]"> 
                    <button className='cursor-pointer' type='button' command="show-modal" commandfor="edit-slot-modal">
                      <img className='img-fluid' src={EditIcon} alt="Edit" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <AddSlotModal />
      <EditSlotModal />
    </>
  )
}

export default AllSlot;