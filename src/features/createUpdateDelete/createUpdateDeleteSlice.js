import { createSlice } from '@reduxjs/toolkit'
import { CREATE_UPDATE_DELETE_STATUS } from '../../constants/common'

export const createUpdateDeleteSlice = createSlice({
  name: 'createUpdateDelete',
  initialState: {
    data: undefined,
    variables: {},
    status: CREATE_UPDATE_DELETE_STATUS.UPCOMING,
    visibleDrawer: false,
    actionType: 'create',
    listData: []
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload.data
      state.variables = action.payload.variables
      // console.log('state.data', state.data)
    },
    resetData: (state, action) => {
      state.data = undefined
      state.variables = {}
    },
    setStatus: (state, action) => {
      state.status = action.payload
    },
    resetStatus: (state) => {
      state.status = CREATE_UPDATE_DELETE_STATUS.UPCOMING
    },
    setVisibleDrawer: (state, action) => {
      state.visibleDrawer = action.payload
    },
    setActionType: (state, action) => {
      state.actionType = action.payload
    },
    setListData: (state, action) => {
      state.listData = action.payload
    }
  }
})

export const {
  setData,
  resetData,
  setStatus,
  resetStatus,
  setVisibleDrawer,
  setActionType,
  setListData
} = createUpdateDeleteSlice.actions

export const selectData = (state) => state.createUpdateDelete.data
export const selectVariables = (state) => state.createUpdateDelete.variables
export const selectStatus = (state) => state.createUpdateDelete.status
export const selectVisibleDrawer = (state) =>
  state.createUpdateDelete.visibleDrawer
export const selectActionType = (state) => state.createUpdateDelete.actionType
export const getListData = (state) => state.createUpdateDelete.listData
export default createUpdateDeleteSlice.reducer
