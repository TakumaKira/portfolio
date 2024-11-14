'use client'

import { useToggleColorScheme } from "./contexts/ColorSchemeToggle";

export default function Home() {
  const toggleColorScheme = useToggleColorScheme()
  return (
    <button style={{ fontFamily: 'var(--font-permanent-marker)' }} onClick={toggleColorScheme}>Toggle Color Scheme</button>
  );
}
