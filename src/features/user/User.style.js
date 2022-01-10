import styled from 'styled-components'
import { themeGet } from '@styled-system/theme-get'
import { Form } from 'antd'

export const LableAddUser = styled.p`
  font-size: ${themeGet('sizes.M')};
  display: block;
  color: ${themeGet('colors.primary')};
`
export const FormAddUser = styled(Form)`
  .ant-form-item {
    display: block;
  }
  .ant-form-item-required::after {
    content: '';
  }
`
