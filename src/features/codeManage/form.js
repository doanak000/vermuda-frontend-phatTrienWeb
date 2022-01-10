/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
/* eslint-disable max-lines */
import React, { useState, useEffect, useRef } from 'react'
import { Form, Input, DatePicker, Select, Spin } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { selectTranslation } from '../language/languageSlice'
import { QUERY_EVENTS } from '../../graphql/query/event.query'
import { useQuery, useMutation } from '@apollo/client'
import {
  MUTATION_QR_MANAGE,
  UPDATE_QR_MANGES
} from '../../graphql/mutation/qrmanage.mutaion'
import moment from 'moment'
import {
  setVisibleDrawer,
  selectData,
  selectVisibleDrawer,
  resetData
} from '../createUpdateDelete/createUpdateDeleteSlice'
import { Notification } from '../../components/Notification/Notification'
import { NOTIFICATION_TYPE } from '../../constants/common'
import {
  WrapperPercentAndCount,
  Percent,
  Amount,
  Label,
  FormQR
} from './form.style'
import './style.css'
import { debounce } from '../../helper/debounce'

// import { handleKeyPress } from '../../helper/enterSubmit'
const truncate = (input) =>
  input.length > 60 ? `${input.substring(0, 60)}...` : input
const FormQrManage = (props) => {
  const [form] = Form.useForm()
  const translation = useSelector(selectTranslation)
  const dispatch = useDispatch()
  const [searchTextEvent, setSearchTextEvent] = useState('')
  const { data, loading } = useQuery(QUERY_EVENTS, {
    variables: {
      searchText: searchTextEvent
    },
    fetchPolicy: 'network-only'
  })
  const [totalCode, setTotalCode] = useState(0)
  const [newPrizes, setNewPrizes] = useState([])
  const [createQrmanage] = useMutation(MUTATION_QR_MANAGE, {
    fetchPolicy: 'no-cache'
  })
  const [updateQrmanage] = useMutation(UPDATE_QR_MANGES)
  // const { prizes } = data?.events.events[0] ?? []
  const [listPrizesByEvent, setListPrizesByEvent] = useState([])
  const [disabled, setDisabled] = useState(true)
  const selectedRows = useSelector(selectData)
  const visibleDrawer = useSelector(selectVisibleDrawer)
  const RefSelectEventId = useRef(null)
  const [selectEvent, setSelectEvent] = useState()
  useEffect(() => {
    if (visibleDrawer && !selectedRows?.length) {
      form.resetFields()
    }
    if (!visibleDrawer) {
      dispatch(resetData())
      setListPrizesByEvent([])
      setNewPrizes([])
      setTotalCode(0)
      setDisabled(true)
    }
  }, [visibleDrawer])

  // useEffect(() => {
  //   if (!loading) setListPrizesByEvent(prizes)
  // }, [loading])
  useEffect(() => {
    visibleDrawer && RefSelectEventId.current.focus()
  }, [visibleDrawer])
  useEffect(() => {
    if (selectedRows) {
      console.log('select', selectedRows[0])
      form.setFieldsValue({
        eventId: selectedRows[0]?.eventId,
        totalCode: selectedRows[0]?.countSerialCodes,
        exTime: moment(selectedRows[0]?.expDate),
        memo: selectedRows[0]?.memo
      })
    } else
      form.setFieldsValue({
        // exTime: moment()
      })
  }, [selectedRows, visibleDrawer])
  const onFinish = async (values) => {
    props?.setSubmitLoading(true)
    const endDateQR = values.exTime._d
    const expTime = moment(endDateQR).format('YYYY/MM/DD')
    try {
      if (selectedRows && selectedRows?.length === 1) {
        await updateQrmanage({
          variables: {
            id: selectedRows[0].key.toString(),
            input: {
              memo: values.memo
            }
          }
        })
          .then(() => {
            Notification({
              type: NOTIFICATION_TYPE.SUCCESS,
              message: translation.NOTI_UPDATE_SUCCESS
            })
            props.refetch()
            dispatch(setVisibleDrawer(false))
            dispatch(resetData())
            form.resetFields()
            setNewPrizes([])
          })
          .catch(() => {
            Notification({
              type: NOTIFICATION_TYPE.ERROR,
              message: translation.NOTI_UPDATE_ERROR
            })
          })
      } else {
        const found = data?.events?.events?.find(
          (item) => item.id === values.eventId
        )
        const prizes = []

        for (let index = 0; index < found.prizes.length; index++) {
          if (
            parseFloat(newPrizes[index].lastValue) /
              parseInt(newPrizes[index].lastValue) !==
            1
          ) {
            throw new Error('The number of prizes must be an integer.')
          }
          prizes.push({
            id: found.prizes[index].id,
            numberOfCode: parseFloat(newPrizes[index].lastValue)
          })
        }

        await createQrmanage({
          variables: {
            createQrmanageInput: {
              eventId: values.eventId,
              expDate: expTime,
              memo: values.memo,
              prizes: prizes || []
            }
          }
        })
          .then(() => {
            Notification({
              type: NOTIFICATION_TYPE.SUCCESS,
              message: translation.NOTI_CREATE_SUCCESS
            })
            props.refetch()
            dispatch(setVisibleDrawer(false))
            form.resetFields()
            setNewPrizes([])
          })
          .catch(() => {
            Notification({
              type: NOTIFICATION_TYPE.ERROR,
              message: translation.NOTI_CREATE_ERROR
            })
          })
      }
      props?.setSubmitLoading(false)
    } catch {
      Notification({
        type: NOTIFICATION_TYPE.ERROR,
        message: translation.NOTI_CREATE_ERROR
      })
      props?.setSubmitLoading(false)
    }
  }

  const handleChangePercent = (e, item) => {
    const temPrizes = [...newPrizes]
    const _value = e.target.value
    const index = temPrizes.findIndex((itx) => itx.id === item.id)
    let tempTotal = 0
    for (let i = 0; i < index; i++) {
      tempTotal += parseFloat(temPrizes[i].firstValue)
    }
    tempTotal += parseFloat(_value)
    if (tempTotal > 100) {
      return
    }
    temPrizes[index].firstValue = _value
    temPrizes[index].lastValue = numberWithCommas((totalCode / 100) * _value)
    let tmp = [
      ...temPrizes,
      temPrizes[index].firstValue,
      temPrizes[index].lastValue
    ]
    let totalFist = 0
    for (let i = index; i >= 0; i--) {
      totalFist += parseFloat(temPrizes[i].firstValue)
    }
    const percentTemp = (100 - totalFist) / (temPrizes.length - index - 1)
    for (let i = index + 1; i < temPrizes.length; i++) {
      temPrizes[i].firstValue = numberWithCommas(percentTemp) || 0
      temPrizes[i].lastValue =
        numberWithCommas((totalCode / 100) * percentTemp) || 0
      tmp = [...temPrizes, temPrizes[i].firstValue, temPrizes[i].lastValue]
    }
    console.log('temPrizes', temPrizes)
    setListPrizesByEvent(tmp)
  }

  const dataFilterEvent = data?.events?.events?.map((item, i) => (
    <Select.Option key={i} value={item.id}>
      {item.name}
    </Select.Option>
  ))

  const handleChangeAmount = (e, item) => {
    const temPrizes = [...newPrizes]

    const _value = e.target.value
    const index = temPrizes.findIndex((itx) => itx.id === item.id)
    let tempTotal = 0
    for (let i = 0; i < index; i++) {
      tempTotal += parseFloat(temPrizes[i].lastValue)
    }
    tempTotal += parseFloat(_value)
    if (tempTotal > totalCode) {
      return
    }
    console.log('temPrizes', temPrizes)
    temPrizes[index].firstValue = numberWithCommas((100 * _value) / totalCode)
    temPrizes[index].lastValue = _value
    let tmp = [
      ...temPrizes,
      temPrizes[index].firstValue,
      temPrizes[index].lastValue
    ]

    let totalLast = 0
    for (let i = index; i >= 0; i--) {
      totalLast += parseFloat(temPrizes[i].lastValue)
    }
    const percentTemp = (totalCode - totalLast) / (temPrizes.length - index - 1)
    for (let i = index + 1; i < temPrizes.length; i++) {
      temPrizes[i].firstValue =
        numberWithCommas((percentTemp * 100) / totalCode) || 0
      temPrizes[i].lastValue = numberWithCommas(percentTemp) || 0
      tmp = [...temPrizes, temPrizes[i].firstValue, temPrizes[i].lastValue]
    }
    setListPrizesByEvent(tmp)
  }

  const handleChangeOption = (e) => {
    form.setFieldsValue({
      exTime: null
    })
    if (e) {
      const optionChoose = data?.events?.events?.filter((item) => item.id === e)
      setListPrizesByEvent(optionChoose[0].prizes)
      setSelectEvent(optionChoose[0])
      const tmpArr = []
      const percentVal =
        100 % optionChoose[0].prizes?.length === 0
          ? 100 / optionChoose[0].prizes?.length
          : (100 - (100 % optionChoose[0].prizes?.length)) /
            optionChoose[0].prizes?.length
      console.log('percentVal', percentVal)
      const amountVal =
        ((100 / optionChoose[0].prizes?.length) * totalCode) / 100
      tmpArr.push({
        id: 1,
        namePrize: optionChoose[0].prizes[0].name,
        rankPrize: optionChoose[0].prizes[0].rank,
        firstValue:
          100 % optionChoose[0].prizes?.length === 0
            ? percentVal
            : percentVal + (100 % optionChoose[0].prizes?.length),
        lastValue: amountVal
      })
      for (let i = 1; i < optionChoose[0].prizes?.length; i++) {
        tmpArr.push({
          id: i + 1,
          namePrize: optionChoose[0].prizes[i].name,
          rankPrize: optionChoose[0].prizes[i].rank,
          firstValue: percentVal,
          lastValue: amountVal
        })
      }
      setNewPrizes(tmpArr)
    }
  }

  const handleChangeTotalCode = (e) => {
    const val = parseInt(e.target.value)
    if (val > 1000) {
      // Notification({
      //   type: NOTIFICATION_TYPE.ERROR,
      //    message: translation.TXT_ERR_CODE
      // })
      return
    }
    setTotalCode(parseFloat(val))
    const tmpNewPrizes = [...newPrizes]
    let tmp = []
    const temp = val % tmpNewPrizes.length
    console.log('temp', tmpNewPrizes)
    if (tmpNewPrizes.length > 0) {
      tmpNewPrizes[0].lastValue = Math.floor(val / tmpNewPrizes.length) + temp
      tmpNewPrizes[0].firstValue = numberWithCommas(
        (100 * tmpNewPrizes[0].lastValue) / val
      )
      tmp = [
        ...tmpNewPrizes,
        tmpNewPrizes[0].lastValue,
        tmpNewPrizes[0].firstValue
      ]
      for (let i = 1; i < tmpNewPrizes.length; i++) {
        tmpNewPrizes[i].lastValue = Math.floor(
          numberWithCommas((val / 100) * (100 / tmpNewPrizes.length))
        )
        tmpNewPrizes[i].firstValue = numberWithCommas(
          (100 * tmpNewPrizes[i].lastValue) / val
        )
        tmp = [
          ...tmpNewPrizes,
          tmpNewPrizes[i].lastValue,
          tmpNewPrizes[i].firstValue
        ]
      }
    }

    setListPrizesByEvent(tmp)
    if (val === null) {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }

  const handleSearchEventName = (value) => {
    debounce(() => setSearchTextEvent(value))
  }

  const numberWithCommas = function (x) {
    return Number.parseFloat(x).toFixed(1)
  }

  // useEffect(() => {
  //   if (selectEvent) {

  //   }
  // }, [selectEvent])

  return (
    <FormQR
      form={form}
      name='create-qrcodes'
      onFinish={onFinish}
      layout='vertical'
      // onKeyPress={(event) => handleKeyPress(event, onFinish)}
    >
      <FormQR.Item
        name='eventId'
        label={translation.TEXT_EVENT_NAME}
        rules={[{ required: true, message: translation.TEXT_REQUIRED_FIELD }]}
      >
        <Select
          allowClear
          ref={RefSelectEventId}
          autoFocus
          showSearch
          placeholder={translation.TEXT_EVENT_NAME}
          disabled={selectedRows}
          // loading={loading}
          notFoundContent={
            <div
              style={{
                display: 'flex',
                width: '100%',
                justifyContent: 'center'
              }}
            >
              {loading ? <Spin size='small' /> : <p>No data</p>}
            </div>
          }
          size='large'
          onChange={(e) => handleChangeOption(e)}
          onSearch={handleSearchEventName}
          filterOption={false}
        >
          {dataFilterEvent && dataFilterEvent}
        </Select>
      </FormQR.Item>
      <FormQR.Item
        label={translation.TXT_AMOUNT_CODE}
        name='totalCode'
        rules={[
          { required: true, message: translation.TEXT_REQUIRED_FIELD },
          ({ getFieldValue }) => ({
            validator(_, value) {
              console.log('value', value)
              if (value > 999) {
                return Promise.reject(
                  new Error(translation.TXT_ERR_CODE)
                  // setErrState(true)
                )
              }
              return Promise.resolve()
            }
          })
        ]}
      >
        <Input
          disabled={selectedRows || listPrizesByEvent.length <= 0}
          placeholder={translation.TXT_AMOUNT_CODE}
          type='tel'
          size='large'
          maxLength={3}
          style={{ width: '100%' }}
          onChange={(e) => handleChangeTotalCode(e)}
          onKeyPress={(event) => {
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault()
            }
          }}
        />
      </FormQR.Item>
      <FormQR.Item
        label={translation.TEXT_END_TIME}
        name='exTime'
        rules={[{ required: true, message: translation.TEXT_REQUIRED_FIELD }]}
      >
        <DatePicker
          disabled={selectedRows}
          format={'YYYY.MM.DD'}
          // defaultValue={moment()}
          placeholder={translation.TEXT_END_TIME}
          disabledDate={(current) => {
            const endTimeEvent = selectEvent?.endTime
            const check =
              (current && current < moment().add('day').startOf('days')) ||
              current > moment(endTimeEvent).add('day').endOf('days')
            // if (endTimeEvent) {
            //   check =
            //     check &&
            //     current > moment(endTimeEvent).add('day').startOf('days')
            //   console.log(endTimeEvent)
            // }
            return check
          }}
          size='large'
          style={{ width: '100%' }}
        />
      </FormQR.Item>

      {!selectedRows &&
        newPrizes &&
        newPrizes.map((item, idx) => {
          return (
            // <FormQR.Item
            //   key={idx}
            //   rules={[
            //     { required: true, message: translation.TEXT_REQUIRED_FIELD }
            //   ]}
            // >
            <WrapperPercentAndCount key={idx} id={item.id}>
              <Percent>
                <Label className={'label-prize'}>
                  {truncate(item?.namePrize)}
                </Label>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Input
                    type='number'
                    disabled={disabled}
                    style={{ width: '100%' }}
                    size='large'
                    value={item.firstValue}
                    onChange={(e) => handleChangePercent(e, item)}
                  />

                  <div style={{ margin: '0 0 0 10px' }}>%</div>
                </div>
              </Percent>
              <Amount>
                <Label>
                  {translation.TXT_AMOUNT} {idx + 1}
                </Label>
                {/* <FormQR.Item
                    name={`firstvalue ${idx}`}
                    rules={[
                      {
                        required: true,
                        message: translation.TEXT_REQUIRED_FIELD
                      }
                    ]}
                  > */}
                <Input
                  type='number'
                  disabled={disabled}
                  style={{ width: '100%' }}
                  size='large'
                  step='1'
                  min='0'
                  value={item.lastValue}
                  onChange={(e) => handleChangeAmount(e, item)}
                />
                {/* </FormQR.Item> */}
              </Amount>
            </WrapperPercentAndCount>
            // </FormQR.Item>
          )
        })}
      <FormQR.Item
        name='memo'
        label={translation.TEXT_MEMO}
        style={{ marginTop: '30px' }}
        rules={[{ required: false, message: translation.TEXT_REQUIRED_FIELD }]}
      >
        <Input.TextArea size='large' placeholder={translation.TEXT_MEMO} />
      </FormQR.Item>
    </FormQR>
  )
}

export default FormQrManage
