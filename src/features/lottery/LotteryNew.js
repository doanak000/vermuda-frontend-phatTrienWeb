/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react'
import {
  EventName,
  Expired,
  LotteryWrapper,
  ContentWrapper,
  PrizeImg,
  PrizeVideo,
  PrizeWrapper,
  PrizeName
} from './Lottery.style'
import imagebackground from '../../image/backgroundLottery.png'
import imagebackgroundNoPrize from '../../image/background-noprize.png'
import prizeImg from '../../image/prize.jpg'
import { Spin } from 'antd'
import { useLocation } from 'react-router'
import { useMutation } from '@apollo/client'
import { MUTATION_EXCHANGE_CODE } from '../../graphql/mutation/exchangeCode.mutation'
import moment from 'moment'
// import confetti from '../../components/confetti/confetti'

const Lottery = (props) => {
  const test = true
  const [showPrize, setShowPrize] = useState(false)
  const location = useLocation()
  const query = new URLSearchParams(location.search)
  const codeQr = query.get('code')

  const [exchangeCodeMutation, { data }] = useMutation(MUTATION_EXCHANGE_CODE)
  const [error, setError] = useState(false)

  console.log(data)
  useEffect(() => {
    if (codeQr) {
      exchangeCodeMutation({
        variables: {
          input: `${codeQr}`
        }
      }).catch((err) => {
        setError(err)
      })
    }
  }, [codeQr])

  if (error) {
    return (
      <LotteryWrapper>
        <ContentWrapper
          style={{
            background: '#74daf7'
          }}
        >
          <Expired>
            {error?.message === 'Lottery'
              ? 'This lottery has been drawn'
              : error?.message || 'The QR code has expired.'}
          </Expired>
        </ContentWrapper>
      </LotteryWrapper>
    )
  }

  const prizeData = data?.exchangeCode || {}

  return (
    <LotteryWrapper>
      <EventName>{prizeData?.event?.name}</EventName>
      <ContentWrapper
        style={{
          background: showPrize
            ? `url(${
                test ? imagebackground : imagebackgroundNoPrize
              }) no-repeat center center/cover`
            : 'white'
        }}
      >
        {/* <PrizeImg src={prizeImg} /> */}
        {!showPrize ? (
          <PrizeVideo
            src={prizeData?.prize?.video?.url}
            playsInline
            autoPlay
            muted={true}
            preload='metadata'
            controls={false}
            onEnded={() => {
              setShowPrize(true)
              !error && require('../../components/confetti/confetti')
              // frameSchoolPride()
            }}
          />
        ) : (
          <PrizeWrapper>
            <PrizeImg src={prizeData?.prize?.imageUrl} />
            <PrizeName>{prizeData?.prize?.name}</PrizeName>
          </PrizeWrapper>
        )}
        {/* {videoLoading && <Spin style={{ display: 'inline' }} />} */}
      </ContentWrapper>
      <Expired>{`Event end time ${moment(prizeData?.event?.endTime).format(
        'YYYY.MM.DD'
      )}`}</Expired>
    </LotteryWrapper>
  )
}

export default Lottery
