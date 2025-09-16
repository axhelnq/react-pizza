import Categories from '../components/Categories.jsx'
import Sort from '../components/Sort.jsx'
import PizzaBlock from '../components/PizzaBlock'
import { useEffect, useState } from 'react'
import Skeleton from '../components/PizzaBlock/Skeleton.jsx'
import Pagination from '../components/Pagination/index.jsx'

const Home = ({ searchValue }) => {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [categoryActiveIndex, setCategoryActiveIndex] = useState(0)
  const [sortActiveIndex, setSortActiveIndex] = useState({
    name: 'популярністю (ASC)',
    sortProperty: 'rating',
  })

  useEffect(() => {
    setIsLoading(true)
    console.log(searchValue, encodeURIComponent(searchValue))
    const category =
      categoryActiveIndex > 0 ? `&category=${categoryActiveIndex}` : ''
    const sortBy = sortActiveIndex.sortProperty.replace('-', '')
    const order = sortActiveIndex.sortProperty.includes('-') ? 'asc' : 'desc'
    const search = searchValue ? `&title_like=${searchValue}&` : ''

    console.log('currentPage: ', currentPage)
    fetch(
      `http://localhost:3001/items?_page=${currentPage}&_limit=4${category}&_sort=${sortBy}&_order=${order}${search}`,
    )
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
  }, [categoryActiveIndex, sortActiveIndex, searchValue, currentPage])

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
      <Pagination onChangePage={(num) => setCurrentPage(num)} />
    </div>
  )
}

export default Home
