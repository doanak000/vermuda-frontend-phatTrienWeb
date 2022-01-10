import styled from 'styled-components'
import { themeGet } from '@styled-system/theme-get'

export const WrapperQRCode = styled.div`
  color: ${themeGet('colors.primary')};
  display: block;
  padding: 30px 10px;
  padding-left: 15px;

  position: relative;
  p {
    text-align: center;
    padding-bottom: 0;
    margin-bottom: 0;
  }
  border: 1px dotted black;

  border-radius: 5px;
  margin: 10px;
  margin-bottom: 44px;
  height: 220px;
`
export const TitleGroupQRCode = styled.h1`
  text-align: center;
  padding-top: 10px;
  margin-bottom: 0;
  transform: scale(2, 2);
`
export const NameEventQR = styled.p`
  width: 100%;
  padding-left: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  padding-bottom: 0;
  margin-bottom: 0;
  position: absolute;
  top: 5%;
  left: 50%;
  transform: translateX(-50%);
`
export const DateQR = styled.p`
  text-align: center;
  padding-bottom: 0;
  margin-bottom: 0;
  position: absolute;
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-left: 5px;
  width: 100%;
`
export const ImageQrCodeList = styled.img`
  max-width: 60px;
  max-height: 20px;
  padding-bottom: 5px;
  object-fit: contain;

  /* transform: scale(0.7); */
`
export const TextQr = styled.span`
  /* display: inline-block;
  padding-bottom: 5px;
  margin-bottom: 5px;
  height: 5px; */
  /* transform: scale(0.9); */
  /* font-size: 10px; */
`
