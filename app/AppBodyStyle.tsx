import { createGlobalStyle } from 'styled-components'
import { ColorScheme, ProjectTheme } from './theme'

const AppBodyStyle = createGlobalStyle<{ $colorScheme: ColorScheme }>`
html,
body {
  min-width: 100vw;
  min-height: 100vh;
}
body {
  background-color: ${props => (props.theme as ProjectTheme)?.colors.surfacePrimary[props.$colorScheme]};
}
`
export default AppBodyStyle