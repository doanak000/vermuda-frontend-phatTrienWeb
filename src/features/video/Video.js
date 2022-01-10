/* eslint-disable max-lines */
// import { Upload, message } from 'antd'

import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import TableCustom, {
  CellContentRender
} from '../../components/TableCustom/TableCustom'
import { selectTranslation } from '../language/languageSlice'
import {
  DrawerAdd,
  FormAdd
  // ButtonVideo,
  // WrapperButtonVideo
} from './Video.style'
import { Form, Input } from 'antd'
// import { InboxOutlined } from '@ant-design/icons'

import { QUERY_VIDEOS } from '../../graphql/query/video.query'
import { useLazyQuery, useMutation } from '@apollo/client'
import {
  resetStatus,
  selectData,
  selectStatus,
  selectVisibleDrawer,
  setData,
  setVisibleDrawer
} from '../createUpdateDelete/createUpdateDeleteSlice'
import {
  COLUMN_TYPE,
  CREATE_UPDATE_DELETE_STATUS,
  LIMIT_TABLE,
  NOTIFICATION_TYPE,
  PATH
  // PATH
} from '../../constants/common'
import VideoUploader from './VideoUploader'
import addPhoto from '../../utils/S3/upload'
import {
  MUTATION_CREATE_VIDEOS,
  MUTATION_UPDATE_VIDEO
} from '../../graphql/mutation/video.mutation'
import { hideVideo } from './VideoSlice'
import DrawerFooter from '../../components/DrawerFooter/DrawerFooter'
import {
  selectCurrentPage,
  selectSearchValue,
  setCurrentPage
} from '../searchTable/searchTableSlice'
// import { handleKeyPress } from '../../helper/enterSubmit'
import { CloseOutlined } from '@ant-design/icons'
import { Notification } from '../../components/Notification/Notification'

// const { Dragger } = Upload

// const props = {
//   name: 'file',
//   multiple: false,
//   action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
//   onChange(info) {
//     const { status } = info.file
//     if (status !== 'uploading') {
//       console.log(info.file, info.fileList)
//     }
//     if (status === 'done') {
//       message.success(`${info.file.name} file uploaded successfully.`)
//     } else if (status === 'error') {
//       message.error(`${info.file.name} file upload failed.`)
//     }
//   }
// }
export default function Video() {
  const translation = useSelector(selectTranslation)
  const searchText = useSelector(selectSearchValue)
  // const { data, refetch, loading } = useQuery(QUERY_VIDEOS, {
  //   variables: {
  //     name: searchText
  //   },
  //   fetchPolicy: 'network-only'
  // })
  const [getVideos, { data, refetch, loading }] = useLazyQuery(QUERY_VIDEOS, {
    fetchPolicy: 'network-only'
  })
  const dataEdit = useSelector(selectData)
  const UniqueID = Date.now() + '_' + Math.random().toString(36).substr(2, 34)
  const [albumName] = useState(UniqueID)
  const [urlVideos, setUrlVideos] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const [loadData, setLoadData] = useState({ loaded: 0, total: 0, unit: '' })
  const actionStatus = useSelector(selectStatus)
  const [submitLoading, setSubmitLoading] = useState(false)
  // const [currentPage, setCurrentPage] = useState(1)
  const [deleteVideoState, setDeleteVideoState] = useState(false)
  const RefVideoName = useRef(null)
  const currentPage = useSelector(selectCurrentPage)
  // const hidden = useSelector(selectHideVideo)
  const dispatch = useDispatch()
  const [createVideos] = useMutation(MUTATION_CREATE_VIDEOS, {
    fetchPolicy: 'no-cache'
  })
  const [updateVideos] = useMutation(MUTATION_UPDATE_VIDEO, {
    fetchPolicy: 'no-cache'
  })
  const visibleDrawer = useSelector(selectVisibleDrawer)
  const [form] = Form.useForm()
  // const openNotification = (type, mes, des) => {
  //   notification[type]({
  //     message: mes,
  //     description: des
  //   })
  // }

  useEffect(() => {
    if (location.pathname === PATH.VIDEO) {
      getVideos({
        variables: {
          name: searchText,
          limit: LIMIT_TABLE,
          offset: (currentPage - 1) * LIMIT_TABLE
        }
      })
    }
  }, [searchText, location.pathname, currentPage])

  useEffect(() => {
    visibleDrawer && RefVideoName.current.focus()

    if (!visibleDrawer) {
      form.resetFields()
      dispatch(setData([]))
    }
  }, [visibleDrawer])

  useEffect(() => {
    // dispatch(setVisibleDrawer(false))
    if (actionStatus !== CREATE_UPDATE_DELETE_STATUS.UPCOMING) {
      refetch()
      dispatch(resetStatus())
    }
  }, [actionStatus])
  useEffect(() => {
    form.setFieldsValue({
      videoName: dataEdit ? dataEdit[0]?.name : null,
      videoFile: dataEdit ? dataEdit[0]?.url : urlVideos
    })
  }, [dataEdit])
  console.log('dataEdit', dataEdit)

  const onClose = () => {
    dispatch(setVisibleDrawer(false))
    dispatch(hideVideo(false))
    setDeleteVideoState(false)
    setUrlVideos(null)
  }

  const callback = {
    onSuccess: (urls) => {
      setUrlVideos(urls)
      setIsUploading(false)
    },
    onError: (urls) => {
      setIsUploading(false)
    },
    onLoad: (loaded, total, unit) => {
      setLoadData({ loaded: loaded, total: total, unit: unit })
    }
  }

  const handleUploader = (files) => {
    setIsUploading(true)
    addPhoto(albumName, 'videos/', files, callback)
  }

  function onDeleteVideo() {
    setUrlVideos(null)
    setDeleteVideoState(true)
  }
  const setValidVideo = () => {
    setDeleteVideoState(false)
  }
  console.log(deleteVideoState)
  const onFinish = async (values) => {
    setSubmitLoading(true)
    if (dataEdit) {
      await updateVideos({
        variables: {
          updateVideoInput: {
            id: dataEdit[0].id,
            name: values.videoName,
            url: urlVideos || dataEdit[0]?.url
          }
        }
      })
        .then(() => {
          Notification({
            type: NOTIFICATION_TYPE.SUCCESS,
            message: translation.NOTI_UPDATE_VIDEO_SUCESS
          })
          setUrlVideos(null)
          refetch()
          dispatch(setVisibleDrawer(false))
        })
        .catch(() => {
          Notification({
            type: NOTIFICATION_TYPE.ERROR,
            message: translation.NOTI_ERROR,
            description: translation.NOTI_NO_PERMISSION
          })
        })
    } else if (urlVideos) {
      await createVideos({
        variables: {
          createVideoInput: {
            name: values.videoName,
            url: urlVideos
          }
        }
      })
        .then(() => {
          Notification({
            type: NOTIFICATION_TYPE.SUCCESS,
            message: translation.NOTI_CREATE_SUCCESS
          })
          refetch()
          setUrlVideos(null)
          dispatch(setVisibleDrawer(false))
          // form.resetFields()
        })
        .catch((error) => {
          Notification({
            type: NOTIFICATION_TYPE.ERROR,
            message: translation.NOTI_ERROR,
            description: error?.message
          })
        })
    }
    setSubmitLoading(false)
  }
  const dataSource =
    data?.Videos?.videos?.map((itemData, idx) => ({
      key: itemData?.id,
      idx: idx + 1,
      idOwner: itemData?.owner?.id,
      ...itemData
    })) || []

  const columns = [
    {
      title: translation.TEXT_INDEX,
      dataIndex: 'idx',
      key: 'idx',
      ellipsis: true,
      width: 60,
      align: 'center',
      render: (value) => value
    },
    {
      title: translation.VIDEO_NAME,
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
      width: '30%',
      render: (value) => CellContentRender(value)
    },
    // {
    //   title: translation.TEXT_USER_ID,
    //   dataIndex: 'idOwner',
    //   key: 'idOwner',
    //   ellipsis: true,
    //   width: '20%',
    //   render: (value) => CellContentRender(value)
    // },
    {
      title: translation.TEXT_UPDATED_TIME,
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      ellipsis: true,
      width: '20%',
      render: (value) => CellContentRender(value, COLUMN_TYPE.DATE)
    },
    {
      title: translation.VIDEO_LINK,
      dataIndex: 'url',
      key: 'url',
      ellipsis: true,
      width: '30%',
      render: (value) => CellContentRender(value, COLUMN_TYPE.LINK)
    }
  ]

  console.log(data, 'videos')
  return (
    <>
      <TableCustom
        onChange={(value) => dispatch(setCurrentPage(value.current))}
        dataSource={dataSource}
        columns={columns}
        loading={loading}
        total={data?.Videos?.count}
      />

      <DrawerAdd
        closeIcon={<CloseOutlined style={{ color: 'white' }} />}
        title={translation.TITLE_VIDEO_CREATE}
        placement='right'
        // closable={false}
        onClose={onClose}
        footer={
          <DrawerFooter
            isUploading={isUploading}
            submitLoading={submitLoading}
            onClose={onClose}
            formName={'video-form'}
          />
        }
        visible={visibleDrawer}
      >
        <FormAdd
          name='video-form'
          onFinish={onFinish}
          form={form}
          // onKeyPress={(event) => handleKeyPress(event, onFinish)}
        >
          <FormAdd.Item
            label={translation.TEXT_VIDEO_NAME}
            name='videoName'
            rules={[
              {
                required: true,
                message: `${translation.TEXT_REQUIRED_FIELD}`
              }
              // {
              //   validator: (_, hidden) => {
              //     if (hidden === 'none') {
              //       return new Error('At least 2 passengers')
              //     }
              //   }
              // }
            ]}
          >
            <Input ref={RefVideoName} autoFocus size='large' />
          </FormAdd.Item>
          {/* <FormAddVideo.Item
            label={<LableAddVideo>{translation.VIDEO_OF_YOU}</LableAddVideo>}
            name='videoFile'
            rules={[
              {
                required: true,
                message: `${translation.NOTI_INPUT_VIDEO_OF_YOU}!`
              }
            ]}
          >
            <Dragger {...props}>
              <p className='ant-upload-drag-icon'>
                <InboxOutlined />
              </p>
              <p className='ant-upload-text'>{translation.NOTI_UPLOAD_VIDEO}</p>
            </Dragger>
          </FormAddVideo.Item> */}
          <FormAdd.Item
            label={translation.TEXT_VIDEO_OF_YOU}
            name='videoFile'
            rules={[
              {
                required: true,
                message: `${translation.TEXT_REQUIRED_FIELD}`
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (deleteVideoState === true) {
                    return Promise.reject(
                      new Error(translation.TEXT_REQUIRED_FIELD)
                      // setErrState(true)
                    )
                  }
                  return Promise.resolve()
                }
              })
            ]}
          >
            <VideoUploader
              disabled={isUploading}
              onChange={handleUploader}
              onDelete={onDeleteVideo}
              setValidVideo={setValidVideo}
              videoURL={dataEdit ? dataEdit[0]?.url : urlVideos}
              progress={loadData}
            />
          </FormAdd.Item>
        </FormAdd>
      </DrawerAdd>
    </>
  )
}
