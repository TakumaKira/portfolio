import { renderHook, act } from '@testing-library/react'
import useColorScheme from './useColorScheme'
import { beforeEach, describe, expect, it, vi } from 'vitest'

describe('useColorScheme', () => {
  beforeEach(() => {
    // Reset localStorage before each test
    localStorage.clear()
    // Reset matchMedia mock
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }))
  })

  it('should return system preference when no stored value exists', () => {
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: query === '(prefers-color-scheme: dark)',
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }))

    const { result } = renderHook(() => useColorScheme())
    expect(result.current.colorScheme).toBe('dark')
  })

  it('should return stored preference over system preference', () => {
    localStorage.setItem('colorScheme', 'light')
    const { result } = renderHook(() => useColorScheme())
    expect(result.current.colorScheme).toBe('light')
  })

  it('should update color scheme when setColorScheme is called', () => {
    const { result } = renderHook(() => useColorScheme())
    
    act(() => {
      result.current.toggleColorScheme()
    })

    expect(result.current.colorScheme).toBe('dark')
    expect(localStorage.getItem('colorScheme')).toBe('dark')
  })
})
