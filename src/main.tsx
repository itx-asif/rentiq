import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.tsx'
import { ToastContainer } from 'react-toastify'
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')!).render(

  <StrictMode>

    <BrowserRouter>
      <AuthProvider>
        <GoogleOAuthProvider clientId={`${import.meta.env.VITE_GOOGLE_CLIENT_ID}`}>
          <App />
        </GoogleOAuthProvider>
      </AuthProvider>
      <ToastContainer position="top-right" autoClose={3000} />
    </BrowserRouter>

  </StrictMode>
)
