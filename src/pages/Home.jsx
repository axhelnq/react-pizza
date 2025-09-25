import Categories from '../components/Categories.jsx'
import Sort from '../components/Sort.jsx'
import PizzaBlock from '../components/PizzaBlock'
import React, { useEffect, useRef } from 'react'
import Skeleton from '../components/PizzaBlock/Skeleton.jsx'
import Pagination from '../components/Pagination/index.jsx'
import { useDispatch, useSelector } from 'react-redux'
import qs from 'qs'
import { setCurrentPage, setFilters } from '../redux/slices/filterSlice.js'
import { Link, useNavigate } from 'react-router-dom'
import sortList from '../constants/sortList.ts'
import { fetchData } from '../redux/slices/pizzasSlice.js'

const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isSearch = useRef(false)
  const isMounted = useRef(false)

  const { categoryId, sortType, currentPage, searchValue } = useSelector(
    (state) => state.filter,
  )
  const { items, status } = useSelector((state) => state.pizzas)

  const onChangePage = (num) => {
    dispatch(setCurrentPage(num))
  }

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
  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)
  //   const pizzas = items.map((obj) => (
  //     <Link key={obj.id} to={`/pizzas/${obj.id}`}>
  //       <PizzaBlock {...obj} />
  //     </Link>
  //   ))

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
            Виникла помилка<icon>😕</icon>
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
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  )
}

export default Home
