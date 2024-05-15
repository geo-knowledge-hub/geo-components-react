/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022-2024 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';
import { useAsyncDebounce } from 'react-table';
import { Icon, Input } from 'semantic-ui-react';
import PropTypes from 'prop-types';

/**
 * Global filter component for the external resources table.
 */
export const BaseGlobalFilter = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) => {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <Input
      fluid
      icon
      placeholder={'Type to search...'}
      value={value || ''}
      onChange={(e) => {
        setValue(e.target.value);
        onChange(e.target.value);
      }}
    >
      <input />
      <Icon name={'search'} />
    </Input>
  );
};

BaseGlobalFilter.propTypes = {
  preGlobalFilteredRows: PropTypes.object.isRequired,
  globalFilter: PropTypes.object.isRequired,
  setGlobalFilter: PropTypes.object,
};
