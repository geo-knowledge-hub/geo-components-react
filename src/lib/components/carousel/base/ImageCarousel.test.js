/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022-2023 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';

import { render } from '.@tests/renders';

import carouselData from '@tests/mock/vocabularies/engagementprioritiestypes-api-raw.json';
import { mutateEngagementsData } from './mutations';

import { ImageCarousel } from './ImageCarousel';

describe('ImageCarousel tests', () => {
  const carouselImageObjects = carouselData.map((engagement) =>
    mutateEngagementsData(engagement, '#')
  );

  describe('Render tests', () => {
    it('should render without errors', () => {
      render(<ImageCarousel images={carouselImageObjects} />);
    });
  });
});
