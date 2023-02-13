import './index.css'

import { Route, Routes } from "react-router-dom"

import { Cart } from './components/Cart'
// import { Cart } from "./pages/Cart"
import { CartProvider } from './context/CartContext'
import { Container } from "react-bootstrap"
import {Navbar} from './components/Navbar'
import { Shop } from "./pages/Shop"
import { useState } from 'react'

function App() {


  return (
    <CartProvider>
      <Navbar/>
    <Container className="mb-4">
        <Routes>
          <Route path="/" element={<Shop/>} />
          <Route path="/cart" element={<Cart/>} />
        </Routes>
      </Container>
      
      </CartProvider>
  )
}

export default App
