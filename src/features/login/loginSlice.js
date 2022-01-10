import { createSlice } from '@reduxjs/toolkit'

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    isLoggedIn: !!localStorage.getItem('access_token'),
    message: '',
    userInfo: JSON.parse(localStorage.getItem('userInfo')) ?? {}
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true
      state.userInfo = action.payload.userInfo
      localStorage.setItem('userInfo', JSON.stringify(action.payload.userInfo))
      localStorage.setItem('lastOnlineTime', new Date().getTime())
    },
    loginFail: (state, action) => {
      state.isLoggedIn = false
      state.message = action.payload
    },
    logout: (state) => {
      state.isLoggedIn = false

      localStorage.removeItem('access_token')
      localStorage.removeItem('userInfo')
    }
  }
})

export const { loginSuccess, loginFail, logout } = loginSlice.actions

export const selectUserInfo = (state) => state.login.userInfo
export const selectIsLoggedIn = (state) => state.login.isLoggedIn
export const selectMessage = (state) => state.login.message

export default loginSlice.reducer
