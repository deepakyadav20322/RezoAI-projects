import React from 'react'
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Table from './components/Tables'
import HomePage from './components/HomePage'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <Table/> */}
      <Routes>
        <Route to element={ <HomePage/>} />
        <Route path="/" element={<HomePage />} />
        <Route path="/table" element={<Table />} />

       
      </Routes>
     
     
    </>
  )
}

export default App
