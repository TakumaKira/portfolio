import React from 'react'
import { ColorScheme } from '../theme'

const ColorSchemeControlContext = React.createContext<{
  colorScheme: ColorScheme,
  toggleColorScheme: () => void,
}>({
  colorScheme: 'light',
  toggleColorScheme: () => {},
})

export default function ColorSchemeControlProvider({
  children,
  colorScheme,
  toggleColorScheme,
}: {
  children: React.ReactNode,
  colorScheme: ColorScheme,
  toggleColorScheme: () => void,
}) {
  return (
    <ColorSchemeControlContext.Provider value={{ colorScheme, toggleColorScheme }}>
      {children}
    </ColorSchemeControlContext.Provider>
  )
}

export function useColorSchemeControl() {
  return React.useContext(ColorSchemeControlContext)
}