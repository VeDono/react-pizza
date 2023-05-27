export type CartItem = {
  id: string
  uid: string
  title: string
  price: number
  imageUrl: string
  type: string
  size: number
  count: number
}

// interface является аналогом 'type', но типизирует лишь объект.
// обычно используют для типизации стейта.
export interface CartSliceState {
  totalPrice: number
  totalCount: number
  items: CartItem[]
}
