import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/scss/bootstrap.scss'

import { AuthProvider } from './pages/AuthContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
);

