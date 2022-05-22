/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

export const RESOURCE_TYPES_GROUPS_ICON = {
  Dataset: 'database',
  Software: 'code',
  Publication: 'file alternate outline',
  Default: 'ellipsis horizontal',
};

export const guessRecordGroupIcon = (
  resourceTypeName,
  resourceTypeGroups = RESOURCE_TYPES_GROUPS_ICON
) => resourceTypeGroups[resourceTypeName] || resourceTypeGroups['Default'];
