import React, { useEffect, useState } from 'react'
import DateRangeFilter from '../component/date-range-filter'
import NotificationModal from '../component/notification-modal'
import PaginationCard from '../component/pagination'

function Notification() {

  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedNotification, setSelectedNotification] = useState(null)

  const fetchNotifications = async () => {
    try {
      setLoading(true)

      const response = await fetch("/notification-api/customer/enquiries/", {
        headers: {
          'Authorization': 'Token 8RWYE3BKLZCFIN2FHQNNQEAEWBNDY184TGNYTY6X',
          'Accept': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        }
      })

      const data = await response.json()

      if (data?.status) {
        setNotifications(data.enquiries || [])
      } else {
        setNotifications([])
      }

    } catch (error) {
      console.error("Error fetching notifications:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNotifications()
  }, [])


  return (
    <>
      <div className="card relative flex flex-col bg-white bg-clip-border rounded-[1.25rem] shadow-[3px_4px_20px_0px_#0000000F] border-0 mt-3 py-3 px-3">

        <div className="card-header p-4 flex justify-between items-center border-b border-[#e3e3e3]">
          <h1 className='font-poppins font-semibold text-[20px] md:text-[24px] leading-[100%] text-[#2A2A2A]'>
            Messages Logs
          </h1>
          <div className='flex items-center gap-3'>
            <DateRangeFilter />
          </div>
        </div>
        <div className="card-body py-4">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className='border-b border-[#dee2e6]'>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">#</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">Date & Time</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">Customer</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">Package</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-[#383838]">Message</th>
                  <th className="px-4 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" className="text-center py-6 text-sm">
                      <div className="flex justify-center items-center gap-2 text-gray-400">
                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-blue-500"></div>
                        Loading logs...
                      </div>
                    </td>
                  </tr>
                ) : notifications.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-6 text-sm text-gray-500 italic">
                      No enquiry messages found.
                    </td>
                  </tr>
                ) : (
                  notifications.map((item, index) => (
                    <tr
                      key={item.id || index}
                      className='border-b border-[#dee2e6] last:border-0 hover:bg-gray-50 transition-colors'
                    >
                      <td className="px-4 py-2 text-[12px] text-[#383838]">{index + 1}</td>
                      <td className="px-4 py-2 text-[12px] text-[#383838]">{item?.created ? new Date(item.created).toLocaleString() : 'N/A'}</td>
                      <td className="px-4 py-2 text-[12px] text-[#383838] font-medium">{item?.name}</td>
                      <td className="px-4 py-2 text-[12px] text-[#383838]">{item?.package_name || item?.subject || 'General Enquiry'}</td>
                      <td className="px-4 py-2 text-[12px] text-[#383838]">
                        <div className="max-w-[400px] line-clamp-1 opacity-70">{item?.message}</div>
                      </td>
                      <td className="px-4 py-2 text-right">
                        <button onClick={() => setSelectedNotification(item)} command="show-modal" commandfor="notification-modal" className="text-[#007BFF] text-nowrap text-[13px] font-normal hover:underline cursor-pointer">View</button>
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
      <NotificationModal notification={selectedNotification} onClose={() => setSelectedNotification(null)} />

    </>
  )
}

export default Notification