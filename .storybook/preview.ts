import type { Preview } from "@storybook/react";

import './storybook-body-style.scss';

const projectViewports = {
  desktop: {
    name: 'Desktop',
    styles: {
      width: '1280px',
      height: '832px',
    },
  },
  tablet: {
    name: 'Tablet',
    styles: {
      width: '834px',
      height: '1194px',
    },
  },
  mobile: {
    name: 'Mobile',
    styles: {
      width: '390px',
      height: '844px',
    },
  },
};

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
    viewport: {
      viewports: {
        ...projectViewports,
      },
    },    
  },
};

export default preview;
