import { useData } from '../../Context/DataContext';

export default function Pagination() {
  const { pagination, setPagination } = useData();
  const { currentPage, itemsPerPage } = pagination;

  const handlePageChange = (page: number) => {
    setPagination({ ...pagination, currentPage: page });
  };

  const handleItemsPerPageChange = (items: number) => {
    setPagination({ currentPage: 1, itemsPerPage: items });
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <span>Rows per page:</span>
        <select
          value={itemsPerPage}
          onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
          className="border rounded px-2 py-1"
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
        </select>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-3 py-1 border rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
} 