import gql from 'graphql-tag'

export const MUTATION_QR_MANAGE = gql`
  mutation($createQrmanageInput: CreateQrmanageInput!) {
    createQrmanage(input: $createQrmanageInput)
  }
`

export const UPDATE_QR_MANGES = gql`
  mutation($input: UpdateQrmanageInput!, $id: String!) {
    updateQrmanage(input: $input, id: $id)
  }
`
