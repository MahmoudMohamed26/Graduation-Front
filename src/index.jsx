import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import MenuContext from './Context/MenuContext';
import { AuthProvider } from './Context/AuthContext';
import 'react-loading-skeleton/dist/skeleton.css'
import './index.css';
import { QueryClient , QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <MenuContext>
              <App />
          </MenuContext>
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  </React.StrictMode>
);

