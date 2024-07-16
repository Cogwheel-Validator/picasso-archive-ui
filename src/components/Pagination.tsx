'use client';

import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers: number[] = [];
  for (let i = 1; i <= Math.min(totalPages, 5); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="join">
      {pageNumbers.map((number) => (
        <button
          key={number}
          className={`join-item btn btn-square ${currentPage === number ? 'btn-active' : ''}`}
          onClick={() => onPageChange(number)}
        >
          {number}
        </button>
      ))}
      {totalPages > 5 && (
        <>
          <button className="join-item btn btn-square btn-disabled">...</button>
          <button
            className={`join-item btn btn-square ${currentPage === totalPages ? 'btn-active' : ''}`}
            onClick={() => onPageChange(totalPages)}
          >
            {totalPages}
          </button>
        </>
      )}
    </div>
  );
};

export default Pagination;
