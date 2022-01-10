import gql from 'graphql-tag'

export const MUTATION_CREATE_VIDEOS = gql`
  mutation($createVideoInput: CreateVideoInput!) {
    createVideo(createVideoInput: $createVideoInput) {
      id
      name
      url
    }
  }
`

export const MUTATION_UPDATE_VIDEO = gql`
  mutation($updateVideoInput: UpdateVideoInput!) {
    updateVideo(updateVideoInput: $updateVideoInput) {
      id
      name
      url
      updatedAt
    }
  }
`
export const MUTATION_DELETE_VIDEO = gql`
  mutation($ids: [String!]!) {
    deleteVideos(ids: $ids)
  }
`
