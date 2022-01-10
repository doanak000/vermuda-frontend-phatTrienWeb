import {
  ApolloClient,
  HttpLink,
  ApolloLink,
  InMemoryCache,
  from,
  gql
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'

import store from '../app/store'
import { logout } from '../features/login/loginSlice'
import { Notification } from '../components/Notification/Notification'
import { NOTIFICATION_TYPE } from '../constants/common'

const getNewToken = () => {
  return client
    .query({ query: gql`` })
    .then((response) => {
      // extract your accessToken from your response data and return it
      const { accessToken } = response.data
      localStorage.setItem('access_token', accessToken)
      localStorage.setItem('expired', accessToken)
      return accessToken
    })
    .catch((_) => {
      store.dispatch(logout())
      Notification({
        type: NOTIFICATION_TYPE.ERROR,
        message: store.getState().language.translation.NOTI_LOGIN_AGAIN
      })
    })
}

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        switch (err.extensions?.code) {
          // Apollo Server sets code to UNAUTHENTICATED
          // when an AuthenticationError is thrown in a resolver
          case 'UNAUTHENTICATED': {
            // Modify the operation context with a new token
            const oldHeaders = operation.getContext().headers
            operation.setContext({
              headers: {
                ...oldHeaders,
                authorization: getNewToken()
              }
            })
            // Retry the request, returning the new observable
            return forward(operation)
          }
        }
      }
    }

    // To retry on network errors, we recommend the RetryLink
    // instead of the onError link. This just logs the error.
    if (networkError) {
      console.log('Network error')
    }
  }
)

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_ENDPOINT
  // credentials: 'same-origin'
})

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: `Bearer ${localStorage.getItem('access_token')}` || null
    }
  }))

  return forward(operation)
})

const activityMiddleware = new ApolloLink((operation, forward) => {
  // add the recent-activity custom header to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      'recent-activity': localStorage.getItem('lastOnlineTime') || null
    }
  }))

  return forward(operation)
})

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([errorLink, authMiddleware, activityMiddleware, httpLink])
})
