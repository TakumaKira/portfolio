import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import styled from 'styled-components';
import localFont from "next/font/local";

import HorizontalFade from './HorizontalFade';

const permanentMarker = localFont({
  src: "../app/fonts/PermanentMarker-Regular.ttf",
  variable: "--font-permanent-marker",
  weight: "400",
});
const Content = styled.div<{ $isDark?: boolean }>`
  width: 680px;
  padding: 6px 0;
  border-bottom: 1px solid ${({ $isDark }) => $isDark ? '#61615F' : '#ADABA1'};
  text-align: center;
`;
const Text = styled.span<{ $isDark?: boolean }>`
  font-family: var(--font-permanent-marker);
  font-size: 64px;
  line-height: 1;
  color: ${({ $isDark }) => $isDark ? '#CCCDBC' : '#494A43'};
`;

type HorizontalFadePropsAndCustomArgs = React.ComponentProps<typeof HorizontalFade> & { text?: string, isDark?: boolean };

const meta: Meta<HorizontalFadePropsAndCustomArgs> = {
  title: 'Component/HorizontalFade',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  component: HorizontalFade,
  render: ({ text, isDark, ...args }) => (
    <Content className={`${permanentMarker.variable}`} $isDark={isDark}>
      <HorizontalFade {...args}>
        <Text $isDark={isDark}>{text}</Text>
      </HorizontalFade>
    </Content>
  ),
  argTypes: {},
  args: { onChangeState: fn() },
} satisfies Meta<HorizontalFadePropsAndCustomArgs>;
export default meta;

type Story = StoryObj<typeof meta>;

export const FrontendOriented: Story = {
  args: {
    text: 'Frontend-Oriented',
    isVisible: true,
  },
  parameters: {
    backgrounds: {
      default: 'light',
    },
  },
};
export const ComponentDriven: Story = {
  args: {
    text: 'Component-Driven',
    isVisible: true,
  },
  parameters: {
    backgrounds: {
      default: 'light',
    },
  },
};
export const ArchitectureAware: Story = {
  args: {
    text: 'Architecture-Aware',
    isVisible: true,
  },
  parameters: {
    backgrounds: {
      default: 'light',
    },
  },
};
export const DesignAware: Story = {
  args: {
    text: 'Design-Aware',
    isVisible: true,
  },
  parameters: {
    backgrounds: {
      default: 'light',
    },
  },
};
export const FrontendOrientedDark: Story = {
  args: {
    text: 'Frontend-Oriented',
    isVisible: true,
    isDark: true,
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};
export const ComponentDrivenDark: Story = {
  args: {
    text: 'Component-Driven',
    isVisible: true,
    isDark: true,
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};
export const ArchitectureAwareDark: Story = {
  args: {
    text: 'Architecture-Aware',
    isVisible: true,
    isDark: true,
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};
export const DesignAwareDark: Story = {
  args: {
    text: 'Design-Aware',
    isVisible: true,
    isDark: true,
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};
