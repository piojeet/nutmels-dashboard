import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { OrderProvider } from './context/OrderContext.jsx'
import { CRMProvider } from './context/CRMContext.jsx'
import { ProductProvider } from './context/Product.jsx'
import { BlogProvider } from './context/BlogContext.jsx'
import { UiSeoProvider } from './context/UiContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <OrderProvider>
        <CRMProvider>
          <ProductProvider>
            <BlogProvider>
              <UiSeoProvider>
              <App />
              </UiSeoProvider>
            </BlogProvider>
          </ProductProvider>
        </CRMProvider>
      </OrderProvider>
    </BrowserRouter>
  </StrictMode>,
)
