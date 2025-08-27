function Pagination({ numberOfPages, currentPage, setCurrentPage }) {
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


  return (
    <div className='pagination'>
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
      <input type="number" value={currentPage} onChange={(e)=> setCurrentPage(Number(e.target.value))} />
    </div>
  );
}

export default Pagination
