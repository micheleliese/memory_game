import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { CssBaseline } from '@mui/material'
import { DrawerProvider } from './providers/drawer-provider.tsx'
import { SocketProvider } from './providers/socket-provider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CssBaseline />
    <SocketProvider>
      <DrawerProvider>
        <App />
      </DrawerProvider>
    </SocketProvider>
  </React.StrictMode>,
)
