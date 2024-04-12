import React, { useState, FC } from 'react';
import arrowRightImg from '../../utils/images/arrow-right.svg'
import './Pagination.scss'

interface PaginationProps {
  totalItems: number;
  itemsPerPage: string;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: FC<PaginationProps> = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {

  const totalPages = Math.ceil(totalItems / parseInt(itemsPerPage));

  const handlePageChange = (pageNumber: number) => {
    onPageChange(pageNumber);
  };


  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <section className='pagination'>
      <ul className="pagination__list">
        {pageNumbers.map((pageNumber) => (
          <li key={pageNumber} className={`pagination__page ${currentPage === pageNumber ? 'pagination__page_type_active' : ''}`}>
            <button className='pagination__page-btn' onClick={() => handlePageChange(pageNumber)}>{pageNumber}</button>
          </li>
        ))}
        <button className='pagination__next-btn' onClick={() => currentPage < 6 ? handlePageChange(currentPage + 1) : handlePageChange(1)}>
          <img src={arrowRightImg} alt="" />
        </button>
          
      </ul>
    </section>
  );
};

export default Pagination