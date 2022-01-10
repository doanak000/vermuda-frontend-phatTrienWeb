/* eslint-disable prettier/prettier */
import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TableCustom, {
  CellContentRender,
  ColTitleRender
} from '../../components/TableCustom/TableCustom'
import { useLocation } from 'react-router'
import { CloseOutlined } from '@ant-design/icons'
import moment from 'moment'
import {
  COLUMN_TYPE,
  CREATE_UPDATE_DELETE_STATUS,
  LIMIT_TABLE,
  PATH
} from '../../constants/common'
import { QUERY_QR_MANAGES } from '../../graphql/query/qrmanage.query'
import { selectTranslation } from '../language/languageSlice'
import { Tooltip } from 'antd'
import DrawerFooter from '../../components/DrawerFooter/DrawerFooter'
import { theme } from '../../theme/theme'
import {
  selectStatus,
  resetStatus,
  selectVisibleDrawer,
  setVisibleDrawer,
  selectData
} from '../createUpdateDelete/createUpdateDeleteSlice'
// import ModelDetailsQr from './modelDetailsQr'
import FormQrManage from './form'
import {
  selectCurrentPage,
  selectSearchValue,
  setCurrentPage
} from '../searchTable/searchTableSlice'
import { DrawerAdd } from '../video/Video.style'
import { selectFilterValue } from '../filterTable/filterTableSlice'
import { CellContentRenderWrapper } from '../../components/TableCustom/TableCustom.style'

export default function CodeManage() {
  const translation = useSelector(selectTranslation)
  const selectedRows = useSelector(selectData)
  // const [currentPage, setCurrentPage] = useState(1)
  // const [isOpenModalDetails, setIsOpenModalDetails] = useState(false)
  // const [recordDetails, setRecordDetails] = useState(null)
  const searchText = useSelector(selectSearchValue)
  const location = useLocation()
  const filterValue = useSelector(selectFilterValue)
  const currentPage = useSelector(selectCurrentPage)

  const { data: qrManages, refetch, loading } = useQuery(QUERY_QR_MANAGES, {
    variables: {
      eventId: filterValue,
      limit: LIMIT_TABLE,
      offset: (currentPage - 1) * LIMIT_TABLE,
      searchText
    },
    fetchPolicy: 'network-only'
  })
  const [submitLoading, setSubmitLoading] = useState(false)

  const actionStatus = useSelector(selectStatus)
  const visibleDrawer = useSelector(selectVisibleDrawer)
  const dispatch = useDispatch()

  useEffect(() => {
    if (actionStatus !== CREATE_UPDATE_DELETE_STATUS.UPCOMING) {
      refetch()
      dispatch(resetStatus())
    }
  }, [actionStatus])
  console.log('qrmanage', qrManages?.qrmanages)
  const dataSource =
    qrManages?.qrmanages?.qrmanages
      // ?.filter((item) => item.serialCodes.length > 0)
      ?.map((itemData, idx) => ({
        ...itemData,
        key: itemData.id,
        idx: idx + 1,
        id: itemData.id,
        eventId: itemData.eventId,
        name: itemData.event.name,
        startTime: itemData.event.startTime,
        endTime: itemData.event.endTime,
        // owner: itemData.event.owner.nameKanji,
        numberOfLotteryPeople: itemData.event.numberOfLotteryPeople,
        memo: itemData.memo,
        prizes: itemData.prizes,
        serialCodes: itemData.countSerialCodes,
        expDate: itemData.expDate
      })) || []

  const columns = [
    {
      title: ColTitleRender(translation.TEXT_INDEX),
      dataIndex: 'idx',
      ellipsis: true,
      width: 60,
      align: 'center'
    },
    {
      title: ColTitleRender(translation.TEXT_EVENT_NAME),
      dataIndex: 'name',
      ellipsis: true,
      render: (value) => CellContentRender(value),
      width: 200
    },
    {
      title: translation.TEXT_MEMO,
      dataIndex: 'memo',
      ellipsis: true,
      render: (value) => CellContentRender(value),
      width: 200
    },
    {
      title: ColTitleRender(translation.TXT_AMOUNT_CODE),
      dataIndex: 'serialCodes',
      ellipsis: true,
      render: (value) => CellContentRender(value, COLUMN_TYPE.NUMBER),
      width: 200
    },
    {
      title: translation.TEXT_END_TIME,
      dataIndex: 'expDate',
      ellipsis: true,
      // eslint-disable-next-line react/display-name
      render: (value) => {
        const date = moment(value).format('YYYY.MM.DD')
        return (
          <Tooltip title={date}>
            <CellContentRenderWrapper textAlign='center'>
              {date}
            </CellContentRenderWrapper>
          </Tooltip>
        )
      },
      width: 200
    },

    // {
    //   title: translation.TEXT_PRIZES,
    //   dataIndex: 'prizes',
    //   ellipsis: true,
    //   render: (value) => CellContentRender(value, COLUMN_TYPE.NUMBER),
    //   width: 200
    // },

    {
      title: translation.TEXT_OWNER,
      dataIndex: 'owner',
      ellipsis: true,
      render: (value) =>
        CellContentRender(`${value?.nameKanji ? value?.nameKanji + '様' : ''}`),
      width: 200
    }
  ]
  // const handleDetailsEvent = (record) => {
  //   setRecordDetails(record)
  //   setIsOpenModalDetails(true)
  // }

  const onChangePage = (value) => {
    // setCurrentPage(value.current)
    dispatch(setCurrentPage(value.current))
  }
  const onClose = () => {
    dispatch(setVisibleDrawer(false))
  }

  return (
    <>
      {/* {isOpenModalDetails && (
        <ModelDetailsQr
          setIsOpenDetails={setIsOpenModalDetails}
          record={recordDetails}
        />
      )} */}
      <TableCustom
        loading={loading}
        onChange={(value) => onChangePage(value)}
        dataSource={dataSource}
        columns={columns}
        total={qrManages?.qrmanages?.count || 0}
      />
      <DrawerAdd
        closeIcon={<CloseOutlined style={{ color: 'white' }} />}
        maskClosable={true}
        title={
          selectedRows?.length > 0
            ? translation.TITLE_CODES_UPDATE
            : translation.TITLE_CODES_CREATE
        }
        placement='right'
        closable={true}
        onClose={onClose}
        visible={visibleDrawer && location.pathname === PATH.MANAGE_GENERATE}
        width={theme.widthDrawer}
        footer={
          <DrawerFooter
            onClose={onClose}
            formName={'create-qrcodes'}
            submitLoading={submitLoading}
          />
        }
      >
        <FormQrManage refetch={refetch} setSubmitLoading={setSubmitLoading} />
      </DrawerAdd>
    </>
  )
}
