/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';
import ReactDOM from 'react-dom';

import { RecordList } from './RecordList';

// it('renders without crashing without props', () => {
//   const div = document.createElement('div');

//   ReactDOM.render(<RecordList />, div);
// });

it('renders without crashing with props', () => {
  const div = document.createElement('div');

  const records = [
    {
      id: 'Record ID',
      title: 'Record Title',
      ui: {
        creators: {
          creators: [
            {
              person_or_org: {
                name: 'Person a',
              },
            },
          ],
        },
        description_stripped: 'Description',
        publication_date_l10n_medium: 'Publication Date',
        resource_type: {
          title_l10n: 'Resource Type title',
        },
        access_status: {
          id: 'Access Status ID',
          icon: 'rocket',
          title_l10n: 'Access Status Title',
        },
      },
    },
  ];

  ReactDOM.render(<RecordList records={records} />, div);
});
