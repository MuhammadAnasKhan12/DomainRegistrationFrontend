import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AppRouter from './Router'
import { ToastContainer } from 'react-toastify'

function App() {

  return (
    <>
      <AppRouter/>
      <ToastContainer /> 

    </>
  )
}

export default App
