/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';

import { TargetAudienceField } from './TargetAudienceField';
import { renderWithFormikProvider } from '@tests/renders';

describe('TargetAudienceField tests', () => {
  describe('Render tests', () => {
    it('should render without crashing', () => {
      renderWithFormikProvider(<TargetAudienceField />);
    });
    it('renders without crashing with all props', () => {
      renderWithFormikProvider(
        <TargetAudienceField
          fieldPath={'metadata.target_audiences'}
          label={'Target Audiences'}
          labelIcon={'users'}
          multiple={true}
          clearable={true}
          required={true}
          placeholder={'Search for Target Audiences'}
          noQueryMessage={'Start typing to search for Target Audience'}
        />
      );
    });
  });
});
