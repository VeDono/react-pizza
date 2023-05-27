export type FetchPizzasArgs = {
  categoryRequest: string
  sortRequest: string
  orderRequest: string
  searchRequest: string
  currentPage: number
}

export type PizzaItem = {
  id: string
  imageUrl: string
  price: number
  title: string
  sizes: number[]
  types: number[]
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface PizzaSliceState {
  items: PizzaItem[]
  status: Status
}
