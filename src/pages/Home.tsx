import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock/index.js'
import React, { useEffect, useRef } from 'react'
import Skeleton from '../components/PizzaBlock/Skeleton'
import Pagination from '../components/Pagination/index'
import { useSelector } from 'react-redux'
import qs from 'qs'
import { selectFilter, setFilters } from '../redux/slices/filterSlice.js'
import { useNavigate } from 'react-router-dom'
import sortList from '../constants/sortList'
import { fetchData } from '../redux/slices/pizzasSlice.js'
import { useAppDispatch } from '../redux/store'

const Home: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isSearch = useRef(false)
  const isMounted = useRef(false)

  const { categoryId, sortType, currentPage, searchValue } =
    useSelector(selectFilter)

  const { items, status } = useSelector((state) => state.pizzas)

  const getData = async () => {
    const category = categoryId > 0 ? `&category=${categoryId}` : ''
    const sortBy = sortType.sortProperty.replace('-', '')
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc'
    const search = searchValue ? `&title_like=${searchValue}&` : ''

    dispatch(
      fetchData({
        category,
        sortBy,
        order,
        search,
        currentPage,
      }),
    )

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }

  // якщо змінили параметри і був перший рендер
  useEffect(() => {
    // не костиль а лайфхак
    if (isMounted.current) {
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

      const sortType = sortList.find(
        (obj) => obj.sortProperty === params.sortProperty,
      )

      dispatch(setFilters({ ...params, sortType }))
      isSearch.current = true
    }
  }, [])

  // якщо зміна параметрів робим запит піц
  useEffect(() => {
    getData()

    isSearch.current = false
  }, [categoryId, sortType.sortProperty, searchValue, currentPage])

  const skeleton = [...new Array(8)].map((_, index) => <Skeleton key={index} />)
  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />)

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Усі піци</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>
            Виникла помилка<span>😕</span>
          </h2>
          <p>
            На жаль, не вдалось получити піци. Попробуйте повторити спробу
            пізніше.
          </p>
        </div>
      ) : (
        <div className="content__items">
          {status === 'loading' ? skeleton : pizzas}
        </div>
      )}
      <Pagination />
    </div>
  )
}

export default Home
