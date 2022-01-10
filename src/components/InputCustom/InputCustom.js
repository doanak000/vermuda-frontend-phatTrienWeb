import styled from 'styled-components'
import { themeGet } from '@styled-system/theme-get'
import { Input } from 'antd'
export const InputCustom = styled(Input)`
  width: 100%;
  height: 50px !important;
  color: ${themeGet('colors.primaryHover')};
  font-size: ${themeGet('sizes.M')};
  display: flex;
  align-items: center;
  background: ${themeGet('colors.grayBackground')} !important;
  .ant-input-input-wrap {
    width: 100%;
  }
`
