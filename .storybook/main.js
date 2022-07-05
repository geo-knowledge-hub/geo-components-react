/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-jest',
    'storybook-addon-mock/register',
  ],
  framework: '@storybook/react',
  staticDirs: ['../public'],
  webpackFinal: async (config, { configType }) => {
    // aliases
    config.resolve.alias = {
      ...config.resolve.alias,
      '@translations/i18next': path.resolve(__dirname, '../src/lib/i18next'),
      '@tests/setup': path.resolve(__dirname, '../src/setupTests'),
      '@tests/mock': path.resolve(__dirname, '../src/mocks'),
    };

    return config;
  },
};
