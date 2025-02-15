import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './app/store'
import AuthProvider  from './hooks/AuthProvider'
import { ToastContainer } from 'react-toastify'
// import NotificationPermission from './components/NotificationPermission.jsx'






if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js")
    .then((registration) => {
      console.log("Service Worker registered: ", registration);
    })
    .catch((error) => {
      console.log("Service Worker registration failed: ", error);
    });
}


createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <>
    <Provider store={store}>
      <AuthProvider>
    <BrowserRouter>
    {/* <NotificationPermission/> */}
    <App />
    </BrowserRouter>
    </AuthProvider> 
    </Provider>
    <ToastContainer /> 
    </>
  // </StrictMode>,
)


if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js")
    .then((registration) => {
      console.log("Service Worker Registered:", registration);
    })
    .catch((error) => {
      console.log("Service Worker Registration Failed:", error);
    });
}