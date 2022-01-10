import React from 'react'
import { theme } from '../../theme/theme'
import { CustomSpinner, SpinnerWrapper } from './SpinnerLoading.style'

const SpinnerLoading = (props) => {
  return (
    <SpinnerWrapper>
      {/* <Mask></Mask> */}
      <CustomSpinner
        {...props}
        color={theme.colors.primaryHover}
        className={'aaaa'}
      />
    </SpinnerWrapper>
  )
}

export default SpinnerLoading
