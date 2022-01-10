import styled from 'styled-components'
import { themeGet } from '@styled-system/theme-get'
import { Form, Drawer, Button } from 'antd'

export const DrawerAdd = styled(Drawer)`
  .ant-drawer-content-wrapper {
    width: ${themeGet('widthDrawer')} !important;
  }
  .ant-drawer-header {
    background-color: ${themeGet('colors.primary')} !important;

    border-radius: 0px;
  }
  .ant-drawer-title {
    color: ${themeGet('colors.white')};
    font-size: ${themeGet('sizes.M')} !important;
  }
`
export const LableAdd = styled.p`
  font-size: ${themeGet('sizes.M')};
  display: block;
  color: ${themeGet('colors.primary')};
`
export const FormAdd = styled(Form)`
  .ant-form-item {
    display: block;
  }
  .ant-form-item-required::after {
    content: '';
  }
  .ant-form-item-explain.ant-form-item-explain-error {
    text-align: right;
  }
`
export const ButtonVideo = styled(Button)`
  width: 100%;
  height: 50px;
  text-align: center;
  font-size: ${themeGet('sizes.M')};
`
export const WrapperButtonVideo = styled.div`
  display: flex;
`
