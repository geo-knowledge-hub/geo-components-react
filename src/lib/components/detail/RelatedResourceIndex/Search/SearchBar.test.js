/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';
import ReactDOM from 'react-dom';

import { SearchBar } from './SearchBar';

it('renders without crashing without props', () => {
  const div = document.createElement('div');

  ReactDOM.render(<SearchBar />, div);
});
