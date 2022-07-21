/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';

import { Tab } from 'semantic-ui-react';

import { i18next } from '@translations/i18next';

import { SpatialFilterForm as SpatialFilterFormField } from './SpatialFilterForm';

/**
 * Spatial Filter Form pane factory.
 * @constructor
 *
 * @param {String} paneTitle Title of the generated `Pane` to be used in the Semantic UI `Tab` component.
 * @param {Object} paneConfig Configuration object for the generated `Tab.Pane`.
 * @param {Object} fieldConfig Configuration object for the `SpatialFilterForm` Component.
 * @returns {{menuItem: *, render: (function())}}
 */
export const SpatialFilterFormPane = ({
  paneTitle = i18next.t('Spatial extent'),
  paneConfig = {},
  fieldConfig = {},
}) => {
  return {
    menuItem: paneTitle,
    render: () => (
      <Tab.Pane {...paneConfig}>
        <SpatialFilterFormField {...fieldConfig} />
      </Tab.Pane>
    ),
  };
};
