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
  gap: 0.5rem;
`
const ToggleUI = styled.div<{ $colorScheme: ColorScheme, $toggleDuration: number, $selectedSide: SelectedSide }>`
  height: 1.5rem;
  width: ${50 / 16}rem;
  border-radius: ${1.5 / 2}rem;
  background-color: ${({ $colorScheme, theme }) => (theme as ProjectTheme).colors.toggleBg[$colorScheme]};
  position: relative;
  &::before {
    position: absolute;
    content: "";
    height: ${18 / 16}rem;
    width: ${18 / 16}rem;
    border-radius: ${18 / 16 / 2}rem;
    background-color: ${({ $colorScheme, theme }) => (theme as ProjectTheme).colors.toggleKnob[$colorScheme]};
    box-shadow: ${({ $colorScheme, theme }) => (theme as ProjectTheme).shadows.toggleKnob[$colorScheme]};
    top: 50%;
    transform: translateY(-50%);
    left: ${({ $selectedSide }) => $selectedSide === 'left' ? 3 / 16 : (50 - 3 - 18) / 16}rem;
    transition: left ${({ $toggleDuration }) => $toggleDuration}ms ease-in-out;
  }
`
const IconWrapper = styled.div<{ $colorScheme: ColorScheme }>`
  height: 1.5rem;
  width: 1.5rem;
  svg {
    height: 1.5rem;
    width: 1.5rem;
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
