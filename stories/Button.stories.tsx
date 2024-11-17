import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import styled, { ThemeProvider } from 'styled-components';

import Button from './Button';

import { type ColorScheme, type ProjectTheme, projectTheme } from '@/app/theme';
import GlobalStyle from '@/app/GlobalStyle';
import fonts from '@/app/fonts';
import { ButtonContentFrontendOriented, ButtonContentComponentDriven, ButtonContentArchitectureAware, ButtonContentDesignAware } from './ButtonContent'

const Background = styled.div<{ $colorScheme: ColorScheme }>`
  min-width: 100vw;
  min-height: 100vh;
  background-color: ${({ $colorScheme, theme }) => (theme as ProjectTheme).colors.surfacePrimary[$colorScheme]};
  display: flex;
  justify-content: center;
  align-items: center;
`

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
      control: 'radio',
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
