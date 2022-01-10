import styled from 'styled-components'
import { themeGet } from '@styled-system/theme-get'
import { Button, Table } from 'antd'
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
  border-radius: ${(props) =>
    props.radius === 'left' ? '6px 0px 0px 6px' : '0px 6px 6px 0px'};
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
  }
`
