/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';

import { SubjectsField } from './SubjectsField';
import { renderWithFormikProvider } from '@tests/renders';

describe('SubjectsField tests', () => {
  describe('Render tests', () => {
    it('should render without crashing with props', () => {
      renderWithFormikProvider(
        <SubjectsField
          initialOptions={null}
          limitToOptions={[
            {
              text: 'All',
              value: 'all',
            },
            {
              text: 'FOS',
              value: 'FOS',
            },
          ]}
        />
      );
    });
  });
});
