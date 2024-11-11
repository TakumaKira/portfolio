import type { Meta, StoryObj } from '@storybook/react';

import HorizontalFade from './HorizontalFade';

const meta = {
  title: 'Component/HorizontalFade',
  component: HorizontalFade,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof HorizontalFade>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Main: Story = {
  args: {
    children: <div style={{ width: "200px", height: "50px", backgroundColor: "cyan", display: "flex", alignItems: "center", justifyContent: "center" }}>Content</div>,
    isVisible: true,
  },
};
