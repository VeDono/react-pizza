import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { getCartFromLS } from '../../../utils/getCartFromLS'
import { calcTotalPrice } from '../../../utils/calcTotalPrice'
import { calcTotalCount } from '../../../utils/calcTotalCount'
import { CartItem, CartSliceState } from './types'

const { items, totalCount, totalPrice } = getCartFromLS()

const initialState: CartSliceState = {
  totalPrice,
  totalCount,
  items,
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

    addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find((obj) => {
        return (
          obj.id === action.payload.id &&
          obj.size === action.payload.size &&
          obj.type === action.payload.type
        )
      })
      findItem
        ? findItem.count++
        : state.items.push({
            ...action.payload,
            count: 1,
          })

      state.totalPrice = calcTotalPrice(state.items)

      state.totalCount = calcTotalCount(state.items)
    },
    countPlus(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find((obj) => {
        return (
          obj.uid === action.payload.uid &&
          obj.size === action.payload.size &&
          obj.type === action.payload.type
        )
      })

      if (findItem) {
        findItem.count++
      }

      state.totalPrice = calcTotalPrice(state.items)

      state.totalCount = calcTotalCount(state.items)
    },
    countMinus(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find((obj) => {
        return (
          obj.uid === action.payload.uid &&
          obj.size === action.payload.size &&
          obj.type === action.payload.type
        )
      })

      if (findItem) {
        findItem.count--
        state.totalPrice -= findItem.price
      }

      state.totalCount = calcTotalCount(state.items)
      // state.totalPrice = state.items.reduce((sum, obj) => {
      //   return obj.price * obj.count - sum
      // }, 0)
    },
    removeItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find((obj) => {
        return (
          obj.uid === action.payload.uid &&
          obj.size === action.payload.size &&
          obj.type === action.payload.type
        )
      })

      if (findItem) {
        state.totalPrice -= findItem.price * findItem.count
      }

      state.items = state.items.filter((obj) => {
        return (
          obj.uid !== action.payload.uid ||
          obj.size !== action.payload.size ||
          obj.type !== action.payload.type
        )
      })

      state.totalCount = calcTotalCount(state.items)
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
