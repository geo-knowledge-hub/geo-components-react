/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import _find from 'lodash/find';
import _drop from 'lodash/drop';
import _countBy from 'lodash/countBy';

/**
 * Count the number of records based on resource types.
 * @param {array} records is an array with the record objects.
 * @param {array} resourceTypeDefinitions is an array with the resource type definitions.
 * @returns
 */
export const countRecordByType = (records, resourceTypeDefinitions) => {
  const mainTypes = {
    dataset: 'Dataset',
    publication: 'Publication',
    software: 'Software',
    default: 'Other',
  };

  // getting the resource types
  const recordsWithType = records.map((record) => {
    const resourceType =
      _find(
        resourceTypeDefinitions,
        (resource) => resource.id === record.ui.resource_type.id
      ) || {};

    // Defining the main types (ToDo: Generalize)
    const getResourceTypeName = (resourceTypeName, types) => {
      return types[resourceTypeName] || types['default'];
    };

    return {
      ...record,
      resource_type: getResourceTypeName(resourceType.id, mainTypes),
    };
  });

  // couting
  const recordsByType = _countBy(recordsWithType, 'resource_type');

  // creating the result
  return Object.values(mainTypes).map((e) => ({
    name: e,
    numberOfRecords: recordsByType[e] || 0,
  }));
};

/**
 * Paginate and array using lodash
 *
 *
 * @param {Array} items Array to be paginated
 * @param {Number} page current page
 * @param {Number} pageSize number of items in a page
 *
 * @see https://gist.github.com/jstott/7b50d4f4790c357227bafd13b4ef32a4
 */
export const paginateRecordItems = (items, page, pageSize) => {
  const currentPage = page || 1;
  const totalItemsPerPage = pageSize || 3;

  // to skip the items on array
  // after the first page
  const offset = (currentPage - 1) * pageSize;

  const paginatedItems = _drop(items, offset).slice(0, totalItemsPerPage);

  return {
    currentPage: currentPage,
    pageSize: totalItemsPerPage,
    totalItems: items.length,
    totalPages: Math.ceil(items.length / totalItemsPerPage),
    data: paginatedItems,
  };
};
