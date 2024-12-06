import React from "react";
import styled from "styled-components";
import { ColorScheme, ProjectTheme } from "@/app/theme";

export type SelectedSide = 'left' | 'right'
type ToggleItem = {
  Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>,
}
type ToggleItems = {
  left: ToggleItem,
  right: ToggleItem,
}

const Container = styled.div<{ $colorScheme: ColorScheme }>`
  display: flex;
  align-items: center;
  gap: 0.35rem;
`
const TOGGLE_BG_HEIGHT_DEFAULT = 19
const TOGGLE_BG_WIDTH_DEFAULT = 38
const TOGGLE_KNOB_SIZE_DEFAULT = 13
const TOGGLE_BG_HEIGHT_MOBILE = 18
const TOGGLE_BG_WIDTH_MOBILE = 34
const TOGGLE_KNOB_SIZE_MOBILE = 12
const ToggleUI = styled.div<{ $colorScheme: ColorScheme, $toggleDuration: number, $selectedSide: SelectedSide }>`
  height: ${({ theme }) => TOGGLE_BG_HEIGHT_DEFAULT / (theme as ProjectTheme).rootFontSize.default}rem;
  width: ${({ theme }) => TOGGLE_BG_WIDTH_DEFAULT / (theme as ProjectTheme).rootFontSize.default}rem;
  border-radius: ${({ theme }) => TOGGLE_BG_HEIGHT_DEFAULT / (theme as ProjectTheme).rootFontSize.default / 2}rem;
  @media (max-width: ${({ theme }) => (theme as ProjectTheme).breakPoints.minWidthTablet - 1}px) {
    height: ${({ theme }) => TOGGLE_BG_HEIGHT_MOBILE / (theme as ProjectTheme).rootFontSize.mobile}rem;
    width: ${({ theme }) => TOGGLE_BG_WIDTH_MOBILE / (theme as ProjectTheme).rootFontSize.mobile}rem;
    border-radius: ${({ theme }) => TOGGLE_BG_HEIGHT_MOBILE / (theme as ProjectTheme).rootFontSize.mobile / 2}rem;
  }
  background-color: ${({ $colorScheme, theme }) => (theme as ProjectTheme).colors.toggleBg[$colorScheme]};
  position: relative;
  &::before {
    position: absolute;
    content: "";
    height: ${({ theme }) => TOGGLE_KNOB_SIZE_DEFAULT / (theme as ProjectTheme).rootFontSize.default}rem;
    width: ${({ theme }) => TOGGLE_KNOB_SIZE_DEFAULT / (theme as ProjectTheme).rootFontSize.default}rem;
    border-radius: ${({ theme }) => TOGGLE_KNOB_SIZE_DEFAULT / (theme as ProjectTheme).rootFontSize.default / 2}rem;
    left: ${({ theme, $selectedSide }) => $selectedSide === 'left' ? 3 / (theme as ProjectTheme).rootFontSize.default : (TOGGLE_BG_WIDTH_DEFAULT - TOGGLE_KNOB_SIZE_DEFAULT - 3) / (theme as ProjectTheme).rootFontSize.default}rem;
    @media (max-width: ${({ theme }) => (theme as ProjectTheme).breakPoints.minWidthTablet - 1}px) {
      height: ${({ theme }) => TOGGLE_KNOB_SIZE_MOBILE / (theme as ProjectTheme).rootFontSize.mobile}rem;
      width: ${({ theme }) => TOGGLE_KNOB_SIZE_MOBILE / (theme as ProjectTheme).rootFontSize.mobile}rem;
      border-radius: ${({ theme }) => TOGGLE_KNOB_SIZE_MOBILE / (theme as ProjectTheme).rootFontSize.mobile / 2}rem;
      left: ${({ theme, $selectedSide }) => $selectedSide === 'left' ? 3 / (theme as ProjectTheme).rootFontSize.mobile : (TOGGLE_BG_WIDTH_MOBILE - TOGGLE_KNOB_SIZE_MOBILE - 3) / (theme as ProjectTheme).rootFontSize.mobile}rem;
    }
    background-color: ${({ $colorScheme, theme }) => (theme as ProjectTheme).colors.toggleKnob[$colorScheme]};
    box-shadow: ${({ $colorScheme, theme }) => (theme as ProjectTheme).shadows.toggleKnob[$colorScheme]};
    top: 50%;
    transform: translateY(-50%);
    transition: left ${({ $toggleDuration }) => $toggleDuration}ms ease-in-out;
  }
`
const IconWrapper = styled.div<{ $colorScheme: ColorScheme }>`
  height: ${({ theme }) => TOGGLE_BG_HEIGHT_DEFAULT / (theme as ProjectTheme).rootFontSize.default}rem;
  width: ${({ theme }) => TOGGLE_BG_HEIGHT_DEFAULT / (theme as ProjectTheme).rootFontSize.default}rem;
  @media (max-width: ${({ theme }) => (theme as ProjectTheme).breakPoints.minWidthTablet - 1}px) {
    height: ${({ theme }) => TOGGLE_BG_HEIGHT_MOBILE / (theme as ProjectTheme).rootFontSize.mobile}rem;
    width: ${({ theme }) => TOGGLE_BG_HEIGHT_MOBILE / (theme as ProjectTheme).rootFontSize.mobile}rem;
  }
  svg {
    height: ${({ theme }) => TOGGLE_BG_HEIGHT_DEFAULT / (theme as ProjectTheme).rootFontSize.default}rem;
    width: ${({ theme }) => TOGGLE_BG_HEIGHT_DEFAULT / (theme as ProjectTheme).rootFontSize.default}rem;
    @media (max-width: ${({ theme }) => (theme as ProjectTheme).breakPoints.minWidthTablet - 1}px) {
      height: ${({ theme }) => TOGGLE_BG_HEIGHT_MOBILE / (theme as ProjectTheme).rootFontSize.mobile}rem;
      width: ${({ theme }) => TOGGLE_BG_HEIGHT_MOBILE / (theme as ProjectTheme).rootFontSize.mobile}rem;
    }
    path {
      fill: ${({ $colorScheme, theme }) => (theme as ProjectTheme).colors.iconPrimary[$colorScheme]};
    }
  }
`

export default function Toggle({
  items,
  selectedSide = 'left',
  colorScheme,
  onToggle,
  toggleDuration = 200,
}: {
  items: ToggleItems,
  selectedSide?: SelectedSide,
  colorScheme: ColorScheme,
  onToggle?: (side: SelectedSide) => void,
  toggleDuration?: number,
}) {
  const { left: { Icon: LeftIcon }, right: { Icon: RightIcon } } = items
  const [selected, toggleSelected] = React.useState<SelectedSide>(selectedSide)
  const handleClick = () => {
    const newSide = selected === 'left' ? 'right' : 'left'
    toggleSelected(newSide)
    onToggle?.(newSide)
  }
  React.useEffect(() => {
    toggleSelected(selectedSide)
  }, [selectedSide])
  return (
    <Container $colorScheme={colorScheme} onClick={handleClick} className="clickable">
      {LeftIcon &&
        <IconWrapper $colorScheme={colorScheme}>
          <LeftIcon />
        </IconWrapper>
      }
      <ToggleUI $colorScheme={colorScheme} $toggleDuration={toggleDuration} $selectedSide={selected} />
      {RightIcon &&
        <IconWrapper $colorScheme={colorScheme}>
          <RightIcon />
        </IconWrapper>
      }
    </Container>
  )
}
