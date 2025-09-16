import './scss/app.scss'
import Header from './components/Header.jsx'
import Home from './pages/Home.jsx'
import Cart from './pages/Cart.jsx'

import NotFound from './pages/NotFound.jsx'

import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'

function App() {
  // todo scss errors due to darken() lighten()
  // todo translate and add images in db.json

  // todo search
  // todo installed react-pagination
  // todo змінив версію жсон-сервер
  // todo pagination
  const [searchValue, setSearchValue] = useState('')

  return (
    <div className="wrapper">
      <Header searchValue={searchValue} setSearchValue={setSearchValue} />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home searchValue={searchValue} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
