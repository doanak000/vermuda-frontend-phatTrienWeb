/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Avatar, Layout } from 'antd'
import {
  // MenuUnfoldOutlined,
  // MenuFoldOutlined,
  UserOutlined,
  LogoutOutlined,
  MenuUnfoldOutlined,
  QrcodeOutlined,
  RadiusSettingOutlined,
  SettingOutlined,
  SwapOutlined,
  CrownOutlined,
  VideoCameraOutlined
} from '@ant-design/icons'
import {
  CustomContent,
  CustomHeader,
  CustomMenu,
  CustomMenuItem,
  CustomSider,
  DisplayName,
  DrawerMenu,
  HeaderWrapper,
  Logo,
  MenuMini,
  UserInfo
} from './Layout.style'
import { theme } from '../../theme/theme'
import { confirm } from '../../components/ConfirmModal/ConfirmModal'
import { PATH, SIDEBAR } from '../../constants/common'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout, selectUserInfo } from '../../features/login/loginSlice'
import { selectTranslation } from '../../features/language/languageSlice'
import ActionButton from '../../components/ActionButton/ActionButton'
import { setData } from '../../features/createUpdateDelete/createUpdateDeleteSlice'
import {
  clearSearch,
  setCurrentPage
} from '../../features/searchTable/searchTableSlice'
import { setFilterValue } from '../../features/filterTable/filterTableSlice'

const LayoutAdmin = (props) => {
  const { children } = props
  const [selectedKey, setSelectedKey] = useState(SIDEBAR.USER)
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn)
  const dispatch = useDispatch()
  const location = useLocation()
  const userInfo = useSelector(selectUserInfo)
  const translation = useSelector(selectTranslation)
  useEffect(() => {
    setSelectedKey(location.pathname)
  }, [location.pathname])
  const [visible, setVisible] = useState(false)
  const showDrawer = () => {
    setVisible(true)
  }

  const onClose = () => {
    setVisible(false)
  }

  const logoutHandler = () => {
    confirm({
      content: translation.CONFIRM_LOGOUT,
      onOk: () => {
        dispatch(logout())
      },
      cancelText: 'Cancel'
    })
  }

  const MenuList = (
    <CustomMenu
      theme='dark'
      mode='inline'
      defaultSelectedKeys={[selectedKey]}
      selectedKeys={[selectedKey]}
      onSelect={({ key }) => {
        key !== SIDEBAR.LOGOUT && setSelectedKey(key)
        dispatch(setData([]))
        dispatch(setFilterValue(null))
        dispatch(clearSearch())
        dispatch(setCurrentPage(1))
      }}
    >
      {localStorage.getItem('role') !== 'client' && (
        <CustomMenuItem
          key={SIDEBAR.USER}
          icon={<UserOutlined style={{ fontSize: theme.sizes.M }} />}
        >
          <Link to={PATH.USER}>{translation.TAB_USER}</Link>
        </CustomMenuItem>
      )}
      <CustomMenuItem
        key={SIDEBAR.EVENT}
        icon={<CrownOutlined style={{ fontSize: theme.sizes.M }} />}
      >
        <Link to={PATH.EVENT}>{translation.TAB_EVENT}</Link>
      </CustomMenuItem>
      <CustomMenuItem
        key={SIDEBAR.MANAGE_GENERATE}
        // icon={<SettingOutlined style={{ fontSize: theme.sizes.M }} />}
        icon={<QrcodeOutlined style={{ fontSize: theme.sizes.M }} />}
      >
        <Link to={PATH.MANAGE_GENERATE}>{translation.TAB_MANAGE_QR_CODE}</Link>
      </CustomMenuItem>
      <CustomMenuItem
        key={SIDEBAR.VIDEO}
        icon={<VideoCameraOutlined style={{ fontSize: theme.sizes.M }} />}
      >
        <Link to={PATH.VIDEO}>{translation.TAB_VIDEO}</Link>
      </CustomMenuItem>
      <CustomMenuItem
        key={SIDEBAR.LOGOUT}
        icon={<LogoutOutlined style={{ fontSize: theme.sizes.M }} />}
        onClick={logoutHandler}
        danger
        selectable={false}
        style={{
          marginTop: theme.spaces.twenty * 3,
          alignSelf: 'flex-end',
          position: 'absolute',
          bottom: '0%'
          // backgroundColor: '#ffe6e6'
        }}
      >
        {translation.TEXT_LOGOUT}
      </CustomMenuItem>
    </CustomMenu>
  )

  return (
    <Layout>
      <CustomSider
        width={theme.sideBarWidth}
        style={
          !isLoggedIn
            ? { display: 'none' }
            : location.pathname === PATH.LOTTERY ||
              location.pathname === PATH.EXPORT_CODE
            ? { display: 'none' }
            : {}
        }
      >
        <Logo>Vermuda warriors</Logo>
        {MenuList}
      </CustomSider>
      <Layout className='site-layout'>
        <CustomHeader
          style={
            !isLoggedIn
              ? { display: 'none' }
              : location.pathname === PATH.LOTTERY ||
                location.pathname === PATH.EXPORT_CODE
              ? { display: 'none' }
              : {}
          }
        >
          {/* <MenuMini type='primary' onClick={showDrawer}>
            <MenuUnfoldOutlined />
          </MenuMini> */}
          <DrawerMenu
            title='vermuda warriors'
            placement='left'
            closable={false}
            onClose={onClose}
            visible={visible}
          >
            {MenuList}
          </DrawerMenu>
          <HeaderWrapper>
            {/* <Col span={20} align='middle'> */}
            <ActionButton />
            {/* </Col> */}
            {/* <Col span={4}> */}
            <UserInfo>
              <Avatar
                size='default'
                icon={<UserOutlined />}
                style={{ color: theme.colors.primary }}
              />
              <DisplayName>{`${userInfo.displayName}`}</DisplayName>
            </UserInfo>
            {/* </Col> */}
          </HeaderWrapper>
        </CustomHeader>
        <CustomContent
          style={{
            alignItems:
              location.pathname === PATH.LOGIN
                ? 'center'
                : location.pathname === PATH.LOTTERY
                ? 'center'
                : 'flex-start',
            padding:
              location.pathname === PATH.LOTTERY ? 0 : theme.spaces.container
          }}
          // lottery={location.pathname === PATH.LOTTERY}
        >
          {children}
        </CustomContent>
      </Layout>
    </Layout>
  )
}

export default LayoutAdmin
