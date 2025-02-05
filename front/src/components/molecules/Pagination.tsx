import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    
  const getPageNumbers = () => {
    let pages = [];
    if (totalPages <= 5) {
      // Display all pages if total pages are 5 or less
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Dynamic page display logic for larger number of pages
      if (currentPage <= 3) {
        pages = [1, 2, 3, 4, '...', totalPages];
      } else if (currentPage >= totalPages - 2) {
        pages = [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
      } else {
        pages = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
      }
    }
    return pages;
  };

  return (
    <div className="flex items-center space-x-4 mx-auto mt-14 mb-5">
      <FontAwesomeIcon
        icon={faChevronLeft}
        className={`text-[#89938DFC] cursor-pointer ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={() => onPageChange(currentPage - 1)}
      />
      
      {getPageNumbers().map((page, index) => (
        <p
          key={index}
          className={`cursor-pointer ${page === currentPage ? 'text-green-green bg-[#D6EFD8] w-5 h-5 rounded-full font-semibold text-lg flex items-center justify-center' : ''}`}
          onClick={() => typeof page === 'number' && onPageChange(page)}
        >
          {page}
        </p>
      ))}

      <FontAwesomeIcon
        icon={faChevronRight}
        className={`text-[#89938DFC] cursor-pointer ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={() => onPageChange(currentPage + 1)}
      />
    </div>
  );
};

export default Pagination;
