import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginFail, loginSuccess, selectIsLoggedIn } from './loginSlice'
import { Redirect, useHistory, useLocation } from 'react-router-dom'
import { Notification } from '../../components/Notification/Notification'
import { NOTIFICATION_TYPE } from '../../constants/common'
import { selectTranslation } from '../language/languageSlice'
import { Input } from 'antd'
import {
  LoginButton,
  LoginLable,
  // LoginSpinner,
  TitleLogin,
  WrapperLogin,
  WrapperLoginForm,
  FormLogin
} from './Login.style'
import { MUTATION_LOGIN } from '../../graphql/mutation/login.mutation.js'
import { useMutation } from '@apollo/client'
import { handleKeyPress } from '../../helper/enterSubmit'
const layout = {
  labelCol: {
    span: 24
  },
  wrapperCol: {
    span: 24
  }
}
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 24
  }
}
const Login = () => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const location = useLocation()
  const history = useHistory()
  const [stopLogin, setStopLogin] = useState(false)
  const [loadingState, setLoadingState] = useState(false)
  const translation = useSelector(selectTranslation)
  const [loginMutation] = useMutation(MUTATION_LOGIN)
  const { from } = location.state || { from: { pathname: '/' } }
  const [user, setUser] = useState({
    username: '',
    password: ''
  })

  const handleChange = (event) => {
    setUser({
      ...user,
      [event?.target?.name]: event?.target?.value
    })
    console.log(user)
  }

  const loginHandler = async () => {
    setStopLogin(true)
    setLoadingState(true)
    await loginMutation({
      variables: {
        input: {
          id: user.username,
          password: user.password
        }
      }
    })
      .then(
        async ({
          data: {
            login: { accessToken, userType, nameKanji, id }
          }
        }) => {
          localStorage.setItem('access_token', `${accessToken}`)
          localStorage.setItem('role', `${userType?.role}`)
          dispatch(
            loginSuccess({
              userInfo: {
                displayName: `${nameKanji}`,
                role: `${userType?.role}`,
                id
              }
            })
          )
          history.replace(from)
          Notification({
            type: NOTIFICATION_TYPE.SUCCESS,
            message: translation.NOTI_LOGIN_SUCCESS
          })
        }
      )
      .catch(({ graphQLErrors }) => {
        setLoadingState(!loadingState)
        setStopLogin(false)
        dispatch(loginFail())
        Notification({
          type: NOTIFICATION_TYPE.ERROR,
          message: translation.NOTI_LOGIN_FAIL
        })
      })

    setLoadingState(false)
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  if (isLoggedIn) return <Redirect to='/' />

  return (
    <WrapperLogin>
      <WrapperLoginForm>
        <FormLogin
          size='large'
          {...layout}
          name='basic'
          initialValues={{
            remember: true
          }}
          onFinish={loginHandler}
          onFinishFailed={onFinishFailed}
          onKeyPress={(event) => handleKeyPress(event, loginHandler)}
        >
          <TitleLogin>WARRIORS</TitleLogin>
          <FormLogin.Item
            size='large'
            id='username'
            label={<LoginLable>USERNAME</LoginLable>}
            name='username'
            rules={[
              {
                required: true,
                message: translation.TEXT_REQUIRED_FIELD
              }
            ]}
          >
            <Input
              placeholder='USERNAME'
              onChange={handleChange}
              name='username'
              size='large'
            />
          </FormLogin.Item>

          <FormLogin.Item
            id='password'
            label={<LoginLable>PASSWORD</LoginLable>}
            name='password'
            rules={[
              {
                required: true,
                message: translation.TEXT_REQUIRED_FIELD
              }
            ]}
          >
            <Input.Password
              size='large'
              placeholder='PASSWORD'
              onChange={handleChange}
              name='password'
              type='password'
            />
          </FormLogin.Item>
          <FormLogin.Item {...tailLayout}>
            <LoginButton
              loading={loadingState}
              type='primary'
              htmlType='submit'
              disabled={stopLogin}
            >
              {'LOGIN'}
            </LoginButton>
          </FormLogin.Item>
        </FormLogin>
      </WrapperLoginForm>
    </WrapperLogin>
  )
}

export default Login
