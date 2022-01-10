import gql from 'graphql-tag'

export const MUTATION_LOGIN = gql`
  mutation($input: LoginInput!) {
    login(loginInput: $input) {
      id
      accessToken
      expiresTime
      nameKanji
      userType {
        role
      }
    }
  }
`
