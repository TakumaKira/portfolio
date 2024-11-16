'use client'

import React from "react";
import styled from "styled-components";
import { useColorSchemeControl } from "./contexts/ColorSchemeControl";
import { type ColorScheme, type ProjectTheme } from "./theme";
import { GithubSVG } from "./svg";

const Button = styled.button`
  border: none;
  background: none;
  font-family: var(${({ theme }) => (theme as ProjectTheme).fonts.main});
`
const Text = styled.span<{ $colorScheme: ColorScheme }>`
  font-family: var(${({ theme }) => (theme as ProjectTheme).fonts.main});
  font-size: 4rem;
  @media screen and (max-width: ${({ theme }) => (theme as ProjectTheme).breakPoints.minWidthTablet - 1}px) {
    font-size: 3rem;
  }
  line-height: 1;
  color: ${({ $colorScheme, theme }) => (theme as ProjectTheme).colors.typePrimary[$colorScheme]};
`

const GithubIcon = styled(GithubSVG)`
  path {
    fill: red;
  }
`

export default function Home() {
  const { colorScheme, toggleColorScheme } = useColorSchemeControl()

  const [isClient, setIsClient] = React.useState(false)
  React.useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null
  return (
    <Button onClick={toggleColorScheme}>
      <GithubIcon />
      <Text $colorScheme={colorScheme}>Toggle Color Scheme</Text>
    </Button>
  );
}
