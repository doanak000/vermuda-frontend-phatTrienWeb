/* eslint-disable no-debugger */
/* eslint-disable max-lines */
/* eslint-disable no-unused-vars */
import {
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined
} from '@ant-design/icons'
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Select,
  Space,
  Spin,
  Upload
} from 'antd'
import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectTranslation } from '../language/languageSlice'
import AWS from 'aws-sdk'
import addPhoto from '../../utils/S3/upload'
import moment from 'moment'
import { useMutation, useQuery } from '@apollo/client'
import {
  MUTATION_CREATE_EVENT,
  MUTATION_UPDATE_EVENT
} from '../../graphql/mutation/event.mutation'
import { Notification } from '../../components/Notification/Notification'
import { NOTIFICATION_TYPE } from '../../constants/common'
import {
  selectData,
  selectVisibleDrawer,
  setData,
  setVisibleDrawer
} from '../createUpdateDelete/createUpdateDeleteSlice'
import create from '@ant-design/icons/lib/components/IconFont'
import { QUERY_VIDEOS } from '../../graphql/query/video.query'

import { debounce } from '../../helper/debounce'
import { handleKeyPress } from '../../helper/enterSubmit'
import { FormAddEvent } from './Event.style'
const { TextArea } = Input
const { Option } = Select
const albumBucketName = process.env.REACT_APP_BUCKET_NAME
const folderName = 'images'
const accessKeyId = process.env.REACT_APP_ACCESS_KEY
const secretAccessKey = process.env.REACT_APP_SECRET_KEY

function disabledDate(current) {
  // Can not select days before today and today
  return current && current < moment().add('day').startOf('day')
}

const EventForm = (props) => {
  const [form] = Form.useForm()
  const translation = useSelector(selectTranslation)
  const [listUrlImage, setListUrlImage] = useState([])
  const [startDate, setStartDate] = useState(moment())
  const [endDate, setEndDate] = useState(moment())
  const dispatch = useDispatch()
  const selectedRows = useSelector(selectData)
  const visibleDrawer = useSelector(selectVisibleDrawer)
  const [createEvent] = useMutation(MUTATION_CREATE_EVENT)
  const [updateEvent] = useMutation(MUTATION_UPDATE_EVENT)
  const RefInputName = useRef(null)
  const [fileList, setFileList] = useState([])
  const [searchText, setSearchText] = useState('')
  const { data, refetch, loading } = useQuery(QUERY_VIDEOS, {
    variables: {
      name: searchText
    },
    fetchPolicy: 'network-only'
  })
  const optionVideos =
    data?.Videos?.videos?.map((item) => (
      <Option key={item.id} value={item.id}>
        {item.name}
      </Option>
    )) || []

  const checkDuplicateRank = (ranks, value) => {
    if (value) {
      const result = ranks.filter((rank) => rank === value)
      if (result.length > 1) {
        return true
      }
      return false
    }
  }
  const onFinish = async (values) => {
    const { prizes } = values
    props?.setSubmitLoading(true)
    const newArr = {
      ...values,
      prizes: values.prizes.map((item) => ({
        ...item,
        imageUrl: item.imageUrl.file?.response
      }))
    }
    if (selectedRows?.length > 0) {
      await updateEvent({
        variables: {
          updateEventInput: {
            id: selectedRows[0]?.id,
            name: values.name,
            startTime: moment(values.startTime).format('YYYY/MM/DD'),
            endTime: moment(values.endTime).format('YYYY/MM/DD'),
            memo: values.memo
            // prizes: newArr.prizes
          }
        }
      })
        .then(() => {
          Notification({
            type: NOTIFICATION_TYPE.SUCCESS,
            message: translation.NOTI_UPDATE_SUCCESS
          })
          props.refetch()
          form.resetFields()
          dispatch(setVisibleDrawer(false))
          dispatch(setData([]))
        })
        .catch(() => {
          Notification({
            type: NOTIFICATION_TYPE.ERROR,
            message: translation.NOTI_ERROR
          })
        })
    } else {
      await createEvent({
        variables: {
          createEventInput: {
            name: values.name,
            startTime: moment(values.startTime).format('YYYY/MM/DD'),
            endTime: moment(values.endTime).format('YYYY/MM/DD'),
            memo: values.memo,
            prizes: newArr.prizes
          }
        }
      })
        .then(() => {
          Notification({
            type: NOTIFICATION_TYPE.SUCCESS,
            message: translation.NOTI_CREATE_SUCCESS
          })
          props.refetch()
          form.resetFields()
          dispatch(setVisibleDrawer(false))
        })
        .catch(() => {
          Notification({
            type: NOTIFICATION_TYPE.ERROR,
            message: translation.NOTI_ERROR
          })
        })
    }
    props?.setSubmitLoading(false)
  }
  useEffect(() => {
    if (selectedRows?.length > 0) {
      console.log(selectedRows[0]?.prizes[0], 'selectedRows')
      form.setFieldsValue({
        name: selectedRows[0].name,
        startTime: moment(selectedRows[0].startTime),
        endTime: moment(selectedRows[0].endTime),
        prizes: selectedRows[0]?.prizes?.map((item) => ({
          ...item,
          videoId: item?.video?.id
        }))
      })

      const files = selectedRows[0]?.prizes?.map((item) => {
        const imgName = item.imageUrl
          ?.split('/')
          [item.imageUrl?.split('/').length - 1].split('_')
          .slice(1)

        return {
          url: item.imageUrl,
          uid: item.id,
          name: imgName[0],
          status: 'done'
        }
      })

      setStartDate(moment(selectedRows[0].startTime))
      setEndDate(moment(selectedRows[0].endTime))

      setFileList(files)
    } else {
      setStartDate(moment())
      setEndDate(moment())
    }
  }, [selectedRows])
  useEffect(() => {
    visibleDrawer && RefInputName.current.focus()

    if (!visibleDrawer) {
      form.resetFields()
      dispatch(setData([]))
    }
  }, [visibleDrawer])
  useEffect(() => {
    if (visibleDrawer && !selectedRows) {
      form.setFieldsValue({
        name: '',
        startTime: startDate,
        endTime: endDate,
        prizes: [
          {
            name: '',
            videoId: null,
            imageUrl: null
          }
        ]
      })
      setFileList([])
    }
  }, [visibleDrawer, selectedRows])

  useEffect(() => {
    console.log(startDate, endDate, 'start date')
    form.setFieldsValue({
      startTime: startDate,
      endTime: endDate
    })
  }, [startDate, endDate])

  const uploadProps = {
    accept: '.png,.jpg,.jpeg,.svg,.gif',
    maxCount: 1,
    customRequest({
      action,
      data,
      file,
      filename,
      headers,
      onError,
      onProgress,
      onSuccess,
      withCredentials
    }) {
      AWS.config.update({
        accessKeyId,
        secretAccessKey
        // sessionToken: ''
      })
      const S3 = new AWS.S3()
      console.log('DEBUG filename', file.name)
      console.log('DEBUG file type', file.type)
      const current = new Date().getTime()
      const objParams = {
        Bucket: albumBucketName,
        Key: folderName + '/' + current + '_' + file.name,
        Body: file,
        ACL: 'public-read'
        // ContentType: file.type // TODO: You should set content-type because AWS SDK will not automatically set file MIME
      }
      S3.putObject(objParams)
        .on('httpUploadProgress', function ({ loaded, total }) {
          onProgress(
            {
              percent: Math.round((loaded / total) * 100)
            },
            file
          )
        })
        .send(function (err, data) {
          if (err) {
            onError()
            console.log('Something went wrong')
            console.log(err.code)
            console.log(err.message)
          } else {
            const urls = encodeURI(
              'https://' +
                albumBucketName +
                '.s3-ap-northeast-1.amazonaws.com/' +
                folderName +
                '/' +
                current +
                '_' +
                file.name
            )
            onSuccess(urls)

            console.log('SEND FINISHED')
          }
        })
    }
  }

  const uploadFile = {
    beforeUpload: (file) => {
      const isIMG =
        file.type === 'image/png' ||
        file.type === 'image/jpg' ||
        file.type === 'image/jpeg' ||
        file.type === 'image/svg' ||
        file.type === 'image/gif'
      if (!isIMG) {
        alert(translation.ALERT_INVALID_FILE)
      }
      return !!isIMG
    }
  }

  return (
    <FormAddEvent
      name={props?.name}
      form={form}
      onFinish={onFinish}
      layout='vertical'
      // onKeyPress={(event) => handleKeyPress(event, onFinish)}
    >
      <FormAddEvent.Item
        label={translation.TEXT_EVENT_NAME}
        name='name'
        rules={[
          { required: true, message: translation.TEXT_REQUIRED_FIELD },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (value.length > 100) {
                return Promise.reject(
                  new Error('ERROR')
                  // setErrState(true)
                )
              }
              return Promise.resolve()
            }
          })
        ]}
      >
        <Input
          size='large'
          placeholder={translation.TEXT_EVENT_NAME}
          ref={RefInputName}
        />
      </FormAddEvent.Item>

      <FormAddEvent.Item
        label={translation.TEXT_START_TIME}
        name='startTime'
        rules={[{ required: true, message: translation.TEXT_REQUIRED_FIELD }]}
      >
        <DatePicker
          // defaultValue={moment()}
          format={'YYYY.MM.DD'}
          placeholder={translation.TEXT_START_TIME}
          disabledDate={disabledDate}
          size='large'
          style={{ width: '100%' }}
          onChange={(date) => {
            if (date === null) {
              return ''
            }
            setStartDate(moment(date))
            if (date > endDate) {
              setEndDate(moment(date))
            }
          }}
        />
      </FormAddEvent.Item>
      <FormAddEvent.Item
        label={translation.TEXT_END_TIME}
        name='endTime'
        rules={[{ required: true, message: translation.TEXT_REQUIRED_FIELD }]}
      >
        <DatePicker
          // defaultValue={startDate}
          format={'YYYY.MM.DD'}
          placeholder={translation.TEXT_END_TIME}
          size='large'
          style={{ width: '100%' }}
          disabledDate={(current) => {
            return (
              (current && current < startDate?.add('day').startOf('day')) ||
              (current && current < moment().add('day').startOf('day'))
            )
          }}
          onChange={(date) => {
            if (date === null) {
              return ''
            }
            setEndDate(moment(date))
          }}
        />
      </FormAddEvent.Item>

      <FormAddEvent.Item
        label={
          <p>
            <span style={{ color: 'red', marginRight: '5px' }}>*</span>
            {translation.TEXT_PRIZES}
          </p>
        }
        name='prizesData'
        style={{ width: '100%' }}
        // rules={[{ required: true, message: translation.TEXT_REQUIRED_FIELD }]}
      >
        <FormAddEvent.List
          name='prizes'
          style={{ width: '100%' }}
          rules={[
            {
              validator: async (_, prizes) => {
                console.log(prizes.length, 'prizes')
                if (prizes?.length < 1) {
                  return Promise.reject(
                    new Error('Please set one or more prizes')
                  )
                }
              }
            }
          ]}
        >
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((field, idx) => {
                let img
                let imgName
                let videoOptions = []

                if (selectedRows) {
                  img = selectedRows[0]?.prizes[idx]?.imageUrl
                  imgName = selectedRows[0]?.prizes[idx]?.imageUrl
                    ?.split('/')
                    [img.split('/')?.length - 1]?.split('_')
                    ?.slice(1)
                  videoOptions = [
                    ...optionVideos,
                    <Option
                      key={selectedRows[0]?.prizes[idx]?.video?.id}
                      value={selectedRows[0]?.prizes[idx]?.video?.id}
                    >
                      {selectedRows[0]?.prizes[idx]?.video?.name}
                    </Option>
                  ]
                } else {
                  videoOptions = optionVideos
                }

                return (
                  <div
                    style={{
                      display: 'flex',
                      borderTop: '1px solid #ddd',
                      paddingTop: '1rem',
                      width: '100%'
                    }}
                    key={field.key}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        flexWrap: 'wrap',
                        marginRight: '1rem'
                      }}
                    >
                      <FormAddEvent.Item
                        {...field}
                        // label='Price'
                        name={[field.name, 'name']}
                        fieldKey={[field.fieldKey, 'name']}
                        rules={[
                          {
                            required: true,
                            message: translation.TEXT_REQUIRED_FIELD
                          }
                        ]}
                        style={{ width: '48%' }}
                      >
                        <Input
                          disabled={selectedRows?.length > 0}
                          size='large'
                          style={{ width: '100%' }}
                          placeholder={translation.PLACEHOLDER_PRIZE_NAME}
                        />
                      </FormAddEvent.Item>
                      <FormAddEvent.Item
                        {...field}
                        // label='Price'
                        name={[field.name, 'rank']}
                        fieldKey={[field.fieldKey, 'rank']}
                        rules={[
                          {
                            required: true,
                            message: translation.TEXT_REQUIRED_FIELD
                          },
                          ({ getFieldValue }) => ({
                            // ngay day
                            validator(_, value) {
                              console.log('ranks', props.ranks)
                              if (checkDuplicateRank(props.ranks, value)) {
                                return Promise.reject(
                                  new Error('This rank already exists.')
                                  // setErrState(true)
                                )
                              }
                              if (value > 100) {
                                return Promise.reject(
                                  new Error('Please set the rank up to 100.')
                                  // setErrState(true)
                                )
                              }
                              return Promise.resolve()
                            }
                          })
                        ]}
                        style={{ width: '48%' }}
                      >
                        <InputNumber
                          onChange={(text) => {
                            props.ranks.splice(idx, 1)
                            if (text !== '') {
                              props.ranks.splice(idx, 0, text)
                            }
                          }}
                          disabled={selectedRows?.length > 0}
                          min={1}
                          size='large'
                          style={{ width: '100%' }}
                          placeholder={translation.PLACEHOLDER_PRIZE_RANK}
                        />
                      </FormAddEvent.Item>
                      <FormAddEvent.Item
                        {...field}
                        // label='Price'
                        name={[field.name, 'imageUrl']}
                        fieldKey={[field.fieldKey, 'imageUrl']}
                        rules={[
                          {
                            required: true,
                            message: translation.TEXT_REQUIRED_FIELD
                          },
                          {
                            validator: async (_, imageUrl) => {
                              console.log(imageUrl, 'prizes')
                              if (
                                imageUrl &&
                                imageUrl?.fileList &&
                                !imageUrl?.fileList[0]
                              ) {
                                return Promise.reject(
                                  new Error(translation.TEXT_REQUIRED_FIELD)
                                )
                              }
                            }
                          }
                        ]}
                        style={{ width: '48%' }}
                      >
                        {/* {(value) => (
                        <ImgUploader
                          uploadProps={uploadProps}
                          imageUrl={value}
                        />
                      )} */}
                        <Upload
                          {...uploadFile}
                          disabled={selectedRows?.length > 0}
                          {...uploadProps}
                          className='upload-img-for-event'
                          fileList={
                            fileList.length > 0 && !!fileList[idx]
                              ? [fileList[idx]]
                              : []
                          }
                          onChange={(info) => {
                            const fileNew = info.fileList[0]
                            const fileListNew = [
                              ...fileList?.slice(0, idx),
                              fileNew
                                ? {
                                    ...fileNew,
                                    url: fileNew?.response
                                  }
                                : undefined,
                              ...fileList.slice(idx + 1)
                            ]
                            const isIMG =
                              info.file.type === 'image/png' ||
                              info.file.type === 'image/jpg' ||
                              info.file.type === 'image/jpeg' ||
                              info.file.type === 'image/svg' ||
                              info.file.type === 'image/gif'
                            if (isIMG) {
                              setFileList(fileListNew)
                            }
                            // console.log('1111', info.fileList)
                          }}
                        >
                          <Button
                            icon={<UploadOutlined />}
                            size='large'
                            style={{ width: '100%' }}
                            disabled={selectedRows?.length > 0}
                          >
                            {translation.PLACEHOLDER_IMAGE_URL}
                          </Button>
                        </Upload>
                      </FormAddEvent.Item>
                      <FormAddEvent.Item
                        {...field}
                        rules={[
                          {
                            required: true,
                            message: translation.TEXT_REQUIRED_FIELD
                          }
                        ]}
                        name={[field.name, 'videoId']}
                        fieldKey={[field.fieldKey, 'videoId']}
                        style={{ width: '48%' }}
                      >
                        <Select
                          disabled={selectedRows?.length > 0}
                          showSearch
                          allowClear
                          notFoundContent={
                            loading ? <Spin size='small' /> : null
                          }
                          placeholder={translation.PLACEHOLDER_VIDEO_ID}
                          onSearch={(value) =>
                            debounce(() => setSearchText(value))
                          }
                          size='large'
                          style={{ width: '100%' }}
                          filterOption={false}
                        >
                          {videoOptions || optionVideos}
                        </Select>
                      </FormAddEvent.Item>
                    </div>
                    <div>
                      <MinusCircleOutlined
                        onClick={() => {
                          if (!(selectedRows?.length > 0)) {
                            remove(field.name)
                            props.ranks.splice(idx, 1)
                          }
                        }}
                        style={{
                          height: '100%',
                          color: selectedRows?.length > 0 ? 'gray' : 'red',
                          cursor:
                            selectedRows?.length > 0 ? 'not-allowed' : 'pointer'
                        }}
                      />
                    </div>
                  </div>

                  // </Space>
                )
              })}

              <FormAddEvent.Item>
                <Button
                  disabled={selectedRows?.length > 0}
                  type='dashed'
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                  size='large'
                >
                  {translation.PLACEHOLDER_ADD_PRIZE}
                </Button>
                <Form.ErrorList errors={errors} />
              </FormAddEvent.Item>
            </>
          )}
        </FormAddEvent.List>
      </FormAddEvent.Item>

      <FormAddEvent.Item
        label={translation.TEXT_MEMO}
        name='memo'
        rules={[
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (value?.length > 200) {
                return Promise.reject(
                  new Error('Please enter up to 200 characters for the memo.。')
                  // setErrState(true)
                )
              }
              return Promise.resolve()
            }
          })
        ]}
      >
        <TextArea size='large' />
      </FormAddEvent.Item>
    </FormAddEvent>
  )
}

export default EventForm
