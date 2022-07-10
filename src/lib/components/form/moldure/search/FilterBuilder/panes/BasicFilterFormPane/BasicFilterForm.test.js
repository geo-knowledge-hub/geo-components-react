/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';

import { BasicFilterForm } from './BasicFilterForm';
import { renderWithFormikProvider } from '@tests/renders';

describe('BasicFilterForm tests', () => {
  describe('Render tests', () => {
    it('should render without crashing', () => {
      renderWithFormikProvider(<BasicFilterForm />);
    });
    it('should render with props without crashing', () => {
      renderWithFormikProvider(
        <>
          <BasicFilterForm
            fieldsConfig={{
              authors: {
                fieldPath: 'test.test',
                label: 'Author label',
              },
              resourceType: {
                fieldPath: 'resource.type',
                labelIcon: 'upload',
              },
            }}
          />
        </>
      );
    });
  });
});
