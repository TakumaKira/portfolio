import styled from "styled-components";
import { type ColorScheme, type ProjectTheme } from "@/app/theme";
import HorizontalFade, { FadeState } from "./HorizontalFade";
import constants from "@/app/constants";

const { ROOT_FONT_SIZE_DEFAULT, ROOT_FONT_SIZE_MOBILE } = constants

const Form = styled.div<{ $colorScheme: ColorScheme, $size: 'large' | 'small', $align: 'center' | 'left', $minWidth?: string }>`
min-width: ${({ $size }) => $size === 'small' ? 212 / ROOT_FONT_SIZE_DEFAULT : 680 / ROOT_FONT_SIZE_DEFAULT}rem;
@media screen and (max-width: ${({ theme }) => (theme as ProjectTheme).breakPoints.maxWidthMobile}) {
  min-width: ${({ $size }) => $size === 'small' ? 167 / ROOT_FONT_SIZE_MOBILE : 372 / ROOT_FONT_SIZE_MOBILE}rem;
}
text-align: ${({ $align }) => $align};
padding-left: ${({ $align }) => $align === 'left' ? 8 / ROOT_FONT_SIZE_DEFAULT : 0}rem;
padding-right: ${({ $align }) => $align === 'left' ? 8 / ROOT_FONT_SIZE_DEFAULT : 0}rem;
@media screen and (max-width: ${({ theme }) => (theme as ProjectTheme).breakPoints.maxWidthMobile}) {
  padding-left: ${({ $align }) => $align === 'left' ? 8 / ROOT_FONT_SIZE_MOBILE : 0}rem;
  padding-right: ${({ $align }) => $align === 'left' ? 8 / ROOT_FONT_SIZE_MOBILE : 0}rem;
}
padding-top: ${({ $size }) => $size === 'small' ? 0 : 6 / ROOT_FONT_SIZE_DEFAULT}rem;
padding-bottom: ${({ $size }) => $size === 'small' ? 0 : 6 / ROOT_FONT_SIZE_DEFAULT}rem;
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