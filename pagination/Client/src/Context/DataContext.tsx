import { createContext, useContext, ReactNode, useState, useEffect } from 'react';

export interface Column {
  key: string;
  header: string;
  visible: boolean;
  width?: number;
}

export interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

export interface PaginationConfig {
  currentPage: number;
  itemsPerPage: number;
}

interface DataContextType {
  data: any[];
  columns: Column[];
  isLoading: boolean;
  error: string | null;
  filters: Record<string, any>;
  sortConfig: SortConfig | null;
  pagination: PaginationConfig;
  visibleColumns: string[];
  setData: (data: any[]) => void;
  addFilter: (key: string, value: any) => void;
  clearFilters: () => void;
  setSortConfig: (config: SortConfig | null) => void;
  setPagination: (config: PaginationConfig) => void;
  toggleColumnVisibility: (key: string) => void;
  setColumnWidth: (key: string, width: number) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<any[]>([]);
  const [columns, setColumns] = useState<Column[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [pagination, setPagination] = useState<PaginationConfig>({
    currentPage: 1,
    itemsPerPage: 10,
  });
  const [visibleColumns, setVisibleColumns] = useState<string[]>([]);

  const addFilter = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({});
  };

  const toggleColumnVisibility = (key: string) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.key === key ? { ...col, visible: !col.visible } : col
      )
    );
  };

  const setColumnWidth = (key: string, width: number) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.key === key ? { ...col, width } : col
      )
    );
  };

  // Updated fetchData function
  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Using dummyjson API for testing
      const response = await fetch('https://dummyjson.com/products');
      
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const jsonData = await response.json();
      // The API returns data in { products: [...] } format
      const products = jsonData.products; // Keep the full array of products
      setData(products); // Set the full array of products

      // Generate columns from the first product
      if (products.length > 0) {
        const generatedColumns: Column[] = Object.keys(products[0]).map(key => ({
          key,
          header: key.charAt(0).toUpperCase() + key.slice(1),
          visible: true,
          width: 150
        }));
        setColumns(generatedColumns);
        setVisibleColumns(generatedColumns.map(col => col.key));
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DataContext.Provider
      value={{
        data,
        columns,
        isLoading,
        error,
        filters,
        sortConfig,
        pagination,
        visibleColumns,
        setData,
        addFilter,
        clearFilters,
        setSortConfig,
        setPagination,
        toggleColumnVisibility,
        setColumnWidth,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
} 