import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { PasswordManagerProvider } from './context/PasswordManagerContext'
import { ToastProvider } from './context/ToastContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastProvider>
      <PasswordManagerProvider>
        <App />
      </PasswordManagerProvider>
    </ToastProvider>
  </StrictMode>,
)
