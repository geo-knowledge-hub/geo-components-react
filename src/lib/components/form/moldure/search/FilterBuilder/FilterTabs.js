/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';
import PropTypes from 'prop-types';

import { Tab } from 'semantic-ui-react';

import { BasicFilterFormPane, SpatialFilterFormPane } from './panes';

/**
 * Modal tabs for the Filter builder.
 * @constructor
 *
 * @param {Object} tabConfig Configuration object for the Semantic UI `Tab` component.
 * @param {Object} tabPaneConfig Configuration object for the `Tab.Pane` used to compose the `AdvancedFilterTabs`.
 *                               This object can have the following keys:
 *                                  - `basicFormPane`: Must define the configuration object for the `BasicFilterFormPane` factory;
 *                                  - `spatialFormPane`: Must define the configuration object for the `SpatialFilterFormPane` factory.
 * @returns {JSX.Element}
 */
export const FilterTabs = ({ tabConfig, tabPaneConfig }) => {
  const panes = [
    BasicFilterFormPane(tabPaneConfig.basicFormPane),
    SpatialFilterFormPane(tabPaneConfig.spatialFormPane),
  ];

  return <Tab {...tabConfig} panes={panes} />;
};

FilterTabs.propTypes = {
  tabConfig: PropTypes.object,
  tabPaneConfig: PropTypes.object,
};

FilterTabs.defaultProps = {
  tabConfig: {
    menu: {
      secondary: true,
      pointing: true,
    },
  },
  tabPaneConfig: {
    basicFormPane: {},
    spatialFormPane: {},
  },
};
