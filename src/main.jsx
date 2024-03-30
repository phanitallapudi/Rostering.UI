import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import ThemeProvider from './utils/ThemeContext';
import App from './App';
import { ResultContextProvider } from './service/DashboardContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ResultContextProvider>
    <Router>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Router>
    </ResultContextProvider>
  </React.StrictMode>
);
