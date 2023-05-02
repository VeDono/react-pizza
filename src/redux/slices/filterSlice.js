import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  categoryId: 0,
  currentPage: 1,
  selectedSort: {
    name: 'популярности 👇',
    sortProperty: 'rating',
    order: 'desc',
    sortType: 'rating-desc',
  },
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload
    },
    setSelectedSort(state, action) {
      state.selectedSort = action.payload
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload
    },
    setFilters(state, action) {
      state.currentPage = Number(action.payload.currentPage)
      state.categoryId = Number(action.payload.categoryId)
      state.selectedSort = action.payload.sort
    },
  },
})

export const { setCategoryId, setSelectedSort, setCurrentPage, setFilters } =
  filterSlice.actions

export default filterSlice.reducer
