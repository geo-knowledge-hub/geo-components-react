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
import { TargetAudienceField } from './TargetAudienceField';

it('renders without crashing without props', () => {
  const div = document.createElement('div');

  ReactDOM.render(<Formik>{(props) => <TargetAudienceField />}</Formik>, div);
});

it('renders without crashing with all props', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <Formik>
      {(props) => (
        <TargetAudienceField
          fieldPath={'metadata.target_audiences'}
          label={'Target Audiences'}
          labelIcon={'users'}
          multiple={true}
          clearable={true}
          required={true}
          placeholder={'Search for Target Audiences'}
          noQueryMessage={'Start typing to search for Target Audience'}
        />
      )}
    </Formik>,
    div
  );
});
