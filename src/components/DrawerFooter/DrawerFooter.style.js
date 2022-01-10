import styled from 'styled-components'
import { themeGet } from '@styled-system/theme-get'
import { Button } from 'antd'
export const ButtonVideo = styled(Button)`
  width: 100%;
  height: 50px;
  text-align: center;
  font-size: ${themeGet('sizes.M')};
`
export const WrapperButtonVideo = styled.div`
  display: flex;
`
