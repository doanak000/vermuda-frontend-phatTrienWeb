import styled from 'styled-components'
import { themeGet } from '@styled-system/theme-get'
import { Button, Spin, Form } from 'antd'
export const WrapperLogin = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  background: ${themeGet('colors.white')};
`
export const WrapperLoginForm = styled.div`
  padding: calc(3 * ${themeGet('spaces.container')}px);
  box-shadow: 7px 7px 2px 1px #aca5bb;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 5px solid ${themeGet('colors.grayBackground')};
  border-left: 5px solid ${themeGet('colors.grayBackground')};
  border-radius: 17px;

  @media only screen and (min-height: 1300px) {
    min-height: 45vh;
    width: 45vh;
  }
  @media only screen and (max-height: 700px) {
    padding: calc(1 * ${themeGet('spaces.container')}px);
  }
`
export const TitleLogin = styled.p`
  text-align: center;
  font-weight: 700;
  font-size: 3rem;
  background: -webkit-linear-gradient(#814a8c, ${themeGet('colors.primary')});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 10px;
`
export const LoginLable = styled.span`
  font-size: ${themeGet('sizes.M')};
  padding-right: 30px;
  font-weight: 500;
`
export const LoginButton = styled(Button)`
  padding-left: 31px;
  padding-right: 31px;
  height: 40px;
  width: 125px;
  :disabled {
    background-color: ${themeGet('colors.primary')} !important;
    border: 1px solid ${themeGet('colors.primary')};
  }
`
export const LoginSpinner = styled(Spin)`
  .ant-spin-dot-item {
    background-color: white !important;
  }
`

export const FormLogin = styled(Form)`
  .ant-form-item-explain.ant-form-item-explain-error {
    text-align: right;
  }
`
