import styled from 'styled-components'
import { themeGet } from '@styled-system/theme-get'
import { Button, Form, Input, InputNumber } from 'antd'
export const WrapperGenerateCode = styled.div`
  background: ${themeGet('colors.white')};
  width: 80%;
  padding: 1% 5%;
  justify-content: center;
  align-items: center;
  margin: auto;
  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`
export const FormItemGenerateCode = styled(Form.Item)`
  width: 100%;
  .ant-form-item-label > label::after {
    content: '';
  }
  line-height: 40px;
`

export const TextAreaGenerateCode = styled(Input.TextArea)`
  width: 100%;
  color: ${themeGet('colors.primaryHover')};
  font-size: ${themeGet('sizes.M')};
  display: flex;
  align-items: center;
  background: ${themeGet('colors.grayBackground')} !important;
  resize: none;
`
export const ButtonGenerateCode = styled(Button)`
  border-radius: 0;
  width: 50%;
  height: 50px;
  font-size: ${themeGet('sizes.M')};
`
export const ScrollList = styled.div`
  width: 100%;
  max-height: 150px;
  overflow-y: scroll;
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    background-color: #ffffff;
  }
  ::-webkit-scrollbar {
    width: 6px;
    background-color: #ffffff;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 6px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: ${themeGet('colors.primary')};
  }
`
export const ButtonCreateTag = styled(Button)`
  border-radius: 0;
  width: 100%;
  height: 50px;
  font-size: ${themeGet('sizes.M')};
`

export const InputNameCode = styled(Input)`
  width: 100%;
  @media screen and (min-width: 1500px) {
    width: 300px;
  }
`
export const InputNumberCode = styled(InputNumber)`
  width: 100%;
  @media screen and (min-width: 1500px) {
    width: 300px;
  }
`
