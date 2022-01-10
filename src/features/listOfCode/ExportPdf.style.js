import styled from 'styled-components'
import { themeGet } from '@styled-system/theme-get'

export const WrapperQRCode = styled.div`
  color: ${themeGet('colors.primary')};
  display: block;
  padding: 20px 10px;
  margin-left: auto;
  margin-right: auto;
  p {
    text-align: center;
    padding-bottom: 0;
    margin-bottom: 0;
  }
`
export const TitleGroupQRCode = styled.h1`
  text-align: center;
  padding-top: 10px;
  margin-bottom: 0;
  transform: scale(2, 2);
`
