export type SortType = {
  name: string
  sortProperty: string
  order: string
  sortType:
    | 'rating-asc'
    | 'rating-desc'
    | 'price-asc'
    | 'price-desc'
    | 'title-asc'
}

export interface FilterSliceState {
  searchValue: string
  categoryId: number
  currentPage: number
  selectedSort: SortType
}
