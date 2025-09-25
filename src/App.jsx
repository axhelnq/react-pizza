import './scss/app.scss'
import Header from './components/Header.jsx'
import Home from './pages/Home.jsx'
import Cart from './pages/Cart.jsx'

import NotFound from './pages/NotFound.jsx'

import { Routes, Route } from 'react-router-dom'

function App() {
  // todo scss errors due to darken() lighten()
  // todo images in db.json
  // todo видаляти пошук в кошику, при загрузці при помилці з бека
  // todo винести jsx при помилці з бека як компонент
  // todo адаптив для корзини і при помилці з бека як компонент
  // todo зробити стейт коли нічого не знайдено і зарендерити, і зробити шоб пропали категорії і сортування
  // todo зробити так шоб при пошуку лишні категорії в яких піц нема - пропадали

  // TODO СПИСОК БАГІВ:
  // 1 todo якщо к-сть піц в корзині поставити на 0, вона пропаде, але коли добавити якусь піцу і зайти в корзину, то "видалена" піца буде з к-стю "0" і можна наклікати в мінусове значення
  // 2 todo якщо в піци тільки традиційне тісто, воно не виділяється як тонке

  // ?. todo добавити біблу React NumberFlow для анімації цифр
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
