import styled from "styled-components";
import { ColorScheme, ProjectTheme } from "@/app/theme";
import { FadeState } from "./HorizontalFade";
import FormLike from "./FormLike";

const Container = styled.div`
  position: relative;
`
const SubText = styled.span<{ $colorScheme: ColorScheme, $position: 'pre' | 'post' }>`
  font-family: var(${({ theme }) => (theme as ProjectTheme).fonts.sub});
  color: ${({ theme, $colorScheme }) => (theme as ProjectTheme).colors.typeSecondary[$colorScheme]};
  @media (max-width: ${({ theme }) => (theme as ProjectTheme).breakPoints.minWidthTablet - 1}px) {
    position: relative;
    font-size: ${({ theme }) => 27 / (theme as ProjectTheme).rootFontSize.mobile}rem;
    display: flex;
    justify-content: ${({ $position }) => $position === 'pre' ? 'flex-start' : 'flex-end'};
    ${({ $position }) => $position === 'pre' ? 'margin-bottom: calc(1rem / 3);' : 'margin-top: 1rem;'}
    ${({ $position }) => $position === 'pre' ? 'margin-left: 1rem;' : 'margin-right: calc(1rem / 3);'}
  }
  @media (max-width: ${({ theme }) => (theme as ProjectTheme).breakPoints.minWidthDesktop - 1}px) {
    position: relative;
    font-size: ${({ theme }) => 36 / (theme as ProjectTheme).rootFontSize.default}rem;
    display: flex;
    justify-content: ${({ $position }) => $position === 'pre' ? 'flex-start' : 'flex-end'};
    ${({ $position }) => $position === 'pre' ? '' : 'margin-top: 1rem;'}
  }
  @media (min-width: ${({ theme }) => (theme as ProjectTheme).breakPoints.minWidthDesktop}px) {
    position: absolute;
    bottom: 0;
    ${({ $position }) => $position === 'pre' ? 'right: calc(100% + 1rem);' : 'left: calc(100% + 1rem);'}
    white-space: nowrap;
    font-size: ${({ theme }) => 36 / (theme as ProjectTheme).rootFontSize.default}rem;
  }
`

export default function MainMessage({
  centerText,
  colorScheme,
  centerTextState,
  onChangeState,
}: {
  centerText?: string,
  colorScheme: ColorScheme,
  centerTextState: FadeState,
  onChangeState?: (state: FadeState) => void,
}) {
  return (
    <Container>
      <SubText $colorScheme={colorScheme} $position='pre'>I'm a</SubText>
      <FormLike
        text={centerText}
        size="large"
        align="center"
        colorScheme={colorScheme}
        state={centerTextState}
        onChangeState={onChangeState}
      />
      <SubText $colorScheme={colorScheme} $position='post'>software developer.</SubText>
    </Container>
  )
}