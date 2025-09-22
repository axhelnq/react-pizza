import Categories from '../components/Categories.jsx'
import Sort, { sortList } from '../components/Sort.jsx'
import PizzaBlock from '../components/PizzaBlock'
import { useContext, useEffect, useRef, useState } from 'react'
import Skeleton from '../components/PizzaBlock/Skeleton.jsx'
import Pagination from '../components/Pagination/index.jsx'
import { SearchContext } from '../App.jsx'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import qs from 'qs'
import { setCurrentPage, setFilters } from '../redux/slices/filterSlice.js'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isSearch = useRef(false)
  const isMounted = useRef(false)
  const { categoryId, sortType, currentPage } = useSelector(
    (state) => state.filter,
  )

  const { searchValue } = useContext(SearchContext)
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const onChangePage = (num) => {
    dispatch(setCurrentPage(num))
  }

  const fetchPizzas = () => {
    setIsLoading(true)
    const category = categoryId > 0 ? `&category=${categoryId}` : ''
    const sortBy = sortType.sortProperty.replace('-', '')
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc'
    const search = searchValue ? `&title_like=${searchValue}&` : ''
    console.log('fetch')
    axios
      .get(
        `http://localhost:3001/items?_page=${currentPage}&_limit=4${category}&_sort=${sortBy}&_order=${order}${search}`,
      )
      .then((res) => {
        setItems(res.data)
        setIsLoading(false)
        console.log('res')
      })
  }

  // якщо змінили параметри і був перший рендер
  useEffect(() => {
    if (isMounted.current) {
      // не костиль а лайфхак. Похоже до костиля, але ні
      const queryString = qs.stringify({
        sortProperty: sortType.sortProperty,
        categoryId,
        currentPage,
      })
      navigate(`?${queryString}`)
    }
    isMounted.current = true
  }, [categoryId, sortType.sortProperty, currentPage])

  // якщо був перший рендер то провірка url параметри і зберігаєм в redux
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1))
      console.log('params', params)

      const sortType = sortList.find(
        (obj) => obj.sortProperty === params.sortProperty,
      )
      console.log({ ...params, sortType })

      dispatch(setFilters({ ...params, sortType }))
      isSearch.current = true
    }
  }, [])

  // якщо був перший рендер то робим запрос піц
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
    if (!isSearch.current) {
      fetchPizzas()
    }

    isSearch.current = false
  }, [categoryId, sortType.sortProperty, searchValue, currentPage])
  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Усі піци</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(8)].map((_, index) => <Skeleton key={index} />)
          : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  )
}

export default Home
