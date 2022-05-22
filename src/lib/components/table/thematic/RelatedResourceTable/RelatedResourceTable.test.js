/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';

import { RelatedResourceTable } from './RelatedResourceTable';

import { render, screen } from '../../../../../setupTestRenders';

import resourceTypeData from '../../../../../mocks/vocabularies/resourcetypes.json';
import relatedRecordsData from '../../../../../mocks/table/table-related-resources.json';

describe('RelatedResourceTable tests', () => {
  describe('Render tests', () => {
    it('should render with the required props without crashing', () => {
      render(
        <RelatedResourceTable
          records={relatedRecordsData}
          resourceTypeDefinitions={resourceTypeData}
        />
      );
      const tableElements = screen.getAllByRole('listitem');

      expect(tableElements).toHaveLength(4);
    });
  });
});
