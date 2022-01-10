import styled from 'styled-components'
import { themeGet } from '@styled-system/theme-get'
import Div100vh from 'react-div-100vh'

export const WrapperLottery = styled.div`
  width: 100%;
  text-align: center;
  background-color: ${themeGet('colors.lotteryBackground')};
  min-height: 100vh;
  @media screen and (max-width: 1200px) {
    padding-top: 0vh;
  }
`
export const WrapperError = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  height: 95vh;
`
export const TitleEvent = styled.p`
  color: white;
  font-size: ${themeGet('sizes.SuperBig')};
  padding-top: 8vh;
  margin-bottom: 0;
  padding-bottom: 0;
  min-width: 200px;
  @media screen and (max-width: 1024px) {
    padding-top: 5vh;
  }
  @media screen and (max-width: 768px) {
    margin-bottom: 10vh;
  }
  @media screen and (max-width: 1024px) and (min-height: 1200px) {
    padding-top: 15vh;
  }
`
export const VideoPrize = styled.video`
  position: relative;
  z-index: 1000;
  width: 1100px;
  display: block;
  margin: auto;
  height: 70vh;
  border-radius: 20px;
  background-size: cover;
  background-position: center;

  // padding-bottom: 5rem;

  @media (max-width: 1024px) {
    max-width: 800px;
    // padding-bottom: 2rem;
  }
`
export const DateEndEvent = styled.p`
  color: white;
  font-size: ${themeGet('sizes.XXL')};
  margin-bottom: 0;
  padding-bottom: 0;
  @media screen and (min-width: 768px) {
    position: absolute;
    width: 100%;
    bottom: 3rem;
  }
`
// export const DateEndEvent = styled.p`
//   color: white;
//   font-size: ${themeGet('sizes.XXL')};
//   margin-bottom: 0;
//   padding-bottom: 0;
//   @media screen and (min-width: 768px) {
//     text-align: right;
//     padding-right: 3vw;
//   }
// `
export const WrapperImageBack = styled.div``
export const WrapperImage = styled.div`
  max-width: 1100px;
  margin: auto;
  height: 70vh;
  border-radius: 20px;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: column;
  padding-bottom: 5rem;

  @media (max-width: 1024px) {
    max-width: 800px;
    padding-bottom: 2rem;
  }
`
export const ImagePrize = styled.img`
  width: 450px;
  object-fit: contain;
  margin-bottom: 2rem;

  @media (max-width: 1024px) {
    width: 40vw;
  }
`
export const PrizeNameAndRank = styled.p`
  font-size: ${themeGet('sizes.XXL')};
  color: #26578a;
  @media screen and (max-width: 960px) {
    padding-bottom: 40px;
  }
  @media screen and (max-width: 500px) {
    font-size: ${themeGet('sizes.L')};
  }
`

// ================Lam=========================
export const LotteryWrapper = styled(Div100vh)`
  background-color: #74daf7;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const EventName = styled.h1`
  margin: 0;
  color: white;
  font-weight: 700;
  font-size: 1.7rem;
`

export const Expired = styled.h1`
  margin: 0;
  color: white;
  font-weight: 700;
  font-size: 1.7rem;

  @media (max-width: 500px) and (min-height: 500px) {
    font-size: 1.3rem;
  }
  @media (max-width: 1000px) and (max-height: 500px) {
    font-size: 1.3rem;
  }
`

export const ContentWrapper = styled.div`
  background-color: white;
  max-width: 1000px;
  width: 85vw;
  height: 70vh;
  border-radius: 20px;
  overflow: hidden;
  margin: 1.5rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  @media (min-height: 900px) and (max-width: 768px) {
    height: 40vh;
  }
  @media (min-height: 900px) and (max-width: 1024px) {
    height: 40vh;
  }
  @media (max-width: 500px) and (min-height: 500px) {
    height: 200px;
  }
  @media (max-width: 1000px) and (max-height: 500px) {
    width: 500px;
    margin: 0.5rem 0;
  }
`

export const PrizeImg = styled.img`
  width: 40%;
  height: 45%;
  object-fit: contain;
`

export const PrizeVideo = styled.video`
  display: block;
  object-fit: cover;
  border-radius: 20px;
  width: 100%;
  height: 100%;
`

export const PrizeWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 3rem;
`

export const PrizeName = styled.h1`
  margin: 0;
  color: white;
  font-weight: 700;
  font-size: 1.7rem;
  color: ${themeGet('colors.primary')};
  margin-top: 2rem;
  max-width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-height: 42px;

  @media (max-width: 500px) and (min-height: 500px) {
    font-size: 1.3rem;
  }
  @media (max-width: 1000px) and (max-height: 500px) {
    font-size: 1.3rem;
  }
`
