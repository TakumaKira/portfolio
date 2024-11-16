import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import styled, { ThemeProvider } from 'styled-components';
import Image from "next/image";

import Button from './Button';

import { type ColorScheme, type ProjectTheme, projectTheme } from '@/app/theme';
import GlobalStyle from '@/app/GlobalStyle';
import fonts from '@/app/fonts';
import { GithubSVG, StorybookDefaultSVG, StorybookInverseSVG, FigmaSVG } from '@/app/svg';
import CertibleBadgePNG from '@/app/img/Certible_Badge.png'

const Background = styled.div<{ $colorScheme: ColorScheme }>`
  min-width: 100vw;
  min-height: 100vh;
  background-color: ${({ $colorScheme, theme }) => (theme as ProjectTheme).colors.surfacePrimary[$colorScheme]};
  display: flex;
  justify-content: center;
  align-items: center;
`
const ButtonContentWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;
`
const GithubIcon = styled(GithubSVG)<{ $colorScheme: ColorScheme }>`
  height: 2rem;
  width: 2rem;
  path {
    fill: ${({ $colorScheme, theme }) => (theme as ProjectTheme).colors.typeInverse[$colorScheme]};
  }
`
function ButtonContentFrontendOriented({ colorScheme }: { colorScheme: ColorScheme }) {
  return (
    <ButtonContentWrapper>
      <GithubIcon $colorScheme={colorScheme} />
      <span>Check my code</span>
    </ButtonContentWrapper>
  )
}
const StorybookInverseIcon = styled(StorybookInverseSVG)`
  height: 2rem;
  width: 10rem;
  opacity: 0.75;
`
const StorybookDefaultIcon = styled(StorybookDefaultSVG)`
  height: 2rem;
  width: 10rem;
`
function ButtonContentComponentDriven({ colorScheme }: { colorScheme: ColorScheme }) {
  return (
    <ButtonContentWrapper>
      <span>Check</span>
      {colorScheme === 'light' ? <StorybookInverseIcon /> : <StorybookDefaultIcon />}
    </ButtonContentWrapper>
  )
}
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
function ButtonContentArchitectureAware({ colorScheme }: { colorScheme: ColorScheme }) {
  return (
    <ButtonContentWrapper>
      <CPSAIcon colorScheme={colorScheme} />
      <span>Check my certification</span>
    </ButtonContentWrapper>
  )
}
const FigmaIcon = styled(FigmaSVG)<{ $colorScheme: ColorScheme }>`
  height: 2rem;
  width: 5.75rem;
  path {
    fill: ${({ $colorScheme, theme }) => (theme as ProjectTheme).colors.typeInverse[$colorScheme]};
  }
`
function ButtonContentDesignAware({ colorScheme }: { colorScheme: ColorScheme }) {
  return (
    <ButtonContentWrapper>
      <span>Check</span>
      <FigmaIcon $colorScheme={colorScheme} />
    </ButtonContentWrapper>
  )
}

type ButtonPropsAndCustomArgs = React.ComponentProps<typeof Button> & {
  Content: React.ComponentType<{ colorScheme: ColorScheme }>
};
const meta: Meta<ButtonPropsAndCustomArgs> = {
  title: 'Component/Button',
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  component: Button,
  render: ({ Content, ...args }) => (
    <ThemeProvider theme={projectTheme}>
      <Background $colorScheme={args.colorScheme} className={`${fonts.ptSerifRegular.variable}`}>
        <Button {...args}>
          <Content colorScheme={args.colorScheme} />
        </Button>
      </Background>
      <GlobalStyle />
    </ThemeProvider>
  ),
  argTypes: {
    colorScheme: {
      control: 'select',
      options: ['light', 'dark'],
    },
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<ButtonPropsAndCustomArgs>;
export default meta;

type Story = StoryObj<typeof meta>;
export const FrontendOriented: Story = {
  args: {
    Content: ButtonContentFrontendOriented,
    colorScheme: 'light',
  },
  parameters: {
    backgrounds: {
      default: 'Light',
    },
  },
}
export const ComponentDriven: Story = {
  args: {
    Content: ButtonContentComponentDriven,
    colorScheme: 'light',
  },
  parameters: {
    backgrounds: {
      default: 'Light',
    },
  },
}
export const ArchitectureAware: Story = {
  args: {
    Content: ButtonContentArchitectureAware,
    colorScheme: 'light',
  },
  parameters: {
    backgrounds: {
      default: 'Light',
    },
  },
}
export const DesignAware: Story = {
  args: {
    Content: ButtonContentDesignAware,
    colorScheme: 'light',
  },
  parameters: {
    backgrounds: {
      default: 'Light',
    },
  },
}
