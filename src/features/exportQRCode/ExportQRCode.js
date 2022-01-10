/* eslint-disable no-unused-vars */
import { PDFExport } from '@progress/kendo-react-pdf'
import { Button, Spin } from 'antd'
import moment from 'moment'
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { ExportSpinner } from '../../components/ActionButton/ActionButton.style'
import { Notification } from '../../components/Notification/Notification'
import QrCodeList from '../../components/QrCodeList/QrCodeList'
import {
  resetData,
  selectData
} from '../createUpdateDelete/createUpdateDeleteSlice'

const ExportQRCode = () => {
  const data = useSelector(selectData) || []
  const pdfExportComponent = useRef(null)
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const exportHandler = () => {
    return new Promise((resolve, reject) => {
      try {
        pdfExportComponent.current.save()
      } catch (err) {
        reject(err)
      }
      return resolve('success')
    })
  }

  console.log(JSON.parse(localStorage.getItem('dataQr')))

  return (
    <div
    // style={{
    //   position: 'absolute',
    //   left: '-1000000px',
    //   top: 0
    // }}
    >
      <div>
        <Button
          type='primary'
          onClick={() => {
            dispatch(resetData())
            history.goBack()
          }}
          style={{ marginRight: '1rem' }}
        >
          Return
        </Button>
        <Button
          type='primary'
          onClick={() => {
            setLoading(true)
            exportHandler()
              .then((rs) => {
                setLoading(false)
              })
              .catch((_) => {
                // Notification()
                setLoading(false)
              })
          }}
          loading={loading}
        >
          {/* {loading && <ExportSpinner />} */}
          Export QR
        </Button>
      </div>

      <PDFExport
        paperSize='A4'
        landscape='false'
        fileName={
          (JSON.parse(localStorage.getItem('dataQr'))?.qrmanages?.qrmanages[0]
            ?.event?.name ||
            JSON.parse(localStorage.getItem('dataQr'))?.event?.name) +
          '-' +
          moment().valueOf()
        }
        ref={pdfExportComponent}
      >
        {QrCodeList.length !== 0 && (
          <div style={{}}>
            <QrCodeList
            // data={data}
            ></QrCodeList>
          </div>
        )}
      </PDFExport>
    </div>
  )
}

export default ExportQRCode
