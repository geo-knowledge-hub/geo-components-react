/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { Fragment } from 'react';

import { Item, Menu } from 'semantic-ui-react';

import { SearchBar } from './SearchBar';

/**
 * Centralize search options to filter the records list.
 */
export const SearchMenu = ({ ...uiProps }) => {
  return (
    <Fragment>
      <Menu {...uiProps}>
        <Menu.Menu position="right">
          <Item>
            <SearchBar placeholder={'Search for a record'} />

            {/* ToDo: Implement additional filters */}
            {/* <AdditionalFilters /> */}
          </Item>
        </Menu.Menu>
      </Menu>
    </Fragment>
  );
};
