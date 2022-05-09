/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';
import ReactDOM from 'react-dom';

import { SearchMenu } from './SearchMenu';

it('renders without crashing with props', () => {
  const div = document.createElement('div');

  const typeSelectorData = [
    {
      name: 'Type A',
      numberOfRecords: 12,
    },
  ];

  const dropdownOptions = [
    {
      type: 'Type A',
      availableValues: [
        {
          key: 'Value A',
          text: 'Value A',
          value: 'Value A',
        },
      ],
    },
  ];

  ReactDOM.render(
    <SearchMenu
      attached="top"
      typeSearchOptions={typeSelectorData}
      dropdownSearchOptions={dropdownOptions}
    />,
    div
  );
});
