/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';
import ReactDOM from 'react-dom';

import { ShareTwitterButton } from './ShareTwitterButton';

it('renders without crashing with props', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <ShareTwitterButton
      resourceType={'Knowledge Package'}
      resourceIcon={'📦'}
      resourceTitle={'A simple resource'}
      resourceUrl={'https://test.io'}
      hashtags={['hashtagA', 'hashtagB', 'hashtagC']}
      relatedTo={['someTwitterUser']}
      round={true}
    />,
    div
  );
});
