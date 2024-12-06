import Image from "next/image";
import styled from "styled-components"
import CertibleBadgePNG from "@/app/img/Certible_Badge.png"
import ButtonContentWrapper from "./ContentWrapper"
import { ColorScheme } from "@/app/theme"

const StyledCPSAIcon = styled(Image)<{ $colorScheme: ColorScheme }>`
  filter: grayscale(100%) brightness(${({ $colorScheme }) => $colorScheme === 'light' ? 1 : 0.75});
  opacity: 0.5;
  width: 2rem;
  height: 2rem;
`
function CPSAIcon({ colorScheme }: { colorScheme: ColorScheme }) {
  return (
    <StyledCPSAIcon $colorScheme={colorScheme} src={CertibleBadgePNG} alt="CPSA" width={32} height={32} />
  )
}
export default function ButtonContentArchitectureAware({ colorScheme }: { colorScheme: ColorScheme }) {
  return (
    <ButtonContentWrapper>
      <CPSAIcon colorScheme={colorScheme} />
      <span>Check my certification</span>
    </ButtonContentWrapper>
  )
}
