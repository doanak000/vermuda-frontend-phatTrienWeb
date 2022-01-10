import { Tooltip } from 'antd'
import React from 'react'
import { COLUMN_TYPE, LIMIT_TABLE } from '../../constants/common'
import {
  ColTitleWrapper,
  TableCommon,
  CellContentRenderWrapper,
  ColLink
} from './TableCustom.style'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectData,
  setData
} from '../../features/createUpdateDelete/createUpdateDeleteSlice'
import { selectCurrentPage } from '../../features/searchTable/searchTableSlice'

const TableCustom = (props) => {
  const { total, showCheckbox } = props
  const dispatch = useDispatch()
  const selectedRows = useSelector(selectData)
  const current = useSelector(selectCurrentPage)
  return (
    <TableCommon
      scroll={{ y: 'calc(100vh - 215px)', x: '100%' }}
      bordered
      pagination={{
        total,
        showSizeChanger: false,
        pageSize: LIMIT_TABLE,
        current
        // hideOnSinglePage: true
      }}
      rowSelection={
        showCheckbox === false
          ? false
          : {
              selectedRowKeys: selectedRows?.map((row) => row.id) || [],
              type: 'checkbox',
              onChange: (selectedRowKeys, selectedRows) => {
                const rows = selectedRowKeys?.map((item) => {
                  return {
                    ...props?.dataSource.find((row) => row.id === item),
                    key: item,
                    id: item
                  }
                })

                dispatch(setData({ data: rows }))
                // dispatch(setData({ data: selectedRows }))
              }
            }
      }
      {...props}
    />
  )
}

export const ColTitleRender = (value, row, index, type) => {
  return <ColTitleWrapper>{value}</ColTitleWrapper>
}
export const renderMaximum = (value) => {
  if (value < 0)
    return (
      <Tooltip placement='top' title={'#'}>
        <div
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            textAlign: 'center'
          }}
        >
          NONE
        </div>
      </Tooltip>
    )
  return (
    <Tooltip placement='top' title={value}>
      <div
        style={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          textAlign: 'center'
        }}
      >
        {value}
      </div>
    </Tooltip>
  )
}
export const CellContentRender = (value, type, row, index) => {
  switch (type) {
    case COLUMN_TYPE.NUMBER:
      return (
        <Tooltip title={value}>
          <CellContentRenderWrapper textAlign='right'>
            {value}
          </CellContentRenderWrapper>
        </Tooltip>
      )
    case COLUMN_TYPE.DATE: {
      const date = value
        ? moment(parseInt(value)).format('YYYY.MM.DD')
        : moment().format('YYYY.MM.DD')
      return (
        <Tooltip title={date}>
          <CellContentRenderWrapper textAlign='center'>
            {date}
          </CellContentRenderWrapper>
        </Tooltip>
      )
    }
    case COLUMN_TYPE.DATE_STRING: {
      const date = value
        ? moment(value).format('YYYY.MM.DD')
        : moment().format('YYYY.MM.DD')
      return (
        <Tooltip title={date}>
          <CellContentRenderWrapper textAlign='center'>
            {date}
          </CellContentRenderWrapper>
        </Tooltip>
      )
    }
    case COLUMN_TYPE.LINK:
      return (
        <ColLink href={value}>
          <Tooltip title={value}>
            <CellContentRenderWrapper textAlign='right'>
              {value}
            </CellContentRenderWrapper>
          </Tooltip>
        </ColLink>
      )

    default:
      return (
        <Tooltip title={value}>
          <CellContentRenderWrapper textAlign='left'>
            {value}
          </CellContentRenderWrapper>
        </Tooltip>
      )
  }
}

export default TableCustom
