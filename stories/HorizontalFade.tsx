import React from "react";
import styled from "styled-components";

export enum FadeState {
  HIDDEN = 'HIDDEN',
  FADING_IN = 'FADING_IN',
  VISIBLE = 'VISIBLE',
  FADING_OUT = 'FADING_OUT',
}

const FadingBox = styled.div<{ $fadeDuration: number }>`
  &.fade-in {
    mask: linear-gradient(90deg, #000 25%, #0000 75%) content-box 0% 0%/400% 100% no-repeat;
    animation: fade-in ${props => props.$fadeDuration / 1000}s;
  }
  &.fade-out {
    mask: linear-gradient(#000 0 0), linear-gradient(270deg, #0000 25%, #000 75%) content-box 0% 0%/400% 100% no-repeat;
    mask-composite: exclude;
    animation: fade-out ${props => props.$fadeDuration / 1000}s;
  }
  @keyframes fade-in {
    from {
      mask-position: 400% 0%;
    }
    to {
      mask-position: 0% 0%;
    }
  }
  @keyframes fade-out {
    from {
      mask-position: 400% 0%;
    }
    to {
      mask-position: 0% 0%;
    }
  }
`;

export default function HorizontalFade({
  children,
  isVisible,
  onChangeState,
  fadeDuration = 2000,
}: {
  children: React.ReactNode,
  isVisible: boolean,
  onChangeState?: (state: FadeState) => void,
  fadeDuration?: number,
}) {
  React.useEffect(() => {
    if (isVisible) {
      onChangeState?.(FadeState.FADING_IN);
      setTimeout(() => {
        onChangeState?.(FadeState.VISIBLE);
      }, fadeDuration);
    } else {
      onChangeState?.(FadeState.FADING_OUT);
      setTimeout(() => {
        onChangeState?.(FadeState.HIDDEN);
      }, fadeDuration);
    }
  }, [isVisible]);
  return (
    <FadingBox className={isVisible ? 'fade-in' : 'fade-out'} $fadeDuration={fadeDuration}>
      {children}
    </FadingBox>
  );
}