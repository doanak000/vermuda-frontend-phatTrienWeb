import gql from 'graphql-tag'

export const QUERY_USERS = gql`
  query($searchText: String, $skip: Float, $take: Float, $userType: String) {
    users(
      searchText: $searchText
      skip: $skip
      take: $take
      userType: $userType
    ) {
      count
      users {
        id
        pwd
        nameKanji
        companyName
        userType {
          id
          role
          name
        }
        agency {
          id
          nameKanji
        }
        tel
        email
        address
        createdAt
        updatedAt
        maxClient
      }
    }
  }
`
export const QUERY_USER = gql`
  query($id: String!) {
    user(id: $id) {
      id
      pwd
      nameKanji
      companyName
      userType {
        id
        role
        name
      }
      tel
      email
      address
      createdAt
      updatedAt
      maxClient
    }
  }
`

export const QUERY_AGENCY = gql`
  query($searchText: String, $skip: Float, $take: Float, $userType: String) {
    agencys: users(
      searchText: $searchText
      skip: $skip
      take: $take
      userType: $userType
    ) {
      count
      users {
        id
        nameKanji
      }
      # userType {
      #   role
      # }
    }
  }
`
