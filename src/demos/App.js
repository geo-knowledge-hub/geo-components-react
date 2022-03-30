/*
 * This file is part of GEO-Labels-React.
 * Copyright (C) 2022 CERN.
 *
 * GEO-Labels-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';

import { RelatedApplicationCarousel } from '../lib';

const App = () => {
  const relatedApplications = [
    {
      title: 'component example test 1',
      url: '/',
    },
    {
      title: 'component example test 2',
      url: '/',
    },
    {
      title: 'component example test 3',
      url: '/',
    },
    {
      title: 'component example test 4',
      url: '/',
    },
  ];

  return (
    <RelatedApplicationCarousel relatedApplications={relatedApplications} />
  );
};

export default App;
