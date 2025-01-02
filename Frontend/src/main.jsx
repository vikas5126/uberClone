import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import {UserContext} from './context/userContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserContext>
      <BrowserRouter >
        <App />
      </BrowserRouter>
    </UserContext>
  </StrictMode>,
)
