import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import styled, { ThemeProvider } from 'styled-components';

import Toggle from './Toggle';

import { type ColorScheme, type ProjectTheme, projectTheme } from '@/app/theme';
import GlobalStyle from '@/app/GlobalStyle';
import fonts from '@/app/fonts';
import { LightModeSVG, DarkModeSVG } from '@/app/svg';

const Background = styled.div<{ $colorScheme: ColorScheme }>`
  min-width: 100vw;
  min-height: 100vh;
  background-color: ${({ $colorScheme, theme }) => (theme as ProjectTheme).colors.surfacePrimary[$colorScheme]};
  display: flex;
  justify-content: center;
  align-items: center;
`

type TogglePropsAndCustomArgs = React.ComponentProps<typeof Toggle> & {
  Content: React.ComponentType<{ colorScheme: ColorScheme }>
};
const meta: Meta<TogglePropsAndCustomArgs> = {
  title: 'Component/Toggle',
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  component: Toggle,
  render: ({ Content, ...args }) => (
    <ThemeProvider theme={projectTheme}>
      <Background $colorScheme={args.colorScheme} className={`${fonts.ptSerifRegular.variable}`}>
        <Toggle {...args} />
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
    onToggle: fn(),
  },
} satisfies Meta<TogglePropsAndCustomArgs>;
export default meta;

type Story = StoryObj<typeof meta>;
export const LeftSelected: Story = {
  args: {
    items: {
      left: { Icon: LightModeSVG },
      right: { Icon: DarkModeSVG },
    },
    selectedSide: 'left',
    colorScheme: 'light',
  },
  parameters: {
    backgrounds: {
      default: 'Light',
    },
  },
}
export const RightSelected: Story = {
  args: {
    items: {
      left: { Icon: LightModeSVG },
      right: { Icon: DarkModeSVG },
    },
    selectedSide: 'right',
    colorScheme: 'dark',
  },
  parameters: {
    backgrounds: {
      default: 'Dark',
    },
  },
}