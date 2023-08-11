/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';

import { mutateEngagementsData } from '../base/mutations';
import { ImageCarousel } from '../base';

export const EngagementImages = ({ engagements, filterUrl }) => {
  const engagementImageObjects = engagements.map((engagement) =>
    mutateEngagementsData(engagement, filterUrl)
  );

  return <ImageCarousel images={engagementImageObjects} />;
};
