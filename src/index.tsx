import React from 'react';
import './index.css';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { seedIfNeeded } from './mocks/seed';
//seedIfNeeded();
const root = document.getElementById('root');
if (root) {
  createRoot(root).render(<React.StrictMode>
      <App />
    </React.StrictMode>);
}