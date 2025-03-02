import { DataProvider } from './Context/DataContext'
import Table from './components/Table/Table';


function App() {
  return (
    <DataProvider>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Data Table</h1>
        <Table />
      </div>
    </DataProvider>
  );
}

export default App;
