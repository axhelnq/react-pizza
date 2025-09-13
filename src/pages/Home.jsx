import Categories from '../components/Categories.jsx'
import Sort from '../components/Sort.jsx'
import PizzaBlock from '../components/PizzaBlock'
import { useEffect, useState } from 'react'
import Skeleton from '../components/PizzaBlock/Skeleton.jsx'

const Home = () => {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const [categoryActiveIndex, setCategoryActiveIndex] = useState(0)
  const [sortActiveIndex, setSortActiveIndex] = useState({
    name: 'популярністю (ASC)',
    sortProperty: 'rating',
  })

  useEffect(() => {
    setIsLoading(true)

    const category =
      categoryActiveIndex > 0 ? `category=${categoryActiveIndex}` : ''
    const sortBy = sortActiveIndex.sortProperty

    fetch(`http://localhost:3001/items?${category}&_sort=${sortBy}`)
      .then((res) => {
        return res.json()
      })
      .then((arr) => {
        setItems(arr)
      })
      .finally(() => setIsLoading(false))
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }, [categoryActiveIndex, sortActiveIndex])

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryActiveIndex}
          onChange={(i) => setCategoryActiveIndex(i)}
        />
        <Sort value={sortActiveIndex} onChange={(i) => setSortActiveIndex(i)} />
      </div>
      <h2 className="content__title">Усі піци</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(8)].map((_, index) => <Skeleton key={index} />)
          : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>
    </div>
  )
}

export default Home
