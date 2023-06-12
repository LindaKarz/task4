import React, { useState } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import Home from './pages/Home'
import { AuthPage } from "./pages/AuthPage"

export default function useRoutes(isAuth) {
  const [error] = useState()
  if(isAuth) {
    return (
        <Routes>
          <Route path="/home" exact element={<Home />}></Route>
          <Route path='*' element={<Navigate to='/home' />} />
        </Routes>
    )
  }
  return(
      <Routes>
        <Route path="/" exact element={<AuthPage />}></Route>
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
  )
}