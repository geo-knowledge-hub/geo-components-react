/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';
import ReactDOM from 'react-dom';

import { TypeSelectorItem } from './TypeSelectorItem';

it('renders without crashing without props', () => {
  const div = document.createElement('div');

  ReactDOM.render(<TypeSelectorItem />, div);
});

it('renders without crashing with props', () => {
  const div = document.createElement('div');

  const typeSelectorData = [
    {
      name: 'Type A',
      numberOfRecords: 12,
    },
    {
      name: 'Type B',
      numberOfRecords: 21,
    },
    {
      name: 'Type C',
      numberOfRecords: 11,
    },
    {
      name: 'Type D',
      numberOfRecords: 22,
    },
  ];

  ReactDOM.render(<TypeSelectorItem options={typeSelectorData} />, div);
});
