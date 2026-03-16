import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import { PasswordGateProvider } from './context/PasswordGateContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <PasswordGateProvider>
        <App />
      </PasswordGateProvider>
    </HashRouter>
  </React.StrictMode>
);
