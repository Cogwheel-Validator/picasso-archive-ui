'use client';
import React, { useState, useEffect } from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const [jumpToPage, setJumpToPage] = useState<string>('');
  const [maxInputLength, setMaxInputLength] = useState<number>(1);
  const maxVisiblePages = 5;

  useEffect(() => {
    setMaxInputLength(totalPages.toString().length);
  }, [totalPages]);

  const getPageNumbers = () => {
    const pageNumbers = [];
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= maxVisiblePages; i++) {
          pageNumbers.push(i);
        }
      } else if (currentPage >= totalPages - 2) {
        for (let i = totalPages - maxVisiblePages + 1; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pageNumbers.push(i);
        }
      }
    }
    return pageNumbers;
  };

  const handleJumpToPage = () => {
    const pageNumber = parseInt(jumpToPage, 10);
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      onPageChange(pageNumber);
      setJumpToPage('');
    } else {
      alert(`Please enter a valid page number between 1 and ${totalPages}`);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numeric input and limit the length
    if ((value === '' || /^[0-9\b]+$/.test(value)) && value.length <= maxInputLength) {
      setJumpToPage(value);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleJumpToPage();
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
      <div className="join">
        {currentPage > 1 && (
          <button className="join-item btn" onClick={() => onPageChange(currentPage - 1)}>«</button>
        )}
        {getPageNumbers().map(number => (
          <button
            key={number}
            className={`join-item btn ${currentPage === number ? 'btn-active' : ''}`}
            onClick={() => onPageChange(number)}
          >
            {number}
          </button>
        ))}
        {currentPage < totalPages && (
          <button className="join-item btn" onClick={() => onPageChange(currentPage + 1)}>»</button>
        )}
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder={`1-${totalPages}`}
          className="input input-bordered w-24"
          value={jumpToPage}
          onChange={handleInputChange}
          onKeyUp={handleKeyPress}
          maxLength={maxInputLength}
        />
        <button className="btn btn-primary" onClick={handleJumpToPage}>Jump</button>
      </div>
    </div>
  );
};

export default Pagination;