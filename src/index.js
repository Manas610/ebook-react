import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { FilterProvider , CartProvider } from "./context";
import { ScrollToTop } from "./components";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <CartProvider>
        <FilterProvider>
          <ScrollToTop />
          <ToastContainer autoClose={3000} closeButton={false} />
          <App />
        </FilterProvider>
      </CartProvider>
    </Router>
  </React.StrictMode>
);