import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom' // <--- 1. Pastikan import ini ada

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>  {/* <--- 2. Pastikan <App /> dibungkus ini */}
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)