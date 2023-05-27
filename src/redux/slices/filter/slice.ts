import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { FilterSliceState, SortType } from './types'

const initialState: FilterSliceState = {
  searchValue: '',
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
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload
    },
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload
    },
    setSelectedSort(state, action: PayloadAction<SortType>) {
      state.selectedSort = action.payload
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      state.currentPage = Number(action.payload.currentPage)
      state.categoryId = Number(action.payload.categoryId)
      state.selectedSort = action.payload.selectedSort
    },
  },
})

export const {
  setCategoryId,
  setSelectedSort,
  setCurrentPage,
  setFilters,
  setSearchValue,
} = filterSlice.actions

export default filterSlice.reducer
