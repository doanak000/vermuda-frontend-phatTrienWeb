import styled from 'styled-components'
import { Form } from 'antd'
export const WrapperPercentAndCount = styled.div`
  display: flex;
  justify-content: space-around;
`

export const Percent = styled.div`
  width: 100%;
`
export const Amount = styled.div`
  width: 100%;
  padding-left: 10px;
`

export const Label = styled.div`
  margin-top: 10px;
  max-width: 15vw;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const FormQR = styled(Form)`
  .ant-form-item-explain.ant-form-item-explain-error {
    text-align: right;
  }
`
