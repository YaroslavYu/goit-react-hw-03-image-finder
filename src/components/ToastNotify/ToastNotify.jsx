import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

export const ToastNotify = () => {
  return (
    <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />
  );
};
