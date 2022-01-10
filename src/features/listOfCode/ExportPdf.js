import React, { useRef } from 'react'
import { ButtonListOfCode } from './ListOfCode.style'
import { useSelector } from 'react-redux'
import { selectListOfCode } from '../generateCode/generateCodeSliceQR'
import QRCode from 'qrcode.react'
import { PDFExport } from '@progress/kendo-react-pdf'
import { TitleGroupQRCode, WrapperQRCode } from './ExportPdf.style'
const listQRFakeRender = (length) => {
  const listQRFake = new Array(length)
  for (let i = 0; i < listQRFake.length; i++) {
    listQRFake[i] = i
  }
  return listQRFake.map((item, index) => {
    return (
      <>
        <div style={{ width: '170px', height: '218px', visibility: 'hidden' }}>
          al2o+{item}
        </div>
      </>
    )
  })
}
const ExportPdf = () => {
  const listOfCode = useSelector(selectListOfCode)
  const pdfExportComponent = useRef(null)

  const listQR = listOfCode.map((listOfCodeitem, index) => {
    return (
      <>
        <TitleGroupQRCode>
          {'  QR code of : ' + listOfCodeitem[0].name}
        </TitleGroupQRCode>
        <div
          style={{
            maxWidth: '1000px',
            display: 'grid',
            gridTemplateColumns: 'auto auto auto auto'
            // display: 'flex', flexWrap: 'wrap'
          }}
        >
          {listOfCodeitem.map((item, index) => {
            return (
              <>
                <WrapperQRCode>
                  <QRCode
                    id='qrcode'
                    value='999999999'
                    size={150}
                    level={'H'}
                    includeMargin={true}
                    // style={{ transform: 'scale(0.9,0.9)' }}
                  />

                  <p>{item.name}</p>
                  <p>{item.randomCode}</p>
                  <p>{item.date}</p>
                </WrapperQRCode>
              </>
            )
          })}
          {listQRFakeRender(4 - (listOfCodeitem.length % 4))}
        </div>
      </>
    )
  })

  return (
    <>
      <div style={{ display: 'flex' }}>
        <ButtonListOfCode radius='left'>Save Data</ButtonListOfCode>
        <ButtonListOfCode
          radius='right'
          getColor={true}
          onClick={() => {
            pdfExportComponent.current.save()
          }}
        >
          EXPORT PDF
        </ButtonListOfCode>
      </div>
      <div
        style={{
          position: 'absolute',
          left: '-1000000px',
          top: 0
        }}
      >
        <PDFExport
          paperSize='A4'
          landscape='true'
          fileName={'ChanceCard'}
          ref={pdfExportComponent}
        >
          {listQR.length !== 0 && (
            <div style={{ fontSize: '30px !important' }}>{listQR}</div>
          )}
        </PDFExport>
      </div>
    </>
  )
}
export default ExportPdf
