import gql from 'graphql-tag'
export const QUERY_VIDEOS = gql`
  query($name: String, $offset: Float, $limit: Float) {
    Videos(name: $name, offset: $offset, limit: $limit) {
      count
      videos {
        id
        name
        url
        createdAt
        updatedAt
        owner {
          id
          nameKanji
          companyName
          email
        }
      }
    }
  }
`
