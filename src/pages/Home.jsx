import qs from 'qs'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import React, { useContext, useEffect, useRef, useState } from 'react'
// Outside imports

import { SearchContext } from '../App'
import { listItems } from '../components/Sort'
import { setCategoryId, setFilters } from '../redux/slices/filterSlice'
// In project imports

import Sort from '../components/Sort'
import Categories from '../components/Categories'
import PizzaBlock from '../components/PizzaBlock'
import Pagination from '../components/Pagination'
import Skeleton from '../components/PizzaBlock/Skeleton'
// Components import

const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [pizzasMockapi, setPizzasMockapi] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const isSearch = useRef(false)
  const isMounted = useRef(false)
  const urlRef = useRef(window.location.search)
  const { searchValue } = useContext(SearchContext)
  // const [currentPage, setCurrentPage] = useState(1)
  // const [categoryId, setCategoryId] = useState(0)
  // Сохранено поскольку это учебный проект и это пример реализации через State
  const { categoryId, selectedSort, currentPage } = useSelector(
    (state) => state.filter
  )
  // const [selectedSort, setSelectedSort] = useState({
  //   name: 'популярности ☝',
  //   sortProperty: 'rating',
  //   order: 'asc',
  //   sortType: 'rating-asc',
  // })
  // Сохранено поскольку это учебный проект и это пример реализации через State

  // Передает категории в Redux при изменении сортировки по категории

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id))
  }

  // Fetch (Axios) запрос
  const fetchPizzas = async () => {
    setIsLoading(true)

    const categoryRequest = categoryId > 0 ? `category=${categoryId}` : ''
    const sortRequest = selectedSort.sortProperty
    const orderRequest = !selectedSort.order ? `desc` : `${selectedSort.order}`
    const searchRequest = searchValue ? `&search=${searchValue}` : ''

    // fetch(
    //   `https://6437e97ec1565cdd4d6122a5.mockapi.io/items?page=${currentPage}&limit=4&${categoryRequest}&sortBy=${sortRequest}&order=${orderRequest}${searchRequest}`
    // )
    //   .then((response) => response.json())
    //   .then((json) => {
    //     setPizzasMockapi(json)
    //   })
    //   .catch((error) => {
    //     alert('Не удалось загрузить данные 😥')
    //     console.error(error)
    //   })
    //   .finally(() => setIsLoading(false))
    axios
      .get(
        `https://6437e97ec1565cdd4d6122a5.mockapi.io/items?page=${currentPage}&limit=4&${categoryRequest}&sortBy=${sortRequest}&order=${orderRequest}${searchRequest}`
      )
      .then((response) => setPizzasMockapi(response.data))
      .catch((error) => {
        alert('Не удалось загрузить данные 😥')
        console.error(error)
      })
      .finally(() => setIsLoading(false))
    window.scrollTo(0, 0)
  }

  // Если уже произошел первый рендер, то меняем строку поиска исходя из Redux данных
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify(
        {
          sortProperty: selectedSort.sortProperty,
          sortType: selectedSort.sortType,
          categoryId,
          currentPage,
        },
        { addQueryPrefix: true }
      )

      navigate(queryString)
    }
    isMounted.current = true
  }, [categoryId, selectedSort, currentPage])

  // Если был рендер, то проверяем URL-параметры и сохраняем в Redux
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1))
      const sort = listItems.find((obj) => obj.sortType === params.sortType)

      dispatch(
        setFilters({
          ...params,
          sort,
        })
      )
      isSearch.current = true
    }
  }, [urlRef.current])

  // Если URL-параметры не получены, то Fetch (Axios) запрос не инициализируется
  // Если был первый рендер, то запрашиваем пиццы с сервера
  useEffect(() => {
    window.scrollTo(0, 0)

    if (!isSearch.current) {
      fetchPizzas()
    }

    isSearch.current = false
  }, [categoryId, selectedSort, searchValue, currentPage])

  // Создание заготовки блоков при загрузке данных, если данные получены, то пиццы
  const skeleton = [...new Array(4)].map((_, index) => <Skeleton key={index} />)
  const pizzas = pizzasMockapi.map((obj) => (
    <PizzaBlock key={obj.id} {...obj} />
  ))

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          categoryId={categoryId}
          onChangeCategory={onChangeCategory}
        />
        <Sort />
      </div>

      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading ? skeleton : pizzas}

        {/* {pizzas.map((obj) => (
                <PizzaBlock key={obj.id} {...obj} />
              ))}
        <PizzaBlock
                url="https://is.gd/Tzz8Hc"
                price="300"
                title="Unter-пицца"
              /> */}
      </div>
      <Pagination />
    </div>
  )
}

export default Home
