/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';
import ReactDOM from 'react-dom';

import { Formik } from 'formik';
import { WorkProgrammeActivityField } from './WorkProgrammeActivityField';

it('renders without crashing without props', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <Formik>{(props) => <WorkProgrammeActivityField />}</Formik>,
    div
  );
});

it('renders without crashing with all props', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <Formik>
      {(props) => (
        <WorkProgrammeActivityField
          fieldPath={'metadata.geo_work_programme_activity'}
          label={'GEO Work Programme Activity'}
          labelIcon={'globe'}
          clearable={true}
          required={true}
          placeholder={'Search for a GEO Work Programme Activity'}
          noQueryMessage={
            'Start typing to search for a GEO Work Programme Activity'
          }
        />
      )}
    </Formik>,
    div
  );
});
