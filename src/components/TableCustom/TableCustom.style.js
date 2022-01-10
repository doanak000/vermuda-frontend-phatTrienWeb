import { themeGet } from '@styled-system/theme-get'
import { Table } from 'antd'
import styled from 'styled-components'

export const TableCommon = styled(Table)`
  width: 100%;
  .ant-table-cell {
    font-size: ${themeGet('sizes.M')};
    text-align: center;
    color: ${themeGet('colors.primary')};
    :hover {
      box-shadow: 1px 1px 1px 1px #7c7979;
    }
  }
  .ant-table-body {
    /* ::-webkit-scrollbar {
      width: 5px;
      height: 5px;
    } */

    /* ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px #ffffff;
    }

    ::-webkit-scrollbar-thumb {
      background: ${themeGet('colors.primary')};
    }

    ::-webkit-scrollbar-thumb:hover {
      background: ${themeGet('colors.primary')};
    } */
  }
`

export const ColTitleWrapper = styled.div``
export const CellContentRenderWrapper = styled.div`
  text-align: ${(props) => props?.textAlign};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
export const ColLink = styled.a`
  .TableCustomstyle__CellContentRenderWrapper-k52qe-2 {
    color: ${themeGet('colors.link')} !important;
  }
`
