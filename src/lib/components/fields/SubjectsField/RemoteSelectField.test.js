/*
 * This file is part of GEO-Deposit-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Deposit-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';

import { RemoteSelectField } from './RemoteSelectField';
import { renderWithFormikProvider } from '@tests/renders';

describe('RemoteSelectField tests', () => {
  describe('Render tests', () => {
    it('should render without crashing', () => {
      renderWithFormikProvider(<RemoteSelectField />);
    });
  });
});
