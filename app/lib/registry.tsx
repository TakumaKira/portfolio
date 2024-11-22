'use client'
 
import React, { useState } from 'react'
import { useServerInsertedHTML } from 'next/navigation'
import { ServerStyleSheet, StyleSheetManager, ThemeProvider } from 'styled-components'
import { projectTheme } from '../theme'
import useColorScheme from '../hooks/useColorScheme'
import ColorSchemeControlProvider from '../contexts/ColorSchemeControl'
import AppBodyStyle from "../AppBodyStyle";
import GlobalStyle from '../GlobalStyle'

export default function StyledComponentsRegistry({
  children,
}: {
  children: React.ReactNode
}) {
  // Only create stylesheet once with lazy initial state
  // x-ref: https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet())
 
  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement()
    styledComponentsStyleSheet.instance.clearTag()
    return <>{styles}</>
  })
 
  const { colorScheme, toggleColorScheme } = useColorScheme()
  
  return typeof window === 'undefined'
    ? (
      <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
        <ThemeProvider theme={projectTheme}>
          <ColorSchemeControlProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            {children}
            <AppBodyStyle $colorScheme={colorScheme} />
          </ColorSchemeControlProvider>
        </ThemeProvider>
      </StyleSheetManager>
    )
    : (
      <ThemeProvider theme={projectTheme}>
        <ColorSchemeControlProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
          {children}
          <AppBodyStyle $colorScheme={colorScheme} />
          <GlobalStyle />
        </ColorSchemeControlProvider>
      </ThemeProvider>
    )
}