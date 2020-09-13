import React, { FC } from 'react';

import { ToastContainer } from 'react-toastify';

import GlobalStyle from '../styles/global';

import { AuthProvider } from './AuthConfig';

import 'react-toastify/dist/ReactToastify.css';
import { OcurrencesProvider } from './OcurrencesContext';

const AppProvider: FC = ({ children }) => {
  return (
    <>
      <GlobalStyle />
      <ToastContainer />
      <AuthProvider>
        <OcurrencesProvider>{children}</OcurrencesProvider>
      </AuthProvider>
    </>
  );
};

export default AppProvider;
