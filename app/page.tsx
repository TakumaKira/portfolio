'use client'

import React from "react";
import styled from "styled-components";

import MainMessage from "@/stories/MainMessage";
import { useColorSchemeControl } from "./contexts/ColorSchemeControl";
import Button from "@/stories/Button";
import { ButtonContentArchitectureAware, ButtonContentComponentDriven, ButtonContentDesignAware, ButtonContentFrontendOriented } from "@/stories/ButtonContent";
import FadeBox, { FadeState } from "@/stories/FadeBox";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`
const CenterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
`

/**
 * Timinig chart
 * 
 *                  0  .  1  .  2  .  3  .  4  .  5  .  6  .  7  .  8  .  9  .  10  .  11  .  12  .  13  .  14  .  15
 * 
 * Page loaded:     1
 * 
 * Layout shown:    0  1
 * 
 * Title shown:     0     1
 * 
 * Switch content:  1                                            1                                           1
 * 
 * Center text:     H        I          (V)          O          (H) I           (V)            O            (H)
 * 
 * Button:          H                 I (V)                   O (H)          I  (V)                      O  (H)
 * 
 * Button enabled:  F                 T                          F           T                               F
 */
const TIMINGS = {
  init: [
    { name: 'PAGE_LOADED', duration: 0, tillNext: 500 },
    { name: 'LAYOUT_VISIBLE', duration: 500, tillNext: 500 },
    { name: 'TITLE_VISIBLE', duration: 500, tillNext: 500 },
  ],
  loop: [
    { name: 'CENTER_TEXT_FADE_IN', duration: 2000, tillNext: 1500 },
    { name: 'BUTTON_FADE_IN', duration: 500, tillNext: 0 },
    { name: 'BUTTON_ENABLED', duration: 0, tillNext: 2500 },
    { name: 'CENTER_TEXT_FADE_OUT', duration: 2000, tillNext: 1500 },
    { name: 'BUTTON_FADE_OUT', duration: 500, tillNext: 500 },
    { name: 'BUTTON_DISABLED', duration: 0, tillNext: 0 },
    { name: 'SWITCH_CONTENT', duration: 0, tillNext: 500 },
  ]
} as const

const rotatingContents = [
  {
    text: 'Frontend-Oriented',
    ButtonContent: ButtonContentFrontendOriented,
  },
  {
    text: 'Component-Driven',
    ButtonContent: ButtonContentComponentDriven,
  },
  {
    text: 'Architecture-Aware',
    ButtonContent: ButtonContentArchitectureAware,
  },
  {
    text: 'Design-Aware',
    ButtonContent: ButtonContentDesignAware,
  },
]

export default function Home() {
  const { colorScheme } = useColorSchemeControl()
  const [isClient, setIsClient] = React.useState(false)
  React.useEffect(() => {
    setIsClient(true)
  }, [colorScheme])

  const [centerTextState, setCenterTextState] = React.useState(FadeState.HIDDEN)
  const [centerTextFadeDuration, setCenterTextFadeDuration] = React.useState(0)
  const [buttonState, setButtonState] = React.useState(FadeState.HIDDEN)
  const [buttonFadeDuration, setButtonFadeDuration] = React.useState(0)
  const [isButtonEnabled, setIsButtonEnabled] = React.useState(false)
  const [currentContentIndex, setCurrentContentIndex] = React.useState(0)
  const centerText = rotatingContents[currentContentIndex].text
  const ButtonContent = rotatingContents[currentContentIndex].ButtonContent
  const switchContent = () => {
    setCurrentContentIndex((prevIndex) => (prevIndex + 1) % rotatingContents.length)
  }

  const trigger = ({ name, duration }: (typeof TIMINGS.init)[number] | (typeof TIMINGS.loop)[number]) => {
    const actions: { [key in ((typeof TIMINGS.init) | (typeof TIMINGS.loop))[number]['name']]: () => void } = {
      // init
      PAGE_LOADED: () => {
        console.log('PAGE_LOADED', { duration })
      },
      LAYOUT_VISIBLE: () => {
        console.log('LAYOUT_VISIBLE', { duration })
      },
      TITLE_VISIBLE: () => {
        console.log('TITLE_VISIBLE', { duration })
      },
      // loop
      CENTER_TEXT_FADE_IN: () => {
        setCenterTextState(FadeState.FADING_IN)
        setCenterTextFadeDuration(duration)
      },
      CENTER_TEXT_FADE_OUT: () => {
        setCenterTextState(FadeState.FADING_OUT)
        setCenterTextFadeDuration(duration)
      },
      BUTTON_FADE_IN: () => {
        setButtonState(FadeState.FADING_IN)
        setButtonFadeDuration(duration)
      },
      BUTTON_FADE_OUT: () => {
        setButtonState(FadeState.FADING_OUT)
        setButtonFadeDuration(duration)
      },
      BUTTON_ENABLED: () => {
        setIsButtonEnabled(true)
      },
      BUTTON_DISABLED: () => {
        setIsButtonEnabled(false)
      },
      SWITCH_CONTENT: () => {
        switchContent()
      },
    }
    actions[name]()
  }

  const safetyCheck = (timings: typeof TIMINGS) => {
    const isLoopTotalZeroDuration = timings.loop.every(({ tillNext }) => tillNext <= 0)
    if (isLoopTotalZeroDuration) {
      throw new Error('Total zero loop duration is not allowed')
    }
  }
  const [currentTiming, setCurrentTiming] = React.useState<{ part: keyof typeof TIMINGS, index: number }>()
  React.useEffect(() => {
    if (!currentTiming) {
      return
    }
    trigger(TIMINGS[currentTiming.part][currentTiming.index])
    setTimeout(() => {
      const _nextTiming: { part: keyof typeof TIMINGS, index: number } = currentTiming.index < TIMINGS[currentTiming.part].length - 1
        ? { part: currentTiming.part, index: currentTiming.index + 1 }
        : { part: 'loop', index: 0 }
      const _nextTimingObj = TIMINGS[_nextTiming.part][_nextTiming.index]
      if (_nextTimingObj) {
        setCurrentTiming(_nextTiming)
      }
    }, TIMINGS[currentTiming.part][currentTiming.index].tillNext)
  }, [currentTiming])
  React.useEffect(() => {
    safetyCheck(TIMINGS)
    const _initTiming: { part: keyof typeof TIMINGS, index: number } = { part: TIMINGS.init.length > 0 ? 'init' : 'loop', index: 0 }
    const _initTimingObj = TIMINGS[_initTiming.part][_initTiming.index]
    if (_initTimingObj) {
      setCurrentTiming(_initTiming)
    }
  }, [])
  const onButtonClick = () => {
    console.log('onButtonClick')
  }

  if (!isClient) return null
  return (
    <Container>
      <CenterContainer>
        <MainMessage centerText={centerText} colorScheme={colorScheme} centerTextState={centerTextState} fadeDuration={centerTextFadeDuration} />
        <FadeBox state={buttonState} mode="dissolve" fadeDuration={buttonFadeDuration}>
          <Button colorScheme={colorScheme} onClick={onButtonClick} hidden={!isButtonEnabled}>
            <ButtonContent colorScheme={colorScheme} />
          </Button>
        </FadeBox>
      </CenterContainer>
    </Container>
  );
}
