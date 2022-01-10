import gql from 'graphql-tag'

export const QUERY_SERIAL_CODES_EVENT = gql`
  query($id: String!) {
    event(id: $id) {
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
        serialCodes {
          code
          status
          expDate
        }
        createdAt
        updatedAt
      }
    }
  }
`
export const QUERY_SERIAL_CODES_MANAGE = gql`
  query($qrmanageId: Float) {
    qrmanages(qrmanageId: $qrmanageId) {
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
        serialCodes {
          code
          status
          expDate
        }
        owner {
          id
          nameKanji
        }
      }
    }
  }
`
