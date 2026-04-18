import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { PrimeReactProvider } from 'primereact/api';
import { BrowserRouter } from 'react-router-dom';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import './index.css';
import App from './App.jsx';
import { OrderProvider } from './context/OrderContext.jsx';
import { CRMProvider } from './context/CRMContext.jsx';
import { ProductProvider } from './context/Product.jsx';
import { BlogProvider } from './context/BlogContext.jsx';
import { UiSeoProvider } from './context/UiContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PrimeReactProvider>
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
    </PrimeReactProvider>
  </StrictMode>,
);
