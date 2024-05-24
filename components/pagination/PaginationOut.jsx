


// import Link from "next/link";
// import {
//   FaAngleDoubleLeft,
//   FaAngleDoubleRight,
//   FaChevronLeft,
//   FaChevronRight,
// } from "react-icons/fa";

// const Pagination = ({rowData}) => {
//   console.log(rowData,"rowDatarowData Pagination")
//   return (
//     <nav
//       aria-label="Page navigation"
//       className="d-flex justify-content-center mt-40"
//     >
//       <ul className="pagination justify-content-center align-items-center mb-40">
//         <li className="page-item">
//           <Link className="page-link previous" href="#" aria-label="Previous">
//             <FaAngleDoubleLeft />
//           </Link>
//         </li>
//         <li className="page-item">
//           <Link className="page-link previous" y href="#" aria-label="Previous">
//             <FaChevronLeft />
//           </Link>
//         </li>
//         <li className="page-item">
//           <Link className="page-link" href="#">
//             1
//           </Link>
//         </li>
//         <li className="page-item">
//           <Link className="page-link active" href="#">
//             2
//           </Link>
//         </li>
//         <li className="page-item">
//           <Link className="page-link" href="#">
//             3
//           </Link>
//         </li>
//         <li className="page-item">
//           <Link className="page-link" href="#">
//             ...
//           </Link>
//         </li>
//         <li className="page-item">
//           <Link className="page-link next" href="#" aria-label="Next">
//             <FaChevronRight />
//           </Link>
//         </li>
//         <li className="page-item">
//           <Link className="page-link next" href="#" aria-label="Next">
//             <FaAngleDoubleRight />
//           </Link>
//         </li>
//       </ul>
//     </nav>
//   );
// };

// export default Pagination;


// import { Button } from "@mui/material";
// import Link from "next/link";
// import {
//   FaAngleDoubleLeft,
//   FaAngleDoubleRight,
//   FaChevronLeft,
//   FaChevronRight,
// } from "react-icons/fa";

// const Pagination = ({ rowData, currentPage, onPageChange }) => {
//   const itemsPerPage = 10;
//   const totalPages = Math.ceil(rowData / itemsPerPage);

//   // Function to handle page change
//   const handlePageChange = (page) => {
//     if (onPageChange) {
//       onPageChange(page);
//     }
//   };

//   // Generate an array of page numbers
//   const pageNumbers = [...Array(totalPages).keys()].map((page) => page + 1);

//   return (
//     <nav
//       aria-label="Page navigation"
//       className="d-flex justify-content-center mt-40"
//     >
//       <ul className="pagination justify-content-center align-items-center mb-40">
//         <li className="page-item">
//           <Button
//             className="page-link previous"
         
//             aria-label="Previous"
//             onClick={() => handlePageChange(currentPage - 1)}
//           >
//             <FaAngleDoubleLeft />
//           </Button>
//         </li>
//         <li className="page-item">
//           <Button
//             className="page-link previous"
          
//             aria-label="Previous"
//             onClick={() => handlePageChange(currentPage - 1)}
//           >
//             <FaChevronLeft />
//           </Button>
//         </li>
//         {pageNumbers.map((page) => (
//           <li className="page-item" key={page}>
//             <Button
//               className={`page-link ${page === currentPage ? "active" : ""}`}
            
//               onClick={() => handlePageChange(page)}
//             >
//               {page}
//             </Button>
//           </li>
//         ))}
//         <li className="page-item">
//           <Button
//             className="page-link next"
        
//             aria-label="Next"
//             onClick={() => handlePageChange(currentPage + 1)}
//           >
//             <FaChevronRight />
//           </Button>
//         </li>
//         <li className="page-item">
//           <Button
//             className="page-link next"
        
//             aria-label="Next"
//             onClick={() => handlePageChange(currentPage + 1)}
//           >
//             <FaAngleDoubleRight />
//           </Button>
//         </li>
//       </ul>
//     </nav>
//   );
// };

// export default Pagination;


import { Button } from "@mui/material";
import Link from "next/link";
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const PaginationOut = ({ rowData, currentPage, onPageChange }) => {
  const itemsPerPage = 10;
  const totalPages = Math.ceil(rowData / itemsPerPage);
  const maxDisplayedPages = 5;

  // Function to handle page change
  const handlePageChange = (page) => {
    if (onPageChange) {
      onPageChange(page);
    }
  };

  // Generate an array of page numbers to be displayed
  const pageNumbers = [...Array(totalPages).keys()]
    .map((page) => page + 1)
    .filter((page) => {
      // Show only a limited number of pages, starting from the current page
      const minPage = Math.max(1, currentPage - Math.floor(maxDisplayedPages / 2));
      const maxPage = minPage + maxDisplayedPages - 1;

      return page >= minPage && page <= maxPage;
    });

  return (
    <nav
      aria-label="Page navigation"
      className="d-flex justify-content-center mt-40"
    >
      <ul className="pagination justify-content-center align-items-center mb-40">
        <li className="page-item">
          <Button
            className="page-link previous"
            aria-label="Previous"
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <FaAngleDoubleLeft />
          </Button>
        </li>
        <li className="page-item">
          <Button
            className="page-link previous"
            aria-label="Previous"
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <FaChevronLeft />
          </Button>
        </li>
        {pageNumbers.map((page) => (
          <li className="page-item" key={page}>
            <Button
              className={`page-link ${page === currentPage ? "active" : ""}`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </Button>
          </li>
        ))}
        <li className="page-item">
          <Button
            className="page-link next"
            aria-label="Next"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <FaChevronRight />
          </Button>
        </li>
        <li className="page-item">
          <Button
            className="page-link next"
            aria-label="Next"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <FaAngleDoubleRight />
          </Button>
        </li>
      </ul>
    </nav>
  );
};

export default PaginationOut;
