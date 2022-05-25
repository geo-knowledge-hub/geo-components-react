/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';

import { RecordListItem } from './RecordListItem';

import { render, screen } from '../../../../../../../../setupTestRenders';

import relatedRecordsData from '../../../../../../../../mocks/table/table-related-resources.json';
import relatedrecordsDataWithoutFields from '../../../../../../../../mocks/table/table-related-resources-fields.json';

describe('RecordListItem tests', () => {
  describe('Render tests', () => {
    it('should render with the required props without crashing', () => {
      render(<RecordListItem recordData={relatedRecordsData[0]} />);

      const recordsLink = screen.getByRole('link');
      expect(recordsLink).toBeInTheDocument();
    });

    it('should render with data without the used fields', () => {
      render(
        <RecordListItem recordData={relatedrecordsDataWithoutFields[0]} />
      );

      const recordsLink = screen.getByRole('link');
      expect(recordsLink).toBeInTheDocument();
    });
  });
});
