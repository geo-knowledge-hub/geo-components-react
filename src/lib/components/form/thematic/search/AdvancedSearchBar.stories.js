/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';

import { Global } from '@emotion/react';

import { AdvancedSearchBar as AdvancedSearchBarComponent } from './AdvancedSearchBar';

export default {
  title: 'Form/Search/Advanced search bar',
  component: AdvancedSearchBarComponent,
};

/**
 * Component template
 */
const Template = (args) => (
  <>
    <Global
      styles={{
        '.leaflet-container': {
          height: '40vh',
          zIndex: 0,
        },
      }}
    />

    <AdvancedSearchBarComponent {...args} />
  </>
);

/**
 * Component stories
 */
export const Basic = Template.bind({});
Basic.args = {
  placeholder: 'Search for something',
};
