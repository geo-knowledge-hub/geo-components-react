/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';

import { ControlledSubjects } from './ControlledSubjects';
import { renderWithFormikProvider } from '@tests/renders';

describe('ControlledSubjects tests', () => {
  describe('Render tests', () => {
    it('should render without crashing with props', () => {
      renderWithFormikProvider(
        <ControlledSubjects
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
