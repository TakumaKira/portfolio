import React from "react";
import styled from "styled-components";

const FadingBox = styled.div`
  &.fade-in {
    mask: linear-gradient(90deg, #000 25%, #0000 75%) content-box 0% 0%/400% 100% no-repeat;
    animation: fade-in 2s;
  }
  &.fade-out {
    mask: linear-gradient(#000 0 0), linear-gradient(270deg, #0000 25%, #000 75%) content-box 0% 0%/400% 100% no-repeat;
    mask-composite: exclude;
    animation: fade-out 2s;
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

export default function HorizontalFade({ children, isVisible }: { children: React.ReactNode, isVisible: boolean }) {
  return (
    <FadingBox className={isVisible ? 'fade-in' : 'fade-out'}>
      {children}
    </FadingBox>
  );
}
