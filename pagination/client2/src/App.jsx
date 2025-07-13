import React from 'react'
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Table from './components/Tables'
import HomePage from './components/HomePage'



function App() {


  return (
    <>
      {/* <Table/> */}
      <Routes>
        <Route to element={ <HomePage/>} />
        <Route path="/" element={<HomePage />} />
        <Route path="/table" element={<Table />} />
      
        {/* <Route path="/flow" element={<JsonStructureVisualizer />} /> */}

       
      </Routes>
     
     
    </>
  )
}

export default App
