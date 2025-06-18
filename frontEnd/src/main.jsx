import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './context/AuthContext';
import React from 'react';

createRoot(document.getElementById('root')).render(
  
  <StrictMode>

  <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">

  <React.StrictMode>

  <AuthProvider>

  <App />

  </AuthProvider>

  </React.StrictMode>

</GoogleOAuthProvider>

  </StrictMode>
)
