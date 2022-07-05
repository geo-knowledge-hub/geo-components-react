/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';

import { WorkProgrammeActivityField } from './WorkProgrammeActivityField';
import { renderWithFormikProvider } from '@tests/renders';

describe('WorkProgrammeActivityField tests', () => {
  describe('Render tests', () => {
    it('should render without crashing', () => {
      renderWithFormikProvider(<WorkProgrammeActivityField />);
    });
    it('should render with props without crashing', () => {
      renderWithFormikProvider(
        <WorkProgrammeActivityField
          fieldPath={'metadata.geo_work_programme_activity'}
          label={'GEO Work Programme Activity'}
          labelIcon={'globe'}
          clearable={true}
          required={true}
          placeholder={'Search for a GEO Work Programme Activity'}
          noQueryMessage={
            'Start typing to search for a GEO Work Programme Activity'
          }
        />
      );
    });
  });
});
