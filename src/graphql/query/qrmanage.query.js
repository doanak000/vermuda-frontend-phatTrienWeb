import gql from 'graphql-tag'

export const QUERY_QR_MANAGES = gql`
  query($eventId: String, $offset: Float, $limit: Float, $searchText: String) {
    qrmanages(
      eventId: $eventId
      offset: $offset
      limit: $limit
      searchText: $searchText
    ) {
      count
      qrmanages {
        id
        eventId
        memo
        event {
          name
          owner {
            nameKanji
          }
          startTime
          endTime
          numberOfLotteryPeople
        }
        prizes {
          id
          rank
          name
          numberOfCode
        }
        countSerialCodes
        expDate
        owner {
          id
          nameKanji
        }
      }
    }
  }
`
