/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';
import ReactDOM from 'react-dom';

import { ShareEmailButton } from './ShareEmailButton';

it('renders without crashing with props', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <ShareEmailButton
      resourceType={'Knowledge Package'}
      resourceDescription={'Simple resource'}
      resourceIcon={'📦'}
      resourceTitle={'A simple resource'}
      resourceUrl={'https://test.io'}
      round={true}
    />,
    div
  );
});
