/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { Fragment } from 'react';

import { Divider, Dropdown, Header } from 'semantic-ui-react';

/**
 * Additional filter component to enable the Faceted Search.
 *
 * @todo To Be finished.
 */
export const AdditionalFilters = ({ options }) => {
  return (
    <Dropdown icon={'filter'}>
      <Dropdown.Menu>
        <Dropdown.Header icon={'tags'} content={'Additional filters'} />
        <Dropdown.Menu scrolling>
          {options &&
            options.map((option, index) => (
              <Fragment key={index}>
                <Header as="h3">{option.type}</Header>
                <Divider />

                {option.availableValues.map((availableValue) => (
                  <Dropdown.Item key={availableValue.key} {...availableValue} />
                ))}
              </Fragment>
            ))}
        </Dropdown.Menu>
      </Dropdown.Menu>
    </Dropdown>
  );
};
