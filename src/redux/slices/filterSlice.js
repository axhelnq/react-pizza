import { createSlice } from '@reduxjs/toolkit'

export const filterSlice = createSlice({
  name: 'filters',
  initialState: {
    currentPage: 1,
    categoryId: 0,
    sortType: {
      name: 'популярністю (DESC)',
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
    setFilters(state, action) {
      state.categoryId = Number(action.payload.categoryId)
      state.sortType = action.payload.sortType
      state.currentPage = Number(action.payload.currentPage)
    },
  },
})

export const { setCategoryId, setSortType, setCurrentPage, setFilters } =
  filterSlice.actions

export default filterSlice.reducer
