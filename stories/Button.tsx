import styled from "styled-components";
import { ColorScheme, ProjectTheme } from "@/app/theme";

const StyledButton = styled.button<{ $colorScheme: ColorScheme, $hidden?: boolean }>`
  border: none;
  background-color: ${({ $colorScheme, theme }) => (theme as ProjectTheme).colors.surfaceInverse[$colorScheme]};
  color: ${({ $colorScheme, theme }) => (theme as ProjectTheme).colors.typeInverse[$colorScheme]};
  padding: 0.625rem 1rem;
  border-radius: 0.25rem;
  font-family: var(${({ theme }) => (theme as ProjectTheme).fonts.normal});
  font-size: 1.5rem;
  box-shadow: ${({ $colorScheme, theme }) => (theme as ProjectTheme).shadows.buttonInverse[$colorScheme]};
  ${({ $hidden }) => $hidden ? 'opacity: 0;' : ''}
  ${({ $hidden }) => $hidden ? 'pointer-events: none;' : ''}
`

export default function Button({
  children,
  colorScheme,
  onClick,
  hidden,
}: {
  children: React.ReactNode,
  colorScheme: ColorScheme,
  hidden?: boolean,
  onClick?: () => void,
}) {
  return (
    <StyledButton $colorScheme={colorScheme} $hidden={hidden} onClick={onClick} className={hidden ? undefined : "clickable"}>
      {children}
    </StyledButton>
  )
}