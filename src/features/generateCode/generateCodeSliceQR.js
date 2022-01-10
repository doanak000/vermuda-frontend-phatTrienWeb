import { createSlice } from '@reduxjs/toolkit'

export const generateCodeSlice = createSlice({
  name: 'generateCode',
  initialState: {
    infoCode: JSON.parse(localStorage.getItem('infoCode')) ?? {},
    listOfCode: JSON.parse(localStorage.getItem('listOfCode')) ?? []
  },
  reducers: {
    createInfoCode: (state, action) => {
      state.infoCode = action.payload.infoCode
      localStorage.setItem('infoCode', JSON.stringify(action.payload.infoCode))
    },
    createListOfCode: (state, action) => {
      state.listOfCode = action.payload
      localStorage.setItem('listOfCode', JSON.stringify(action.payload))
    },
    saveAllListOfCode: (state, action) => {
      const keyIndex = action.payload.keyIndex
      state.listOfCode[keyIndex] = action.payload.listOfCodeItem
      state.infoCode.total =
        state.infoCode.total -
        (state.infoCode.code[keyIndex].number -
          state.listOfCode[keyIndex].length)
      state.infoCode.code[keyIndex].number = state.listOfCode[keyIndex].length

      // const listOfCodeDelete = state.listOfCode[keyIndex].map((item) =>
      //   action.payload.seriDelete > item.seri ? (item.seri += 1) : null
      // )
      // state.listOfCode[keyIndex] = listOfCodeDelete
      localStorage.setItem('listOfCode', JSON.stringify(state.listOfCode))
      localStorage.setItem('infoCode', JSON.stringify(state.infoCode))
    }
  }
})

export const {
  createInfoCode,
  createListOfCode,
  saveAllListOfCode
} = generateCodeSlice.actions

export const selectListOfCode = (state) => state.generateCode.listOfCode
export const selectInfoCode = (state) => state.generateCode.infoCode
export default generateCodeSlice.reducer
