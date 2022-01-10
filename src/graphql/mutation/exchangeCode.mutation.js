import gql from 'graphql-tag'

export const MUTATION_EXCHANGE_CODE = gql`
  mutation($input: String!) {
    exchangeCode(code: $input) {
      code
      status
      prize {
        name
        rank
        imageUrl
        video {
          url
        }
      }
      event {
        name
        endTime
      }
      expDate
    }
  }
`
