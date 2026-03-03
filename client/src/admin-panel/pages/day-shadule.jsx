import React, { useEffect, useState } from 'react'
import { showDeleteAlert, showDeleteSuccess, showDeleteError } from '../component/swal-delete';
import EditSlotModal from '../component/edit-slot-modal';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Editicon from "../../assets/admin-panel-icon/icons/edit-icon.svg";
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchableSelect from '../../component/searchable-select';

function DayShadule() {
  const [openIndex, setOpenIndex] = useState(null);
  const [activeFilter, setActiveFilter] = useState('total'); // 'total', 'booked', 'available'
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [filterVendor, setFilterVendor] = useState('');
  const [filterActivity, setFilterActivity] = useState('');

  const toggleDropdown = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const toggleFilterDropdown = () => {
    setOpenIndex(openIndex === "filter" ? null : "filter");
  };

  // Sample slot data - Replace with your API data
  const sampleSlots = [
    {
      id: 1,
      slotName: 'S1',
      timeRange: '7:00 AM - 8:30 AM',
      capacity: 20,
      booked: 15,
      available: 5,
      customers: [
        { id: 1, name: 'John Doe', phone: '+91 9876543210', email: 'john.doe@gmail.com', seats: 2, pricePerSeat: 1300, totalPrice: 2600 },
        { id: 2, name: 'Jane Smith', phone: '+91 9876543211', email: 'jane.smith@gmail.com', seats: 1, pricePerSeat: 1300, totalPrice: 1300 },
        { id: 3, name: 'Mike Johnson', phone: '+91 9876543212', email: 'mike.j@gmail.com', seats: 3, pricePerSeat: 1300, totalPrice: 3900 }
      ]
    },
    {
      id: 2,
      slotName: 'S2',
      timeRange: '9:00 AM - 10:30 AM',
      capacity: 25,
      booked: 8,
      available: 17,
      customers: [
        { id: 4, name: 'Sarah Williams', phone: '+91 9876543213', email: 'sarah.w@gmail.com', seats: 4, pricePerSeat: 1300, totalPrice: 5200 },
        { id: 5, name: 'David Brown', phone: '+91 9876543214', email: 'david.brown@gmail.com', seats: 2, pricePerSeat: 1300, totalPrice: 2600 }
      ]
    },
    {
      id: 3,
      slotName: 'S3',
      timeRange: '11:00 AM - 12:30 PM',
      capacity: 30,
      booked: 0,
      available: 30,
      customers: []
    }
  ];

  // Calculate totals based on seat counts
  const totalSlots = sampleSlots.reduce((sum, slot) => sum + slot.capacity, 0);
  const bookedSlots = sampleSlots.reduce((sum, slot) => sum + slot.booked, 0);
  const availableSlots = sampleSlots.reduce((sum, slot) => sum + slot.available, 0);

  // Filter slots based on active filter
  const getFilteredSlots = () => {
    switch (activeFilter) {
      case 'booked':
        return sampleSlots.filter(slot => slot.booked > 0);
      case 'available':
        return sampleSlots.filter(slot => slot.available > 0);
      case 'total':
      default:
        return sampleSlots;
    }
  };

  const filteredSlots = getFilteredSlots();

  // Set first slot as selected by default
  useEffect(() => {
    if (filteredSlots.length > 0 && !selectedSlot) {
      setSelectedSlot(filteredSlots[0]);
    }
  }, [filteredSlots, selectedSlot]);

  // Sample vendors data - Replace with your API data
  const [vendors, setVendors] = useState([
    {
      id: 1,
      name: "Gorogue",
      totalPackages: 19,
      packages: [
        { id: 1, name: "Kayak & Paddle - Kavaratti Lagoon" },
        { id: 2, name: "Sunset Dolphin Cruise" },
        { id: 3, name: "Island Hopping & Snorkel Combo" },
        { id: 4, name: "Glass-Bottom Boat Ride" },
        { id: 5, name: "Full-Day Adventure Combo" },
        { id: 6, name: "Glass-Bottom Boat & Snorkel" },
        { id: 7, name: "Multi-Island Premium Adventure" },
        { id: 8, name: "Romantic Sunset Cruise & Dinner" },
        { id: 9, name: "Lagoon Fishing Experience" },
        { id: 10, name: "Turtle Watching Eco Walk" }
      ]
    },
    {
      id: 2,
      name: "Water Sports Center",
      totalPackages: 8,
      packages: [
        { id: 1, name: "Jet Ski Adventure" },
        { id: 2, name: "Parasailing Experience" },
        { id: 3, name: "Banana Boat Ride" },
        { id: 4, name: "Wakeboarding Session" },
        { id: 5, name: "Flyboard Experience" },
        { id: 6, name: "Kayaking Tour" }
      ]
    },
    {
      id: 3,
      name: "Scuba Diving Center",
      totalPackages: 5,
      packages: [
        { id: 1, name: "Ko Tao: Try Scuba Diving 1-Day Experience" },
        { id: 2, name: "Advanced Open Water Course" },
        { id: 3, name: "Night Diving Adventure" },
        { id: 4, name: "Wreck Diving Expedition" },
        { id: 5, name: "Underwater Photography Session" }
      ]
    }
  ]);

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
        <div className="card-header p-4 flex flex-wrap gap-3 justify-between items-center border-b border-[#e3e3e3]">
          <div>
            <h1 className='font-poppins font-semibold text-[20px] md:text-[24px] leading-[100%] text-[#2A2A2A]'>Day Schedule</h1>
          </div>
        </div>
        <div className="card-sub-header p-4 flex flex-wrap gap-3 justify-between items-center">
          <div className='flex flex-wrap gap-3 items-center'>
            <form action="" className='flex flex-wrap gap-3 items-center'>
              <SearchableSelect
                options={vendors.map(v => v.name).filter(Boolean)}
                value={filterVendor}
                onChange={(val) => setFilterVendor(val)}
                placeholder="Select Vendor"
                searchPlaceholder="Search vendor..."
              />
              <SearchableSelect
                options={["Kayakking", "Snorkeling", "Scuba Diving", "Parasailing", "Glass Bottom Boat", "Wind Surfing", "Water Skiing", "Deep Sea Fishing", "Island Hopping", "Dolphin Watching"]}
                value={filterActivity}
                onChange={(val) => setFilterActivity(val)}
                placeholder="Select Activity"
                searchPlaceholder="Search activity..."
              />
            </form>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-12 lg:col-span-3">
          <div className="card relative flex flex-col break-words bg-white bg-clip-border rounded-[1.25rem] shadow-[3px_4px_20px_0px_#0000000F] border-0 mt-3 py-3 px-3">
            <div className="card-header p-4 flex justify-between items-center">
              <div>
                <div className='font-poppins font-semibold text-[20px] md:text-[20px] leading-[100%] text-[#2A2A2A]'>Assigned Vendors</div>
              </div>
            </div>
            <div className="card-body pt-4">
              <div>
                {vendors.map((vendor, index) => (
                  <Accordion key={vendor.id} defaultExpanded={index === 0} sx={{ boxShadow: 'none', padding: '0', border: 'none', '&:before': { display: 'none' } }}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={`panel${vendor.id}-content`}
                      id={`panel${vendor.id}-header`}
                      className='!border-1 !border-[#EDE3E3] !mb-2 rounded-[16px] !p-[10px_14px]'
                      sx={{ padding: '0', minHeight: 'auto', borderRadius: '16px', transition: 'all 0.3s ease-in-out', '& .MuiAccordionSummary-content': { margin: '0px !important' }, '& *': { transition: 'color 0.3s ease-in-out' }, '&[aria-expanded="true"]': { backgroundColor: '#0F2446', color: '#fff !important', borderRadius: '10px 10px 0px 0px !important', '& *': { color: '#fff !important' } } }}>
                      <div className="flex flex-col w-full">
                        <Typography component="span" className="!font-semibold text-[#1B1A3E] !text-[13px]">{vendor.name}</Typography>
                        <Typography component="span" className="!text-[12px] text-[#6A6A6A]">Total Package: {vendor.totalPackages}</Typography>
                      </div>
                    </AccordionSummary>
                    <AccordionDetails sx={{ padding: '0' }}>
                      <div className="block">
                        {vendor.packages.map((pkg) => (
                          <div key={pkg.id} className="p-3 text-[13px] text-[#374151] hover:bg-[#D3E3FF] rounded-[10px] cursor-pointer transition-colors">
                            {pkg.name}
                          </div>
                        ))}
                      </div>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-9">
          <div className="card relative flex flex-col break-words bg-white bg-clip-border rounded-[1.25rem] shadow-[3px_4px_20px_0px_#0000000F] border-0 mt-3 py-3">
            <div className="card-header p-4 flex justify-between items-center border-b border-[#e3e3e3]">
              <div>
                <div className='font-poppins font-semibold text-[20px] md:text-[20px] leading-[100%] text-[#2A2A2A]'>Assigned Vendors</div>
              </div>
            </div>
            <div className="card-body p-3 overflow-hidden">
              <div className="flex flex-wrap gap-3 md:flex-nowrap md:gap-0">
                <div className="w-auto min-w-[230px]">
                  <div className="flex flex-col h-full">
                    <table className="w-full border-collapse mt-15">
                      <tbody>
                        <tr>
                          <td className="text-[#6A6A6A] text-[13px] py-2 w-[50%] text-left">Category</td>
                          <td className="font-semibold text-[#1B1A3E] pr-4 text-[13px] py-2 w-[50%] text-left text-nowrap">Rentals</td>
                        </tr>
                        <tr>
                          <td className="text-[#6A6A6A] text-[13px] py-2 w-[50%] text-left"> Activity</td>
                          <td className="font-semibold text-[#1B1A3E] pr-4 text-[13px] py-2 w-[50%] text-left text-nowrap"> Bike Rentals</td>
                        </tr>
                        <tr>
                          <td colSpan="2" className="pt-2">
                            <button onClick={() => setActiveFilter('total')} className={`w-full flex gap-3 items-center pr-4 rounded-[10px_0px_0px_10px] px-3 py-2 transition ${activeFilter === 'total' ? 'bg-[#D3E3FF] text-[#000]' : 'bg-[#fff] hover:bg-[#F5F7FF]'}`}>
                              <span className={`text-[13px] w-[50%] text-left ${activeFilter === 'total' ? 'text-[#000] font-semibold' : 'text-[#000] font-normal'}`}>Total Slots</span>
                              <span className={`text-[13px] w-[50%] text-left ${activeFilter === 'total' ? 'text-[#000] font-semibold' : 'text-[#000] font-normal'}`}>{totalSlots}</span>
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="2" className="pt-2">
                            <button onClick={() => setActiveFilter('booked')} className={`w-full flex gap-3 items-center pr-4 rounded-[10px_0px_0px_10px] px-3 py-2 transition ${activeFilter === 'booked' ? 'bg-[#D3E3FF] text-[#000]' : 'bg-[#fff] hover:bg-[#F5F7FF]'}`}>
                              <span className={`text-[13px] w-[50%] text-left ${activeFilter === 'booked' ? 'text-[#000] font-semibold' : 'text-[#000] font-normal'}`}>Booked</span>
                              <span className={`text-[13px] w-[50%] text-left ${activeFilter === 'booked' ? 'text-[#000] font-semibold' : 'text-[#000] font-normal'}`}>{bookedSlots}</span>
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="2" className="pt-2">
                            <button onClick={() => setActiveFilter('available')} className={`w-full flex gap-3 items-center pr-4 rounded-[10px_0px_0px_10px] px-3 py-2 transition ${activeFilter === 'available' ? 'bg-[#D3E3FF] text-[#000]' : 'bg-[#fff] hover:bg-[#F5F7FF]'}`} >
                              <span className={`text-[13px] w-[50%] text-left ${activeFilter === 'available' ? 'text-[#000] font-semibold' : 'text-[#000] font-normal'}`}>Available</span>
                              <span className={`text-[13px] w-[50%] text-left ${activeFilter === 'available' ? 'text-[#000] font-semibold' : 'text-[#000] font-normal'}`}>{availableSlots}</span>
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="mt-4">
                      <label className="text-[13px] text-[#6A6A6A] block mb-2">Current Price (Per Person)</label>
                      <div className="relative mr-3">
                        <input type="text" value="INR 1300.00" readOnly className="w-full border border-[#E3E3E3] rounded-[10px] px-3 py-2 text-[13px] font-semibold bg-[#F9F9F9]" />
                        <button type="button" className="absolute right-3 z-2 top-1/2 -translate-y-1/2" command="show-modal" commandfor="edit-slot-modal" >
                          <img src={Editicon} className="w-[24px] h-[24px]" alt="edit"  />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <div className="card h-full rounded-[4px]">
                    <div className="card-header flex gap-3">
                      {filteredSlots.map((slot) => (
                        <div key={slot.id}>
                          <button
                            onClick={() => setSelectedSlot(slot)}
                            className={`w-[48px] min-h-[29px] rounded-[10px_10px_0px_0px] text-[13px] font-semibold transition ${selectedSlot?.id === slot.id ? 'bg-[#0F2446] text-white' : 'bg-[#D3E3FF] text-[#0F2446]'
                              }`}
                          >
                            {slot.slotName}
                          </button>
                        </div>
                      ))}
                    </div>
                    {selectedSlot && (
                      <div className="card-body h-100 bg-[#D3E3FF] p-3">
                        <div className="px-2 py-1 bg-[#CAEDFF] border border-[#559CE7] text-[#016FE5] text-[13px] font-medium w-fit rounded-[8px] whitespace-nowrap mb-[53px]">
                          {selectedSlot.timeRange}
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="bg-[#515151] text-white text-[13px] font-normal rounded-[8px] whitespace-nowrap py-[6px] pr-[27px] pl-[12px] w-[159px] max-w-[160px]">
                            Capacity: <span className="font-medium">{selectedSlot.capacity} Seats</span>
                          </span>
                          <span className="bg-[#515151] text-white text-[13px] font-normal rounded-[8px] whitespace-nowrap py-[6px] pr-[27px] pl-[12px] w-[159px] max-w-[160px]">
                            Booked: <span className="font-medium">{selectedSlot.booked} Seats</span>
                          </span>
                          <span className="bg-[#515151] text-white text-[13px] font-normal rounded-[8px] whitespace-nowrap py-[6px] pr-[27px] pl-[12px] w-[159px] max-w-[160px]">
                            Available: <span className="font-medium">{selectedSlot.available} Seats</span>
                          </span>
                        </div>
                        <div className="h-[250px] overflow-auto pt-4 pr-3">
                          {selectedSlot.customers.length > 0 ? (
                            <div className="space-y-2">
                              <div className="font-semibold text-[13px] text-[#1B1A3E] mb-3">Booked Customer Details:</div>
                              {selectedSlot.customers.map((customer) => (
                                <div key={customer.id} className="bg-white rounded-[8px] p-3 py-4 min-h-[167px]">
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
                                    <div>
                                      <div className="text-[14px] font-medium text-[#6C6C6C] mb-3">Customer Name</div>
                                      <div className="text-[14px] text-[#212121] font-semibold">{customer.name}</div>
                                    </div>
                                    <div>
                                      <div className="text-[14px] font-medium text-[#6C6C6C] mb-3">Phone</div>
                                      <div className="text-[14px] text-[#212121] font-semibold">{customer.phone}</div>
                                    </div>
                                    <div>
                                      <div className="text-[14px] font-medium text-[#6C6C6C] mb-3">Email</div>
                                      <div className="text-[14px] text-[#212121] font-semibold">{customer.email}</div>
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                                    <div>
                                      <div className="text-[14px] font-medium text-[#6C6C6C] mb-3">Seats Booked</div>
                                      <div className="text-[14px] text-[#212121] font-semibold">{customer.seats}</div>
                                    </div>
                                    <div>
                                      <div className="text-[14px] font-medium text-[#6C6C6C] mb-3">Price <span className='ms-1 text-[#909090] text-[11px]'>(per seat)</span></div>
                                      <div className="text-[14px] text-[#212121] font-semibold">₹{customer.pricePerSeat.toLocaleString()}</div>
                                    </div>
                                    <div>
                                      <div className="text-[14px] font-medium text-[#6C6C6C] mb-3">Total Price</div>
                                      <div className="text-[14px] text-[#212121] font-semibold">₹{customer.totalPrice.toLocaleString()}</div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="flex justify-center pt-[50px]">
                              <div className="font-medium text-[13px] text-[#262626]">
                                No bookings for this slot
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <EditSlotModal />
    </>
  )
}

export default DayShadule;