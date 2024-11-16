import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import styled, { ThemeProvider } from 'styled-components';

import Button from './Button';

import { type ColorScheme, type ProjectTheme, projectTheme } from '@/app/theme';
import GlobalStyle from '@/app/GlobalStyle';
import fonts from '@/app/fonts';
import { GithubSVG } from '@/app/svg';

const Background = styled.div<{ $colorScheme: ColorScheme }>`
  min-width: 100vw;
  min-height: 100vh;
  background-color: ${({ $colorScheme, theme }) => (theme as ProjectTheme).colors.surfacePrimary[$colorScheme]};
  display: flex;
  justify-content: center;
  align-items: center;
`
const GithubIcon = styled(GithubSVG)`
  path {
    fill: red;
  }
`

type ButtonPropsAndCustomArgs = React.ComponentProps<typeof Button>;
const meta: Meta<ButtonPropsAndCustomArgs> = {
  title: 'Component/Button',
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  component: Button,
  render: ({ ...args }) => (
    <ThemeProvider theme={projectTheme}>
      <Background $colorScheme={args.colorScheme} className={`${fonts.ptSerifRegular.variable}`}>
        <Button {...args} />
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
    children: (
      <div>
        <GithubIcon />
        <span>Check my code</span>
      </div>
    ),
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
    children: (
      <div>
        <span>Check</span>
      </div>
    ),
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
    children: (
      <div>
        <span>Check my certification</span>
      </div>
    ),
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
    children: (
      <div>
        <span>Check</span>
      </div>
    ),
    colorScheme: 'light',
  },
  parameters: {
    backgrounds: {
      default: 'Light',
    },
  },
}
