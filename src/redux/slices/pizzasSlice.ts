import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { PizzaItem } from '../../@types/pizza'

export enum Status {
  LOADING = 'loading',
  ERROR = 'error',
  SUCCESS = 'success',
}

interface PizzaSliceState {
  items: PizzaItem[]
  status: Status
}

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,
}

export const fetchData = createAsyncThunk<PizzaItem[], Record<string, string>>(
  'pizzas/fetchItems',
  async (params) => {
    const { category, sortBy, order, search, currentPage } = params
    const { data } = await axios.get<PizzaItem[]>(
      `http://localhost:3001/items?_page=${currentPage}&_limit=4${category}&_sort=${sortBy}&_order=${order}${search}`,
    )
    return data
  },
)

export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    // setItems(state, action: PayloadAction<PizzaItem[]>) {
    //   state.items = action.payload
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.status = Status.LOADING
      state.items = []
    })
    builder.addCase(
      fetchData.fulfilled,
      (state, action: PayloadAction<PizzaItem[]>) => {
        state.items = action.payload
        state.status = Status.SUCCESS
      },
    )
    builder.addCase(fetchData.rejected, (state) => {
      state.status = Status.ERROR
      state.items = []
    })
  },
})

// export const { setItems } = pizzasSlice.actions

export default pizzasSlice.reducer
