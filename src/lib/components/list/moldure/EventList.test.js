/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022-2023 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';

import { render } from '.@tests/renders';

import { EventList } from './EventList';

import events from '@tests/mock/list/events.json';

describe('EventList tests', () => {
  describe('Render tests', () => {
    it('should render without errors', () => {
      render(<EventList events={events} />);
    });
  });
});
