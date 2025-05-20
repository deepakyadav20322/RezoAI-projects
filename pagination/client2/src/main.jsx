import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import DataContextProvider from './context/DataContext'
import ErrorPopup from './components/ErrorPopup.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>  
  <DataContextProvider>
    <App />
     <ErrorPopup />
  </DataContextProvider>
  </StrictMode>,
)
