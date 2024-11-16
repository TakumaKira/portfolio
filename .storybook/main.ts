import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  staticDirs: [
    {
      from: '../app/fonts',
      to: 'app/fonts',
    },
  ],
  webpackFinal(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config?.module?.rules?.find((rule) =>
      typeof rule === 'object' && typeof rule?.test === 'object' && 'test' in rule.test && typeof rule.test.test === 'function' && rule.test.test('.svg'),
    )

    if (config?.module?.rules && typeof fileLoaderRule === 'object' && fileLoaderRule !== null) {
      let not: any[] = []
      if (typeof fileLoaderRule.resourceQuery === 'object' && 'not' in fileLoaderRule.resourceQuery && Array.isArray(fileLoaderRule.resourceQuery.not)) {
        not = fileLoaderRule.resourceQuery.not
      }
      config.module.rules.push(
        // Reapply the existing rule, but only for svg imports ending in ?url
        {
          ...fileLoaderRule,
          test: /\.svg$/i,
          resourceQuery: /url/, // *.svg?url
        },
        // Convert all other *.svg imports to React components
        {
          test: /\.svg$/i,
          issuer: fileLoaderRule.issuer,
          resourceQuery: { not: [...not, /url/] }, // exclude if *.svg?url
          use: ['@svgr/webpack'],
        },
      )
      
      // Modify the file loader rule to ignore *.svg, since we have it handled now.
      fileLoaderRule.exclude = /\.svg$/i
    }

    return config
  },
};
export default config;
