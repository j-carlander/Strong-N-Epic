import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import WorkoutsCardComponent from './Components/workoutsCardComponent/WorkoutsCardComponent.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WorkoutsCardComponent />
    <App />
  </React.StrictMode>,
)
