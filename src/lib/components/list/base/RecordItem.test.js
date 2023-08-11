/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022-2023 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';

import { render } from '.@tests/renders';

import { RecordItem } from './RecordItem';

import recordData from '@tests/mock/list/records.json';

describe('RecordItem tests', () => {
  describe('Render tests', () => {
    it('should render without errors', () => {
      render(
        <>
          {recordData.map((record, index) => (
            <RecordItem key={index} recordData={record} />
          ))}
        </>
      );
    });
  });
});
