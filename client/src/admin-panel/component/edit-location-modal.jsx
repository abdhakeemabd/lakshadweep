import React, { useEffect, useRef, useState } from 'react'

function EditLocationModal({ locationId, onSuccess }) {
  const dialogRef = useRef(null)
  const [isClosing, setIsClosing] = useState(false)
  const [locationName, setLocationName] = useState('')
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(false)
  const [error, setError] = useState(null)

  const handleCloseModal = () => {
    setIsClosing(true)
    setTimeout(() => {
      dialogRef.current?.close()
      setIsClosing(false)
      setLocationName('')
      setError(null)
    }, 300)
  }

  const fetchLocationDetails = async (id) => {
    try {
      setFetching(true)
      setError(null)
      setLocationName('') 
      
      const response = await fetch(`/category-api/settings/location-category-activity-edit/?id=${id}`, {
        method: 'GET',
        headers: {
          'Authorization': 'Token 8RWYE3BKLZCFIN2FHQNNQEAEWBNDY184TGNYTY6X',
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        if (response.status === 404) throw new Error('Location not found (404)')
        throw new Error(`Failed to fetch details (${response.status})`)
      }

      const data = await response.json()
      const locationData = data.location || data.data || data
      const name = locationData.name || locationData.location_name
      
      if (name) {
        setLocationName(name)
      } else {
        setError('Location name not found in API response')
      }
    } catch (err) {
      console.error('Fetch Error:', err)
      setError(err.message || 'Error loading location details')
    } finally {
      setFetching(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!locationName.trim()) {
      setError('Location name is required')
      return
    }

    try {
      setLoading(true)
      setError(null)
      const response = await fetch('/category-api/settings/location-category-activity-edit/', {
        method: 'POST',
        headers: {
          'Authorization': 'Token 8RWYE3BKLZCFIN2FHQNNQEAEWBNDY184TGNYTY6X',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          location_id: locationId,
          name: locationName 
        }),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        throw new Error(data.message || 'Failed to update location')
      }

      handleCloseModal()
      if (onSuccess) onSuccess()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (locationId) {
      fetchLocationDetails(locationId)
    }
  }, [locationId])

  useEffect(() => {
    const dialog = dialogRef.current

    const handleGlobalClick = (e) => {
      const trigger = e.target.closest('[command="show-modal"][commandfor="edit-location-modal"]')
      if (trigger) {
        dialog?.showModal()
        // fetch is now handled by the useEffect above when locationId prop updates
      }

      const closeTrigger = e.target.closest('[command="close"][commandfor="edit-location-modal"]')
      if (closeTrigger || (e.target.getAttribute('command') === 'close' && e.target.getAttribute('commandfor') === 'edit-location-modal')) {
        handleCloseModal()
      }
    }

    document.addEventListener('click', handleGlobalClick)
    return () => document.removeEventListener('click', handleGlobalClick)
  }, [])

  return (
    <>
      <dialog ref={dialogRef} id="edit-location-modal" aria-labelledby="edit-location-modal-title" className="fixed inset-0 z-100 w-full h-full bg-transparent m-0 p-0 max-w-none max-h-none backdrop:bg-black/50 py-3 md:py-7">
        <div className="flex min-h-screen min-w-full items-center justify-center p-4">
          <div className={`modal-content relative w-full py-4 max-w-[390px] transform rounded-[15px] bg-white shadow-2xl ${isClosing ? 'closing' : ''}`}>
            <form onSubmit={handleSubmit}>
              <div className="modal-header border-b border-[#DEDCDC] px-6 py-4 flex justify-between">
                <h1 className="font-poppins font-bold text-[16px] md:text-[20px] leading-[100%] text-[#2A2A2A]">Edit Location</h1>
                <button type="button" onClick={handleCloseModal} className="absolute top-1 right-1 z-50 p-1 rounded-full text-gray-500 bg-gray-100 hover:bg-gray-200 hover:text-gray-900 transition-all duration-300 cursor-pointer hover:rotate-90 flex items-center justify-center border-none">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                </button>
              </div>
              <div className="modal-body px-6 py-4 bg-white">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-5">
                  <div className="col-span-12 mb-3 lg:mb-5">
                    <div className="text-[#3D3D3D] font-poppins font-medium text-[13px] ">Location  <span className="text-red-500">*</span>  </div>
                    <input 
                      className="text-[#3D3D3D] bg-[#F5F5F5] py-2 px-3 rounded-[8px] font-poppins font-semibold text-[13px] mt-3 w-full border-none focus:outline-none focus:ring-1 focus:ring-[#007BFF]" 
                      placeholder='Enter Location' 
                      value={locationName}
                      onChange={(e) => setLocationName(e.target.value)}
                      disabled={loading || fetching}
                    />
                    {fetching && <p className="text-[#007BFF] text-[11px] mt-1 italic">Loading details...</p>}
                    {error && <p className="text-red-500 text-[11px] mt-1">{error}</p>}
                  </div>
                  <div className="col-span-12">
                    <button 
                      type="submit"
                      disabled={loading || fetching}
                      className={`w-full bg-[#007BFF] text-white text-[16px] font-semibold py-3 px-3 rounded-[8px] transition-all ${loading || fetching ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#0069d9] cursor-pointer'}`}
                    >
                      {loading ? 'Updating...' : 'Save'}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </>
  )
}

export default EditLocationModal
