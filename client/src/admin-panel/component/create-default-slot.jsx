import React from 'react'
import AddSlotIcon from "../../../src/assets/admin-panel-icon/icons/add_icon.svg";
function CreateDefaultSlot() {
  return (
    <>

      <el-dialog>
        <dialog id="drawer_default_slot" aria-labelledby="drawer-title" className="fixed inset-0 size-auto max-h-none max-w-none overflow-hidden bg-transparent not-open:hidden backdrop:bg-transparent">
          <el-dialog-backdrop className="absolute inset-0 bg-gray-900/50 transition-opacity duration-500 ease-in-out data-closed:opacity-0"></el-dialog-backdrop>
          <div tabindex="0" className="absolute inset-0 pl-10 focus:outline-none sm:pl-16">
            <el-dialog-panel className="group/dialog-panel relative ml-auto block size-full max-w-3xl transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700">
              <div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 duration-500 ease-in-out group-data-closed/dialog-panel:opacity-0 sm:-ml-10 sm:pr-4">
              </div>
              <div className="relative flex h-full flex-col overflow-y-auto overflow-x-hidden bg-white py-6 shadow-xl after:absolute after:inset-y-0 after:left-0 after:w-px after:bg-white/10">
                <div className="px-4 sm:px-6">
                  <h2 id="drawer-title" className="text-base font-semibold text-[19px] text-[#3d3d3d]">Create Default Slot</h2>
                  <button type="button" command="close" commandfor="drawer_default_slot" className="absolute top-2 right-2 rounded-md text-gray-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 cursor-pointer">
                    <span className="absolute -inset-2.5"></span>
                    <span className="sr-only">Close panel</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-slot="icon" aria-hidden="true" className="size-6">
                      <path d="M6 18 18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </button>
                </div>
                <div className="relative mt-6 flex-1 px-4 sm:px-6">
                  <form action="">
                    <div className="grid grid-cols-12 gap-6">
                      <div className="col-span-12 md:col-span-4 lg:col-span-3">
                        <label for="name" className="block text-[14px] font-medium text-[#3d3d3d] mb-2">Slot Name</label>
                        <input type="text" name="name" id="name" placeholder='Enter Slot Name' className="mtt-1 block w-full rounded-md border border-[#e3e3e3] bg-[#F5F5F5] py-2 px-3 text-[14px] font-poppins font-normal text-[#3d3d3d] placeholder:text-[#8C8C8C] focus:border-[#007BFF] focus:ring-[#007BFF]" />
                      </div>
                      <div className="col-span-12 md:col-span-4 lg:col-span-3">
                        <label for="name" className="block text-[14px] font-medium text-[#3d3d3d] mb-2">Start Time</label>
                        <input type="text" name="name" id="name" placeholder='HH:MM AM/PM' className="mtt-1 block w-full rounded-md border border-[#e3e3e3] bg-[#F5F5F5] py-2 px-3 text-[14px] font-poppins font-normal text-[#3d3d3d] placeholder:text-[#474747] placeholder:font-medium focus:border-[#007BFF] focus:ring-[#007BFF]" />
                      </div>
                      <div className="col-span-12 md:col-span-4 lg:col-span-3">
                        <label for="name" className="block text-[14px] font-medium text-[#3d3d3d] mb-2">End Time</label>
                        <input type="text" name="name" id="name" placeholder='HH:MM AM/PM' className="mtt-1 block w-full rounded-md border border-[#e3e3e3] bg-[#F5F5F5] py-2 px-3 text-[14px] font-poppins font-normal text-[#3d3d3d] placeholder:text-[#474747] placeholder:font-medium focus:border-[#007BFF] focus:ring-[#007BFF]" />
                      </div>
                      <div className="col-span-12 md:col-span-4 lg:col-span-3 mt-6 flex items-center">
                        <button type="submit" className="btn SAVE_ICON">
                          <img src={AddSlotIcon} alt="Add Icon" />
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </el-dialog-panel>
          </div>
        </dialog>
      </el-dialog>
    </>
  )
}

export default CreateDefaultSlot