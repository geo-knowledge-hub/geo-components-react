/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import _find from 'lodash/find';
import _countBy from 'lodash/countBy';

/**
 * Constants
 */
export const RESOURCE_TYPES_GROUPS = {
  Dataset: 'Dataset',
  Publication: 'Publication',
  Software: 'Software',
  Default: 'Other',
};

/**
 * Guess the group type of a given record.
 */
export const guessRecordGroupType = (
  resourceTypeName,
  resourceTypeGroups = RESOURCE_TYPES_GROUPS
) => resourceTypeGroups[resourceTypeName] || resourceTypeGroups['Default'];

/**
 * Count the number of records based on resource types.
 * @param {array} records is an array with the record objects.
 * @param {array} resourceTypeDefinitions is an array with the resource type definitions.
 * @returns
 */
export const countRecordByType = (
  records,
  resourceTypeDefinitions,
  resourceTypeGroups = RESOURCE_TYPES_GROUPS
) => {
  // getting the resource types
  const recordsWithType = records.map((record) => {
    const resourceType =
      _find(
        resourceTypeDefinitions,
        (resource) => resource.id === record.ui.resource_type.id
      ) || {};

    return {
      ...record,
      resource_type: guessRecordGroupType(
        resourceType.type_name,
        resourceTypeGroups
      ),
    };
  });

  // couting
  const recordsByType = _countBy(recordsWithType, 'resource_type');

  // creating the result
  return Object.values(resourceTypeGroups).map((e) => ({
    name: e,
    numberOfRecords: recordsByType[e] || 0,
  }));
};

/**
 * Faceted Search filter function.
 * @param {Object} facetedSearchOptions Faceted Search Options
 */
export const facetedFilterRecordsFactory = (
  facetedSearchOptions,
  ...groupingOptions
) => {
  return (result) => {
    if (result) {
      // extracting record type name
      const recordTypeNames =
        facetedSearchOptions.resourceTypesAvailable.filter((val) => {
          const resultId = result.ui.resource_type.id;
          const resultTypeid = resultId.split('-');

          return val.id === resultTypeid[0];
        });

      if (recordTypeNames) {
        const recordTypeName = recordTypeNames[0];

        const recordTypeGroup = guessRecordGroupType(
          recordTypeName.type_name,
          ...groupingOptions
        );

        return recordTypeGroup === facetedSearchOptions.resourceType;
      }
    }
    return false;
  };
};
