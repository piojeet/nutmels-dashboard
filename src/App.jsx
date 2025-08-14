import React from 'react';
import { useLocation } from 'react-router-dom';
import SideBar from './components/sideBard/SideBar';
import NavBar from './components/navBar/NavBar';
import AppRoutes from './routes/AppRoutes';

function App() {
  const location = useLocation();
  const hideLayoutOn = ["/login", "/signup", "/forget-password", "/confirm-email", "/congratulation"];
  const shouldHideLayout = hideLayoutOn.includes(location.pathname);

  return (
    <div className='min-h-screen' style={{ background: "var(--bg-radial)" }}>
      {
        shouldHideLayout ? (
          // Without layout (signup/login/forget-password/confirm-email/congratulation page)
          <AppRoutes />
        ) : (
          // With layout
          <div className='max-w-[1440px] w-full mx-auto'>
            <NavBar />
            <div className='flex gap-12 py-10'>
              <div>
                <SideBar />
              </div>
              <div className='w-full'>
                <AppRoutes />
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
}

export default App;
