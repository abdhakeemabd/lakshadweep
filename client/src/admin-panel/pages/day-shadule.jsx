import React, { useEffect, useState } from 'react'
import EditSlotModal from '../component/edit-solt'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Editicon from "../../assets/admin-panel-icon/icons/edit-icon.svg"
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import SearchableSelect from '../../component/searchable-select'

function DayShadule() {
  const [openIndex, setOpenIndex] = useState(null)
  const [activeFilter, setActiveFilter] = useState('total')
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [selectedSlotForEdit, setSelectedSlotForEdit] = useState(null)
  const [filterVendor, setFilterVendor] = useState('')
  const [filterActivity, setFilterActivity] = useState('')
  
  const [vendors, setVendors] = useState([])
  const [packages, setPackages] = useState([])
  const [dayData, setDayData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [sidebarLoading, setSidebarLoading] = useState(true)

  const toggleDropdown = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const fetchSidebarData = async () => {
    try {
      setSidebarLoading(true)
      const response = await fetch("/slot-api/slot/all/", {
        headers: {
          'Authorization': 'Token 8RWYE3BKLZCFIN2FHQNNQEAEWBNDY184TGNYTY6X',
          'ngrok-skip-browser-warning': 'true'
        }
      })
      const data = await response.json()
      if (data.status) {
        setVendors(data.vendors || [])
        setPackages(data.all_packages || [])
      }
    } catch (error) {
      console.error("Error fetching sidebar data:", error)
    } finally {
      setSidebarLoading(false)
    }
  }

  const fetchDaySchedule = async (pkgId, vndId = null) => {
    try {
      setLoading(true)
      const url = `/slot-api/slot/day-schedule/?package_id=${pkgId}${vndId ? `&vendor_id=${vndId}` : ''}`
      const response = await fetch(url, {
        headers: {
          'Authorization': 'Token 8RWYE3BKLZCFIN2FHQNNQEAEWBNDY184TGNYTY6X',
          'ngrok-skip-browser-warning': 'true'
        }
      })
      const data = await response.json()
      if (data.status) {
        setDayData(data)
        if (data.slots && data.slots.length > 0) {
          setSelectedSlot(data.slots[0])
        } else {
          setSelectedSlot(null)
        }
      }
    } catch (error) {
      console.error("Error fetching day schedule:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSidebarData()
  }, [])

  const handlePackageClick = (pkgId, vndId) => {
    fetchDaySchedule(pkgId, vndId)
  }

  const getFilteredSlots = () => {
    if (!dayData || !dayData.slots) return []
    switch (activeFilter) {
      case 'booked':
        return dayData.slots.filter(slot => slot.is_booked)
      case 'available':
        return dayData.slots.filter(slot => !slot.is_booked)
      default:
        return dayData.slots
    }
  }

  const filteredSlots = getFilteredSlots()

  return (
    <>
      <div className="card relative flex flex-col break-words bg-white bg-clip-border rounded-[1.25rem] shadow-[3px_4px_20px_0px_#0000000F] border-0 mt-3 py-3 px-3">
        <div className="card-header p-4 flex flex-wrap gap-3 justify-between items-center border-b border-[#e3e3e3]">
          <div>
            <h1 className='font-poppins font-semibold text-[20px] md:text-[24px] leading-[100%] text-[#2A2A2A]'>Day Schedule</h1>
          </div>
        </div>
        <div className="card-sub-header p-4 flex flex-wrap gap-3 justify-between items-center">
          <div className='flex flex-wrap gap-3 items-center'>
            <form action="" className='flex flex-wrap gap-3 items-center' onSubmit={e => e.preventDefault()}>
              <SearchableSelect options={vendors.map(v => v.vendor_name).filter(Boolean)} value={filterVendor} onChange={(val) => setFilterVendor(val)} placeholder="Select Vendor" searchPlaceholder="Search vendor..." />
              <SearchableSelect options={["Kayakking", "Snorkeling", "Scuba Diving"]} value={filterActivity} onChange={(val) => setFilterActivity(val)} placeholder="Select Activity" searchPlaceholder="Search activity..." />
            </form>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-12 lg:col-span-3">
          <div className="card relative flex flex-col break-words bg-white bg-clip-border rounded-[1.25rem] shadow-[3px_4px_20px_0px_#0000000F] border-0 mt-3 py-3 px-3 h-fit max-h-[80vh] overflow-y-auto">
            <div className="card-header p-4 flex justify-between items-center">
              <div>
                <div className='font-poppins font-semibold text-[20px] md:text-[20px] leading-[100%] text-[#2A2A2A]'>Assigned Vendors</div>
              </div>
            </div>
            <div className="card-body pt-4">
              {sidebarLoading ? (
                <div className="text-center py-10 text-gray-400">Loading vendors...</div>
              ) : (
                <div>
                  {vendors.map((vendor, index) => (
                    <Accordion key={vendor.id} defaultExpanded={index === 0} sx={{ boxShadow: 'none', padding: '0', border: 'none', '&:before': { display: 'none' } }}>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />} className='!border-1 !border-[#EDE3E3] !mb-2 rounded-[16px] !p-[10px_14px]' sx={{ padding: '0', minHeight: 'auto', borderRadius: '16px', transition: 'all 0.3s ease-in-out', '& .MuiAccordionSummary-content': { margin: '0px !important' }, '&[aria-expanded="true"]': { backgroundColor: '#0F2446', color: '#fff !important', borderRadius: '10px 10px 0px 0px !important', '& *': { color: '#fff !important' } } }}>
                        <div className="flex flex-col w-full">
                          <Typography component="span" className="!font-semibold text-[#1B1A3E] !text-[13px]">{vendor.vendor_name}</Typography>
                          <Typography component="span" className="!text-[12px] text-[#6A6A6A]">Total Packages: {vendor.package_count || 0}</Typography>
                        </div>
                      </AccordionSummary>
                      <AccordionDetails sx={{ padding: '0' }}>
                        <div className="block max-h-[200px] overflow-y-auto">
                          {packages.filter(p => p.vendor_id === vendor.id).map((pkg) => (
                            <div key={pkg.id} onClick={() => handlePackageClick(pkg.id, vendor.id)} className={`p-3 text-[13px] text-[#374151] hover:bg-[#D3E3FF] rounded-[10px] cursor-pointer transition-colors ${dayData?.package_id === pkg.id ? 'bg-[#D3E3FF] font-semibold' : ''}`}>
                              {pkg.title}
                            </div>
                          ))}
                        </div>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-9">
          <div className="card relative flex flex-col bg-white bg-clip-border rounded-[1.25rem] shadow-[3px_4px_20px_0px_#0000000F] border-0 mt-3 py-3">
            <div className="card-header p-4 flex justify-between items-center border-b border-[#e3e3e3]">
              <div>
                <div className='font-poppins font-semibold text-[20px] md:text-[20px] leading-[100%] text-[#2A2A2A]'>{dayData ? dayData.package_name : 'Select a Package'}</div>
              </div>
            </div>
            <div className="card-body p-3 overflow-hidden min-h-[500px]">
              {loading ? (
                <div className="flex justify-center items-center h-full">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : !dayData ? (
                <div className="flex justify-center items-center h-full text-gray-400">Select a package from the sidebar to view schedule</div>
              ) : (
                <div className="flex flex-wrap gap-3 md:flex-nowrap md:gap-0">
                  <div className="w-auto min-w-[230px]">
                    <div className="flex flex-col h-full">
                      <table className="w-full border-collapse mt-15">
                        <tbody>
                          <tr>
                            <td className="text-[#6A6A6A] text-[13px] py-2 w-[50%] text-left">Package ID</td>
                            <td className="font-semibold text-[#1B1A3E] pr-4 text-[13px] py-2 w-[50%] text-left text-nowrap">{dayData.package_id}</td>
                          </tr>
                          <tr>
                            <td className="text-[#6A6A6A] text-[13px] py-2 w-[50%] text-left"> Date</td>
                            <td className="font-semibold text-[#1B1A3E] pr-4 text-[13px] py-2 w-[50%] text-left text-nowrap">{dayData.date_filter}</td>
                          </tr>
                          <tr>
                            <td colSpan="2" className="pt-2">
                              <button onClick={() => setActiveFilter('total')} className={`w-full flex gap-3 items-center pr-4 rounded-[10px_0px_0px_10px] px-3 py-2 transition ${activeFilter === 'total' ? 'bg-[#D3E3FF] text-black' : 'bg-white hover:bg-[#F5F7FF]'}`}>
                                <span className={`text-[13px] w-[50%] text-left ${activeFilter === 'total' ? 'text-black font-semibold' : 'text-black font-normal'}`}>Total Slots</span>
                                <span className={`text-[13px] w-[50%] text-left ${activeFilter === 'total' ? 'text-black font-semibold' : 'text-black font-normal'}`}>{dayData.total_slot_count}</span>
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td colSpan="2" className="pt-2">
                              <button onClick={() => setActiveFilter('booked')} className={`w-full flex gap-3 items-center pr-4 rounded-[10px_0px_0px_10px] px-3 py-2 transition ${activeFilter === 'booked' ? 'bg-[#D3E3FF] text-black' : 'bg-white hover:bg-[#F5F7FF]'}`}>
                                <span className={`text-[13px] w-[50%] text-left ${activeFilter === 'booked' ? 'text-black font-semibold' : 'text-black font-normal'}`}>Booked</span>
                                <span className={`text-[13px] w-[50%] text-left ${activeFilter === 'booked' ? 'text-black font-semibold' : 'text-black font-normal'}`}>{dayData.booked_slot_count}</span>
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td colSpan="2" className="pt-2">
                              <button onClick={() => setActiveFilter('available')} className={`w-full flex gap-3 items-center pr-4 rounded-[10px_0px_0px_10px] px-3 py-2 transition ${activeFilter === 'available' ? 'bg-[#D3E3FF] text-black' : 'bg-white hover:bg-[#F5F7FF]'}`} >
                                <span className={`text-[13px] w-[50%] text-left ${activeFilter === 'available' ? 'text-black font-semibold' : 'text-black font-normal'}`}>Available</span>
                                <span className={`text-[13px] w-[50%] text-left ${activeFilter === 'available' ? 'text-black font-semibold' : 'text-black font-normal'}`}>{dayData.available_slot_count}</span>
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="mt-4 mr-3">
                        <label className="text-[13px] text-[#6A6A6A] block mb-2">Current Price (Per Person)</label>
                        <div className="relative">
                          <input type="text" value={`₹ ${dayData.current_price?.toLocaleString()}`} readOnly className="w-full border border-[#E3E3E3] rounded-[10px] px-3 py-2 text-[13px] font-semibold bg-[#F9F9F9]" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full">
                    <div className="card h-full rounded-[4px]">
                      <div className="card-header flex gap-3 overflow-x-auto pb-2">
                        {filteredSlots.map((slot) => (
                          <div key={slot.slot_id}>
                            <button onClick={() => setSelectedSlot(slot)} className={`w-[80px] min-h-[35px] rounded-[10px_10px_0px_0px] text-[12px] font-semibold transition ${selectedSlot?.slot_id === slot.slot_id ? 'bg-[#0F2446] text-white' : 'bg-[#D3E3FF] text-[#0F2446]'}`}>
                              {slot.slot_name}
                            </button>
                          </div>
                        ))}
                      </div>
                      {selectedSlot && (
                        <div className="card-body h-100 bg-[#D3E3FF] p-3 rounded-b-[10px]">
                          <div className="flex justify-between items-start mb-[53px]">
                            <div className="px-2 py-1 bg-[#CAEDFF] border border-[#559CE7] text-[#016FE5] text-[13px] font-medium w-fit rounded-[8px] whitespace-nowrap">
                              {selectedSlot.start_time} - {selectedSlot.end_time}
                            </div>
                            <span className={`px-3 py-1 rounded-full text-[11px] font-bold ${selectedSlot.is_booked ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>
                              {selectedSlot.is_booked ? 'BOOKED' : 'AVAILABLE'}
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="bg-[#515151] text-white text-[12px] font-normal rounded-[8px] whitespace-nowrap py-[6px] px-3 min-w-[150px]">
                              Capacity: <span className="font-medium">{selectedSlot.total_capacity} Seats</span>
                            </span>
                            <span className="bg-[#515151] text-white text-[12px] font-normal rounded-[8px] whitespace-nowrap py-[6px] px-3 min-w-[150px]">
                              Booked: <span className="font-medium">{selectedSlot.booked_capacity} Seats</span>
                            </span>
                            <span className="bg-[#515151] text-white text-[12px] font-normal rounded-[8px] whitespace-nowrap py-[6px] px-3 min-w-[150px]">
                              Available: <span className="font-medium">{selectedSlot.available_capacity} Seats</span>
                            </span>
                          </div>
                          <div className="h-[250px] overflow-auto pt-4 pr-3">
                            {selectedSlot.bookings && selectedSlot.bookings.length > 0 ? (
                              <div className="space-y-2">
                                <div className="font-semibold text-[13px] text-[#1B1A3E] mb-3">Booked Customer Details:</div>
                                {selectedSlot.bookings.map((booking, idx) => (
                                  <div key={idx} className="bg-white rounded-[8px] p-4 min-h-[160px] shadow-sm">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
                                      <div>
                                        <div className="text-[12px] font-medium text-[#6C6C6C] mb-1">Customer Name</div>
                                        <div className="text-[13px] text-[#212121] font-bold">{booking.customer_name}</div>
                                      </div>
                                      <div>
                                        <div className="text-[12px] font-medium text-[#6C6C6C] mb-1">Phone</div>
                                        <div className="text-[13px] text-[#212121] font-bold">{booking.customer_phone}</div>
                                      </div>
                                      <div>
                                        <div className="text-[12px] font-medium text-[#6C6C6C] mb-1">Email</div>
                                        <div className="text-[13px] text-[#212121] font-bold truncate">{booking.customer_email}</div>
                                      </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t border-gray-50 mt-2">
                                      <div>
                                        <div className="text-[12px] font-medium text-[#6C6C6C] mb-1">Seats Booked</div>
                                        <div className="text-[13px] text-[#212121] font-bold">{booking.seats_booked}</div>
                                      </div>
                                      <div>
                                        <div className="text-[12px] font-medium text-[#6C6C6C] mb-1">Price per seat</div>
                                        <div className="text-[13px] text-[#212121] font-bold">₹{booking.unit_price?.toLocaleString()}</div>
                                      </div>
                                      <div>
                                        <div className="text-[12px] font-medium text-[#6C6C6C] mb-1">Total Price</div>
                                        <div className="text-[13px] text-[#212121] font-bold">₹{booking.total_price?.toLocaleString()}</div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="flex justify-center pt-[50px] flex-col items-center">
                                <div className="font-medium text-[13px] text-[#555] opacity-60">
                                  No bookings for this slot on {dayData.date_filter}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <EditSlotModal />
    </>
  )
}

export default DayShadule;