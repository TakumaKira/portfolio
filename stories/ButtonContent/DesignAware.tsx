import styled from "styled-components"
import { FigmaSVG } from "@/app/svg"
import ButtonContentWrapper from "./ContentWrapper"
import { ColorScheme, ProjectTheme } from "@/app/theme"

const FigmaIcon = styled(FigmaSVG)<{ $colorScheme: ColorScheme }>`
  height: 2rem;
  width: 5.75rem;
  path {
    fill: ${({ $colorScheme, theme }) => (theme as ProjectTheme).colors.typeInverse[$colorScheme]};
  }
`
export default function ButtonContentDesignAware({ colorScheme }: { colorScheme: ColorScheme }) {
  return (
    <ButtonContentWrapper>
      <span>Check</span>
      <FigmaIcon $colorScheme={colorScheme} />
    </ButtonContentWrapper>
  )
}
