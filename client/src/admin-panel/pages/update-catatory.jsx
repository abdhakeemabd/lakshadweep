import React, { useEffect, useState } from 'react'
import AddIcon from "../../assets/admin-panel-icon/icons/add_icon.svg"
import DeleteIcon from "../../assets/admin-panel-icon/icons/delete-icon.svg"
import { Link, useNavigate, useParams } from 'react-router-dom';
import SearchableSelect from '../../component/searchable-select';
import { showSuccess, showError } from '../component/swal-delete';

function UpdateCatagory() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [activityRows, setActivityRows] = useState([
    { name: '', vendorDocs: [{ docName: '', docType: 'Mandatory' }] }
  ]);
  // Activity Row Helpers
  const addActivityRow = () => {
    setActivityRows(prev => [...prev, { name: '', vendorDocs: [{ docName: '', docType: 'Mandatory' }] }]);
  };

  const removeActivityRow = (rowIdx) => {
    setActivityRows(prev => prev.filter((_, i) => i !== rowIdx));
  };

  const updateActivityRow = (rowIdx, field, value) => {
    setActivityRows(prev => prev.map((row, i) =>
      i === rowIdx ? { ...row, [field]: value } : row
    ));
  };

  const addVendorDocInRow = (rowIdx) => {
    setActivityRows(prev => prev.map((row, i) =>
      i === rowIdx ? { ...row, vendorDocs: [...row.vendorDocs, { docName: '', docType: 'Mandatory' }] } : row
    ));
  };

  const removeVendorDocInRow = (rowIdx, docIdx) => {
    setActivityRows(prev => prev.map((row, i) =>
      i === rowIdx ? { ...row, vendorDocs: row.vendorDocs.filter((_, j) => j !== docIdx) } : row
    ));
  };

  const updateVendorDocInRow = (rowIdx, docIdx, field, value) => {
    setActivityRows(prev => prev.map((row, i) =>
      i === rowIdx ? {
        ...row,
        vendorDocs: row.vendorDocs.map((doc, j) =>
          j === docIdx ? { ...doc, [field]: value } : doc
        )
      } : row
    ));
  };

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch(`/category-api/settings/edit-category-activity/?id=${id}`, {
          headers: {
            'Authorization': 'Token 8RWYE3BKLZCFIN2FHQNNQEAEWBNDY184TGNYTY6X',
            'Accept': 'application/json',
          },
        });
        if (!response.ok) throw new Error('Failed to fetch category detail');
        const result = await response.json();
        console.log('Fetched data result:', result);
        
        const data = result.data || result;
        
        const newCategoryName = data.category?.name || data.name || data.category_name || '';
        setCategoryName(newCategoryName);
        
        let newRows = [];
        const activitiesList = data.activity_data || data.activities;

        if (Array.isArray(activitiesList) && activitiesList.length > 0) {
          newRows = activitiesList.map(act => {
             const docs = (act.documents || act.vendor_documents || act.vendorDocs || act.vendor_docs || []);
             const mappedDocs = docs.length > 0 
                ? docs.map(doc => ({
                    docName: doc.document_name || doc.name || doc.doc_name || doc.docName || '',
                    docType: (doc.options === 'required' || doc.is_mandatory || doc.docType === 'Mandatory' || doc.doc_type === 'Mandatory') ? 'Mandatory' : 'Optional'
                  }))
                : [{ docName: '', docType: 'Mandatory' }];
             
             return {
               name: act.name || act.activity_name || act.activityName || '',
               vendorDocs: mappedDocs
             };
          });
        } else if (data.activity_names) {
            newRows = [{ name: data.activity_names, vendorDocs: [{ docName: '', docType: 'Mandatory' }] }];
        } else {
            newRows = [{ name: '', vendorDocs: [{ docName: '', docType: 'Mandatory' }] }];
        }
        
        console.log('Processed activity rows:', newRows);
        setActivityRows(newRows);
      } catch (err) {
        console.error('Error fetching category:', err);
      } finally {
        setFetching(false);
      }
    };

    if (id) {
      fetchCategory();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!categoryName.trim()) {
      showError('Validation Error', 'Please enter a category name');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        category_id: parseInt(id),
        category_name: categoryName,
        activities: activityRows.map(act => ({
          name: act.name,
          documents: act.vendorDocs.map(doc => ({
            document_name: doc.docName,
            options: doc.docType === 'Mandatory' ? 'required' : 'optional'
          }))
        }))
      };

      const response = await fetch(`/category-api/settings/edit-category-activity/?id=${id}`, {
        method: 'POST',
        headers: {
          'Authorization': 'Token 8RWYE3BKLZCFIN2FHQNNQEAEWBNDY184TGNYTY6X',
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || errorData.message || 'Failed to update category');
      }

      showSuccess('Success!', 'Category updated successfully!');
      navigate('/admin/setting/categories');
    } catch (err) {
      console.error('Error updating category:', err);
      showError('Error', err.message);
    } finally {
      setLoading(false);
    }
  };

  const docTypeOptions = ['Mandatory', 'Optional'];

  return (
    <>
      <div className="card relative flex flex-col bg-white bg-clip-border rounded-[1.25rem] shadow-[3px_4px_20px_0px_#0000000F] border-0 mt-3 py-3 px-3">
        <div className="card-header px-4 flex justify-between items-center">
          <div className='flex items-center gap-3'>
            <Link to="/admin/setting/categories" className='w-[36px] h-[36px] flex items-center justify-center bg-[#f1f1f1] rounded-[10px] transition-colors'>
              <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 1L1 7L7 13" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <h2 className='text-[24px] font-semibold text-[#2A2A2A]'>Edit Category & Activity</h2>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        {fetching ? (
          <div className="text-center py-10">Loading...</div>
        ) : (
          <>
            <div className="card relative flex flex-col bg-white bg-clip-border rounded-[1.25rem] shadow-[3px_4px_20px_0px_#0000000F] border-0 mt-3 py-3 px-3">
              <div className="card-header p-3">
                <div className='text-[#3D3D3D] text-[16px] font-semibold'>Category Name</div>
              </div>
              <div className="card-body p-3">
                <div className="grid grid-cols-12 gap-3">
                  <div className="col-span-12 md:col-span-6 lg:col-span-4">
                    <label className='text-[#3D3D3D] font-poppins font-medium text-[14px]' htmlFor="category">Category <span className='text-red-500'>*</span> </label>
                    <input id="category" type="text" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} className='text-[#3D3D3D] mt-3 bg-[#F5F5F5] font-poppins font-medium text-[14px] rounded-[8px] w-full p-2' placeholder="Enter Category Name" />
                  </div>
                </div>
              </div>
            </div>
            <div className='text-[16px] font-semibold text-[#3D3D3D] ml-4 my-3 lg:my-5'>Activity</div>
            <div className="card relative flex flex-col bg-white bg-clip-border rounded-[1.25rem] shadow-[3px_4px_20px_0px_#0000000F] border-0 mt-3 py-3 px-3">
              <div className="card-body p-3">
                {activityRows.map((actRow, rowIdx) => (
                  <div key={rowIdx} className="activity-row-wrapper pb-0 mb-4 grid grid-cols-12 gap-3 md:gap-1 lg:gap-2 border-b border-[#DADADA] last:border-0 py-5">
                    <div className="col-span-12 md:col-span-6 lg:col-span-5">
                      <div className="flex flex-col gap-2">
                        {rowIdx === 0 && (
                           <label className='text-[#3D3D3D] font-poppins font-medium text-[13px]' htmlFor={`activity-${rowIdx}`}>Activity <span className='text-red-500'>*</span> </label>
                        )}
                        <div className="flex gap-3 items-center">
                          <div className='w-full max-w-[79%]'>
                            <input id={`activity-${rowIdx}`} type="text" value={actRow.name} onChange={(e) => updateActivityRow(rowIdx, 'name', e.target.value)} className='text-[#3D3D3D] bg-[#F5F5F5] font-poppins font-medium text-[14px] rounded-[8px] w-full py-2 px-3' placeholder='Enter Activity Name' />
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
                    </div>
                    <div className="col-span-12 md:col-span-6 lg:col-span-7">
                      {actRow.vendorDocs.map((doc, docIdx) => (
                        <div className="grid grid-cols-12 gap-3 mb-3" key={docIdx}>
                          <div className="col-span-12 md:col-span-6 lg:col-span-8">
                            {rowIdx === 0 && docIdx === 0 && (
                               <label className='text-[#3D3D3D] font-poppins font-medium text-[13px]' htmlFor={`doc-name-${rowIdx}-${docIdx}`}>Vendor Document Uploads <span className='text-[#6c757d]'>(Activity Specific) </span> </label>
                            )}
                            <input id={`doc-name-${rowIdx}-${docIdx}`} value={doc.docName} type="text" onChange={(e) => updateVendorDocInRow(rowIdx, docIdx, 'docName', e.target.value)} className={`text-[#3D3D3D] ${rowIdx === 0 && docIdx === 0 ? 'mt-3' : ''} bg-[#F5F5F5] font-poppins font-medium text-[14px] rounded-[8px] w-full py-2 px-3`} placeholder="Name of vendor document for the activity" />
                          </div>
                          <div className="col-span-12 md:col-span-6 lg:col-span-4">
                            <div className={`flex gap-3 items-center ${rowIdx === 0 && docIdx === 0 ? 'mt-8' : ''}`}>
                              <div className="w-full">
                                <SearchableSelect options={docTypeOptions} value={doc.docType} onChange={(val) => updateVendorDocInRow(rowIdx, docIdx, 'docType', val)} placeholder="Select" />
                              </div>
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
                  <button disabled={loading} type='submit' className='text-white bg-[#007BFF] w-[119px] h-[36px] font-poppins font-medium text-[12px] rounded-[8px] p-2 flex items-center justify-center'>
                    {loading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                    ) : 'Save'}
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </form>
    </>
  )
}

export default UpdateCatagory;
