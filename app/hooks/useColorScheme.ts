import React from "react";
import { ColorScheme } from "../theme";

export default function useColorScheme() {
  const deviceScheme = typeof window !== 'undefined' ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : 'light'
  const [colorScheme, setColorScheme] = React.useState<ColorScheme>(deviceScheme)
  React.useEffect(() => {
    const savedColorScheme = localStorage.getItem('colorScheme') as ColorScheme | null
    if (savedColorScheme) {
      setColorScheme(savedColorScheme)
      return
    }
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    if (mediaQuery.matches) {
      setColorScheme('dark')
      return
    }
  }, [])
  const toggleColorScheme = () => {
    const newColorScheme = colorScheme === 'light' ? 'dark' : 'light'
    setColorScheme(newColorScheme)
    localStorage.setItem('colorScheme', newColorScheme)
  }
  return { colorScheme, toggleColorScheme }
}
