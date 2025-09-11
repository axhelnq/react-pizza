import './scss/app.scss'
import Header from './components/Header.jsx'
import Categories from './components/Categories.jsx'
import Sort from './components/Sort.jsx'
import PizzaBlock from './components/PizzaBlock.jsx'
import { useEffect, useState } from 'react'

function App() {
  // todo scss errors due to darken() lighten()
  // todo translate and add images in db.json
  const [items, setItems] = useState([])
  useEffect(() => {
    fetch('http://localhost:3001/items')
      .then((res) => {
        return res.json()
      })
      .then((arr) => {
        setItems(arr)
      })
  }, [])

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Усі піци</h2>
          <div className="content__items">
            {items.map((obj, index) => (
              <PizzaBlock key={index} {...obj} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
