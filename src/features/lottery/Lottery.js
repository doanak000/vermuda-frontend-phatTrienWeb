/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import {
  DateEndEvent,
  // ImagePrizeBackground,
  TitleEvent,
  WrapperImage,
  VideoPrize,
  WrapperLottery,
  ImagePrize,
  PrizeNameAndRank,
  WrapperError
} from './Lottery.style'
import imagebackground from '../../image/backgroundLottery.png'
import imagePrize from '../../image/prize.jpg'
import { useMutation } from '@apollo/client'
import { MUTATION_EXCHANGE_CODE } from '../../graphql/mutation/exchangeCode.mutation'
import moment from 'moment'
export default function Lottery() {
  const location = useLocation()
  const query = new URLSearchParams(location.search)
  const codeQr = query.get('code')
  const [disappearState, setDisappearState] = useState(false)
  console.log('code', codeQr)
  const myCallback = () => {
    setDisappearState(true)
  }
  const [validCode, setValidCode] = useState(true)
  const [exchangeCodeMutation, { dataCode }] = useMutation(
    MUTATION_EXCHANGE_CODE
  )
  const [dataMutation, setDataMutation] = useState(null)
  console.log('dataCode', dataCode)
  useEffect(() => {
    if (codeQr) {
      exchangeCodeMutation({
        variables: {
          input: `${codeQr}`
        }
      })
        .then((data) => {
          setDataMutation(data?.data?.exchangeCode)
        })
        .catch((err) => {
          console.log(err)
          setValidCode(false)
        })
    }
  }, [])
  console.log(dataMutation)
  return (
    <>
      <WrapperLottery>
        {codeQr === null ? (
          <TitleEvent>An error has occurred.</TitleEvent>
        ) : validCode === false ? (
          <WrapperError>
            <img src='https://firebasestorage.googleapis.com/v0/b/my-project-1532080918145.appspot.com/o/message.png?alt=media&token=caa48d30-8b7c-4709-827d-a26116f57b9c' />
            <TitleEvent>QR code is used.</TitleEvent>
          </WrapperError>
        ) : dataMutation !== null ? (
          <>
            {' '}
            <TitleEvent>{dataMutation?.event?.name}</TitleEvent>
            <VideoPrize
              src={dataMutation?.prize?.video?.url}
              autoPlay={true}
              playsInline={true}
              muted={true}
              preload='yes'
              controls={false}
              onEnded={() => myCallback()}
            />
            <VideoPrize
              autoPlay={true}
              playsInline={true}
              muted={true}
              controls={false}
              // preload='yes'
              preload='metadata'
              width='100%'
              height='100%'
              style={{ display: disappearState ? 'none' : null }}
            />
            {/* <source
                // src='https://media.giphy.com/media/XyIveZZnnuNwksEkKm/source.mp4'
                src={dataMutation?.prize?.video?.url}
                type='video/mp4'
              />
            </VideoPrize> */}
            {/* <WrapperImageBack> */}
            <WrapperImage
              style={{
                backgroundImage: `url(${imagebackground})`,
                display: !disappearState ? 'none' : null
              }}
            >
              <ImagePrize src={dataMutation?.prize?.imageUrl}></ImagePrize>
              <PrizeNameAndRank>
                [{dataMutation?.prize?.rank}] {dataMutation?.prize?.name}
              </PrizeNameAndRank>
            </WrapperImage>
            {/* </WrapperImageBack> */}
            <DateEndEvent>
              End Date:{' '}
              {dataMutation?.expDate &&
                moment(dataMutation?.expDate).format('YYYY.MM.DD')}
            </DateEndEvent>
          </>
        ) : null}
      </WrapperLottery>
    </>
  )
}
