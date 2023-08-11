/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022-2023 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';

import { Image } from 'semantic-ui-react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import './LazyImage.css';

export const LazyImage = ({ src, ...imageProps }) => {
  return (
    <Image {...imageProps} className={'lazy-image'}>
      <LazyLoadImage src={src} effect={'blur'} />
    </Image>
  );
};
