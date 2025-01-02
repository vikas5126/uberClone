// import React from 'react'
import { Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import Start from './pages/Start'
import UserProtectWrapper from "./pages/UserProtectWrapper"
import UserLogout from "./pages/UserLogout"

const App = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path="/login" element={<UserLogin />} />
            <Route path="/signup" element={<UserSignup />} />
            <Route path="/captain-login" element={<CaptainLogin />} />
            <Route path="/captain-signup" element={<CaptainSignup />} />
            <Route path="/home" element={
              <UserProtectWrapper>
                <Start/>
              </UserProtectWrapper>
            } />
            <Route path="/user/logout" element={
              <UserProtectWrapper>
                <UserLogout/>
              </UserProtectWrapper>
            }/>
        </Routes>
    </div>
  )
}

export default App