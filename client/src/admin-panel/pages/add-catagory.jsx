import React, { useState } from 'react'
import Slidebar from '../component/slidebar'
import Header from '../component/header'
import AddIcon from "../../assets/admin-panel-icon/icons/add_icon.svg"
import DeleteIcon from "../../assets/admin-panel-icon/icons/delete-icon.svg"
import { Link } from 'react-router-dom';
function AddCatagory() {
  const [vendorDocs, setVendorDocs] = useState([{ docName: '', docType: '' }]);

  const addVendorDoc = () => {
    setVendorDocs(prev => [...prev, { docName: '', docType: '' }]);
  };

  const removeVendorDoc = (index) => {
    setVendorDocs(prev => prev.filter((_, i) => i !== index));
  };

  const [activityRows, setActivityRows] = useState([
    { name: '', vendorDocs: [{ docName: '', docType: '' }] }
  ]);

  const addActivityRow = () => {
    setActivityRows(prev => [...prev, { name: '', vendorDocs: [{ docName: '', docType: '' }] }]);
  };

  const removeActivityRow = (rowIdx) => {
    setActivityRows(prev => prev.filter((_, i) => i !== rowIdx));
  };

  const addVendorDocInRow = (rowIdx) => {
    setActivityRows(prev => prev.map((row, i) =>
      i === rowIdx ? { ...row, vendorDocs: [...row.vendorDocs, { docName: '', docType: '' }] } : row
    ));
  };

  const removeVendorDocInRow = (rowIdx, docIdx) => {
    setActivityRows(prev => prev.map((row, i) =>
      i === rowIdx ? { ...row, vendorDocs: row.vendorDocs.filter((_, j) => j !== docIdx) } : row
    ));
  };

  return (
    <>
      <div className="container-fluid mx-auto pr-3">
        <div className="flex gap-5">
          <div className="w-[262px]">
            <Slidebar />
          </div>
          <div className=" w-full pt-3">
            <Header />
            <div className="card relative flex flex-col bg-white bg-clip-border rounded-[1.25rem] shadow-[3px_4px_20px_0px_#0000000F] border-0 mt-3 py-3 px-3">
              <div className="card-header px-4 flex justify-between items-center">
                <div className='flex items-center gap-3'>
                  <Link to="/admin/setting/categories" className='w-[36px] h-[36px] flex items-center justify-center bg-[#f1f1f1] rounded-[10px] transition-colors'>
                    <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 1L1 7L7 13" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                  <h2 className='text-[24px] font-semibold text-[#2A2A2A]'>Add Category & Activity</h2>
                </div>
              </div>
            </div>
            <form action="">
              <div className="card relative flex flex-col bg-white bg-clip-border rounded-[1.25rem] shadow-[3px_4px_20px_0px_#0000000F] border-0 mt-3 py-3 px-3">
                <div className="card-header p-3">
                  <div className='text-[#3D3D3D] text-[16px] font-semibold'>Category Name</div>
                </div>
                <div className="card-body p-3">
                  <div className="grid grid-cols-12 gap-3">
                    <div className="col-span-12 md:col-span-6 lg:col-span-4">
                      <label className='text-[#3D3D3D] font-poppins font-medium text-[14px]' htmlFor="">Category <span className='text-red-500'>*</span> </label>
                      <input type="text" className='text-[#3D3D3D] mt-3 t-[#3D3D3D] bg-[#F5F5F5] font-poppins font-medium text-[14px] rounded-[8px] w-full p-2' />
                    </div>
                  </div>
                </div>
              </div>
              <div className='text-[16px] font-semibold text-[#3D3D3D] ml-4 my-3 lg:my-5'>Activity</div>
              <div className="card relative flex flex-col bg-white bg-clip-border rounded-[1.25rem] shadow-[3px_4px_20px_0px_#0000000F] border-0 mt-3 py-3 px-3">
                <div className="card-body p-3">
                  <div className="grid grid-cols-12 gap-3 md:gap-2 lg:gap-3 border-b border-[#DADADA] last:border-0 py-5">
                    <div className="col-span-12 md:col-span-6 lg:col-span-4">
                      <label className='text-[#3D3D3D] font-poppins font-medium text-[13px]' htmlFor="">Activity <span className='text-red-500'>*</span> </label>
                      <input type="text" className='text-[#3D3D3D] mt-3 t-[#3D3D3D] bg-[#F5F5F5] font-poppins font-medium text-[14px] rounded-[8px] w-full px-3 py-2' placeholder='Enter here' />
                    </div>
                    <div className="col-span-12 md:col-span-6 lg:col-span-7 lg:col-start-6">
                      {vendorDocs.map((doc, index) => (
                        <div className="grid grid-cols-12 gap-3 mb-3" key={index}>
                          <div className="col-span-12 md:col-span-6 lg:col-span-8">
                            {index === 0 && (
                              <label className='text-[#3D3D3D] font-poppins font-medium text-[13px]' htmlFor="">Vendor Document Uploads <span className='text-[#6c757d]'>(Activity Specific) </span> </label>
                            )}
                            <input type="text" className={`text-[#3D3D3D] ${index === 0 ? 'mt-3' : ''} t-[#3D3D3D] bg-[#F5F5F5] font-poppins font-medium text-[14px] rounded-[8px] w-full py-2 px-3`} placeholder='Name of vendor document for the activity' />
                          </div>
                          <div className="col-span-12 md:col-span-6 lg:col-span-4">
                            <div className={`flex gap-3 ${index === 0 ? 'mt-8.5' : ''}`}>
                              <select name="" id="" className='text-[#3D3D3D] t-[#3D3D3D] bg-[#F5F5F5] font-poppins font-medium text-[14px] rounded-[8px] w-full py-2 px-3'>
                                <option value="">Select</option>
                              </select>
                              {index === vendorDocs.length - 1 ? (
                                <button type='button' aria-label='Add More' onClick={addVendorDoc}>
                                  <img className='w-[18px] h-[18px]' src={AddIcon} alt="add" />
                                </button>
                              ) : (
                                <button type='button' aria-label='Delete' onClick={() => removeVendorDoc(index)}>
                                  <img className='w-[18px] h-[18px]' src={DeleteIcon} alt="delete" />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {activityRows.map((actRow, rowIdx) => (
                    <div key={rowIdx} className="activity-row-wrapper pb-0 mb-4 grid grid-cols-12 gap-3 md:gap-1 lg:gap-2 border-b border-[#DADADA] last:border-0 py-5">
                      <div className="col-span-12 md:col-span-6 lg:col-span-5">
                        <div className="flex gap-3 items-center">
                          <div className='w-full max-w-[79%]'>
                            <input type="text" className='text-[#3D3D3D] t-[#3D3D3D] bg-[#F5F5F5] font-poppins font-medium text-[14px] rounded-[8px] w-full py-2 px-3' placeholder='Enter here' />
                          </div>
                          <div>
                            {rowIdx === activityRows.length - 1 ? (
                              <button type='button' aria-label='Add More' onClick={addActivityRow}>
                                <img className='w-[18px] h-[18px]' src={AddIcon} alt="add" />
                              </button>
                            ) : (
                              <button type='button' aria-label='Delete' onClick={() => removeActivityRow(rowIdx)}>
                                <img className='w-[18px] h-[18px]' src={DeleteIcon} alt="delete" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-span-12 md:col-span-6 lg:col-span-7">
                        {actRow.vendorDocs.map((doc, docIdx) => (
                          <div className="grid grid-cols-12 gap-3 mb-3" key={docIdx}>
                            <div className="col-span-12 md:col-span-6 lg:col-span-8">
                              <input type="text" className='text-[#3D3D3D] t-[#3D3D3D] bg-[#F5F5F5] font-poppins font-medium text-[14px] rounded-[8px] w-full py-2 px-3' placeholder="Name of vendor document for the activity" />
                            </div>
                            <div className="col-span-12 md:col-span-6 lg:col-span-4">
                              <div className="flex gap-3">
                                <select name="" id="" className='text-[#3D3D3D] t-[#3D3D3D] bg-[#F5F5F5] font-poppins font-medium text-[14px] rounded-[8px] w-full p-2'>
                                  <option value="">Select</option>
                                </select>
                                {docIdx === actRow.vendorDocs.length - 1 ? (
                                  <button type='button' aria-label='Add More' onClick={() => addVendorDocInRow(rowIdx)}>
                                    <img className='w-[18px] h-[18px]' src={AddIcon} alt="add" />
                                  </button>
                                ) : (
                                  <button type='button' aria-label='Delete' onClick={() => removeVendorDocInRow(rowIdx, docIdx)}>
                                    <img className='w-[18px] h-[18px]' src={DeleteIcon} alt="delete" />
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="card-footer p-4">
                  <div className="flex justify-end">
                    <button type='button' className='text-white bg-[#007BFF] w-[119px] h-[36px] font-poppins font-medium text-[12px] rounded-[8px] p-2'>Save</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddCatagory