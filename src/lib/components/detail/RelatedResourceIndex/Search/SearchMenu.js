/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';

import { Item, Menu } from 'semantic-ui-react';

import { SearchBar } from './SearchBar';
import { TypeSelectorItem } from './TypeSelectorItem';
import { AdditionalFilters } from './AdditionalFilters';

/**
 * Centralize search options to filter the records list.
 */
export const SearchMenu = ({ ...uiProps }) => {
  return (
    <Menu {...uiProps}>
      <TypeSelectorItem />

      <Menu.Menu position="right">
        <Item>
          <SearchBar placeholder={'Search for a record'} />
          <AdditionalFilters />
        </Item>
      </Menu.Menu>
    </Menu>
  );
};
