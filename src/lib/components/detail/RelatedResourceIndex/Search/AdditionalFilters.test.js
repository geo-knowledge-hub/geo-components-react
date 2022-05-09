/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';
import ReactDOM from 'react-dom';

import { AdditionalFilters } from './AdditionalFilters';

it('renders without crashing without props', () => {
  const div = document.createElement('div');

  ReactDOM.render(<AdditionalFilters />, div);
});

it('renders without crashing with props', () => {
  const div = document.createElement('div');

  const dropDownOptions = [
    {
      type: 'Type A',
      availableValues: [
        {
          key: 'Value A',
          text: 'Value A',
          value: 'Value A',
        },
        {
          key: 'Value B',
          text: 'Value B',
          value: 'Value B',
        },
      ],
    },
    {
      type: 'Type B',
      availableValues: [
        {
          key: 'Value C',
          text: 'Value C',
          value: 'Value C',
        },
        {
          key: 'Value D',
          text: 'Value D',
          value: 'Value D',
        },
      ],
    },
  ];

  ReactDOM.render(<AdditionalFilters options={dropDownOptions} />, div);
});
