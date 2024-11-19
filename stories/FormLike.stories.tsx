import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import styled, { ThemeProvider } from 'styled-components';

import FormLike from './FormLike';

import { type ColorScheme, type ProjectTheme, projectTheme } from '@/app/theme';
import GlobalStyle from '@/app/GlobalStyle';
import fonts from '@/app/fonts';
import { FadeState } from './HorizontalFade';

const Background = styled.div<{ $colorScheme: ColorScheme }>`
  min-width: 100vw;
  min-height: 100vh;
  background-color: ${({ $colorScheme, theme }) => (theme as ProjectTheme).colors.surfacePrimary[$colorScheme]};
  display: flex;
  justify-content: center;
  align-items: center;
`

type FormLikePropsAndCustomArgs = React.ComponentProps<typeof FormLike>;
const meta: Meta<FormLikePropsAndCustomArgs> = {
  title: 'Component/FormLike',
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  component: FormLike,
  render: ({ ...args }) => (
    <ThemeProvider theme={projectTheme}>
      <Background $colorScheme={args.colorScheme} className={`${fonts.permanentMarker.variable}`}>
        <FormLike {...args} />
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
} satisfies Meta<FormLikePropsAndCustomArgs>;
export default meta;

type Story = StoryObj<typeof meta>;
export const FrontendOriented: Story = {
  args: {
    text: 'Frontend-Oriented',
    size: 'large',
    align: 'center',
    state: FadeState.VISIBLE,
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
    size: 'large',
    align: 'center',
    state: FadeState.VISIBLE,
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
    size: 'large',
    align: 'center',
    state: FadeState.VISIBLE,
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
    size: 'large',
    align: 'center',
    state: FadeState.VISIBLE,
    colorScheme: 'light',
  },
  parameters: {
    backgrounds: {
      default: 'Light',
    },
  },
}
export const Title: Story = {
  args: {
    text: 'Takuma',
    size: 'small',
    align: 'left',
    state: FadeState.VISIBLE,
    colorScheme: 'light',
  },
  parameters: {
    backgrounds: {
      default: 'Light',
    },
  },
}
