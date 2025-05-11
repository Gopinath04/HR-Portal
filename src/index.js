import React from 'react';
import ReactDOM from 'react-dom/client'; 
import App from './App';
import './styles/custom.css'; // Custom CSS file for additional styles
import 'bootstrap/dist/css/bootstrap.min.css';


const root = ReactDOM.createRoot(document.getElementById('root')); // Create a root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);