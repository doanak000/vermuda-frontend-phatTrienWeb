import styled from 'styled-components'
import { themeGet } from '@styled-system/theme-get'
import { InputNumber } from 'antd'
export const InputNumberCustom = styled(InputNumber)`
  width: 100%;
  height: 50px !important;
  color: ${themeGet('colors.primaryHover')};
  font-size: ${themeGet('sizes.M')};
  display: flex;
  align-items: center;
  background: ${themeGet('colors.grayBackground')} !important;
  .ant-input-number-input-wrap {
    width: 100%;
  }
`
