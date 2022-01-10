import { createSlice } from '@reduxjs/toolkit'

export const searchTable = createSlice({
  name: 'searchTable',
  initialState: {
    searchValue: '',
    isClear: false,
    currentPage: 1
  },
  reducers: {
    setSearchValue: (state, action) => {
      state.searchValue = action.payload
    },
    clearSearch: (state) => {
      state.searchValue = ''
      state.isClear = true
    },
    setIsClear: (state, action) => {
      state.isClear = action.payload
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    }
  }
})

export const {
  setSearchValue,
  clearSearch,
  setIsClear,
  setCurrentPage
} = searchTable.actions

export const selectSearchValue = (state) => state.searchTable.searchValue
export const selectIsClear = (state) => state.searchTable.isClear
export const selectCurrentPage = (state) => state.searchTable.currentPage

export default searchTable.reducer
