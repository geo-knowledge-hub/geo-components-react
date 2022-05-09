/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { useContext } from 'react';

import { Label, Menu } from 'semantic-ui-react';

import { IndexContext } from '../IndexContext';

/**
 * Type selector for the Search Menu.
 */
export const TypeSelectorItem = () => {
  const indexContext = useContext(IndexContext);

  const { recordTypeCount } = indexContext.resourceTypeMenuContext;
  const { activeResourceType, setActiveResourceType } =
    indexContext.searchContext.faceted.resourceType;

  return (
    <>
      {recordTypeCount &&
        recordTypeCount.map((option) => (
          <Menu.Item
            key={option.name}
            name={option.name}
            active={activeResourceType === option.name}
            onClick={() => {
              setActiveResourceType(option.name);
            }}
          >
            {option.name}
            <Label color={'grey'}>{option.numberOfRecords}</Label>
          </Menu.Item>
        ))}
    </>
  );
};
