import { createGlobalStyle } from 'styled-components'
import { ProjectTheme } from './theme'

const GlobalStyle = createGlobalStyle`
:root {
  font-size: ${({ theme }) => (theme as ProjectTheme).rootFontSize.default}px;
  @media screen and (max-width: ${({ theme }) => (theme as ProjectTheme).breakPoints.maxWidthMobile}px) {
    font-size: ${({ theme }) => (theme as ProjectTheme).rootFontSize.mobile}px;
  }
  @media screen and (max-width: ${({ theme }) => (theme as ProjectTheme).breakPoints.minViableWidth}px) {
    font-size: ${({ theme }) => (theme as ProjectTheme).rootFontSize.mobile / (theme as ProjectTheme).breakPoints.minViableWidth * 100}vw;
  }
}

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  transition: background ${({ theme }) => (theme as ProjectTheme).colorTransitionDuration}s, color ${({ theme }) => (theme as ProjectTheme).colorTransitionDuration}s ease-in-out, background-color ${({ theme }) => (theme as ProjectTheme).colorTransitionDuration}s ease-in-out;
}

body {
  font-family: serif;
}
`
export default GlobalStyle