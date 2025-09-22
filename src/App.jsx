import './scss/app.scss'
import Header from './components/Header.jsx'
import Home from './pages/Home.jsx'
import Cart from './pages/Cart.jsx'

import NotFound from './pages/NotFound.jsx'

import { Routes, Route } from 'react-router-dom'
import { createContext, useState } from 'react'

export const SearchContext = createContext()

function App() {
  // todo scss errors due to darken() lighten()
  // todo images in db.json
  const [searchValue, setSearchValue] = useState('')

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </SearchContext.Provider>
    </div>
  )
}

export default App
