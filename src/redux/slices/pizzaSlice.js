import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const {
      categoryRequest,
      sortRequest,
      orderRequest,
      searchRequest,
      currentPage,
    } = params
    const { data } = await axios.get(
      `https://6437e97ec1565cdd4d6122a5.mockapi.io/items?page=${currentPage}&limit=4&${categoryRequest}&sortBy=${sortRequest}&order=${orderRequest}${searchRequest}`
    )
    return data
  }
)

const initialState = {
  items: [],
  status: 'loading', // loading | success | error
}

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = 'loading'
      state.items = []
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      if (action.payload.length === 0) {
        state.status = 'error'
      } else {
        state.items = action.payload
        state.status = 'success'
      }
    },
    [fetchPizzas.rejected]: (state) => {
      state.status = 'error'
      state.items = []
    },
  },
})

export const selectPizzaData = (state) => state.pizza

export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer
