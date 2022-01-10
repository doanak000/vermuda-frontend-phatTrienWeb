import { createSlice } from '@reduxjs/toolkit'

export const videoSlice = createSlice({
  name: 'video',
  initialState: {
    hidden: false
  },
  reducers: {
    hideVideo: (state, action) => {
      state.hidden = action.payload
    }
  }
})

export const { hideVideo } = videoSlice.actions

export const selectHideVideo = (state) => state.video?.hidden

export default videoSlice.reducer
