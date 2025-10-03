import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

type SortType = {
  name: string
  // todo окремий тип для sortProperty
  sortProperty: 'rating' | 'title' | 'price' | '-rating' | '-title' | '-price'
}

interface FilterSliceState {
  searchValue: string
  currentPage: number
  categoryId: number
  sortType: SortType
}

const initialState: FilterSliceState = {
  searchValue: '',
  currentPage: 1,
  categoryId: 0,
  sortType: {
    name: 'популярністю (DESC)',
    sortProperty: 'rating',
  },
}

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload
    },
    setSortType(state, action: PayloadAction<SortType>) {
      state.sortType = action.payload
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      state.categoryId = Number(action.payload.categoryId)
      state.sortType = action.payload.sortType
      state.currentPage = Number(action.payload.currentPage)
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload
    },
  },
})

export const selectFilter = (state: RootState) => state.filter

export const {
  setCategoryId,
  setSortType,
  setCurrentPage,
  setFilters,
  setSearchValue,
} = filterSlice.actions

export default filterSlice.reducer
