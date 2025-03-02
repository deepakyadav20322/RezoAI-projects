import { useData } from '../Context/DataContext';

export default function ColumnManager() {
  const { columns, toggleColumnVisibility } = useData();

  return (
    <div className="relative">
      <div className="border rounded p-4 space-y-2">
        <h3 className="font-medium mb-2">Column Visibility</h3>
        {columns.map(column => (
          <div key={column.key} className="flex items-center space-x-2">
            <input
              type="checkbox"
              id={column.key}
              checked={column.visible}
              onChange={() => toggleColumnVisibility(column.key)}
            />
            <label htmlFor={column.key}>{column.header}</label>
          </div>
        ))}
      </div>
    </div>
  );
} 