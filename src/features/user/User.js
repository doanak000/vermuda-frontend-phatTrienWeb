/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
import { useLazyQuery, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import DrawerFooter from '../../components/DrawerFooter/DrawerFooter'
import TableCustom, {
  renderMaximum,
  CellContentRender,
  ColTitleRender
} from '../../components/TableCustom/TableCustom'
import {
  COLUMN_TYPE,
  CREATE_UPDATE_DELETE_STATUS,
  LIMIT_TABLE,
  PATH
} from '../../constants/common'
import {
  QUERY_USERS,
  QUERY_AGENCY,
  QUERY_USER
} from '../../graphql/query/user.query'
import { theme } from '../../theme/theme'
import {
  resetStatus,
  selectData,
  selectStatus,
  selectVisibleDrawer,
  setVisibleDrawer
} from '../createUpdateDelete/createUpdateDeleteSlice'
import { selectFilterValue } from '../filterTable/filterTableSlice'
import { selectTranslation } from '../language/languageSlice'
import { DrawerAdd } from '../video/Video.style'
import {
  selectSearchValue,
  selectCurrentPage,
  setCurrentPage
} from '../searchTable/searchTableSlice'
import UserForm from './UserForm'
import { CloseOutlined } from '@ant-design/icons'
export default function User() {
  const translation = useSelector(selectTranslation)
  const filterValue = useSelector(selectFilterValue)
  const selectedRows = useSelector(selectData)
  // const [currentPage, setCurrentPage] = useState(1)
  const currentPage = useSelector(selectCurrentPage)
  const searchText = useSelector(selectSearchValue)
  const location = useLocation()
  const [getUsers, { data, refetch, loading }] = useLazyQuery(QUERY_USERS, {
    fetchPolicy: 'network-only'
  })
  // const [loading, setLoading] = useState(false)
  // console.log(loading)
  // const { data, refetch, loading } = useQuery(QUERY_USERS, {
  //   variables: {
  //     take: LIMIT_TABLE,
  //     skip: (currentPage - 1) * LIMIT_TABLE,
  //     searchText,
  //     userType: filterValue
  //   },
  //   fetchPolicy: 'network-only'
  // })

  const actionStatus = useSelector(selectStatus)
  const visibleDrawer = useSelector(selectVisibleDrawer)
  const dispatch = useDispatch()
  const [submitLoading, setSubmitLoading] = useState(false)
  const role = localStorage.getItem('role')

  useEffect(() => {
    if (location.pathname === PATH.USER) {
      getUsers({
        variables: {
          take: LIMIT_TABLE,
          skip: (currentPage - 1) * LIMIT_TABLE,
          searchText,
          userType: filterValue
        }
      })
    }
  }, [searchText, filterValue, currentPage, location.pathname])

  useEffect(() => {
    if (actionStatus !== CREATE_UPDATE_DELETE_STATUS.UPCOMING) {
      refetch()
      dispatch(resetStatus())
    }
  }, [actionStatus])
  const dataSource =
    data?.users?.users
      ?.map((user, idx) => ({
        ...user,
        maxClient: user.userType.id === '3' ? '--/--' : user.maxClient,
        key: user.id,
        idx: idx + 1
      }))
      .filter((item) => item.userType.role !== 'admin') || []
  console.log('dataSource', dataSource)
  const columns = [
    {
      title: ColTitleRender(translation.TEXT_INDEX),
      dataIndex: 'idx',
      width: 60,
      ellipsis: true,
      align: 'center'
    },
    {
      title: ColTitleRender(translation.TEXT_USER_ID),
      dataIndex: 'id',
      width: 200,
      ellipsis: true,
      render: (value) => CellContentRender(value)
    },
    {
      title: ColTitleRender(translation.TEXT_NAME),
      dataIndex: 'nameKanji',
      width: 200,
      ellipsis: true,
      render: (value) => CellContentRender(value)
    },
    {
      title: ColTitleRender(translation.TEXT_ROLE),
      dataIndex: 'userType',
      width: 150,
      ellipsis: true,
      render: (value) => {
        return CellContentRender(
          value?.role === 'client' ? 'store' : value?.role
        )
      }
    },
    {
      title: ColTitleRender(translation.MAX_CLIENT),
      dataIndex: 'maxClient',
      width: 150,
      ellipsis: true,
      render: (value) => {
        return renderMaximum(value)
      }
    },
    {
      title: ColTitleRender(translation.TEXT_CREATED),
      dataIndex: 'createdAt',
      width: 200,
      ellipsis: true,
      align: 'center',
      render: (value) => CellContentRender(value, COLUMN_TYPE.DATE)
    },
    {
      title: ColTitleRender(translation.TEXT_COMPANY),
      dataIndex: 'companyName',
      width: 200,
      ellipsis: true,
      render: (value) => CellContentRender(value)
    },
    {
      title: ColTitleRender(translation.TEXT_PHONE),
      dataIndex: 'tel',
      width: 200,
      ellipsis: true,
      render: (value) => CellContentRender(value)
    },
    {
      title: ColTitleRender(translation.TEXT_EMAIL),
      dataIndex: 'email',
      width: 200,
      ellipsis: true,
      render: (value) => CellContentRender(value)
    },
    {
      title: ColTitleRender(translation.TEXT_ADDRESS),
      dataIndex: 'address',
      width: 200,
      ellipsis: true,
      render: (value) => CellContentRender(value)
    }
  ]

  const columnsNotMaxClient = [
    {
      title: ColTitleRender(translation.TEXT_INDEX),
      dataIndex: 'idx',
      width: 60,
      ellipsis: true,
      align: 'center'
    },
    {
      title: ColTitleRender(translation.TEXT_USER_ID),
      dataIndex: 'id',
      width: 200,
      ellipsis: true,
      render: (value) => CellContentRender(value)
    },
    {
      title: ColTitleRender(translation.TEXT_NAME),
      dataIndex: 'nameKanji',
      width: 200,
      ellipsis: true,
      render: (value) => CellContentRender(value)
    },
    {
      title: ColTitleRender(translation.TEXT_ROLE),
      dataIndex: 'userType',
      width: 150,
      ellipsis: true,
      render: (value) => {
        return CellContentRender(value.name)
      }
    },
    {
      title: ColTitleRender(translation.TEXT_CREATED),
      dataIndex: 'createdAt',
      width: 200,
      ellipsis: true,
      align: 'center',
      render: (value) => CellContentRender(value, COLUMN_TYPE.DATE)
    },
    {
      title: ColTitleRender(translation.TEXT_COMPANY),
      dataIndex: 'companyName',
      width: 200,
      ellipsis: true,
      render: (value) => CellContentRender(value)
    },
    {
      title: ColTitleRender(translation.TEXT_PHONE),
      dataIndex: 'tel',
      width: 200,
      ellipsis: true,
      render: (value) => CellContentRender(value)
    },
    {
      title: ColTitleRender(translation.TEXT_EMAIL),
      dataIndex: 'email',
      width: 200,
      ellipsis: true,
      render: (value) => CellContentRender(value)
    },
    {
      title: ColTitleRender(translation.TEXT_ADDRESS),
      dataIndex: 'address',
      width: 200,
      ellipsis: true,
      render: (value) => CellContentRender(value)
    }
  ]
  const onClose = () => {
    dispatch(setVisibleDrawer(false))
  }
  const onChangePage = (value) => {
    dispatch(setCurrentPage(value.current))
  }
  useEffect(() => {
    // form.setFieldsValue({ userTypeId: '2' })
    return () => dispatch(setVisibleDrawer(false))
  }, [])
  return (
    <>
      <TableCustom
        loading={loading}
        onChange={(value) => onChangePage(value)}
        dataSource={dataSource}
        columns={role === 'admin' ? columns : columnsNotMaxClient}
        total={data?.users?.count || 0}
      />
      <DrawerAdd
        closeIcon={<CloseOutlined style={{ color: 'white' }} />}
        maskClosable={true}
        title={
          selectedRows?.length > 0
            ? translation.TITLE_USER_UPDATE
            : translation.TITLE_USER_CREATE
        }
        placement='right'
        closable={true}
        onClose={onClose}
        visible={visibleDrawer && location.pathname === PATH.USER}
        width={theme.widthDrawer}
        footer={
          <DrawerFooter
            onClose={onClose}
            formName={'create-user'}
            submitLoading={submitLoading}
          />
        }
      >
        <UserForm refetch={refetch} setSubmitLoading={setSubmitLoading} />
      </DrawerAdd>
    </>
  )
}
