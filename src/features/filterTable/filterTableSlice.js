import { createSlice } from '@reduxjs/toolkit'

export const filterTable = createSlice({
  name: 'filterTable',
  initialState: {
    filterValue: null,
    filterSearch: ''
  },
  reducers: {
    setFilterValue: (state, action) => {
      state.filterValue = action.payload
    },
    setFilterSearch: (state, action) => {
      state.filterSearch = action.payload
    }
  }
})

export const { setFilterValue, setFilterSearch } = filterTable.actions

export const selectFilterValue = (state) => state.filterTable.filterValue
export const selectFilterSearch = (state) => state.filterTable.filterSearch

export default filterTable.reducer
