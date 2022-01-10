import styled from 'styled-components'
import { themeGet } from '@styled-system/theme-get'
import { Select } from 'antd'
export const SelectCustom = styled(Select)`
  min-width: 200px;
  display: block;
  .ant-select-selector {
    height: 50px !important;
    color: ${themeGet('colors.primaryHover')};
    font-size: ${themeGet('sizes.M')};
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${themeGet('colors.grayBackground')} !important;
  }
`
