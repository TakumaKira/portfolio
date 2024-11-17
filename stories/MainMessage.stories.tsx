import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import styled, { ThemeProvider } from 'styled-components';

import MainMessage from './MainMessage';

import { type ColorScheme, type ProjectTheme, projectTheme } from '@/app/theme';
import GlobalStyle from '@/app/GlobalStyle';
import fonts from '@/app/fonts';
import Button from './Button';
import { ButtonContentArchitectureAware, ButtonContentComponentDriven, ButtonContentDesignAware, ButtonContentFrontendOriented } from './ButtonContent';

const Background = styled.div<{ $colorScheme: ColorScheme }>`
  min-width: 100vw;
  min-height: 100vh;
  background-color: ${({ $colorScheme, theme }) => (theme as ProjectTheme).colors.surfacePrimary[$colorScheme]};
  display: flex;
  justify-content: center;
  align-items: center;
`
const CenterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`

type MainMessagePropsAndCustomArgs = React.ComponentProps<typeof MainMessage> & {
  ButtonContent: React.ComponentType<{ colorScheme: ColorScheme }>
};
const meta: Meta<MainMessagePropsAndCustomArgs> = {
  title: 'Component/MainMessage',
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  component: MainMessage,
  render: ({ ButtonContent, ...args }) => (
    <ThemeProvider theme={projectTheme}>
      <Background $colorScheme={args.colorScheme} className={`${fonts.permanentMarker.variable} ${fonts.caveat.variable}`}>
        <CenterContainer>
          <MainMessage {...args} />
          <Button colorScheme={args.colorScheme}>
            <ButtonContent colorScheme={args.colorScheme} />
          </Button>
        </CenterContainer>
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
    onChangeState: fn(),
  },
} satisfies Meta<MainMessagePropsAndCustomArgs>;
export default meta;

type Story = StoryObj<typeof meta>;
export const FrontendOriented: Story = {
  args: {
    centerText: 'Frontend-Oriented',
    ButtonContent: ButtonContentFrontendOriented,
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
    ButtonContent: ButtonContentComponentDriven,
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
    ButtonContent: ButtonContentArchitectureAware,
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
    ButtonContent: ButtonContentDesignAware,
    isCenterTextVisible: true,
    colorScheme: 'light',
  },
  parameters: {
    backgrounds: {
      default: 'Light',
    },
  },
}
