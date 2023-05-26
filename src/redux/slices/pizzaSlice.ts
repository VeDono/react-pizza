import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

import { RootState } from '../store'

export type FetchPizzasArgs = {
  categoryRequest: string
  sortRequest: string
  orderRequest: string
  searchRequest: string
  currentPage: number
}

type PizzaItem = {
  id: string
  imageUrl: string
  price: number
  title: string
  sizes: number[]
  types: number[]
}

enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface PizzaSliceState {
  items: PizzaItem[]
  status: Status
}

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING, // loading | success | error
}

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

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<PizzaItem[]>) {
      state.items = action.payload
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING
      state.items = []
    })

    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      if (action.payload.length === 0) {
        state.status = Status.ERROR
      } else {
        state.items = action.payload
        state.status = Status.SUCCESS
      }
    })

    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR
      state.items = []
    })
  },

  // extraReducers: {
  //   [fetchPizzas.pending]: (state) => {
  //     state.status = 'loading'
  //     state.items = []
  //   },
  //   [fetchPizzas.fulfilled]: (state, action) => {
  //     if (action.payload.length === 0) {
  //       state.status = 'error'
  //     } else {
  //       state.items = action.payload
  //       state.status = 'success'
  //     }
  //   },
  //   [fetchPizzas.rejected]: (state) => {
  //     state.status = 'error'
  //     state.items = []
  //   },
  // },
})

export const selectPizzaData = (state: RootState) => state.pizza

export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer
