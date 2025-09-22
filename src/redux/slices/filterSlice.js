import { createSlice } from '@reduxjs/toolkit'

export const filterSlice = createSlice({
  name: 'filters',
  initialState: {
    currentPage: 1,
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
    setCurrentPage(state, action) {
      state.currentPage = action.payload
    },
  },
})

export const { setCategoryId, setSortType, setCurrentPage } =
  filterSlice.actions

export default filterSlice.reducer
