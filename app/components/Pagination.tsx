import React, { useState, useEffect } from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const [pageInput, setPageInput] = useState<string>(currentPage.toString());

  useEffect(() => {
    setPageInput(currentPage.toString());
  }, [currentPage]);

  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPageInput(e.target.value);
  };

  const handleGoToPage = () => {
    const page = parseInt(pageInput);
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      onPageChange(page);
    } else {
      alert(`Masukkan nomor halaman antara 1 dan ${totalPages}`);
      setPageInput(currentPage.toString()); // Reset input if invalid
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers: (number | string)[] = [];

    if (totalPages <= 10) {
      // Display all pages if total pages are 10 or less
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Complex pagination for more than 10 pages
      pageNumbers.push(1); // Always show first page

      if (currentPage > 4) {
        pageNumbers.push('...');
      }

      // Pages around the current page
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 2); i++) {
        pageNumbers.push(i);
      }

      if (currentPage < totalPages - 3) {
        pageNumbers.push('...');
      }

      pageNumbers.push(totalPages); // Always show last page
    }

    return pageNumbers.map((page, index) => (
      <React.Fragment key={index}>
        {typeof page === 'number' ? (
          <button
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 border rounded-md text-sm ${
              currentPage === page
                ? 'bg-green-600 text-white border-green-600'
                : 'bg-white hover:bg-gray-100 border-gray-300 text-black'
            }`}
            aria-current={currentPage === page ? 'page' : undefined}
          >
            {page}
          </button>
        ) : (
          <span className="px-3 py-1 text-black">...</span>
        )}
      </React.Fragment>
    ));
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-2">
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white hover:bg-gray-100 disabled:opacity-50 text-black"
        >
          Sebelumnya
        </button>
        {renderPageNumbers()}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white hover:bg-gray-100 disabled:opacity-50 text-black"
        >
          Selanjutnya
        </button>
      </div>

      {totalPages > 10 && (
        <div className="flex items-center gap-2 mt-2 md:mt-0">
          <label htmlFor="page-search" className="sr-only">Cari Halaman</label>
          <input
            id="page-search"
            type="number"
            min="1"
            max={totalPages}
            value={pageInput}
            onChange={handlePageInputChange}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleGoToPage();
              }
            }}
            className="w-20 px-3 py-1 border border-gray-300 rounded-md text-sm text-black"
            placeholder="Halaman"
            aria-label="Nomor halaman"
          />
          <button
            onClick={handleGoToPage}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white hover:bg-gray-100 text-black"
            aria-label="Pergi ke halaman"
          >
            Go
          </button>
        </div>
      )}
    </div>
  );
};

export default Pagination;