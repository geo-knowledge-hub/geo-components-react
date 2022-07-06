/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';

import { AuthorsField } from './AuthorsField';
import { renderWithFormikProvider } from '@tests/renders';

describe('AuthorsField tests', () => {
  describe('Render tests', () => {
    it('should render without crashing', () => {
      renderWithFormikProvider(<AuthorsField />);
    });
    it('renders without crashing with all props', () => {
      renderWithFormikProvider(
        <AuthorsField
          fieldPath={'metadata.authors'}
          labelIcon={'flag'}
          multiple={true}
          clearable={true}
          required={true}
        />
      );
    });
  });
});
