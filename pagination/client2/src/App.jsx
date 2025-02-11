import React from 'react'
import { useState } from 'react'
import Table from './components/Tables'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Table/>
    </>
  )
}

export default App
