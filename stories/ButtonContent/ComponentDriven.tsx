import styled from "styled-components"
import { StorybookInverseSVG, StorybookDefaultSVG } from "@/app/svg"
import ButtonContentWrapper from "./ContentWrapper"
import { ColorScheme } from "@/app/theme"

const StorybookInverseIcon = styled(StorybookInverseSVG)`
  height: 2rem;
  width: 10rem;
  opacity: 0.75;
`
const StorybookDefaultIcon = styled(StorybookDefaultSVG)`
  height: 2rem;
  width: 10rem;
`
export default function ButtonContentComponentDriven({ colorScheme }: { colorScheme: ColorScheme }) {
  return (
    <ButtonContentWrapper>
      <span>Check</span>
      {colorScheme === 'light' ? <StorybookInverseIcon /> : <StorybookDefaultIcon />}
    </ButtonContentWrapper>
  )
}
