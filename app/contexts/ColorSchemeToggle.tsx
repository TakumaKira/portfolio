import React from 'react'

const ColorSchemeToggleContext = React.createContext<(() => void)>(() => {})

export default function ColorSchemeToggleProvider({
  children,
  toggleColorScheme,
}: {
  children: React.ReactNode,
  toggleColorScheme: () => void,
}) {
  return (
    <ColorSchemeToggleContext.Provider value={toggleColorScheme}>
      {children}
    </ColorSchemeToggleContext.Provider>
  )
}

export function useToggleColorScheme() {
  return React.useContext(ColorSchemeToggleContext)
}