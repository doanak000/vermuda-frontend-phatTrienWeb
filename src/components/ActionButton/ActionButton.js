/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
import {
  DeleteOutlined,
  EditOutlined,
  PlusSquareOutlined,
  QrcodeOutlined
} from '@ant-design/icons'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { Row, Tooltip, Input, Col, Button, Select } from 'antd'
import React, { useRef, useState, Suspense, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router'
import {
  CREATE_UPDATE_DELETE_STATUS,
  NOTIFICATION_TYPE,
  PATH
} from '../../constants/common'
import {
  resetData,
  selectData,
  setStatus,
  setVisibleDrawer,
  setActionType,
  getListData
} from '../../features/createUpdateDelete/createUpdateDeleteSlice'
import { selectTranslation } from '../../features/language/languageSlice'
import { MUTATION_DELETE_USERS } from '../../graphql/mutation/user.mutation'
import { confirm } from '../ConfirmModal/ConfirmModal'
import {
  ActionWrapper,
  DeleteIcon,
  EditIcon,
  ButtonWrapper,
  QrIcon,
  ExportSpinner
} from './ActionButton.style'
import { Notification } from '../../components/Notification/Notification'
import SearchDebounce from '../SearchDebounce/SearchDebounce'
import { MUTATION_DELETE_VIDEO } from '../../graphql/mutation/video.mutation'
import { MUTATION_DELETE_EVENTS } from '../../graphql/mutation/event.mutation'
import FilterTable from '../FilterTable/FIlterTable'
import { QUERY_EVENTS } from '../../graphql/query/event.query'
import { QUERY_AGENCY, QUERY_USER } from '../../graphql/query/user.query'
import {
  selectFilterSearch,
  selectFilterValue
} from '../../features/filterTable/filterTableSlice'
import {
  QUERY_SERIAL_CODES_EVENT,
  QUERY_SERIAL_CODES_MANAGE
} from '../../graphql/query/serialCodes.query'

const ActionButton = (props) => {
  const translation = useSelector(selectTranslation)
  const [deleteUser] = useMutation(MUTATION_DELETE_USERS, {
    fetchPolicy: 'no-cache'
  })
  const [deleteVideos] = useMutation(MUTATION_DELETE_VIDEO, {
    fetchPolicy: 'no-cache'
  })
  const [deleteEvent] = useMutation(MUTATION_DELETE_EVENTS, {
    fetchPolicy: 'no-cache'
  })
  const localUser = localStorage.userInfo
  const [loadingState, setLoadingState] = useState(false)
  const filterSearch = useSelector(selectFilterSearch)

  const { data: listEvents, loading } = useQuery(QUERY_EVENTS, {
    variables: {
      searchText: filterSearch
    }
    // fetchPolicy: 'network-only'
  })
  const { data: dataCount, refetch: countRefetch } = useQuery(QUERY_AGENCY, {
    variables: {
      searchText: ''
    },
    fetchPolicy: 'network-only'
  })
  const { data: dataUser, refetch: userRefetch } = useQuery(QUERY_USER, {
    variables: {
      id: localUser ? JSON.parse(localUser).id : ''
    },
    fetchPolicy: 'network-only'
  })
  // refetch()

  const routeToExportPage = (countTotalCode, data) => {
    if (countTotalCode === 0) {
      Notification({
        type: NOTIFICATION_TYPE.ERROR,
        message: 'The QR code has not been created yet'
      })
    } else {
      localStorage.setItem('dataQr', JSON.stringify(data))
      history.push({
        pathname: PATH.EXPORT_CODE,
        search: `?from=${location.pathname.slice(1)}`
      })
    }
  }
  const [
    getSerialCodesEvent,
    { loading: loadingEvent, data: serialCodesEvent }
  ] = useLazyQuery(QUERY_SERIAL_CODES_EVENT, {
    onCompleted: (data) => {
      console.log('serialCodesEvent', serialCodesEvent)
      let countTotalCode = 0
      for (let i = 0; i < serialCodesEvent?.event?.prizes?.length; i++) {
        countTotalCode +=
          serialCodesEvent?.event?.prizes[i]?.serialCodes?.length
      }
      routeToExportPage(countTotalCode, serialCodesEvent)
    },
    fetchPolicy: 'network-only'
  })
  const [
    getSerialCodesManage,
    { loading: loadingManage, data: serialCodesManage }
  ] = useLazyQuery(QUERY_SERIAL_CODES_MANAGE, {
    onCompleted: (serialCodesManage) => {
      console.log('serialCodesManage', serialCodesManage)
      const countTotalCode =
        serialCodesManage?.qrmanages?.qrmanages[0]?.serialCodes?.length
      console.log(countTotalCode)
      routeToExportPage(countTotalCode, serialCodesManage)
    },
    fetchPolicy: 'network-only'
  })

  const location = useLocation()
  const data = useSelector(selectData)
  useEffect(() => {
    countRefetch()
    userRefetch()
  }, [data])
  const listData = useSelector(getListData)
  useEffect(() => {
    countRefetch()
    userRefetch()
  }, [listData])
  const dispatch = useDispatch()
  const history = useHistory()

  const CheckCreateUser = (clientCreated, maxClient) => {
    if (location.pathname !== PATH.USER || maxClient < 0) {
      return true
    }
    if (localStorage.role === 'agency') {
      if (clientCreated >= maxClient) return false
    }
    return true
  }

  const deleteHandler = () => {
    confirm({
      content: translation.CONFIRM_DELETE,
      onOk: async () => {
        try {
          // let response = null

          switch (location.pathname) {
            case PATH.USER: {
              await deleteUser({
                variables: {
                  ids: data?.map((item) => item.id)
                },
                fetchPolicy: 'no-cache'
              })
              break
            }
            case PATH.VIDEO: {
              await deleteVideos({
                variables: {
                  ids: data?.map((item) => item.id)
                },
                fetchPolicy: 'no-cache'
              })
              break
            }
            case PATH.EVENT:
              await deleteEvent({
                variables: {
                  ids: data?.map((item) => item.id)
                },
                fetchPolicy: 'no-cache'
              })
          }
          dispatch(setStatus(CREATE_UPDATE_DELETE_STATUS.SUCCESS))
          dispatch(resetData())
          Notification({
            type: NOTIFICATION_TYPE.SUCCESS,
            message: translation.NOTI_DELETE_SUCCESS + ''
          })
        } catch (err) {
          Notification({
            type: NOTIFICATION_TYPE.ERROR,
            message:
              translation.NOTI_NO_PERMISSION || translation.NOTI_DELETE_ERROR
          })
          dispatch(setStatus(CREATE_UPDATE_DELETE_STATUS.ERROR))
        }
      }
    })
  }
  const editHandler = () => {
    dispatch(setVisibleDrawer(true))
    dispatch(setActionType('update'))
  }
  const addHandler = () => {
    dispatch(setVisibleDrawer(true))
    dispatch(setActionType('create'))
    dispatch(resetData())
  }
  const exportHandler = (id) => {
    if (location.pathname === PATH.EVENT) {
      getSerialCodesEvent({
        variables: { id: id }
      })
    } else {
      getSerialCodesManage({
        variables: { qrmanageId: id }
      })
    }
  }
  const eventOptions = listEvents?.events?.events.map((item) => {
    return { value: item.id, name: item.name }
  })

  const options =
    location.pathname === PATH.USER
      ? [
          // { value: '', name: translation.TEXT_ALL },
          { value: '2', name: translation.TEXT_ROLE_AGENCY },
          { value: '3', name: translation.TEXT_ROLE_CLIENT }
        ]
      : location.pathname === PATH.EVENT
      ? [
          { value: true, name: 'End' },
          { value: false, name: 'In session' }
        ]
      : location.pathname === PATH.MANAGE_GENERATE
      ? eventOptions
      : []

  const placeholder =
    location.pathname === PATH.USER
      ? translation.PLACEHOLDER_FILTER
      : location.pathname === PATH.EVENT
      ? translation.PLACEHOLDER_EXPR_EVENT
      : location.pathname === PATH.MANAGE_GENERATE
      ? 'Select'
      : ''

  const pathQrManage = location.pathname === PATH.MANAGE_GENERATE

  return (
    <ActionWrapper>
      <ButtonWrapper>
        <Tooltip title={translation?.BUTTON_ADD}>
          <Button
            disabled={
              !CheckCreateUser(
                dataCount?.agencys?.count,
                dataUser?.user?.maxClient
              )
            }
            style={{ marginRight: '1rem' }}
            onClick={addHandler}
          >
            <PlusSquareOutlined
              style={{
                fontSize: '1.2rem',
                color: CheckCreateUser(
                  dataCount?.agencys?.count,
                  dataUser?.user?.maxClient
                )
                  ? 'green'
                  : '#bfbfbf'
              }}
            />
          </Button>
        </Tooltip>
        <Tooltip title={translation?.BUTTON_EDIT}>
          <Button
            style={{ marginRight: '1rem' }}
            disabled={!(data?.length === 1)}
            onClick={editHandler}
          >
            <EditIcon color={!(data?.length === 1)} />
          </Button>
        </Tooltip>
        {!pathQrManage && (
          <Tooltip title={translation?.BUTTON_DELETE}>
            <Button
              disabled={!data?.length}
              style={{ marginRight: '1rem' }}
              onClick={deleteHandler}
            >
              <DeleteIcon
                color={!data?.length}
                style={{ fontSize: '1.2rem' }}
              />
            </Button>
          </Tooltip>
        )}
        {/* <Tooltip title={translation?.BUTTON_DELETE}>
          <Button
            disabled={!data?.length}
            style={{ margin: '0.5rem' }}
            onClick={deleteHandler}
          >
            <DeleteIcon color={!data?.length} style={{ fontSize: '1.2rem' }} />
          </Button>
        </Tooltip> */}
        {location.pathname === PATH.EVENT ||
        location.pathname === PATH.MANAGE_GENERATE ? (
          <Tooltip title={translation?.BUTTON_EXPORT_PDF}>
            <Button
              disabled={!(data?.length === 1) || loadingEvent || loadingManage}
              style={{ marginRight: '1rem' }}
              onClick={() => exportHandler(data[0].id)}
            >
              {loadingState || loadingEvent || loadingManage ? (
                <ExportSpinner />
              ) : (
                <QrIcon
                  color={!(data?.length === 1)}
                  style={{ fontSize: '1.2rem' }}
                />
              )}
            </Button>
          </Tooltip>
        ) : null}
      </ButtonWrapper>
      {localStorage.getItem('role') === 'agency' && (
        <div style={{ flex: 1 }}>
          <span style={{ fontSize: '12px' }}>
            Current number of companies: {dataCount?.agencys?.count}
          </span>
        </div>
      )}
      {localStorage.getItem('role') === 'agency' && (
        <div style={{ flex: 1 }}>
          <span style={{ fontSize: '12px' }}>
            Enterprise creation limit:{' '}
            {dataUser?.user?.maxClient < 0 ? 'None' : dataUser?.user?.maxClient}
          </span>
        </div>
      )}
      {location.pathname !== PATH.VIDEO && (
        <FilterTable
          style={{ marginRight: '2rem' }}
          filterOptions={options}
          placeholder={placeholder}
          loading={loading}
        />
      )}
      <SearchDebounce />
      {/* <div
        style={{
          position: 'absolute',
          left: '-1000000px',
          top: 0
        }}
      >
        <PDFExport
          paperSize='A4'
          landscape='false'
          fileName={data && data[0]?.name + '-' + moment().format('YYYY/MM/DD')}
          ref={pdfExportComponent}
        >
          {QrCodeList.length !== 0 && (
            <div style={{}}>
              <QrCodeList data={data}></QrCodeList>
            </div>
          )}
        </PDFExport>
      </div> */}
    </ActionWrapper>
  )
}

export default ActionButton
