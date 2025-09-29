import './scss/app.scss'
import Home from './pages/Home.js'
import Cart from './pages/Cart.js'

import NotFound from './pages/NotFound.js'
import FullPizza from './pages/FullPizza.js'

import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout.js'

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="pizzas/:id" element={<FullPizza />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
