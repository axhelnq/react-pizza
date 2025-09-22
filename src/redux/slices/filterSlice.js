import { createSlice } from '@reduxjs/toolkit'

export const filterSlice = createSlice({
  name: 'filters',
  initialState: {
    categoryId: 0,
    sortType: {
      name: 'популярністю (ASC)',
      sortProperty: 'rating',
    },
  },
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload
    },
    setSortType(state, action) {
      state.sortType = action.payload
    },
  },
})

export const { setCategoryId, setSortType } = filterSlice.actions

export default filterSlice.reducer
