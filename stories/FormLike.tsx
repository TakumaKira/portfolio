import styled from "styled-components";
import { type ColorScheme, type ProjectTheme } from "@/app/theme";
import HorizontalFade, { FadeState } from "./HorizontalFade";

const Form = styled.div<{ $colorScheme: ColorScheme, $size: 'large' | 'small', $align: 'center' | 'left', $minWidth?: string }>`
min-width: ${({ $size }) => $size === 'small' ? 13.25 : 42.5}rem;
@media screen and (max-width: ${({ theme }) => (theme as ProjectTheme).breakPoints.maxWidthMobile}) {
  min-width: ${({ $size }) => $size === 'small' ? 167 / 12 : 42.5}rem;
}
text-align: ${({ $align }) => $align};
padding-left: ${({ $align }) => $align === 'left' ? 0.5 : 0}rem;
padding-right: ${({ $align }) => $align === 'left' ? 0.5 : 0}rem;
@media screen and (max-width: ${({ theme }) => (theme as ProjectTheme).breakPoints.maxWidthMobile}) {
  padding-left: ${({ $align }) => $align === 'left' ? 8 / 12 : 0}rem;
  padding-right: ${({ $align }) => $align === 'left' ? 8 / 12 : 0}rem;
}
padding-top: ${({ $size }) => $size === 'small' ? 0 : 0.375}rem;
padding-bottom: ${({ $size }) => $size === 'small' ? 0 : 0.375}rem;
border-bottom: 1px solid ${({ $colorScheme, theme }) => (theme as ProjectTheme).colors.borderPrimary[$colorScheme]};
`
const Text = styled.span<{ $colorScheme: ColorScheme, $size: 'large' | 'small' }>`
font-family: var(${({ theme }) => (theme as ProjectTheme).fonts.main});
font-size: ${({ $size }) => $size === 'small' ? '3rem' : '4rem'};
@media screen and (max-width: ${({ theme }) => (theme as ProjectTheme).breakPoints.maxWidthMobile}) {
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
  isVisible,
  onChangeState,
}: {
  text?: string,
  size: 'large' | 'small',
  align: 'center' | 'left',
  colorScheme: ColorScheme,
  isVisible: boolean,
  onChangeState?: (state: FadeState) => void,
}) {
  return (
    <Form $colorScheme={colorScheme} $size={size} $align={align}>
      <HorizontalFade isVisible={isVisible} onChangeState={onChangeState}>
        <Text $colorScheme={colorScheme} $size={size}>{text}</Text>
      </HorizontalFade>
    </Form>
  )
}