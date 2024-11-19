'use client'

import React from "react";
import styled from "styled-components";

import MainMessage from "@/stories/MainMessage";
import { useColorSchemeControl } from "./contexts/ColorSchemeControl";
import Button from "@/stories/Button";
import { ButtonContentArchitectureAware, ButtonContentComponentDriven, ButtonContentDesignAware, ButtonContentFrontendOriented } from "@/stories/ButtonContent";
import HorizontalFade, { FadeState } from "@/stories/HorizontalFade";

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

const CENTER_TEXT_VISIBLE_INITIAL_DELAY = 1000
const CENTER_TEXT_VISIBLE_DURATION = 2000
const CENTER_TEXT_INVISIBLE_DURATION = 500
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
  const triggerInitialAnimation = () => {
    setTimeout(() => {
      setCenterTextState(FadeState.FADING_IN)
    }, CENTER_TEXT_VISIBLE_INITIAL_DELAY)
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
      }, CENTER_TEXT_VISIBLE_DURATION)
    } else if (state === FadeState.HIDDEN) {
      switchContent()
      setTimeout(() => {
        setCenterTextState(FadeState.FADING_IN)
      }, CENTER_TEXT_INVISIBLE_DURATION)
    }
  }

  if (!isClient) return null
  return (
    <Container>
      <CenterContainer>
        <MainMessage centerText={centerText} colorScheme={colorScheme} centerTextState={centerTextState} onChangeState={handleMainMessageChangeState} />
        <HorizontalFade state={centerTextState}>
          <Button colorScheme={colorScheme}>
            <ButtonContent colorScheme={colorScheme} />
          </Button>
        </HorizontalFade>
      </CenterContainer>
    </Container>
  );
}
