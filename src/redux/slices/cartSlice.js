import { createSlice } from '@reduxjs/toolkit'

const calculateTotals = (items) => {
  const totalPrice = items.reduce((sum, obj) => sum + obj.price * obj.count, 0)
  const totalCount = items.reduce((sum, obj) => sum + obj.count, 0)
  return { totalPrice, totalCount }
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalPrice: 0,
    totalCount: 0,
  },
  reducers: {
    addItem(state, action) {
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

    minusItem(state, action) {
      const findItem = state.items.find((item) => item.id === action.payload)
      if (findItem) {
        findItem.count--
      }

      const totals = calculateTotals(state.items)
      state.totalPrice = totals.totalPrice
      state.totalCount = totals.totalCount

      state.totalCount = state.items.reduce((sum, obj) => sum + obj.count, 0)
    },
    removeItem(state, action) {
      // action.payload очікується як id
      state.items = state.items.filter((obj) => obj.id !== action.payload)

      // якщо ти зберігаєш totals у state — оновлюємо їх
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

export const selectCart = (state) => state.cart
export const selectCartItemById = (id) => (state) =>
  state.cart.items.find((obj) => obj.id === id)

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions

export default cartSlice.reducer
