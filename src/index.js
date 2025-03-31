import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App .js'; // Using relative import (recommended)
import reportWebVitals from './reportWebVitals';
import { FormspreeProvider } from '@formspree/react';
import './styles.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <FormspreeProvider projectId="xqapdkoj">
      <App />
    </FormspreeProvider>
  </React.StrictMode>
);

reportWebVitals();