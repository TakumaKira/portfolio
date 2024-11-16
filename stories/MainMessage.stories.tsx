import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import styled, { ThemeProvider } from 'styled-components';

import MainMessage from './MainMessage';

import { type ColorScheme, type ProjectTheme, projectTheme } from '@/app/theme';
import GlobalStyle from '@/app/GlobalStyle';
import fonts from '@/app/fonts';

const Background = styled.div<{ $colorScheme: ColorScheme }>`
  min-width: 100vw;
  min-height: 100vh;
  background-color: ${({ $colorScheme, theme }) => (theme as ProjectTheme).colors.surfacePrimary[$colorScheme]};
  display: flex;
  justify-content: center;
  align-items: center;
`

type MainMessagePropsAndCustomArgs = React.ComponentProps<typeof MainMessage>;
const meta: Meta<MainMessagePropsAndCustomArgs> = {
  title: 'Component/MainMessage',
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  component: MainMessage,
  render: ({ ...args }) => (
    <ThemeProvider theme={projectTheme}>
      <Background $colorScheme={args.colorScheme} className={`${fonts.permanentMarker.variable} ${fonts.caveat.variable}`}>
        <MainMessage {...args} />
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
    onChangeState: fn(),
  },
} satisfies Meta<MainMessagePropsAndCustomArgs>;
export default meta;

type Story = StoryObj<typeof meta>;
export const FrontendOriented: Story = {
  args: {
    centerText: 'Frontend-Oriented',
    isCenterTextVisible: true,
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
    centerText: 'Component-Driven',
    isCenterTextVisible: true,
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
    centerText: 'Architecture-Aware',
    isCenterTextVisible: true,
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
    centerText: 'Design-Aware',
    isCenterTextVisible: true,
    colorScheme: 'light',
  },
  parameters: {
    backgrounds: {
      default: 'Light',
    },
  },
}
