import gql from 'graphql-tag'

export const MUTATION_DELETE_EVENTS = gql`
  mutation($ids: [String!]!) {
    deleteEvents(ids: $ids)
  }
`

export const MUTATION_CREATE_EVENT = gql`
  mutation($createEventInput: CreateEventInput!) {
    createEvent(createEventInput: $createEventInput) {
      name
      startTime
      endTime
      numberOfLotteryPeople
      prizes {
        name
        imageUrl
        rank
      }
    }
  }
`
export const MUTATION_UPDATE_EVENT = gql`
  mutation($updateEventInput: UpdateEventInput!) {
    updateEvent(updateEventInput: $updateEventInput) {
      id
      name
      startTime
      endTime
      memo
      numberOfLotteryPeople
    }
  }
`
