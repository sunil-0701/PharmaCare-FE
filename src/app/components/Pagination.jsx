import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./pagination.css";

export function Pagination({
  currentPage,
  totalItems,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}) {
  const totalPages = Math.ceil(totalItems / rowsPerPage);
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;
  const endItem = Math.min(currentPage * rowsPerPage, totalItems);

  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else if (currentPage <= 3) {
      pages.push(1, 2, 3, 4, "...", totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages
      );
    }

    return pages;
  };

  if (totalItems === 0) return null;

  return (
    <div className="pagination-container">
      {/* Range indicator */}
      <div className="pagination-range">
        Showing{" "}
        <span className="pagination-range-highlight">
          {startItem}–{endItem}
        </span>{" "}
        of{" "}
        <span className="pagination-range-highlight">
          {totalItems}
        </span>
      </div>

      {/* Controls */}
      <div className="pagination-controls">
        {/* Rows per page */}
        <div className="pagination-rows-selector">
          <span className="pagination-rows-label">Rows per page:</span>
          <select
            className="pagination-select-trigger"
            value={rowsPerPage}
            onChange={(e) => {
              onRowsPerPageChange(Number(e.target.value));
              onPageChange(1);
            }}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </div>

        <div className="pagination-divider" />

        {/* Previous */}
        <button
          className="pagination-btn-small"
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="pagination-icon" />
        </button>

        {/* Page numbers */}
        <div className="pagination-numbers">
          {getPageNumbers().map((page, index) =>
            page === "..." ? (
              <span key={index} className="pagination-ellipsis">
                ...
              </span>
            ) : (
              <button
                key={page}
                className={`pagination-btn-small ${
                  currentPage === page ? "pagination-btn-active" : ""
                }`}
                onClick={() => onPageChange(page)}
              >
                {page}
              </button>
            )
          )}
        </div>

        {/* Next */}
        <button
          className="pagination-btn-small"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="pagination-icon" />
        </button>
      </div>
    </div>
  );
}
