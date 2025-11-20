import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

function Pagination({ numberOfPages, currentPage, setCurrentPage }) {
  const [inputValue, setInputValue] = useState(currentPage);

  // Sync input value when currentPage changes externally (e.g., clicking page buttons)
  useEffect(() => {
    setInputValue(currentPage);
  }, [currentPage]);

  const createPageArray = () => {
    const pages = [];
    const delta = 2; // how many pages around current to show

    for (let i = 1; i <= numberOfPages; i++) {
      if (
        i === 1 ||
        i === numberOfPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        pages.push(i);
      } else if (
        pages[pages.length - 1] !== '...'
      ) {
        pages.push('...');
      }
    }

    return pages;
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= numberOfPages) {
      setCurrentPage(page);
    }
  };

  const handleInputChange = (e) => {
    // Just update the input display, don't change the actual page yet
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    const value = Number(inputValue);
    // On blur, validate and navigate to the page
    if (isNaN(value) || value < 1) {
      setCurrentPage(1);
      setInputValue(1);
    } else if (value > numberOfPages) {
      setCurrentPage(numberOfPages);
      setInputValue(numberOfPages);
    } else {
      setCurrentPage(value);
      setInputValue(value);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleInputBlur();
    }
  };

  return (
    <div className='pagination'>
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="nav-button"
        title="Previous page"
      >
        <ChevronLeft size={20} />
        <span>Previous</span>
      </button>

      {createPageArray().map((page, index) =>
        page === '...' ? (
          <span key={index} className="ellipsis">...</span>
        ) : (
          <button
            key={index}
            className={page === currentPage ? 'active' : ''}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === numberOfPages}
        className="nav-button"
        title="Next page"
      >
        <span>Next</span>
        <ChevronRight size={20} />
      </button>

      <div className="page-input-container">
        <span>Go to:</span>
        <input
          type="number"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyPress={handleKeyPress}
          min="1"
          max={numberOfPages}
        />
        <span className="page-total">of {numberOfPages}</span>
      </div>
    </div>
  );
}

export default Pagination
