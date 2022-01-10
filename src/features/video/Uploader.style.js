import styled from 'styled-components'
import { themeGet } from '@styled-system/theme-get'
import { Button } from 'antd'

export const Text = styled.span`
  color: ${themeGet('colors.primary')};
  margin: 0 5px;
  text-align: center;
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const TextHighlighted = styled.span`
  display: flex;
  color: ${themeGet('colors.primary')};
  font-weight: bold;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  border-color: #e6e6e6;
  border-style: dashed;
  background-color: #ffffff;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
  cursor: pointer;
  height: 160px;
  width: 100% !important;
`
export const IconUpload = styled.div`
  padding: 0;
  margin: 0;
  font-size: 50px;
`
export const PrizeHighlighted = styled.span`
  color: ${themeGet('colors.primary')};
  font-weight: bold;
  padding: 0 1rem;
`

export const BannerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  border-color: #e6e6e6;
  border-style: dashed;
  background-color: #ffffff;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
  cursor: pointer;
  height: 100px;
  width: 100%;
`

export const PrizeContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
  cursor: pointer;
  height: 48px;
  width: 100%;
`

export const CloseButton = styled(Button)`
  display: flex;

  cursor: pointer;
  width: 25px;
  height: 25px;

  color: red;
  outline: 0;
  border: none;
`

export const FileItemWrapper = styled.div`
  display: flex;
  flex-direction: row;

  border: 1px solid #ddd;
  padding: 5px 10px;
`

export const ImageName = styled.a`
  display: flex;

  overflow: hidden;
`

export const VideoName = styled.a`
  display: flex;
  flex-direction: row;

  /* width: calc(100% - 90px); */
`

export const FileName = styled.span`
  width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const FileSize = styled.span`
  align-items: base-line;
`

export const ButtonContainer = styled.a`
  display: flex;

  padding: 5px;
`

export const CloseContainer = styled.a`
  width: 15px;
  height: 15px;
`
export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  align-items: center;
  justify-content: center;
  height: 75px;
  /* width: calc(100% - 90px); */
`
export const VideoUpContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-width: 2px;
  border-radius: 2px;
  background-color: #ffffff;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
  cursor: pointer;
`
export const ContainerVideo = styled.div`
  width: 100%;
  position: relative;
  flex-direction: column;
  align-items: center;
  padding: 0.3rem;

  border-width: 2px;
  border-radius: 2px;

  background-color: #ffffff;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
  cursor: pointer;
`

export const ThumbsContainer = styled.aside`
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 0.2rem;
  margin-right: -0.3rem;
  margin-bottom: -0.3rem;
`

export const Thumb = styled.div`
  display: inline-flex;
  position: relative;
  border-radius: 2px;
  margin-top: 10px;
  margin-right: 10px;
  width: 75px;
  height: 75px;
  padding: 4px;
`

export const ThumbInner = styled.div`
  display: flex;

  overflow: hidden;
`

export const VideoTag = styled.video`
  display: block;
  width: auto;
  height: 100%;
`

export const ThumbButton = styled(Button)`
  position: absolute;
  top: 7px;
  right: 7px;
  outline: 0;
  border: none;
  padding: 0;
  display: flex;
  margin: auto;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  // background-color: rgb(0;0;0;0.35);
  width: 18px;
  height: 18px;
  border-radius: 50%;
  color: red;
`
export const LabelUpload = styled.div`
  height: 48px;

  border-radius: 0;
  background-color: rgb('221;221;221');
  justify-content: center;
  align-items: center;
  display: flex;
`
