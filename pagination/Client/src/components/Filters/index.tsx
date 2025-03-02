import { useData } from '../../Context/DataContext';

export default function Filters() {
  const { columns, addFilter, clearFilters } = useData();

  const handleFilterChange = (key: string, value: string) => {
    addFilter(key, value);
  };

  return (
    <div className="flex flex-wrap gap-4">
      {columns.filter(col => col.visible).map(column => (
        <div key={column.key} className="flex items-center space-x-2">
          <label className="text-sm">{column.header}:</label>
          <input
            type="text"
            className="border rounded px-2 py-1 text-sm"
            placeholder={`Filter ${column.header}`}
            onChange={(e) => handleFilterChange(column.key, e.target.value)}
          />
        </div>
      ))}
      <button
        onClick={clearFilters}
        className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200"
      >
        Clear Filters
      </button>
    </div>
  );
} 