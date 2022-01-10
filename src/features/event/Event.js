import { CloseOutlined } from '@ant-design/icons'
import { useLazyQuery } from '@apollo/client'
// import moment from 'moment'
import { Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DrawerFooter from '../../components/DrawerFooter/DrawerFooter'
import TableCustom, {
  CellContentRender,
  ColTitleRender
} from '../../components/TableCustom/TableCustom'
import {
  COLUMN_TYPE,
  CREATE_UPDATE_DELETE_STATUS,
  LIMIT_TABLE,
  PATH
} from '../../constants/common'
import { QUERY_EVENTS } from '../../graphql/query/event.query'
import { theme } from '../../theme/theme'
import {
  resetStatus,
  selectData,
  selectStatus,
  selectVisibleDrawer,
  setVisibleDrawer
} from '../createUpdateDelete/createUpdateDeleteSlice'
import { selectTranslation } from '../language/languageSlice'
import {
  selectCurrentPage,
  selectSearchValue,
  setCurrentPage
} from '../searchTable/searchTableSlice'
import { CaretDownIcon, CaretUpIcon, WrapperButton } from './Event.style'
// import ButtonSort from './ButtonSort'
import { DrawerAdd } from '../video/Video.style'
// import EventForm from './EventForm'
import { useLocation } from 'react-router'
import { selectFilterValue } from '../filterTable/filterTableSlice'

const EventForm = React.lazy(() => import('./EventForm'))

// import HeaderEvent from './HeaderEvent'

export default function Event() {
  const [submitLoading, setSubmitLoading] = useState(false)
  const translation = useSelector(selectTranslation)
  // const [currentPage, setCurrentPage] = useState(1)
  const visibleDrawer = useSelector(selectVisibleDrawer)
  const selectedRows = useSelector(selectData)
  const searchText = useSelector(selectSearchValue)
  const [field, setField] = useState(null)
  const [direction, setDirec] = useState(null)
  const location = useLocation()
  const filterTable = useSelector(selectFilterValue)
  const [ranks, setRanks] = useState([])
  const currentPage = useSelector(selectCurrentPage)

  const [getEvents, { data, refetch, loading }] = useLazyQuery(QUERY_EVENTS, {
    fetchPolicy: 'network-only'
  })

  // const { data, refetch, loading } = useQuery(QUERY_EVENTS, {
  //   variables: {
  //     limit: LIMIT_TABLE,
  //     offset: (currentPage - 1) * LIMIT_TABLE,
  //     searchText,
  //     orderBy: {
  //       field,
  //       direction
  //     }
  //   },
  //   fetchPolicy: 'network-only'
  // })
  /* Sort numberOfLotteryPeople */

  const handleSortLotteryASC = () => {
    setField('numberOfLotteryPeople')
    setDirec('ASC')
  }

  const handleSortLotteryDESC = () => {
    setField('numberOfLotteryPeople')
    setDirec('DESC')
  }

  /* Sort numberOfLotteryPeople */

  const handleSortCreatedAtASC = () => {
    setField('createdAt')
    setDirec('ASC')
  }
  const handleSortCreatedAtDESC = () => {
    setField('createdAt')
    setDirec('DESC')
  }
  const actionStatus = useSelector(selectStatus)
  const dispatch = useDispatch()
  // console.log('sortValues', sortValues)
  useEffect(() => {
    if (location.pathname === PATH.EVENT) {
      getEvents({
        variables: {
          limit: LIMIT_TABLE,
          offset: (currentPage - 1) * LIMIT_TABLE,
          searchText,
          isExpired: filterTable,
          orderBy: {
            field,
            direction
          }
        }
      })
    }
  }, [
    searchText,
    field,
    currentPage,
    direction,
    filterTable,
    location.pathname
  ])

  useEffect(() => {
    if (
      actionStatus !== CREATE_UPDATE_DELETE_STATUS.UPCOMING &&
      location.pathname === PATH.EVENT
    ) {
      refetch()
      dispatch(resetStatus())
    }
  }, [actionStatus])

  const dataSource = data?.events?.events?.map((itemData, idx) => ({
    ...itemData,
    key: itemData.id,
    idx: idx + 1
  }))
  console.log('dataSource', dataSource)

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
      // sorter: (a, b) => {
      //   handleSortEventsASC()
      // }
    },
    {
      title: (
        <WrapperButton>
          <div style={{ marginRight: '1rem' }}>
            {ColTitleRender(translation.TEXT_LOTTERY)}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Tooltip title={translation.TEXT_ORDER_LOTTERY_BY_ASC}>
              <CaretUpIcon onClick={() => handleSortLotteryASC()} />
            </Tooltip>
            <Tooltip title={translation.TEXT_ORDER_LOTTERY_BY_DESC}>
              <CaretDownIcon onClick={() => handleSortLotteryDESC()} />
            </Tooltip>
          </div>
        </WrapperButton>
      ),
      dataIndex: 'numberOfLotteryPeople',
      render: (value) => CellContentRender(value, COLUMN_TYPE.NUMBER),
      width: 200
    },
    {
      title: (
        <WrapperButton>
          <div style={{ marginRight: '1rem' }}>
            {ColTitleRender(translation.TEXT_CREATED)}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Tooltip title={translation.TEXT_SORT_OLDEST_CREATED_DATE}>
              <CaretUpIcon
                onClick={() => handleSortCreatedAtASC()}
                style={{ marginRight: '0.2rem' }}
              />
            </Tooltip>
            <Tooltip title={translation.TEXT_SORT_NEWEST_CREATED_DATE}>
              <CaretDownIcon onClick={() => handleSortCreatedAtDESC()} />
            </Tooltip>
          </div>
        </WrapperButton>
      ),
      dataIndex: 'createdAt',
      align: 'center',
      ellipsis: true,
      render: (value) => CellContentRender(value, COLUMN_TYPE.DATE),
      width: 200
    },
    {
      title: translation.TEXT_START_TIME,
      dataIndex: 'startTime',
      ellipsis: true,
      render: (value) => CellContentRender(value, COLUMN_TYPE.DATE_STRING),
      width: 200
    },
    {
      title: translation.TEXT_END_TIME,
      dataIndex: 'endTime',
      ellipsis: true,
      render: (value) => CellContentRender(value, COLUMN_TYPE.DATE_STRING),
      width: 200
    },
    {
      title: translation.TEXT_OWNER,
      dataIndex: 'owner',
      ellipsis: true,
      render: (value) => CellContentRender(value.nameKanji),
      width: 200
    },
    {
      title: translation.TEXT_MEMO,
      dataIndex: 'memo',
      ellipsis: true,
      render: (value) => CellContentRender(value),
      width: 200
    }
  ]

  const onChangePage = (value) => {
    // setCurrentPage(value.current)
    dispatch(setCurrentPage(value.current))
  }

  const onClose = () => {
    setRanks([])
    dispatch(setVisibleDrawer(false))
  }

  console.log(data?.events?.count)
  // const dispatch = useDispatch()
  // const sortEvents = useSelector((state) => state.sortEvents)
  return (
    <>
      <TableCustom
        loading={loading}
        onChange={(value) => onChangePage(value)}
        columns={columns}
        dataSource={dataSource}
        total={data?.events?.count}
      />
      <DrawerAdd
        closeIcon={<CloseOutlined style={{ color: 'white' }} />}
        maskClosable={true}
        title={
          selectedRows?.length > 0
            ? translation.TITLE_EVENT_UPDATE
            : translation.TITLE_EVENT_CREATE
        }
        placement='right'
        closable={true}
        onClose={onClose}
        visible={visibleDrawer && location.pathname === PATH.EVENT}
        width={theme.widthDrawer}
        footer={
          <DrawerFooter
            onClose={onClose}
            submitLoading={submitLoading}
            formName={'event-form'}
          />
        }
      >
        <EventForm
          name='event-form'
          refetch={refetch}
          setSubmitLoading={setSubmitLoading}
          visibleDrawer={visibleDrawer}
          ranks={ranks}
          setRanks={setRanks}
        />
      </DrawerAdd>
    </>
  )
}
