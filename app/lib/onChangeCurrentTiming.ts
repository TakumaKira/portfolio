import type TIMINGS from "./timings"

export default function onChangeCurrentTiming(
  timings: typeof TIMINGS,
  currentTiming: { part: keyof typeof TIMINGS, index: number },
  setCurrentTiming: (timing: { part: keyof typeof TIMINGS, index: number }) => void,
  trigger: (timing: typeof TIMINGS[keyof typeof TIMINGS][number]) => void,
) {
  trigger(timings[currentTiming.part][currentTiming.index])
  setTimeout(() => {
    const _nextTiming: { part: keyof typeof TIMINGS, index: number } = currentTiming.index < timings[currentTiming.part].length - 1
      ? { part: currentTiming.part, index: currentTiming.index + 1 }
      : { part: 'loop', index: 0 }
    const _nextTimingObj = timings[_nextTiming.part][_nextTiming.index]
    if (_nextTimingObj) {
      setCurrentTiming(_nextTiming)
    }
  }, timings[currentTiming.part][currentTiming.index].tillNext)
}

export const checkTimingsConfigSafety = (timings: typeof TIMINGS) => {
  const isLoopTotalZeroDuration = timings.loop.every(({ tillNext }) => tillNext <= 0)
  if (isLoopTotalZeroDuration) {
    throw new Error('Total zero loop duration is not allowed')
  }
}
