import { useData } from '../../../Context/DataContext';
import { useState } from 'react';

export default function TableHeader() {
  const { columns, sortConfig, setSortConfig } = useData();
  const [resizingColumn, setResizingColumn] = useState<string | null>(null);

  const handleSort = (key: string) => {
    setSortConfig(
      sortConfig?.key === key && sortConfig.direction === 'asc'
        ? { key, direction: 'desc' }
        : { key, direction: 'asc' }
    );
  };

  const handleResizeStart = (key: string, e: React.MouseEvent) => {
    e.preventDefault();
    setResizingColumn(key);

    const handleMouseMove = (e: MouseEvent) => {
      if (resizingColumn) {
        const th = (e.target as HTMLElement).closest('th');
        if (th) {
          const newWidth = e.clientX - th.getBoundingClientRect().left;
          th.style.width = `${newWidth}px`;
        }
      }
    };

    const handleMouseUp = () => {
      setResizingColumn(null);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <thead>
      <tr className="bg-gray-50">
        {columns.filter(col => col.visible).map(column => (
          <th
            key={column.key}
            className="relative px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200"
            style={{ width: column.width }}
          >
            <div
              className="flex items-center cursor-pointer"
              onClick={() => handleSort(column.key)}
            >
              {column.header}
              {sortConfig?.key === column.key && (
                <span className="ml-2">
                  {sortConfig.direction === 'asc' ? '↑' : '↓'}
                </span>
              )}
            </div>
            <div
              className="absolute right-0 top-0 h-full w-1 cursor-col-resize hover:bg-gray-300"
              onMouseDown={(e) => handleResizeStart(column.key, e)}
            />
          </th>
        ))}
      </tr>
    </thead>
  );
} 