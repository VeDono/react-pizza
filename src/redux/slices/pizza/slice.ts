import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PizzaItem, PizzaSliceState, Status } from './types'
import { fetchPizzas } from './asyncActions'

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING, // loading | success | error
}

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

export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer
