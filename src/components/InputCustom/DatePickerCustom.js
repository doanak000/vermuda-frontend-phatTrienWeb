import styled from 'styled-components'
import { themeGet } from '@styled-system/theme-get'
import { DatePicker } from 'antd'
export const DatePickerCustom = styled(DatePicker)`
  width: 100%;
  height: 50px !important;
  color: ${themeGet('colors.primaryHover')} !important;
  font-size: ${themeGet('sizes.M')};
  display: flex;
  align-items: center;
  background: ${themeGet('colors.grayBackground')} !important;
  .ant-picker-input > input {
    color: ${themeGet('colors.primaryHover')} !important;
    font-size: ${themeGet('sizes.M')};
  }
`
