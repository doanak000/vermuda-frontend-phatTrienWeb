import styled from 'styled-components'
import { Spin } from 'antd'
import {
  DeleteOutlined,
  EditOutlined,
  QrcodeOutlined
  // PlusSquareOutlined
} from '@ant-design/icons'
import { themeGet } from '@styled-system/theme-get'
export const ActionWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1rem;
  span {
    &:hover {
      cursor: pointer;
    }
    &:first-child {
      color: green;
    }
    &:last-child {
      color: red;
    }
  }
`
export const EditIcon = styled(EditOutlined)`
  font-size: 1.2rem;
  color: ${(prop) => (prop.color ? '#595959' : 'black')} !important;
  opacity: ${(prop) => (prop.color ? 0.3 : 1)} !important;
`

export const DeleteIcon = styled(DeleteOutlined)`
  font-size: 1.2rem;
  color: ${(prop) => (prop.color ? '#595959' : 'red')} !important;
  opacity: ${(prop) => (prop.color ? 0.3 : 1)} !important;
`
export const QrIcon = styled(QrcodeOutlined)`
  font-size: 1.2rem;
  color: ${(prop) => (prop.color ? '#595959' : 'red')} !important;
  opacity: ${(prop) => (prop.color ? 0.3 : 1)} !important;
`
export const ExportSpinner = styled(Spin)`
  .ant-spin-dot-item {
    background-color: ${themeGet('colors.primary')};
  }
`
