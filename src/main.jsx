import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Register Service Worker for PWA Offline Capability
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(
      (registration) => {
        console.log('EcoConstruct PWA ServiceWorker registration successful with scope: ', registration.scope);
      },
      (err) => {
        console.warn('EcoConstruct PWA ServiceWorker registration failed: ', err);
      }
    );
  });
} else if ('serviceWorker' in navigator) {
  // In development, also attempt registration if available
  navigator.serviceWorker.register('/sw.js').catch(() => {});
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
