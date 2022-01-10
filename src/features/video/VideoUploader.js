import { CloseOutlined, InboxOutlined } from '@ant-design/icons'
import { Progress } from 'antd'
import React, { useEffect, useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { useSelector } from 'react-redux'
import { selectVisibleDrawer } from '../createUpdateDelete/createUpdateDeleteSlice'
import { selectTranslation } from '../language/languageSlice'
import {
  LoadingContainer,
  VideoUpContainer,
  Text,
  TextHighlighted,
  Thumb,
  ThumbInner,
  ThumbButton,
  FileName,
  FileSize,
  VideoName,
  VideoTag,
  IconUpload
} from './Uploader.style'

const VideoUploader = ({
  onChange,
  disabled,
  onDelete,
  setValidVideo,
  videoURL,
  progress: { loaded, total, unit }
}) => {
  // debugger
  const [files, setFiles] = useState(
    videoURL ? [{ name: 'demo', preview: videoURL }] : []
  )

  const visible = useSelector(selectVisibleDrawer)
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'video/*',
    multiple: false,
    // disabled: disabled,
    onDrop: useCallback(
      (acceptedFiles) => {
        setValidVideo()
        setFiles(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file)
            })
          )
        )
        onChange(acceptedFiles)
      },
      [onChange]
    )
  })
  const deleteVideo = () => {
    setFiles([])
    onDelete()
  }
  const translation = useSelector(selectTranslation)
  const progressPercent = total ? `${loaded}/${total} ${unit}` : '0/0'
  // const totalPercent = total && `${total} ${unit}`
  const progressPercentage = Math.round((loaded / total) * 100)
  // const thumbs = files.map((file, index) => (
  //   <Thumb key={file.name}>
  //     <ThumbInner>
  //       <Video src={file.preview} typeof={file.name} />
  //     </ThumbInner>
  //     {files.length > 0 && !disabled && (
  //       <ThumbButton onClick={deleteVideo}>
  //         <CloseOutlined style={{ fontSize: '12px' }} />
  //       </ThumbButton>
  //     )}
  //   </Thumb>
  // ))
  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview))
    },
    [files]
  )
  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks
    if (videoURL) {
      setFiles([{ name: videoURL?.split('/')[5], preview: videoURL }])
    } else {
      setFiles([])
    }
  }, [videoURL, visible])
  console.log('files', files)
  return (
    <section className='uploader'>
      <VideoUpContainer {...getRootProps()}>
        <input {...getInputProps()} />
        <Text>
          <TextHighlighted>
            <IconUpload>
              <InboxOutlined />
            </IconUpload>
            <p>{translation.NOTI_UPLOAD_VIDEO}</p>
            <p style={{ fontSize: '11px' }}>{translation.HINT_TEXT}</p>
          </TextHighlighted>
        </Text>
      </VideoUpContainer>
      {files.length > 0 && (
        <div style={{ flexDirection: 'row' }}>
          <Thumb key={files[0].name}>
            <ThumbInner>
              <VideoTag src={files[0].preview} typeof={files[0].name} />
            </ThumbInner>
            {!disabled && (
              <ThumbButton onClick={deleteVideo}>
                <CloseOutlined width={6} height={6} />
              </ThumbButton>
            )}
          </Thumb>
          {disabled ? (
            <LoadingContainer>
              <FileSize>{progressPercent}</FileSize>
              <Progress percent={progressPercentage} status='active' />
            </LoadingContainer>
          ) : (
            <VideoName href={files[0]?.preview} target={'_blank'}>
              <FileName>{decodeURI(files[0].name)}&nbsp;</FileName>
            </VideoName>
          )}
        </div>
      )}
    </section>
  )
}

export default VideoUploader
