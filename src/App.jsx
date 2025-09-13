import './scss/app.scss'
import Header from './components/Header.jsx'
import Home from './pages/Home.jsx'
import Cart from './pages/Cart.jsx'

import NotFound from './pages/NotFound.jsx'

import { Routes, Route } from 'react-router-dom'

function App() {
  // todo scss errors due to darken() lighten()
  // todo translate and add images in db.json
  // todo installed react-content-loader
  // todo installed react-router-dom

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
