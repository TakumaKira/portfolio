import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import styled from 'styled-components';

import HorizontalFade from './HorizontalFade';

const meta = {
  title: 'Component/HorizontalFade',
  component: HorizontalFade,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: { onChangeState: fn() },
} satisfies Meta<typeof HorizontalFade>;

export default meta;
type Story = StoryObj<typeof meta>;

const Content = styled.div`
  width: 200px;
  height: 50px;
  background-color: cyan;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Main: Story = {
  args: {
    children: <Content>Content</Content>,
    isVisible: true,
  },
};
