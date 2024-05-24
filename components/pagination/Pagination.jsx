import Link from "next/link";
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Pagination = ({ totalPages, currentPage, pageName }) => {
  const maxPagesToShow = 8; // Maximum number of pagination links to show at once

  const generatePageRange = () => {
    let startPage = Math.max(2, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages - 1, startPage + maxPagesToShow - 2);

    // Adjust if near the start
    if (currentPage < maxPagesToShow) {
      endPage = Math.min(totalPages - 1, maxPagesToShow);
      startPage = Math.max(2, endPage - maxPagesToShow + 2);
    }

    // Adjust if near the end
    if (totalPages - currentPage < maxPagesToShow) {
      startPage = Math.max(2, totalPages - maxPagesToShow + 1);
    }

    const pages = [];
    for (let page = startPage; page <= endPage; page++) {
      pages.push(page);
    }
    return pages;
  };

  const generatePaginationLink = (page, label, icon) => (
    <li className={`page-item ${page === currentPage ? 'active' : ''}`} key={page}>
      <Link href={`/${pageName}?p=${page}`} aria-label={label || `Page ${page}`}>
        <div className="page-link">{icon || page}</div>
      </Link>
    </li>
  );

  return (
    <nav aria-label="Page navigation" className="d-flex justify-content-center mt-40">
      <ul className="pagination justify-content-center align-items-center mb-40">
        {currentPage > 1 && generatePaginationLink(1, 'First', <FaAngleDoubleLeft />)}
        {currentPage > 1 && generatePaginationLink(currentPage - 1, 'Previous', <FaChevronLeft />)}
        {generatePageRange().map(page => generatePaginationLink(page, null, null))}
        {currentPage < totalPages && generatePaginationLink(currentPage + 1, 'Next', <FaChevronRight />)}
        {currentPage < totalPages && generatePaginationLink(totalPages, 'Last', <FaAngleDoubleRight />)}
      </ul>
    </nav>
  );
};

export default Pagination;
