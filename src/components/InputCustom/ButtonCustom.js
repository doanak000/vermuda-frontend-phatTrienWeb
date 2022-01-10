import styled from 'styled-components'
import { themeGet } from '@styled-system/theme-get'
import { Popconfirm, Typography } from 'antd'

export const ButtonEdit = styled(Typography.Link)`
  width: 100%;
  background-color: ${themeGet('colors.primary')};
  color: white !important;
  display: block !important;
  text-align: center !important;
  align-items: center !important;
  justify-content: center !important;
`
export const ButtonDelete = styled(Popconfirm)`
  width: 100%;
  border: 1px solid ${themeGet('colors.primary')};
  display: block !important;
  align-items: center !important;
  justify-content: center !important;
  padding-top: 2px;
`
