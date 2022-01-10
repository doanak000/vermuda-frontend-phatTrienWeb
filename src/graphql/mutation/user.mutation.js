import gql from 'graphql-tag'

export const MUTATION_DELETE_USERS = gql`
  mutation($ids: [String!]!) {
    deletesUser(ids: $ids)
  }
`

export const MUTATION_CREATE_USER = gql`
  mutation($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      id
      pwd
      nameKanji
      companyName
      tel
      email
      address
      maxClient
    }
  }
`

export const MUTATION_UPDATE_USER = gql`
  mutation($updateUserInput: UpdateUserInput!) {
    updateUser(updateUserInput: $updateUserInput) {
      id
      pwd
      nameKanji
      companyName
      tel
      email
      address
      agency {
        id
        nameKanji
      }
      maxClient
    }
  }
`
