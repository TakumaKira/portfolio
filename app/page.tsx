'use client'

import React from "react";
import styled from "styled-components";

import MainMessage from "@/stories/MainMessage";
import { useColorSchemeControl } from "./contexts/ColorSchemeControl";
import Button from "@/stories/Button";
import { ButtonContentArchitectureAware, ButtonContentComponentDriven, ButtonContentDesignAware, ButtonContentFrontendOriented } from "@/stories/ButtonContent";
import FadeBox, { FadeState } from "@/stories/FadeBox";
import FormLike from "@/stories/FormLike";
import Toggle, { SelectedSide } from "@/stories/Toggle";
import { DarkModeSVG, LightModeSVG } from "./svg";
import CenterContainer from "@/stories/CenterContainer";
import { useServerSideData } from "./contexts/ServerSideData";
import Link from "next/link";
import { ServerSideData } from "./lib/serverSideData";
import TIMINGS from "./lib/timings";
import onChangeCurrentTiming, { checkTimingsConfigSafety } from "./lib/onChangeCurrentTiming";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`
const HeaderContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 4rem;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const NAME_KEY = 'name'
const rotatingContents = [
  {
    text: 'Frontend-Oriented',
    ButtonContent: ButtonContentFrontendOriented,
    buttonLinkConfigKey: 'repository_url',
  },
  {
    text: 'Component-Driven',
    ButtonContent: ButtonContentComponentDriven,
    buttonLinkConfigKey: 'storybook_url',
  },
  {
    text: 'Architecture-Aware',
    ButtonContent: ButtonContentArchitectureAware,
    buttonLinkConfigKey: 'cpsaf_certification_url',
  },
  {
    text: 'Design-Aware',
    ButtonContent: ButtonContentDesignAware,
    buttonLinkConfigKey: 'figma_url',
  },
]

export default function Home() {
  const { config } = useServerSideData()
  console.log('config on page', config)
  const checkConfig = (config: ServerSideData['config']) => {
    const requiredKeys = [NAME_KEY, ...rotatingContents.map(({ buttonLinkConfigKey }) => buttonLinkConfigKey)]
    const configKeys = Object.keys(config)
    const missingKeys = requiredKeys.filter((key) => !configKeys.includes(key))
    if (missingKeys.length > 0) {
      console.error('Config is missing some required keys', { missingKeys, config })
    }
  }
  React.useEffect(() => {
    checkConfig(config)
  }, [])

  const { colorScheme, toggleColorScheme } = useColorSchemeControl()
  const [isClient, setIsClient] = React.useState(false)
  React.useEffect(() => {
    setIsClient(true)
  }, [colorScheme])

  const [layoutState, setLayoutState] = React.useState(FadeState.HIDDEN)
  const [layoutFadeDuration, setLayoutFadeDuration] = React.useState(0)
  const [titleTextState, setTitleTextState] = React.useState(FadeState.HIDDEN)
  const [titleTextFadeDuration, setTitleTextFadeDuration] = React.useState(0)
  const [centerTextState, setCenterTextState] = React.useState(FadeState.HIDDEN)
  const [centerTextFadeDuration, setCenterTextFadeDuration] = React.useState(0)
  const [buttonState, setButtonState] = React.useState(FadeState.HIDDEN)
  const [buttonFadeDuration, setButtonFadeDuration] = React.useState(0)
  const [isButtonEnabled, setIsButtonEnabled] = React.useState(false)
  const [currentContentIndex, setCurrentContentIndex] = React.useState(0)
  const centerText = rotatingContents[currentContentIndex].text
  const ButtonContent = rotatingContents[currentContentIndex].ButtonContent
  const buttonLink = config[rotatingContents[currentContentIndex].buttonLinkConfigKey]
  const switchContent = () => {
    setCurrentContentIndex((prevIndex) => (prevIndex + 1) % rotatingContents.length)
  }
  const [currentTiming, setCurrentTiming] = React.useState<{ part: keyof typeof TIMINGS, index: number }>()

  const trigger = ({ name, duration }: (typeof TIMINGS.init)[number] | (typeof TIMINGS.loop)[number]) => {
    const actions: { [key in ((typeof TIMINGS.init) | (typeof TIMINGS.loop))[number]['name']]: () => void } = {
      // init
      PAGE_LOADED: () => {},
      LAYOUT_VISIBLE: () => {
        setLayoutState(FadeState.FADING_IN)
        setLayoutFadeDuration(duration)
      },
      TITLE_VISIBLE: () => {
        setTitleTextState(FadeState.FADING_IN)
        setTitleTextFadeDuration(duration)
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
  React.useEffect(() => {
    if (!currentTiming) {
      return
    }
    onChangeCurrentTiming(TIMINGS, currentTiming, setCurrentTiming, trigger)
  }, [currentTiming])
  React.useEffect(() => {
    checkTimingsConfigSafety(TIMINGS)
    const _initTiming: { part: keyof typeof TIMINGS, index: number } = { part: TIMINGS.init.length > 0 ? 'init' : 'loop', index: 0 }
    const _initTimingObj = TIMINGS[_initTiming.part][_initTiming.index]
    if (_initTimingObj) {
      setCurrentTiming(_initTiming)
    }
  }, [])

  if (!isClient) return null
  return (
    <FadeBox state={layoutState} mode="dissolve" fadeDuration={layoutFadeDuration}>
      <Container>
        <HeaderContainer>
          <FormLike
            text={config[NAME_KEY] ?? ''}
            size="small"
            align="left"
            colorScheme={colorScheme}
            state={titleTextState}
            fadeDuration={titleTextFadeDuration}
          />
          <Toggle
            items={{ left: { Icon: LightModeSVG }, right: { Icon: DarkModeSVG } }}
            selectedSide={{ light: 'left', dark: 'right' }[colorScheme] as SelectedSide}
            colorScheme={colorScheme} onToggle={toggleColorScheme}
          />
        </HeaderContainer>
        <CenterContainer>
          <MainMessage
            centerText={centerText}
            colorScheme={colorScheme}
            centerTextState={centerTextState}
            fadeDuration={centerTextFadeDuration}
          />
          <FadeBox state={buttonState} mode="dissolve" fadeDuration={buttonFadeDuration}>
            {buttonLink &&
              <Link href={buttonLink} target="_blank">
                <Button colorScheme={colorScheme} hidden={!isButtonEnabled}>
                  <ButtonContent colorScheme={colorScheme} />
                </Button>
              </Link>
            }
          </FadeBox>
        </CenterContainer>
      </Container>
    </FadeBox>
  );
}
