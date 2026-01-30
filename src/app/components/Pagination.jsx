import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 mt-6 border-t border-slate-100">
      <div className="text-sm font-medium text-slate-500">
        Showing{" "}
        <span className="text-slate-900 font-bold">
          {startItem}–{endItem}
        </span>{" "}
        of{" "}
        <span className="text-slate-900 font-bold">
          {totalItems}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-3 pr-3 border-r border-slate-200">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Rows:</span>
          <select
            className="px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all cursor-pointer"
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

        <div className="flex items-center gap-1">
          <button
            className="flex items-center justify-center w-9 h-9 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-all disabled:opacity-20 disabled:pointer-events-none"
            onClick={handlePrevious}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex items-center gap-1">
            {getPageNumbers().map((page, index) =>
              page === "..." ? (
                <span key={index} className="px-2 text-slate-300 font-bold">
                  ...
                </span>
              ) : (
                <button
                  key={page}
                  className={`flex items-center justify-center w-9 h-9 rounded-xl text-sm font-bold transition-all ${currentPage === page
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200 scale-105"
                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  onClick={() => onPageChange(page)}
                >
                  {page}
                </button>
              )
            )}
          </div>

          <button
            className="flex items-center justify-center w-9 h-9 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-all disabled:opacity-20 disabled:pointer-events-none"
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
