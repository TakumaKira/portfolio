import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import styled, { ThemeProvider } from 'styled-components';

import { type ColorScheme, type ProjectTheme, projectTheme } from '../app/theme';
import fonts from '../app/fonts';
import HorizontalFade from './HorizontalFade';

const Background = styled.div<{ $colorScheme: ColorScheme }>`
  min-width: 100vw;
  min-height: 100vh;
  background-color: ${({ $colorScheme, theme }) => (theme as ProjectTheme).colors.surfacePrimary[$colorScheme]};
  display: flex;
  justify-content: center;
  align-items: center;
`
const Content = styled.div<{ $colorScheme: ColorScheme }>`
  width: 42.5rem;
  padding: 0.375rem 0;
  border-bottom: 1px solid ${({ $colorScheme, theme }) => (theme as ProjectTheme).colors.borderPrimary[$colorScheme]};
  text-align: center;
`
const Text = styled.span<{ $colorScheme: ColorScheme }>`
  font-family: var(${({ theme }) => (theme as ProjectTheme).fonts.main});
  font-size: 4rem;
  line-height: 1;
  color: ${({ $colorScheme, theme }) => (theme as ProjectTheme).colors.typePrimary[$colorScheme]};
`

type HorizontalFadePropsAndCustomArgs = React.ComponentProps<typeof HorizontalFade> & { text?: string, colorScheme: ColorScheme };
const meta: Meta<HorizontalFadePropsAndCustomArgs> = {
  title: 'Component/HorizontalFade',
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  component: HorizontalFade,
  render: ({ text, colorScheme, ...args }) => (
    <ThemeProvider theme={projectTheme}>
      <Background $colorScheme={colorScheme}>
        <Content className={`${fonts.permanentMarker.variable}`} $colorScheme={colorScheme}>
          <HorizontalFade {...args}>
            <Text $colorScheme={colorScheme}>{text}</Text>
          </HorizontalFade>
        </Content>
      </Background>
    </ThemeProvider>
  ),
  argTypes: {
    colorScheme: {
      control: 'select',
      options: ['light', 'dark'],
    },
  },
  args: {
    onChangeState: fn(),
  },
} satisfies Meta<HorizontalFadePropsAndCustomArgs>;
export default meta;

type Story = StoryObj<typeof meta>;
export const FrontendOriented: Story = {
  args: {
    text: 'Frontend-Oriented',
    isVisible: true,
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
    text: 'Component-Driven',
    isVisible: true,
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
    text: 'Architecture-Aware',
    isVisible: true,
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
    text: 'Design-Aware',
    isVisible: true,
    colorScheme: 'light',
  },
  parameters: {
    backgrounds: {
      default: 'Light',
    },
  },
}
