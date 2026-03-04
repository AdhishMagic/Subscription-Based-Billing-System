/* ==========================================================================
   MAIN ENTRY POINT
   Renders the React application into the DOM.
   Imports the global stylesheet and the root App component.
   ========================================================================== */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app/App';
import './styles/index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
