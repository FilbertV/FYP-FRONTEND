import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './AppRouter'; // ✅ Make sure this matches your file name
import './index.css'; // Tailwind styles

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AppRouter />);
