import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  totalPrice: 0,
  totalCount: 0,
  items: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // addItem(state, action) {
    //   state.items.push(action.payload)
    //   state.totalPrice = state.items.reduce((sum, obj) => {
    //     return obj.price + sum
    //   }, 0)
    // },

    addItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id)
      if (findItem) {
        findItem.count++
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        })
      }

      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum
      }, 0)

      state.totalCount = state.items.reduce((sum, item) => {
        return item.count + sum
      }, 0)
    },
    countPlus(state, action) {
      const findItem = state.items.find((item) => item.id === action.payload)

      if (findItem) {
        findItem.count++
      }

      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum
      }, 0)

      state.totalCount = state.items.reduce((sum, item) => {
        return item.count + sum
      }, 0)
    },
    countMinus(state, action) {
      const findItem = state.items.find((item) => item.id === action.payload)

      if (findItem) {
        findItem.count--
        state.totalPrice -= findItem.price
      }

      state.totalCount = state.items.reduce((sum, item) => {
        return item.count + sum
      }, 0)
      // state.totalPrice = state.items.reduce((sum, obj) => {
      //   return obj.price * obj.count - sum
      // }, 0)
    },
    removeItem(state, action) {
      const findItem = state.items.find((item) => item.id === action.payload)
      state.totalPrice = state.totalPrice - findItem.price * findItem.count

      state.items = state.items.filter((obj) => obj.id !== action.payload)

      state.totalCount = state.items.reduce((sum, item) => {
        return item.count + sum
      }, 0)
    },
    cleareItems(state) {
      state.items = []
      state.totalPrice = 0
      state.totalCount = state.items.reduce((sum, item) => {
        return item.count + sum
      }, 0)
    },
  },
})

export const { addItem, countPlus, countMinus, removeItem, cleareItems } =
  cartSlice.actions

export default cartSlice.reducer
