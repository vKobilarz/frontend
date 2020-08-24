import React, { FC } from 'react';

import { ToastContainer } from 'react-toastify';

import GlobalStyle from '../styles/global';

import { AuthProvider } from './AuthConfig';

import 'react-toastify/dist/ReactToastify.css';

const AppProvider: FC = ({ children }) => {
  return (
    <>
      <GlobalStyle />
      <ToastContainer />
      <AuthProvider>{children}</AuthProvider>
    </>
  );
};

export default AppProvider;
