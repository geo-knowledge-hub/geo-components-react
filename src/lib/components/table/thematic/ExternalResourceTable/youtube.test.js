/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';

import { YouTubeViewer } from './youtube';

import { render } from '../../../../../setupTestRenders';

describe('YouTube Viewer tests', () => {
  describe('Render tests', () => {
    it('should render with the required props without crashing', () => {
      render(
        <YouTubeViewer url={'https://www.youtube.com/watch?v=cM47L5RddsM'} />
      );
    });
  });
});
