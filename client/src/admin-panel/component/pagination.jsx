import React from 'react'
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

function PaginationCard({ totalPages, currentPage, onPageChange, totalItems = 1, itemsPerPage = 10 }) {

  const startItem = totalItems === 0 ? 1 : ((currentPage - 1) * itemsPerPage) + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className='flex gap-6 justify-between items-center'>

      <div>
        <div className='text-[#8C8C8C] font-medium text-[12px] leading-[18px] tracking-normal'>
          Showing {startItem} to {endItem} of {totalItems} Data
        </div>
      </div>

      {totalPages > 1 && (
        <div className='flex gap-4 items-center'>

          <div className='text-[#8C8C8C] font-medium text-[12px] leading-[18px] tracking-normal'>
            Page {currentPage} of {totalPages}
          </div>

          <button
            className='w-[34px] h-[34px] bg-[#f9f9f9] rounded-xl flex items-center justify-center cursor-pointer disabled:opacity-40'
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}>
            <FiChevronLeft />
          </button>
          <button
            className='w-[34px] h-[34px] bg-[#f9f9f9] rounded-xl flex items-center justify-center cursor-pointer disabled:opacity-40'
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}>
            <FiChevronRight />
          </button>
        </div>
      )}
    </div>
  )
}

export default PaginationCard