import React, { Suspense } from 'react'
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client'

import { client } from './configs/apolloClient'
import LayoutAdmin from './containers/layout/Layout'
import { PublicRoutes, PrivateRoutes } from './configs/Router'
import { PATH } from './constants/common'
import SpinnerLoading from './components/SpinnerLoading/SpinnerLoading'

const App = () => {
  // const role = localStorage.getItem('role')
  return (
    <ApolloProvider client={client}>
      <Router>
        <Suspense
          fallback={
            <LayoutAdmin>
              <div>
                <SpinnerLoading size={20} />
              </div>
            </LayoutAdmin>
          }
        >
          <LayoutAdmin>
            <Switch>
              {PublicRoutes}
              {PrivateRoutes}
              <Redirect to={PATH.USER} />
            </Switch>
          </LayoutAdmin>
        </Suspense>
      </Router>
    </ApolloProvider>
  )
}

export default App
