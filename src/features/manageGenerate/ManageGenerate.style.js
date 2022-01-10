import styled from 'styled-components'
import { themeGet } from '@styled-system/theme-get'
import { Button, Popconfirm, Table, Typography } from 'antd'
// import { Link } from 'react-router-dom'
import Modal from 'antd/lib/modal/Modal'

export const WrapperListOfCode = styled.div`
  width: 100%;

  background-color: ${themeGet('colors.backgroundGray')};
`
export const WrapperRenderListOfCode = styled.div`
  width: 100%;
  background-color: #ffffff;
  padding: 1% 5%;
  height: ${themeGet('heightComponent')} !important;
`
export const TableListOfCode = styled(Table)`
  .ant-table-cell {
    font-size: ${themeGet('sizes.M')};
    text-align: center;
    color: ${themeGet('colors.primary')};
    :hover {
      box-shadow: 1px 1px 1px 1px #7c7979;
    }
  }
  .ant-table-placeholder {
    height: 70vh;
  }
`
export const WrapperIconListOfCode = styled.div`
  @media only screen and (min-width: 1000px) {
    display: flex;
  }
`
export const ButtonListOfCode = styled(Button)`
  width: 50%;
  height: 50px;
  font-size: ${themeGet('sizes.M')};
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${themeGet('colors.primary')};
  color: ${(props) => (props.getColor ? '#ffffff' : null)};
  background-color: ${(props) =>
    props.getColor ? themeGet('colors.primary') : null};
`
export const ListOfCodeModal = styled(Modal)`
  height: 500px;
  width: 80% !important;
  top: 5% !important;
  padding-bottom: 0 !important;
  .ant-modal {
    width: 80%;
    top: 5%;
  }
  .ant-table-container {
    height: 660px !important;
    @media screen and (max-width: 1200px) {
      overflow-y: scroll;
      ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
        -webkit-border-radius: 10px;
        background-color: #ffffff;
      }
      ::-webkit-scrollbar {
        width: 5px;
        height: 5px;
        background-color: #ffffff;
      }
      ::-webkit-scrollbar-thumb {
        border-radius: 6px;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        background-color: ${themeGet('colors.primary')};
      }
    }
  }
`
export const ButtonEdit = styled(Typography.Link)`
  width: 100%;
  background-color: ${themeGet('colors.primary')};
  color: white !important;
  display: block !important;
  text-align: center !important;
  align-items: center !important;
  justify-content: center !important;
`
export const ButtonDelete = styled(Popconfirm)`
  width: 100%;
  border: 1px solid ${themeGet('colors.primary')};
  display: block !important;
  align-items: center !important;
  justify-content: center !important;
  box-sizing: border-box;
`
export const WrapperIconManagerGenerateCode = styled.div`
  @media only screen and (min-width: 1000px) {
    display: flex;
  }
`
export const ButtonDetail = styled(Button)`
  border: 1px solid ${themeGet('colors.primary')};
  border-radius: 0px;
  display: block !important;
  width: 100%;
  color: #ffffff;

  background-color: ${themeGet('colors.primary')};
  :hover {
    background-color: ${themeGet('colors.primary')} !important;
  }
  :focus {
    background-color: ${themeGet('colors.primary')} !important;
  }
`
