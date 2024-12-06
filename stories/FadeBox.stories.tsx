import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import styled, { ThemeProvider } from 'styled-components';

import FadeBox, { FadeState } from './FadeBox';

import { type ColorScheme, type ProjectTheme, projectTheme } from '@/app/theme';
import fonts from '@/app/fonts';
import GlobalStyle from '@/app/GlobalStyle';
import Button from './Button';
import { ButtonContentFrontendOriented } from './ButtonContent';

const Background = styled.div<{ $colorScheme: ColorScheme }>`
  min-width: 100vw;
  min-height: 100vh;
  background-color: ${({ $colorScheme, theme }) => (theme as ProjectTheme).colors.surfacePrimary[$colorScheme]};
  display: flex;
  justify-content: center;
  align-items: center;
`
const MockForm = styled.div<{ $colorScheme: ColorScheme }>`
  width: 42.5rem;
  padding: 0.375rem 0;
  border-bottom: 1px solid ${({ $colorScheme, theme }) => (theme as ProjectTheme).colors.borderPrimary[$colorScheme]};
  text-align: center;
`
const MockText = styled.span<{ $colorScheme: ColorScheme }>`
  font-family: var(${({ theme }) => (theme as ProjectTheme).fonts.main});
  font-size: 4rem;
  @media screen and (max-width: ${({ theme }) => (theme as ProjectTheme).breakPoints.minWidthTablet - 1}px) {
    font-size: 3rem;
  }
  line-height: 1;
  color: ${({ $colorScheme, theme }) => (theme as ProjectTheme).colors.typePrimary[$colorScheme]};
`

type FadeBoxPropsAndCustomArgs = React.ComponentProps<typeof FadeBox> & { colorScheme: ColorScheme, exampleType: 'form' | 'free', text?: string, ButtonContent?: ({ colorScheme }: { colorScheme: ColorScheme }) => React.ReactNode };
const meta: Meta<FadeBoxPropsAndCustomArgs> = {
  title: 'Component/FadeBox',
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  component: FadeBox,
  render: ({ exampleType, text, colorScheme, ButtonContent, ...args }) => (
    <ThemeProvider theme={projectTheme}>
      <Background $colorScheme={colorScheme} className={`${fonts.permanentMarker.variable}`}>
        {exampleType === 'form' && (
          <MockForm $colorScheme={colorScheme}>
            <FadeBox {...args}>
              <MockText $colorScheme={colorScheme}>{text}</MockText>
            </FadeBox>
          </MockForm>
        )}
        {exampleType === 'free' && (
          <FadeBox {...args}>
            <Button colorScheme={colorScheme}>
              {ButtonContent && <ButtonContent colorScheme={colorScheme} />}
            </Button>
          </FadeBox>
        )}
      </Background>
      <GlobalStyle />
    </ThemeProvider>
  ),
  argTypes: {
    colorScheme: {
      control: 'radio',
      options: ['light', 'dark'],
    },
    state: {
      control: 'radio',
      options: Object.values(FadeState),
    },
  },
  args: {
    onChangeState: fn(),
  },
} satisfies Meta<FadeBoxPropsAndCustomArgs>;
export default meta;

type Story = StoryObj<typeof meta>;
export const FrontendOriented: Story = {
  args: {
    exampleType: 'form',
    text: 'Frontend-Oriented',
    state: FadeState.VISIBLE,
    mode: 'horizontal',
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
    exampleType: 'form',
    text: 'Component-Driven',
    state: FadeState.VISIBLE,
    mode: 'dissolve',
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
    exampleType: 'form',
    text: 'Architecture-Aware',
    state: FadeState.VISIBLE,
    mode: 'dissolve',
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
    exampleType: 'form',
    text: 'Design-Aware',
    state: FadeState.VISIBLE,
    mode: 'dissolve',
    colorScheme: 'light',
  },
  parameters: {
    backgrounds: {
      default: 'Light',
    },
  },
}
export const ButtonContent: Story = {
  args: {
    exampleType: 'free',
    ButtonContent: ButtonContentFrontendOriented,
    state: FadeState.VISIBLE,
    mode: 'dissolve',
    colorScheme: 'light',
    fadeDuration: 500,
  },
}