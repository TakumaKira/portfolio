import { createGlobalStyle } from 'styled-components'
import { ProjectTheme } from './theme'
import constants from './constants'

const { ROOT_FONT_SIZE_DEFAULT, ROOT_FONT_SIZE_MOBILE, COLOR_TRANSITION_DURATION } = constants

const GlobalStyle = createGlobalStyle`
:root {
  font-size: ${ROOT_FONT_SIZE_DEFAULT}px;
  @media screen and (max-width: ${props => (props.theme as ProjectTheme)?.breakPoints.maxWidthMobile}) {
    font-size: ${ROOT_FONT_SIZE_MOBILE}px;
  }
}

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  transition: background ${COLOR_TRANSITION_DURATION}s, color ${COLOR_TRANSITION_DURATION}s ease-in-out, background-color ${COLOR_TRANSITION_DURATION}s ease-in-out;
}

body {
  font-family: serif;
}
`
export default GlobalStyle