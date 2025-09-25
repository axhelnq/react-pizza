import './scss/app.scss'
import Home from './pages/Home.jsx'
import Cart from './pages/Cart.jsx'

import NotFound from './pages/NotFound.jsx'
import FullPizza from './pages/FullPizza.jsx'

import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout.jsx'

function App() {
  // TODO СПИСОК НЕ ВИКОНАНОЇ РОБОТИ:
  // todo scss errors due to darken() lighten()
  // todo images in db.json
  // todo видаляти пошук при загрузці при помилці з бека
  // todo винести jsx при помилці з бека як компонент
  // todo адаптив для корзини
  // todo при помилці з бека зробити jsx як компонент
  // todo зробити стейт коли нічого не знайдено і зарендерити, і зробити шоб пропали категорії і сортування
  // todo зробити так шоб при пошуку лишні категорії в яких піц нема - пропадали
  // todo підпилити сторінку NotFound
  // todo a11y
  // todo сторінку FullPizza
  // todo винести різні списки в './constants'

  // TODO СПИСОК БАГІВ:
  // 1 todo якщо к-сть піц в корзині поставити на 0, вона пропаде, але коли добавити якусь піцу і зайти в корзину, то "видалена" піца буде з к-стю "0" і можна наклікати в мінусове значення
  // 2 todo якщо в піци тільки традиційне тісто, воно не виділяється як тонке
  // 3 todo деколи любе тісто не попадає в корзину
  // 4 todo пагінація: лишні сторінки не пропадають

  // TODO СПИСОК ФІЧ НА МАЙБУТНЄ:
  // ?. todo добавити біблу React NumberFlow для анімації цифр
  // ?. todo добавити біблу React Tosts для push-up повідомлень
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
