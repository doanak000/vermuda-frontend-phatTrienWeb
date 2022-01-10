import React, { useEffect, useState } from 'react'
import { Input } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { selectTranslation } from '../../features/language/languageSlice'
import { debounce } from '../../helper/debounce'
import {
  selectSearchValue,
  setCurrentPage,
  setSearchValue
} from '../../features/searchTable/searchTableSlice'

const { Search } = Input
const SearchDebounce = ({ setPageIndex, pageIndex = 1, placeholder }) => {
  const dispatch = useDispatch()
  const translation = useSelector(selectTranslation)
  const searchValue = useSelector(selectSearchValue)
  const [value, setValue] = useState('')

  useEffect(() => {
    if (!searchValue) {
      setValue(searchValue)
    }
  }, [searchValue])

  return (
    <Search
      style={{ maxWidth: 150, flex: 1, marginRight: '2rem' }}
      size='middle'
      placeholder={placeholder || translation.PLACEHOLDER_SEARCH}
      onChange={(e) => {
        setValue(e.target.value)
        if (pageIndex && pageIndex !== 0) {
          dispatch(setCurrentPage(1))
        }
        debounce(() => {
          dispatch(setSearchValue(e.target.value))
        })
      }}
      value={value}
      allowClear
    />
  )
}

export default SearchDebounce
