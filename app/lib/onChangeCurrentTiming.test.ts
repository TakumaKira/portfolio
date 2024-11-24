import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import onChangeCurrentTiming, { checkTimingsConfigSafety } from './onChangeCurrentTiming'
import type TIMINGS from './timings'

describe('onChangeCurrentTiming', () => {
  const mockTimings = {
    init: [
      { tillNext: 1000 },
      { tillNext: 2000 }
    ],
    loop: [
      { tillNext: 3000 },
      { tillNext: 4000 }
    ]
  }

  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.clearAllTimers()
  })

  it('should trigger current timing immediately', () => {
    const trigger = vi.fn()
    const setCurrentTiming = vi.fn()
    
    onChangeCurrentTiming(
      mockTimings as unknown as typeof TIMINGS,
      { part: 'init', index: 0 },
      setCurrentTiming,
      trigger
    )

    expect(trigger).toHaveBeenCalledWith(mockTimings.init[0])
  })

  it('should set next timing after delay', () => {
    const trigger = vi.fn()
    const setCurrentTiming = vi.fn()
    
    onChangeCurrentTiming(
      mockTimings as unknown as typeof TIMINGS,
      { part: 'init', index: 0 },
      setCurrentTiming,
      trigger
    )

    vi.advanceTimersByTime(1000)
    expect(setCurrentTiming).toHaveBeenCalledWith({ part: 'init', index: 1 })
  })

  it('should transition to loop when reaching end of intro', () => {
    const trigger = vi.fn()
    const setCurrentTiming = vi.fn()
    
    onChangeCurrentTiming(
      mockTimings as unknown as typeof TIMINGS,
      { part: 'init', index: 1 },
      setCurrentTiming,
      trigger
    )

    vi.advanceTimersByTime(2000)
    expect(setCurrentTiming).toHaveBeenCalledWith({ part: 'loop', index: 0 })
  })

  it('should back to the first loop timing after the last loop timing', () => {
    const trigger = vi.fn()
    const setCurrentTiming = vi.fn()

    onChangeCurrentTiming(
      mockTimings as unknown as typeof TIMINGS,
      { part: 'loop', index: 1 },
      setCurrentTiming,
      trigger
    )

    vi.advanceTimersByTime(4000)
    expect(setCurrentTiming).toHaveBeenCalledWith({ part: 'loop', index: 0 })
  })
})

describe('checkTimingsConfigSafety', () => {
  it('should throw error if loop has all zero durations', () => {
    const invalidTimings = {
      init: [{ tillNext: 1000 }],
      loop: [
        { tillNext: 0 },
        { tillNext: 0 }
      ]
    } as unknown as typeof TIMINGS

    expect(() => checkTimingsConfigSafety(invalidTimings))
      .toThrow('Total zero loop duration is not allowed')
  })

  it('should not throw error if loop has non-zero durations', () => {
    const validTimings = {
      init: [{ tillNext: 1000 }],
      loop: [
        { tillNext: 1000 },
        { tillNext: 0 }
      ]
    } as unknown as typeof TIMINGS

    expect(() => checkTimingsConfigSafety(validTimings)).not.toThrow()
  })
})
