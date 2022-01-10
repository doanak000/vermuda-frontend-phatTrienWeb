import React from 'react'
import { useSelector } from 'react-redux'
import { selectData } from '../../features/createUpdateDelete/createUpdateDeleteSlice'
import { selectTranslation } from '../../features/language/languageSlice'
import {
  ButtonVideo,
  WrapperButtonVideo
} from '../../features/video/Video.style'

const DrawerFooter = (props) => {
  const translation = useSelector(selectTranslation)
  const selectedRows = useSelector(selectData)
  return (
    <WrapperButtonVideo
      style={{
        textAlign: 'right'
      }}
    >
      <ButtonVideo
        size='large'
        onClick={props?.onClose}
        style={{ marginRight: 8 }}
      >
        {translation.BUTTON_CANCEL}
      </ButtonVideo>
      <ButtonVideo
        size='large'
        form={props?.formName}
        type='primary'
        htmlType='submit'
        loading={props?.submitLoading}
        disabled={props?.isUploading}
      >
        {selectedRows?.length === 1
          ? translation.BUTTON_UPDATE
          : translation.BUTTON_CREATE}
      </ButtonVideo>
    </WrapperButtonVideo>
  )
}

export default DrawerFooter
