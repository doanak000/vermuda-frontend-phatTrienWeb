import React from 'react'
import QRCode from 'qrcode.react'

import {
  DateQR,
  ImageQrCodeList,
  NameEventQR,
  WrapperQRCode,
  TextQr
} from './QrCodeList.style'
import moment from 'moment'
import { PATH } from '../../constants/common'
import { useLocation } from 'react-router'
import QrCodeTitle from '../../image/QrCodeTitle.png'
import QrDate from '../../image/QrDate.png'
const listQRFakeRender = (length) => {
  const listQRFake = new Array(length)
  for (let i = 0; i < listQRFake.length; i++) {
    listQRFake[i] = i
  }
  return listQRFake.map((item, index) => {
    return (
      <>
        {/* <div style={{ width: '170px', height: '218px', visibility: 'hidden' }}>
          al2o+{item}
        </div> */}
        <WrapperQRCode style={{ visibility: 'hidden' }}>
          {' '}
          <NameEventQR>fake</NameEventQR>
          <QRCode
            id='fake'
            value='fake'
            size={160}
            level={'H'}
            includeMargin={true}
            // style={{ transform: 'scale(0.9,0.9)' }}
          />
          <DateQR>{moment().format('YYYY.MM.DD')}</DateQR>
        </WrapperQRCode>
      </>
    )
  })
}
// const truncate = (input) =>
//   input.length > 12 ? `${input.substring(0, 12)}...` : input

const QrCodeList = (props) => {
  const listOfCode =
    // props?.data.length > 0
    //   ? props?.data
    //   :
    JSON.parse(localStorage.getItem('dataQr'))
  console.log('listOfCode', listOfCode)
  const location = useLocation()
  let lengthQrCodeFake = 0
  const listQR =
    listOfCode && location.search === `?from=${PATH.EVENT.slice(1)}` ? (
      <>
        {listOfCode?.event?.prizes?.map((listOfCodeitem, index) => {
          lengthQrCodeFake += listOfCodeitem?.serialCodes.length
          return (
            <>
              {listOfCodeitem?.serialCodes?.map(
                (listOfCodeItemSerialCode, idx) => {
                  // console.log(listOfCodeItemSerialCode.code)
                  return (
                    <>
                      <WrapperQRCode>
                        <NameEventQR>
                          {/* {truncate(listOfCode[0]?.name)} */}
                          {`${listOfCodeItemSerialCode.code}`}
                        </NameEventQR>
                        <QRCode
                          id={listOfCodeitem.id}
                          value={
                            window.location.origin.toString() +
                            '' +
                            `${PATH.LOTTERY}` +
                            '?code=' +
                            listOfCodeItemSerialCode.code
                          }
                          size={160}
                          level={'H'}
                          includeMargin={true}
                          // style={{ transform: 'scale(0.9,0.9)' }}
                        />
                        <DateQR>
                          <ImageQrCodeList src={QrDate}></ImageQrCodeList>
                          {`${moment(listOfCodeItemSerialCode.expDate).format(
                            'YYYY.MM.DD'
                          )}`}
                        </DateQR>
                      </WrapperQRCode>
                    </>
                  )
                }
              )}
            </>
          )
        })}
        {listQRFakeRender(4 - (lengthQrCodeFake % 4 || 0))}
      </>
    ) : (
      listOfCode && (
        <>
          {listOfCode?.qrmanages?.qrmanages[0]?.serialCodes?.map(
            (listOfCodeItemSerialCode, idx) => {
              return (
                <>
                  <WrapperQRCode>
                    {/* <NameEventQR>{truncate(listOfCode[0]?.name)}</NameEventQR> */}
                    <NameEventQR>
                      {/* {truncate(`QR: ${listOfCodeItemSerialCode.code}`)} */}
                      
                      <TextQr>{` ${listOfCodeItemSerialCode.code}`}</TextQr>
                    </NameEventQR>
                    <QRCode
                      id={idx}
                      value={
                        window.location.origin.toString() +
                        '' +
                        `${PATH.LOTTERY}` +
                        '?code=' +
                        listOfCodeItemSerialCode.code
                      }
                      size={160}
                      level={'H'}
                      includeMargin={true}
                      // style={{ transform: 'scale(0.9,0.9)' }}
                    />
                    <DateQR>
                      
                      {` ${moment(listOfCodeItemSerialCode.expDate).format(
                        'YYYY.MM.DD'
                      )}`}
                    </DateQR>
                  </WrapperQRCode>
                </>
              )
            }
          )}
          {listQRFakeRender(
            4 -
              (listOfCode?.qrmanages?.qrmanages[0]?.serialCodes?.length % 4 ||
                0)
          )}
        </>
      )
    )

  return (
    <>
      <div
        style={{
          maxWidth: '1100px',
          display: 'grid',
          gridTemplateColumns: 'auto auto auto auto',
          marginTop: '40px',
          marginBottom: '40px'
          // minHeight: '700px'
          // display: 'flex',
          // flexWrap: 'wrap'
        }}
      >
        {listQR}
      </div>
    </>
  )
}
export default QrCodeList
