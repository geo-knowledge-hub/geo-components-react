/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';
import { render } from '@testing-library/react';

import App from './demos/App';

test('Basic App test', () => {
  const { getByText } = render(<App />);

  expect(getByText('GEO Components React')).toBeInTheDocument();
});
