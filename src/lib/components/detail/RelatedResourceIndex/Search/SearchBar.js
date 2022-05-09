/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { useCallback, useContext } from 'react';

import _debounce from 'lodash/debounce';
import { Input } from 'semantic-ui-react';

import { IndexContext } from '../IndexContext';

/**
 * SearchBar component
 */
export const SearchBar = ({ ...uiProps }) => {
  const indexContext = useContext(IndexContext);

  const { setContent } = indexContext.searchContext.searchbar;
  const debounceFnc = useCallback(
    _debounce((data) => {
      setContent(data);
    }, 500),
    [] // debounce rocks!
  );

  return (
    <Input
      icon="search"
      {...uiProps}
      onChange={(event) => {
        debounceFnc(event.target.value);
      }}
    />
  );
};
