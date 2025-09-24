import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchData = createAsyncThunk(
  'pizzas/fetchItems',
  async (params) => {
    const { category, sortBy, order, search, currentPage } = params
    const { data } = await axios.get(
      `http://localhost:3001/items?_page=${currentPage}&_limit=4${category}&_sort=${sortBy}&_order=${order}${search}`,
    )
    return data
  },
)

export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState: {
    items: [],
    status: 'loading', // loading | success | error
  },
  reducers: {
    setItems(state, action) {
      state.items = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.status = 'loading'
      state.items = []
    })
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.items = action.payload
      state.status = 'success'
    })
    builder.addCase(fetchData.rejected, (state) => {
      state.status = 'error'
      state.items = []
    })
  },
})

export const { setItems } = pizzasSlice.actions

export default pizzasSlice.reducer
