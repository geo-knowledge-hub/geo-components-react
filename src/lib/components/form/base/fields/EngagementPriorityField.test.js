/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';

import { EngagementPriorityField } from './EngagementPriorityField';
import { renderWithFormikProvider } from '@tests/renders';

describe('EngagementPriorityField tests', () => {
  describe('Render tests', () => {
    it('should render without crashing', () => {
      renderWithFormikProvider(<EngagementPriorityField />);
    });
    it('renders without crashing with all props', () => {
      renderWithFormikProvider(
        <EngagementPriorityField
          fieldPath={'metadata.engagement_priorities'}
          label={'Engagement Priorities'}
          labelIcon={'flag'}
          multiple={true}
          clearable={true}
          required={true}
          placeholder={'Search for Engagement Priorities'}
          noQueryMessage={'Start typing to search for an engagement priority'}
        />
      );
    });
  });
});
