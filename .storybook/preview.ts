import type { Preview } from "@storybook/react";

import './storybook-globals.css';
import '../app/globals.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'Light',
      values: [
        { name: 'Light', value: '#F0F0E3' },
        { name: 'Dark', value: '#38343F' },
      ],
    },
  },
};

export default preview;
