import styled from 'styled-components'
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons'
import { Form } from 'antd'
export const WrapperButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0.5rem;
`

export const CaretUpIcon = styled(CaretUpOutlined)`
  margin-right: 0.2rem;
`

export const CaretDownIcon = styled(CaretDownOutlined)`
  margin-right: 0.2rem;
`
export const FormAddEvent = styled(Form)`
  .ant-form-item-explain.ant-form-item-explain-error {
    text-align: right;
  }

  .ant-upload-list-item-name {
    width: 16vw !important;
  }

  .upload-img-for-event > div {
    // width: 208px;
  }
`
