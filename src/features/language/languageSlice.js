import { createSlice } from '@reduxjs/toolkit'
import { translation } from '../../configs/translation'

const locale = process.env.REACT_APP_LANGUAGE

export const languageSlice = createSlice({
  name: 'language',
  initialState: {
    locale,
    translation: translation[locale]
  },
  reducers: {
    changeLanguage: (state, action) => {
      state.locale = action.payload
      state.translation = translation[action.payload]
    }
  }
})

export const { changeLanguage } = languageSlice.actions

export const selectLocale = (state) => state.language.locale
export const selectTranslation = (state) => state.language.translation

export default languageSlice.reducer
