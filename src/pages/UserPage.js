import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router'
import { PATH, ROLE } from '../constants/common'
import { selectUserInfo } from '../features/login/loginSlice'
import User from '../features/user/User'

const UserPage = () => {
  const userInfo = useSelector(selectUserInfo)

  if (userInfo?.role === ROLE.CLIENT) {
    return <Redirect to={PATH.EVENT} />
  }
  return <User />
}

export default UserPage
