import PacmanLoader from 'react-spinners/PacmanLoader'
import styled from 'styled-components'

export const CustomSpinner = styled(PacmanLoader)`
  & > span {
    width: 100vw;
    height: 100vh;
  }
`

export const Mask = styled.div`
  background-color: rgba(0, 0, 0, 0.15);
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
`

export const SpinnerWrapper = styled.div`
  width: 100%;
  height: 100%;
`
