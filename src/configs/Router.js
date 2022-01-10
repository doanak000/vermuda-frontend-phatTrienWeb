import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route, useLocation } from 'react-router-dom'
import { PATH, ROUTES } from '../constants/common'

const RouteRender = ({ path, component, exact }) => (
  <Route
    key={component}
    exact={exact}
    path={path}
    component={React.lazy(() => import(`../pages/${component}`))}
  />
)

const PrivateRouteRender = (route) => {
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn)
  const location = useLocation()
  if (!isLoggedIn)
    return <Redirect to={{ pathname: PATH.LOGIN, state: { from: location } }} />

  return <RouteRender key={route.component} {...route} />
}

export const PublicRoutes = ROUTES.PUBLIC.map((route) => {
  return <RouteRender key={route.component} {...route} />
})

export const PrivateRoutes = ROUTES.PRIVATE.map((route) => (
  <PrivateRouteRender key={route.component} {...route} />
))
