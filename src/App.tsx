import React, { FC } from 'react';

import AppProvider from './hooks';

import Routes from './routes';
import { BrowserRouter as Router } from 'react-router-dom';

const App: FC = () => {
  return (
    <AppProvider>
      <Router>
        <Routes />
      </Router>
    </AppProvider>
  );
};

export default App;
