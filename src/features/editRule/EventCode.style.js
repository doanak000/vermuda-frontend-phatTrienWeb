import styled from 'styled-components'
import { themeGet } from '@styled-system/theme-get'
import { Table } from 'antd'

export const WrapperEvent = styled.div`
  width: 100%;
  height: ${themeGet('heightComponent')} !important;
  background-color: ${themeGet('colors.backgroundGray')};
`
export const WrapperRenderEvent = styled.div`
  width: 100%;
  height: ${themeGet('heightComponent')} !important;
  background-color: #ffffff;
  padding: 1% 5%;
  @media screen and (max-width: 1250px) {
    overflow-y: scroll;
    ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
      border-radius: 10px;
      background-color: #ffffff;
    }
    ::-webkit-scrollbar {
      width: 5px;
      height: 5px;
      background-color: #ffffff;
    }
    ::-webkit-scrollbar-thumb {
      border-radius: 6px;
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      background-color: ${themeGet('colors.primary')};
    }
  }
`
export const TableEvent = styled(Table)`
  .ant-table-cell {
    font-size: ${themeGet('sizes.M')};
    text-align: center;
    color: ${themeGet('colors.primary')};
    :hover {
      box-shadow: 1px 1px 1px 1px #7c7979;
    }
  }
`
export const WrapperIconEvent = styled.div`
  @media only screen and (min-width: 1000px) {
    display: flex;
    .anticon-edit {
      padding-right: 20px;
    }
  }
`
