import { createSlice } from '@reduxjs/toolkit'
import { PATH } from '../../constants/common'

export const sidebarSlice = createSlice({
  name: 'sidebarSlice',
  initialState: {
    activeTab: PATH.USER
  },
  reducers: {
    changeTab: (state, action) => {
      state.activeTab = action.payload
    }
  }
})

export const { changeTab } = sidebarSlice.actions

export const selectActiveTab = (state) => state.sidebarSlice.activeTab

export default sidebarSlice.reducer
