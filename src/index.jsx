import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import MenuContext from './Context/MenuContext';
import { AuthProvider } from './Context/AuthContext';
import 'react-loading-skeleton/dist/skeleton.css'
import './index.css';
import { QueryClient , QueryClientProvider } from '@tanstack/react-query';
import { WebSocketProvider } from './Context/WebSocketContex';

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WebSocketProvider wsEndpoint={process.env.REACT_APP_WS_URL}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <AuthProvider>
            <MenuContext>
                <App />
            </MenuContext>
          </AuthProvider>
        </Router>
      </QueryClientProvider>
    </WebSocketProvider>
  </React.StrictMode>
);

