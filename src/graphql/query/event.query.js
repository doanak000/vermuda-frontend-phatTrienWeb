import gql from 'graphql-tag'

export const QUERY_EVENTS = gql`
  query(
    $id: String
    $offset: Float
    $limit: Float
    $searchText: String
    $orderBy: EventOrderByInput
    $isExpired: Boolean
  ) {
    events(
      id: $id
      offset: $offset
      limit: $limit
      searchText: $searchText
      orderBy: $orderBy
      isExpired: $isExpired
    ) {
      count
      events {
        id
        name
        numberOfLotteryPeople
        createdAt
        startTime
        endTime
        owner {
          nameKanji
        }
        memo
        prizes {
          id
          name
          numberOfCode
          rank
          imageUrl
          video {
            id
            name
            url
          }

          createdAt
          updatedAt
        }
      }
    }
  }
`
