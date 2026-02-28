import React from 'react'
import { NavLink } from 'react-router-dom'
import ProfileSidebar from '../component/profile-sidebar'
import HomeVendor from '../component/home-vendor'

function SavedExperiences() {
  return (
    <section className='pt-4 pb-10 lg:py-20 bg-[#F5F5F5] min-h-screen'>
      <div className="container mx-auto px-3">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-3 hidden lg:block">
            <ProfileSidebar />
          </div>
          <div className="col-span-12 lg:col-span-9 lg:mt-24 space-y-6">
            <NavLink to="/profile" className="lg:hidden flex items-center gap-2 px-1 text-[#0F2446] font-semibold mb-2">
              <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              Saved Experiences
            </NavLink>
            <HomeVendor hideHeader={true} columns={2} noPadding={true} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default SavedExperiences
