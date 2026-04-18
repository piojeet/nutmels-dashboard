import React, { useEffect, useRef } from 'react';
import { Toast } from 'primereact/toast';
import { registerAppToast } from '../../utils/appToast';

function AppToaster() {
  const toastRef = useRef(null);

  useEffect(() => {
    registerAppToast(toastRef.current);

    return () => {
      registerAppToast(null);
    };
  }, []);

  return <Toast ref={toastRef} position='top-right' baseZIndex={1600} className='app-toast' />;
}

export default AppToaster;
