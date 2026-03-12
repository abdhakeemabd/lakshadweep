import { useEffect, useState } from 'react'
import AddSlotModal from '../component/add-slot-modal'
import { showDeleteAlert, showDeleteSuccess, showDeleteError } from '../component/swal-delete'
import EditIcon from "../../assets/admin-panel-icon/icons/edit-icon.svg"
import EditSlotModal from '../component/edit-solt'
import SearchableSelect from '../../component/searchable-select'
import PaginationCard from '../component/pagination'

function AllSlot() {

  const [openIndex, setOpenIndex] = useState(null)
  const [filterVendor, setFilterVendor] = useState('')
  const [filterPackage, setFilterPackage] = useState('')
  const [slots, setSlots] = useState([])
  const [vendors, setVendors] = useState([])
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedSlotForEdit, setSelectedSlotForEdit] = useState(null);

  const toggleDropdown = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const fetchSlots = async () => {
    try {
      setLoading(true)
      const response = await fetch("/slot-api/slot/all/", {
        headers: {
          'Authorization': 'Token 8RWYE3BKLZCFIN2FHQNNQEAEWBNDY184TGNYTY6X',
          'Accept': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        }
      })
      const data = await response.json()

      if (data.status) {
        setSlots(data.slots || [])
        setVendors(data.vendors || [])
        setPackages(data.all_packages || [])
      }

    } catch (error) {
      console.error("Error fetching slots:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSlots()
  }, [])

  const handleDelete = async (slotId, title) => {
    const confirmed = await showDeleteAlert(title || 'this slot group')

    if (confirmed) {
      try {
        const response = await fetch(`/slot-api/slot/delete/${slotId}/`, {
          method: "DELETE",
          headers: {
            'Authorization': 'Token 8RWYE3BKLZCFIN2FHQNNQEAEWBNDY184TGNYTY6X',
            'Accept': 'application/json',
            'ngrok-skip-browser-warning': 'true'
          }
        })

        const data = await response.json()

        if (data.status) {
          showDeleteSuccess(title || 'Slot')
          fetchSlots()
        } else {
          showDeleteError(data.message)
        }

      } catch (error) {
        console.error(error)
        showDeleteError("Failed to delete slot")
      }
    }
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".dropdown-container")) {
        setOpenIndex(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const filteredSlots = slots.filter(slot => {
    const matchVendor = !filterVendor || slot.vendor_name === filterVendor;
    const matchPackage = !filterPackage || slot.package_name === filterPackage;
    return matchVendor && matchPackage;
  });

  return (
    <>
      <div className="card relative flex flex-col bg-white bg-clip-border rounded-[1.25rem] shadow-[3px_4px_20px_0px_#0000000F] border-0 mt-3 py-3 px-3">
        <div className="card-header p-4 flex justify-between items-center border-b border-[#e3e3e3]">
          <div>
            <h1 className='font-poppins font-semibold text-[20px] md:text-[24px] leading-[100%] text-[#2A2A2A]'> Slots </h1>
          </div>
          <div className='flex items-center gap-3'>
            <button type='button' commandfor="add-slot-modal"
              className="flex items-center gap-4 bg-[#007BFF] rounded-[8px] py-[7px] px-[20px] text-white text-[12px] font-semibold cursor-pointer transition-all hover:bg-[#0069d9]"> + Create Slot </button>
          </div>
        </div>
        <div className="card-sub-header p-4 flex justify-between items-center">
          <form className='flex flex-wrap gap-3 items-center'>
            <SearchableSelect options={vendors.map(v => v.vendor_name).filter(Boolean)} value={filterVendor} onChange={(val) => setFilterVendor(val)} placeholder="Vendor" searchPlaceholder="Search vendor..." />
            <SearchableSelect options={packages.map(p => p.title).filter(Boolean)} value={filterPackage} onChange={(val) => setFilterPackage(val)} placeholder="Package" searchPlaceholder="Search package..." />
          </form>
        </div>
        <div className="card-body py-4">
          <div className="overflow-x-auto min-h-[400px]">
            <table className="w-full">
              <thead>
                <tr className='border-b border-[#dee2e6]'>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[#383838] text-nowrap">#</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[#383838] text-nowrap">Package</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[#383838] text-nowrap">Vendor</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[#383838] text-nowrap">Slot Type</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[#383838] text-nowrap">Number of Slots</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[#383838] text-nowrap">Capacity ( per slot)</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[#383838] text-nowrap">Current Price( per Person)</th>
                  <th className="py-3 text-left text-xs font-semibold text-[#383838]"></th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7" className="text-center py-20">
                      <div className="flex justify-center flex-col items-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#007BFF] mb-3"></div>
                        <span className="text-sm text-gray-500 font-medium">Loading slots...</span>
                      </div>
                    </td>
                  </tr>
                ) : filteredSlots.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-20 text-gray-500 font-medium italic"> No slots matching the criteria...</td>
                  </tr>
                ) : (
                  filteredSlots.map((slot, index) => (
                    <tr key={slot.id} className='border-b border-[#dee2e6] last:border-0 hover:bg-[#f8f9fa] transition-colors'>
                      <td className="px-4 py-3 text-[12px]">{index + 1}</td>
                      <td className="px-4 py-3 text-[12px] font-medium text-[#2A2A2A]">
                        {slot.package_name}
                      </td>
                      <td className="px-4 py-3 text-[12px]"> {slot.vendor_name || 'Go Rogue'} </td>
                      <td className="px-4 py-3 text-[12px]"> {slot.type_label} </td>
                      <td className="px-4 py-3 text-[12px]"> {slot.slot_ids ? slot.slot_ids.length : 0} </td>
                      <td className="px-4 py-3 text-[12px]"> {slot.capacity} </td>
                      <td className="px-4 py-3 text-[12px] text-[#545454]"> {slot.resolved_price?.toLocaleString()} </td>
                      <td className="py-3 text-[12px] ">
                        <button className='cursor-pointer w-[31px] h-[31px] hover:bg-gray-100 rounded-full transition-all' type='button' command="show-modal" commandfor="edit-slot-modal" onClick={() => setSelectedSlotForEdit(slot)}> <img src={EditIcon} alt="Edit" className="w-5 h-5" /></button>
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
      <AddSlotModal onSave={fetchSlots} vendors={vendors} packages={packages} />
      <EditSlotModal onSave={fetchSlots} vendors={vendors} packages={packages} slot={selectedSlotForEdit} onClose={() => setSelectedSlotForEdit(null)} />
    </>
  )
}

export default AllSlot