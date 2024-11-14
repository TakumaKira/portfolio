import { createGlobalStyle } from 'styled-components'
import { ProjectTheme } from './theme'

const GlobalStyle = createGlobalStyle`
:root {
  font-size: 16px;
  @media screen and (max-width: ${props => (props.theme as ProjectTheme)?.breakPoints.maxWidthMobile}) {
    font-size: 12px;
  }
}

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  transition: background 0.2s, color 0.2s ease-in-out, background-color 0.2s ease-in-out;
}

body {
  font-family: serif;
}
`
export default GlobalStyle