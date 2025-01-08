import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import UserContext from './context/UserContext'
import CaptainContext from './context/CaptainContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <CaptainContext> */}
      <UserContext>
        <BrowserRouter >
          <App />
        </BrowserRouter>
      </UserContext>
    {/* </CaptainContext> */}
  </StrictMode>,
)
