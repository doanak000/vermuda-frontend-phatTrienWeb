import { Select, Spin } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import { PATH } from '../../constants/common'
import {
  selectFilterValue,
  setFilterSearch,
  setFilterValue
} from '../../features/filterTable/filterTableSlice'
import { debounce } from '../../helper/debounce'

import { SelectWrapper } from './FilterTable.style'

const { Option } = Select
const FilterTable = (props) => {
  const location = useLocation()
  const dispatch = useDispatch()
  const filterValue = useSelector(selectFilterValue)
  const optionRender = props?.filterOptions?.map((item) => {
    return (
      <Option key={item.value} value={item.value}>
        {item.name}
      </Option>
    )
  })

  return (
    <SelectWrapper style={props?.style}>
      <Select
        // loading={props?.loading}
        notFoundContent={props?.loading ? <Spin size='small' /> : null}
        style={{ width: '100%' }}
        placeholder={props?.placeholder}
        showSearch={location.pathname === PATH.MANAGE_GENERATE}
        onSearch={(value) => {
          debounce(() => dispatch(setFilterSearch(value)))
        }}
        filterOption={false}
        allowClear
        // allowClear={location.pathname === PATH.MANAGE_GENERATE}
        onSelect={(value) => {
          dispatch(setFilterValue(value))
        }}
        onClear={() => dispatch(setFilterValue(null))}
        value={filterValue}
      >
        {optionRender}
      </Select>
    </SelectWrapper>
  )
}

export default FilterTable
