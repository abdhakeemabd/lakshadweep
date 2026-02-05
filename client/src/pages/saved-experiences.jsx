import React from 'react'
import ProfileSidebar from '../component/profile-sidebar'
import HomeVendor from '../component/home-vendor'

function SavedExperiences() {
  return (
    <section className='py-10 lg:py-20 bg-[#F5F5F5]'>
      <div className="container mx-auto px-3">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-3">
            <ProfileSidebar />
          </div>
          <div className="col-span-12 lg:col-span-9 lg:mt-24 space-y-6">
            <HomeVendor hideHeader={true} columns={2} noPadding={true} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default SavedExperiences
