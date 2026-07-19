import React from 'react'
import ReactDOM from 'react-dom/client'
import AppContent from './App'
import { AppProvider } from './context/AppContext'
import './index.css'
import { registerSW } from 'virtual:pwa-register'

const updateSW = registerSW({
  onNeedRefresh() {
    console.log('App update available');
  },
  onOfflineReady() {
    console.log('App is ready to work offline');
  },
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppProvider>
      <AppContent />
    </AppProvider>
  </React.StrictMode>,
)
