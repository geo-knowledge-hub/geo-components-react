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

import { BasicFilterForm as BasicFilterFormField } from './BasicFilterForm';

/**
 * Basic Filter Form pane factory.
 * @constructor
 *
 * @param {String} paneTitle Title of the generated `Pane` to be used in the Semantic UI `Tab` component.
 * @param {Object} paneConfig Configuration object for the generated `Tab.Pane`.
 * @param {Object} fieldConfig Configuration object for the `BasicFilterFormField` Component.
 * @returns {{menuItem: *, render: (function())}}
 */
export const BasicFilterFormPane = ({
  paneTitle = i18next.t('Metadata filter'),
  paneConfig = {},
  fieldConfig = {},
}) => {
  return {
    menuItem: paneTitle,
    render: () => (
      <Tab.Pane {...paneConfig}>
        <BasicFilterFormField {...fieldConfig} />
      </Tab.Pane>
    ),
  };
};
