import styled from "styled-components";
import { type ColorScheme, type ProjectTheme } from "@/app/theme";
import FadeBox, { FadeState } from "./FadeBox";

const Form = styled.div<{ $colorScheme: ColorScheme, $size: 'large' | 'small', $align: 'center' | 'left', $minWidth?: string }>`
  min-width: ${({ theme, $size }) => $size === 'small' ? 212 / (theme as ProjectTheme).rootFontSize.default : 680 / (theme as ProjectTheme).rootFontSize.default}rem;
  @media screen and (max-width: ${({ theme }) => (theme as ProjectTheme).breakPoints.minWidthTablet - 1}px) {
    min-width: ${({ theme, $size }) => $size === 'small' ? 167 / (theme as ProjectTheme).rootFontSize.mobile : 372 / (theme as ProjectTheme).rootFontSize.mobile}rem;
  }
  text-align: ${({ $align }) => $align};
  padding-left: ${({ theme, $align }) => $align === 'left' ? 8 / (theme as ProjectTheme).rootFontSize.default : 0}rem;
  padding-right: ${({ theme, $align }) => $align === 'left' ? 8 / (theme as ProjectTheme).rootFontSize.default : 0}rem;
  @media screen and (max-width: ${({ theme }) => (theme as ProjectTheme).breakPoints.minWidthTablet - 1}px) {
    padding-left: ${({ theme, $align }) => $align === 'left' ? 8 / (theme as ProjectTheme).rootFontSize.mobile : 0}rem;
    padding-right: ${({ theme, $align }) => $align === 'left' ? 8 / (theme as ProjectTheme).rootFontSize.mobile : 0}rem;
  }
  padding-top: ${({ theme, $size }) => $size === 'small' ? 0 : 6 / (theme as ProjectTheme).rootFontSize.default}rem;
  padding-bottom: ${({ theme, $size }) => $size === 'small' ? 0 : 6 / (theme as ProjectTheme).rootFontSize.default}rem;
  border-bottom: 1px solid ${({ $colorScheme, theme }) => (theme as ProjectTheme).colors.borderPrimary[$colorScheme]};
`
const Text = styled.span<{ $colorScheme: ColorScheme, $size: 'large' | 'small' }>`
  font-family: var(${({ theme }) => (theme as ProjectTheme).fonts.main});
  font-size: ${({ $size }) => $size === 'small' ? '3rem' : '4rem'};
  @media screen and (max-width: ${({ theme }) => (theme as ProjectTheme).breakPoints.minWidthTablet - 1}px) {
    font-size: 3rem;
  }
  line-height: 1;
  color: ${({ $colorScheme, theme }) => (theme as ProjectTheme).colors.typePrimary[$colorScheme]};
`

export default function FormLike({
  text,
  size,
  align,
  colorScheme,
  state,
  onChangeState,
}: {
  text?: string,
  size: 'large' | 'small',
  align: 'center' | 'left',
  colorScheme: ColorScheme,
  state: FadeState,
  onChangeState?: (state: FadeState) => void,
}) {
  return (
    <Form $colorScheme={colorScheme} $size={size} $align={align}>
      <FadeBox state={state} mode="horizontal" onChangeState={onChangeState}>
        <Text $colorScheme={colorScheme} $size={size}>{text}</Text>
      </FadeBox>
    </Form>
  )
}