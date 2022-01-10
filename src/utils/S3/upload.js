import AWS from 'aws-sdk'
// import {
//   PutObjectRequest,
//   HeadObjectRequest,
//   DeleteObjectRequest,
//   ListObjectsRequest,
//   DeleteObjectsRequest
// } from 'aws-sdk/clients/s3'

const albumBucketName = process.env.REACT_APP_BUCKET_NAME
// Initialize the Amazon Cognito credentials provider
AWS.config.region = 'ap-northeast-1' // Region
// AWS.config.credentials = new AWS.CognitoIdentityCredentials({
//   IdentityPoolId: process.env.REACT_APP_POOL_ID
// })

AWS.config.accessKeyId = process.env.REACT_APP_ACCESS_KEY
AWS.config.secretAccessKey = process.env.REACT_APP_SECRET_KEY

const s3 = new AWS.S3({
  apiVersion: process.env.REACT_APP_API_VER,
  // region: 'ap-northeast-1',
  params: { Bucket: albumBucketName }
})

export function createAlbum(albumName) {
  albumName = albumName.trim()

  if (!albumName) {
    return alert('Album names must contain at least one non-space character.')
  }
  if (albumName.indexOf('/') !== -1) {
    return alert('Album names cannot contain slashes.')
  }
  const albumKey = encodeURIComponent(albumName)
  s3.headObject({ Key: albumKey }, function (err, data) {
    if (!err) {
      return alert('Album already exists.')
    }
    if (err.code !== 'NotFound') {
      return alert('There was an error creating your album: ' + err.message)
    }
    s3.putObject({ Key: albumKey }, function (err, data) {
      if (err) {
        return alert('There was an error creating your album: ' + err.message)
      }
      alert('Successfully created album.')
    })
  })
}

export default function addPhoto(albumName, folderName, files, callback) {
  if (!files.length) {
    return alert('ERROR')
  }
  const file = files[0]
  const fileName = file.name
  const albumPhotosKey = encodeURIComponent(albumName) + '/'

  const photoKey = folderName + albumPhotosKey + fileName

  const upload = new AWS.S3.ManagedUpload({
    params: {
      Bucket: albumBucketName,
      Key: photoKey,
      Body: file,
      ACL: 'public-read'
    }
  })
  upload.on('httpUploadProgress', (progress) => {
    if (progress.total >= 1022700) {
      callback.onLoad(
        (progress.loaded / 1048576).toFixed(2),
        (progress.total / 1048576).toFixed(2),
        'MB'
      )
    } else {
      callback.onLoad(
        Math.round(progress.loaded / 1024),
        Math.round(progress.total / 1024),
        'KB'
      )
    }
  })
  const promise = upload.promise()
  promise.then(
    function (data) {
      // alert("Successfully uploaded photo.");
      const urlImage = encodeURI(
        'https://' +
          albumBucketName +
          '.s3-ap-northeast-1.amazonaws.com/' +
          folderName +
          albumPhotosKey +
          fileName
      )
      callback.onSuccess(urlImage)
    },
    function (err) {
      alert('There was an error uploading your photo: ' + err.message)
      callback.onError('')
    }
  )
}

export function deletePhoto(photoKey) {
  s3.deleteObject({ Key: photoKey }, function (err, data) {
    if (err) {
      return alert('There was an error deleting your photo: ' + err.message)
    }
    alert('Successfully deleted photo.')
  })
}

export function deleteAlbum(albumName) {
  const albumKey = encodeURIComponent(albumName) + '/'
  s3.listObjects({ Prefix: albumKey }, function (err, data) {
    if (err) {
      return alert('There was an error deleting your album: ' + err.message)
    }
    const objects = data.Contents.map(function (object) {
      return { Key: object.Key }
    })
    s3.deleteObjects(
      {
        Delete: { Objects: objects, Quiet: true }
      },
      function (err, data) {
        if (err) {
          return alert('There was an error deleting your album: ' + err.message)
        }
        alert('Successfully deleted album.')
      }
    )
  })
}
