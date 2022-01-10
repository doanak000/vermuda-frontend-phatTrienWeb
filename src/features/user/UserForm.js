/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react'
import { Form, Input, Select, Spin, InputNumber } from 'antd'

import { useDispatch, useSelector } from 'react-redux'
import { selectTranslation } from '../language/languageSlice'
import { useMutation, useQuery } from '@apollo/client'
import {
  MUTATION_CREATE_USER,
  MUTATION_UPDATE_USER
} from '../../graphql/mutation/user.mutation'
import { Notification } from '../../components/Notification/Notification'
import {
  MAX_LENGTH_100,
  NOTIFICATION_TYPE,
  ROLE,
  ROLE_AGENCY,
  ROLE_CLIENT
} from '../../constants/common'
import {
  resetData,
  selectData,
  selectVisibleDrawer,
  setVisibleDrawer,
  selectActionType,
  setListData
} from '../createUpdateDelete/createUpdateDeleteSlice'
import { debounce } from '../../helper/debounce'
import { QUERY_AGENCY } from '../../graphql/query/user.query'
import { FormAddUser } from './User.style'
import { selectUserInfo } from '../login/loginSlice'
// import { handleKeyPress } from '../../helper/enterSubmit'
const { Option } = Select
const UserForm = (props) => {
  const [form] = Form.useForm()
  const translation = useSelector(selectTranslation)
  const dispatch = useDispatch()
  const [visibleAgency, setVisbleAgency] = useState(true)
  const [searchTextAgency, setSearchTextAgency] = useState('')
  const [userTypeSelect, setUserTypeSelect] = useState('')
  const selectedRows = useSelector(selectData)
  const [createUser] = useMutation(MUTATION_CREATE_USER)
  const [updateUser] = useMutation(MUTATION_UPDATE_USER)
  const visibleDrawer = useSelector(selectVisibleDrawer)
  // const [errState, setErrState] = useState(false)
  const RefInputId = useRef(null)
  const RefInputPw = useRef(null)
  const userInfo = useSelector(selectUserInfo)
  const actionType = useSelector(selectActionType)
  console.log('visibke', visibleAgency)
  const { data: dataAgency, loading: agencyLoading } = useQuery(QUERY_AGENCY, {
    variables: {
      searchText: searchTextAgency,
      userType: '2'
      // take: 5,
      // skip: 0
    },
    fetchPolicy: 'network-only'
  })
  const role = localStorage.getItem('role')
  const isShowMaxClient = (select) => {
    if (!select) return false
    else {
      if (select !== '2') return false
      return true
    }
  }
  // useEffect(() => {
  //   form.setFieldsValue({ userTypeId: ROLE_CLIENT })
  // }, [])
  // useEffect(() => {
  //   RefInputId.current.focus()
  //   RefInputPw.current.focus()
  // }, [errState])

  useEffect(() => {
    if (selectedRows?.length > 0) {
      RefInputPw.current.focus()
    } else {
      RefInputId.current.focus()
    }

    if (visibleDrawer && !selectedRows?.length) {
      form.resetFields()
    }
    if (!visibleDrawer) {
      dispatch(resetData())
      setVisbleAgency(false)
    }
  }, [visibleDrawer])

  const onFinish = async (values) => {
    console.log('values', values)
    props?.setSubmitLoading(true)
    if (selectedRows?.length === 1) {
      await updateUser({
        variables: {
          updateUserInput: {
            id: values.id,
            pwd: values.pwd,
            nameKanji: values.nameKanji,
            userTypeId: values.userTypeId,
            agencyId: values.agencyId || userInfo?.id,
            companyName: values.companyName,
            tel: values.tel,
            email: values.email,
            address: values.address,
            maxClient: values.maxClient ?? -1
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
        })
        .catch((error) => {
          Notification({
            type: NOTIFICATION_TYPE.ERROR,
            message: translation.NOTI_ERROR,
            description: error?.message
          })
        })
    } else {
      await createUser({
        variables: {
          createUserInput: {
            ...values,
            agencyId: values.agencyId || userInfo?.id,
            maxClient: values.maxClient ? Number(values.maxClient) : -1
          }
        }
      })
        .then(() => {
          console.log('crated user')
          Notification({
            type: NOTIFICATION_TYPE.SUCCESS,
            message: translation.NOTI_CREATE_SUCCESS
          })
          props?.refetch()
          dispatch(setVisibleDrawer(false))
          dispatch(resetData())
          dispatch(setListData(values))
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
  // const validateMaxClient = (textMaxClient) => {
  //   if (textMaxClient.match(/^[-]?[0-9]+$/) || textMaxClient.length === 0) {
  //     return false
  //   }
  //   return true
  // }
  const dataFilterAgency = [
    selectedRows?.length > 0 ? (
      <Option key={selectedRows[0]?.agency?.id}>
        {selectedRows[0]?.agency?.nameKanji} ( {selectedRows[0]?.agency?.id} )
      </Option>
    ) : null,
    dataAgency?.agencys?.users
      ?.filter((item) =>
        selectedRows?.length > 0
          ? item.id !== selectedRows[0]?.agency?.id
          : item
      )
      .map((item) => (
        <Option key={item.id}>
          {item.nameKanji} ( {item.id} )
        </Option>
      ))
  ]

  console.log('dataAgency', dataFilterAgency)
  useEffect(() => {
    if (selectedRows?.length > 0) {
      form.setFieldsValue({
        id: selectedRows[0]?.id,
        pwd: selectedRows[0]?.pwd,
        nameKanji: selectedRows[0]?.nameKanji,
        userTypeId: selectedRows[0]?.userType?.id,
        agencyId: selectedRows[0]?.agency?.id,
        companyName: selectedRows[0]?.companyName,
        tel: selectedRows[0]?.tel,
        email: selectedRows[0]?.email,
        address: selectedRows[0]?.address,
        maxClient: selectedRows[0]?.maxClient
      })
    }
    if (selectedRows) {
      handleRoleChange(selectedRows[0]?.userType?.id)
    } else if (role !== ROLE.CLIENT) {
      setVisbleAgency(false)
    } else {
      setVisbleAgency(true)
    }
  }, [selectedRows])

  console.log(visibleAgency)

  const handleRoleChange = (value) => {
    console.log('user type change: ', value)
    setUserTypeSelect(value)
    return value === ROLE_AGENCY
      ? setVisbleAgency(false)
      : setVisbleAgency(true)
  }

  const handleAgencySearch = (value) => {
    debounce(() => setSearchTextAgency(value))
  }
  return (
    <FormAddUser
      form={form}
      name='create-user'
      onFinish={onFinish}
      layout='vertical'
      // onKeyPress={(event) => handleKeyPress(event, onFinish)}
    >
      <FormAddUser.Item
        name='id'
        label={translation.TEXT_USER_ID}
        rules={[
          { required: true, message: translation.TEXT_REQUIRED_FIELD },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (value?.length > 0 && value?.length < 4) {
                return Promise.reject(
                  new Error('Set the user ID to 4 characters or more.')
                  // setErrState(true)
                )
              }
              return Promise.resolve()
            }
          })
        ]}
      >
        <Input
          ref={RefInputId}
          maxLength={10}
          // minLength={4}
          autoFocus
          size='large'
          disabled={selectedRows?.length === 1 ? 'true' : ''}
          placeholder={translation.TEXT_USER_ID}
        />
      </FormAddUser.Item>
      <FormAddUser.Item
        name='pwd'
        label={translation.TEXT_PASSWORD}
        rules={[
          { required: true, message: translation.TEXT_REQUIRED_FIELD },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (value?.length > 0 && value?.length < 4) {
                return Promise.reject(
                  new Error('Please set a password of 4 characters or more')
                  // setErrState(true)
                )
              }
              return Promise.resolve()
            }
          })
        ]}
      >
        <Input.Password
          maxLength={20}
          size='large'
          placeholder={translation.TEXT_PASSWORD}
          ref={RefInputPw}
          autoFocus
        />
      </FormAddUser.Item>
      <FormAddUser.Item
        name='nameKanji'
        label={translation.TEXT_FULL_NAME}
        rules={[{ required: true, message: translation.TEXT_REQUIRED_FIELD }]}
      >
        <Input
          maxLength={MAX_LENGTH_100}
          size='large'
          placeholder={translation.TEXT_FULL_NAME}
        />
      </FormAddUser.Item>

      {
        <FormAddUser.Item
          name='userTypeId'
          label={translation.TEXT_TYPE_ROLE}
          rules={[{ required: true, message: translation.TEXT_REQUIRED_FIELD }]}
          initialValue={role === ROLE.AGENCY ? ROLE_CLIENT : ROLE_AGENCY}
        >
          <Select
            placeholder={translation.TEXT_TYPE_ROLE}
            // disabled={selectedRows?.length === 1 ? 'true' : ''}
            size='large'
            onChange={(value) => handleRoleChange(value)}
            allowClear
            disabled={role !== 'admin' || selectedRows?.length > 0}
            // defaultValue={ROLE_CLIENT}
          >
            <Option value={ROLE_AGENCY}>{translation.TEXT_AGENCY}</Option>
            <Option value={ROLE_CLIENT}>Store</Option>
          </Select>
        </FormAddUser.Item>
      }
      {/* {((actionType === 'create' && isShowMaxClient(userTypeSelect)) ||
        (actionType === 'update' && userTypeSelect !== '3')) && */}
      {!visibleAgency && localStorage.role === 'admin' && (
        <FormAddUser.Item
          name='maxClient'
          label={translation.MAX_CLIENT}
          rules={[
            {
              required: true,
              message: translation.TEXT_REQUIRED_FIELD
            }
          ]}
        >
          <InputNumber
            size='large'
            placeholder={translation.MAX_CLIENT}
            style={{ width: '100%' }}
          />
        </FormAddUser.Item>
      )}
      {visibleAgency && role === ROLE.ADMIN && (
        <FormAddUser.Item name='agencyId' label={translation.TEXT_AGENCY}>
          <Select
            size='large'
            optionFilterProp='children'
            showSearch
            allowClear
            placeholder={translation.TEXT_AGENCY}
            onSearch={handleAgencySearch}
            notFoundContent={agencyLoading ? <Spin size='small' /> : null}
            disabled={role !== 'admin'}
            onClear={() => setSearchTextAgency('')}
            // filterOption={(input, option) =>
            //   option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            // }
          >
            {dataFilterAgency}
          </Select>
        </FormAddUser.Item>
      )}
      <FormAddUser.Item
        name='companyName'
        label={translation.TEXT_COMPANY_NAME}
      >
        <Input size='large' placeholder={translation.TEXT_COMPANY_NAME} />
      </FormAddUser.Item>
      <FormAddUser.Item name='tel' label={translation.TEXT_PHONE}>
        <Input
          maxLength={20}
          size='large'
          placeholder={translation.TEXT_PHONE}
        />
      </FormAddUser.Item>
      <FormAddUser.Item
        name='email'
        rules={[
          {
            type: 'email',
            message: translation.TEXT_INVALID_EMAIL
          }
        ]}
        label={translation.TEXT_EMAIL}
      >
        <Input
          maxLength={MAX_LENGTH_100}
          size='large'
          placeholder={translation.TEXT_EMAIL}
        />
      </FormAddUser.Item>
      <FormAddUser.Item name='address' label={translation.TEXT_ADDRESS}>
        <Input size='large' placeholder={translation.TEXT_ADDRESS} />
      </FormAddUser.Item>
    </FormAddUser>
  )
}
export default UserForm
