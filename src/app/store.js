import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import loginReducer from '../features/login/loginSlice'
import languageReducer from '../features/language/languageSlice'
import createUpdateDeleteReducer from '../features/createUpdateDelete/createUpdateDeleteSlice'
import videoReducer from '../features/video/VideoSlice'
import filterTableReducer from '../features/filterTable/filterTableSlice'
import searchTableReducer from '../features/searchTable/searchTableSlice'

export default configureStore({
  reducer: {
    counter: counterReducer,
    login: loginReducer,
    language: languageReducer,
    createUpdateDelete: createUpdateDeleteReducer,
    video: videoReducer,
    filterTable: filterTableReducer,
    searchTable: searchTableReducer
  }
})
