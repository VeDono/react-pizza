import { createAsyncThunk } from '@reduxjs/toolkit'
import { FetchPizzasArgs, PizzaItem } from './types'
import axios from 'axios'

export const fetchPizzas = createAsyncThunk<PizzaItem[], FetchPizzasArgs>(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const {
      categoryRequest,
      sortRequest,
      orderRequest,
      searchRequest,
      currentPage,
    } = params
    const { data } = await axios.get<PizzaItem[]>(
      `https://6437e97ec1565cdd4d6122a5.mockapi.io/items?page=${currentPage}&limit=4&${categoryRequest}&sortBy=${sortRequest}&order=${orderRequest}${searchRequest}`
    )
    return data
  }
)
