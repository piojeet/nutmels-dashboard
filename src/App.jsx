import React from 'react';
import { useLocation } from 'react-router-dom';
import SideBar from './components/sideBard/SideBar';
import NavBar from './components/navBar/NavBar';
import AppToaster from './components/toast/AppToaster';
import AppRoutes from './routes/AppRoutes';

function App() {
  const location = useLocation();
  const hideLayoutOn = ['/login', '/signup', '/forget-password', '/confirm-email', '/congratulation'];
  const shouldHideLayout = hideLayoutOn.includes(location.pathname);

  return (
    <div className='min-h-screen' style={{ background: 'var(--bg-radial)' }}>
      <AppToaster />
      {shouldHideLayout ? (
        <AppRoutes />
      ) : (
        <div className='mx-auto min-h-screen w-full px-3 sm:px-4 lg:px-8'>
          <div className='sticky top-0 z-40 -mx-3 border-b border-white-color/10 bg-black-color/10 px-3 backdrop-blur-xl sm:-mx-4 sm:px-4 lg:-mx-8 lg:px-8'>
            <NavBar />
          </div>

          <div className='py-6 sm:py-8 lg:py-10'>
            <div className='hidden xl:block'>
              <div className='fixed left-8 top-[7.5rem] h-[calc(100dvh-8rem)] overflow-auto pr-2'>
                <SideBar />
              </div>
            </div>

            <div className='xl:hidden'>
              <div className='fixed inset-x-3 bottom-3 z-40'>
                <SideBar mobile />
              </div>
            </div>

            <main className='pb-28 xl:ml-24 2xl:ml-28 xl:pb-0'>
              <AppRoutes />
            </main>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
