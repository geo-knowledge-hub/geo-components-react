/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';

import { ResourceTypeField } from './ResourceTypeField';
import { renderWithFormikProvider } from '@tests/renders';

describe('ResourceTypeField tests', () => {
  describe('Render tests', () => {
    it('should render without crashing', () => {
      renderWithFormikProvider(<ResourceTypeField />);
    });
    it('should render with props without crashing', () => {
      renderWithFormikProvider(
        <ResourceTypeField
          fieldPath={'metadata.resource_type'}
          label={'Resource type'}
        />
      );
    });
  });
});
