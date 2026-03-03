import { useEffect, useState } from 'react'
import AddSlotModal from '../component/add-slot-modal';
import { showDeleteAlert, showDeleteSuccess, showDeleteError } from '../component/swal-delete';
import EditIcon from "../../assets/admin-panel-icon/icons/edit-icon.svg";
import EditSlotModal from '../component/edit-solt';
import SearchableSelect from '../../component/searchable-select';

function AllSlot() {
  const [openIndex, setOpenIndex] = useState(null);
  const [filterVendor, setFilterVendor] = useState('');
  const [filterPackage, setFilterPackage] = useState('');
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
             <form action="" className='flex flex-wrap gap-3 items-center'>
              <SearchableSelect
                options={["Vendor A", "Vendor B", "Vendor C"]}
                value={filterVendor}
                onChange={(val) => setFilterVendor(val)}
                placeholder="Vendor"
                searchPlaceholder="Search vendor..."
              />
              <SearchableSelect
                options={["Summer Package", "Scuba Diving Package", "Island Hopping"]}
                value={filterPackage}
                onChange={(val) => setFilterPackage(val)}
                placeholder="Package"
                searchPlaceholder="Search package..."
              />
            </form>
          </div>
        </div>
        <div className="card-body py-4">
          <div className="overflow-x-auto min-h-[400px]">
            <table className="w-full">
              <thead>
                <tr className='border-b border-[#dee2e6]'>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838] text-nowrap">#</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838] text-nowrap">Package</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838] text-nowrap">Vendor</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838] text-nowrap">Slot Type</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838] text-nowrap">Number of Slots</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838] text-nowrap">Capacity ( per slot)</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838] text-nowrap">Current Price ( per Person)</th>
                  <th className="py-2 text-left text-xs font-semibold text-[#383838]"></th>
                </tr>
              </thead>
              <tbody>
                <tr className='border-b border-[#dee2e6] last:border-0'>
                  <td className="px-4 py-2 text-[12px] text-[#383838] text-nowrap">1</td>
                  <td className="px-4 py-2 text-[12px] text-[#383838] text-nowrap"> Summer Package A</td>
                  <td className="px-4 py-2 text-[12px] text-[#383838] text-nowrap">David Beckham</td>
                  <td className="px-4 py-2 text-[12px] text-[#383838] text-nowrap">Default Slot</td>
                  <td className="px-4 py-2 text-[12px] text-[#383838] text-nowrap">3</td>
                  <td className="px-4 py-2 text-[12px] text-[#383838] text-nowrap">3</td>
                  <td className="px-4 py-2 text-[12px] text-[#383838] text-nowrap">3</td>
                  <td className="py-2 text-[12px] text-[#383838]"> 
                    <button className='cursor-pointer w-[31px] h-[31px]' type='button' command="show-modal" commandfor="edit-slot-modal">
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