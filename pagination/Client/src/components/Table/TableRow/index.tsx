import { useData } from '../../../Context/DataContext';

interface TableRowProps {
  row: Record<string, any>;
}

export default function TableRow({ row }: TableRowProps) {
  const { columns } = useData();

  return (
    <tr className="hover:bg-gray-50">
      {columns
        .filter(col => col.visible)
        .map(column => (
          <td
            key={column.key}
            className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-b border-gray-200"
          >
            {column.key === 'title' || column.key === 'id' || column.key === 'category'
              ? row[column.key]
              : typeof row[column.key] === 'object' && row[column.key] !== null 
                ? JSON.stringify(row[column.key])
                : row[column.key]
            }
          </td>
        ))}
    </tr>
  );
} 