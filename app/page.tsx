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
 * Center text:     H        I           V           O           H  I            V             O             H
 * 
 * Button:          H                 I  V                    O  H           I   V                       O   H
 * 
 * Button enabled:  F                    T                    F                  T                       F
 */
const TIMINGS = {
  CENTER_TEXT_VISIBLE_INITIAL_DELAY: 1000,
  CENTER_TEXT_VISIBLE_DURATION: 2000,
  CENTER_TEXT_INVISIBLE_DURATION: 500,
  BUTTON_VISIBLE_INITIAL_DELAY: 3000,
  BUTTON_VISIBLE_DURATION: 0,
  BUTTON_INVISIBLE_DURATION: 2500,
}

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
  const [buttonState, setButtonState] = React.useState(FadeState.HIDDEN)
  const triggerInitialAnimation = () => {
    setTimeout(() => {
      setCenterTextState(FadeState.FADING_IN)
    }, TIMINGS.CENTER_TEXT_VISIBLE_INITIAL_DELAY)
    setTimeout(() => {
      setButtonState(FadeState.FADING_IN)
    }, TIMINGS.BUTTON_VISIBLE_INITIAL_DELAY)
  }
  React.useEffect(() => triggerInitialAnimation(), [])

  const [currentContentIndex, setCurrentContentIndex] = React.useState(0)
  const centerText = rotatingContents[currentContentIndex].text
  const ButtonContent = rotatingContents[currentContentIndex].ButtonContent
  
  const switchContent = () => {
    setCurrentContentIndex((prevIndex) => (prevIndex + 1) % rotatingContents.length)
  }
  const handleMainMessageChangeState = (state: FadeState) => {
    if (state === FadeState.VISIBLE) {
      setTimeout(() => {
        setCenterTextState(FadeState.FADING_OUT)
      }, TIMINGS.CENTER_TEXT_VISIBLE_DURATION)
    } else if (state === FadeState.HIDDEN) {
      switchContent()
      setTimeout(() => {
        setCenterTextState(FadeState.FADING_IN)
      }, TIMINGS.CENTER_TEXT_INVISIBLE_DURATION)
    }
  }
  const handleButtonChangeState = (state: FadeState) => {
    if (state === FadeState.VISIBLE) {
      setTimeout(() => {
        setButtonState(FadeState.FADING_OUT)
      }, TIMINGS.BUTTON_INVISIBLE_DURATION)
    } else if (state === FadeState.HIDDEN) {
      setTimeout(() => {
        setButtonState(FadeState.FADING_IN)
      }, TIMINGS.BUTTON_INVISIBLE_DURATION)
    }
  }
  React.useEffect(() => {
    console.log('centerTextState', centerTextState)
  }, [centerTextState])
  React.useEffect(() => {
    console.log('buttonState', buttonState)
  }, [buttonState])

  if (!isClient) return null
  return (
    <Container>
      <CenterContainer>
        <MainMessage centerText={centerText} colorScheme={colorScheme} centerTextState={centerTextState} onChangeState={handleMainMessageChangeState} />
        <FadeBox state={buttonState} mode="dissolve" onChangeState={handleButtonChangeState}>
          <Button colorScheme={colorScheme}>
            <ButtonContent colorScheme={colorScheme} />
          </Button>
        </FadeBox>
      </CenterContainer>
    </Container>
  );
}
