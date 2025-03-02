import { useData } from '../../Context/DataContext';
import TableHeader from './TableHeader';
import TableRow from './TableRow';

const Table = () => {
  const { data, columns, isLoading, error } = useData();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        Error: {error}
      </div>
    );
  }

  // Add console.log to debug
  console.log('Data:', data);
  console.log('Columns:', columns);

  if (!data || data.length === 0) {
    return (
      <div className="text-gray-500 text-center p-4">
        No data available
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-200">
        <TableHeader />
        <tbody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex} row={row} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table; 