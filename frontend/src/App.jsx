import { useState } from 'react'
import {Header} from './components/Header.jsx'
import { Container } from 'react-bootstrap'
import Footer from './components/Footer.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <>
      <Header />
      <Container>
        <Outlet/>
      </Container>
      <Footer/>
      <ToastContainer />
    </>
  )
}

export default App
