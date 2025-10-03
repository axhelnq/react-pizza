import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export type CartItem = {
  id: string
  title: string
  price: number
  imageUrl: string
  type: string
  size: number
  count: number
}

interface CartSliceState {
  totalPrice: number
  totalCount: number
  items: CartItem[]
}

const initialState: CartSliceState = {
  items: [],
  totalPrice: 0,
  totalCount: 0,
}

const calculateTotals = (items: CartItem[]) => {
  const totalPrice = items.reduce(
    (sum: number, obj) => sum + obj.price * obj.count,
    0,
  )
  const totalCount = items.reduce((sum: number, obj) => sum + obj.count, 0)
  return { totalPrice, totalCount }
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find((item) => item.id === action.payload.id)
      if (findItem) {
        findItem.count++
      } else {
        state.items.push({ ...action.payload, count: 1 })
      }

      const totals = calculateTotals(state.items)
      state.totalPrice = totals.totalPrice
      state.totalCount = totals.totalCount
    },

    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((item) => item.id === action.payload)
      if (findItem) {
        findItem.count--
      }

      const totals = calculateTotals(state.items)
      state.totalPrice = totals.totalPrice
      state.totalCount = totals.totalCount

      state.totalCount = state.items.reduce((sum, obj) => sum + obj.count, 0)
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload)

      const totals = calculateTotals(state.items)
      state.totalPrice = totals.totalPrice
      state.totalCount = totals.totalCount
    },
    clearItems(state) {
      state.items = []
      state.totalPrice = 0
      state.totalCount = 0
    },
  },
})

export const selectCart = (state: RootState) => state.cart
export const selectCartItemById = (id: string) => (state: RootState) =>
  state.cart.items.find((obj) => obj.id === id)

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions

export default cartSlice.reducer
