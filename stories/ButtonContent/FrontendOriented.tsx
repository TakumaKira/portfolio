import styled from "styled-components"
import ButtonContentWrapper from "./ContentWrapper"
import { GithubSVG } from "@/app/svg"
import { ColorScheme, ProjectTheme } from "@/app/theme"

const GithubIcon = styled(GithubSVG)<{ $colorScheme: ColorScheme }>`
  height: 2rem;
  width: 2rem;
  path {
    fill: ${({ $colorScheme, theme }) => (theme as ProjectTheme).colors.typeInverse[$colorScheme]};
  }
`
export default function ButtonContentFrontendOriented({ colorScheme }: { colorScheme: ColorScheme }) {
  return (
    <ButtonContentWrapper>
      <GithubIcon $colorScheme={colorScheme} />
      <span>Check my code</span>
    </ButtonContentWrapper>
  )
}
