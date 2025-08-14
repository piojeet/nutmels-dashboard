import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { OrderProvider } from './context/OrderContext.jsx'
import { CRMProvider } from './context/CRMContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <OrderProvider>
        <CRMProvider>
        <App />
        </CRMProvider>
      </OrderProvider>
    </BrowserRouter>
  </StrictMode>,
)
