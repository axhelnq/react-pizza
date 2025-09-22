import Categories from '../components/Categories.jsx'
import Sort from '../components/Sort.jsx'
import PizzaBlock from '../components/PizzaBlock'
import { useContext, useEffect, useState } from 'react'
import Skeleton from '../components/PizzaBlock/Skeleton.jsx'
import Pagination from '../components/Pagination/index.jsx'
import { SearchContext } from '../App.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { setCategoryId } from '../redux/slices/filterSlice.js'

const Home = () => {
  const dispatch = useDispatch()
  const { categoryId, sortType } = useSelector((state) => state.filter)

  const { searchValue } = useContext(SearchContext)
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    setIsLoading(true)
    const category = categoryId > 0 ? `&category=${categoryId}` : ''
    const sortBy = sortType.sortProperty.replace('-', '')
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc'
    const search = searchValue ? `&title_like=${searchValue}&` : ''

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
  }, [categoryId, sortType.sortProperty, searchValue, currentPage])

  return (
    <div className="container">
      <div className="content__top">
        <Categories
        // value={categoryId}
        // onChangeCategory={(index) => dispatch(setCategoryId(index))}
        />
        <Sort />
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
