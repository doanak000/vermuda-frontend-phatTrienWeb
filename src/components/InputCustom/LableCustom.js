import styled from 'styled-components'
import { themeGet } from '@styled-system/theme-get'

export const LableCustom = styled.span`
  font-size: ${(props) =>
    props.name === 'mini' ? themeGet('sizes.S') : themeGet('sizes.M')};
  font-weight: ${(props) => (props.name === 'mini' ? 300 : 500)};
  color: ${(props) =>
    props.name === 'mini'
      ? themeGet('colors.primaryHover')
      : themeGet('colors.primary')};
`
