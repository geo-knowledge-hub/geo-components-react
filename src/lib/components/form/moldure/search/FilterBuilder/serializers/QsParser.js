/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import _map from 'lodash/map';
import _groupBy from 'lodash/groupBy';
import _merge from 'lodash/merge';

import { isEmpty } from './fields';

/**
 * Class to create valid `qs` objects using the user defined values.
 */
export class QsParser {
  /**
   * @constructor
   *
   * @param {Object} fieldTypeNames Configuration object with the name of the url
   *                                elements to be used to generate the qs objects.
   *                                For example, if the user need to define the name
   *                                of the `query` parameter, the `fieldTypeNames` can
   *                                be defined as following:
   *
   *                                  fieldTypeNames = { query: 'q' }
   *
   *                                In this case, for the methods which generates `query` arguments,
   *                                the name will be `q`.
   */
  constructor(fieldTypeNames) {
    this.fieldTypeNames = fieldTypeNames;
  }

  /**
   * Parse query arguments to a JSON to be used in QS.
   * @param {Object} searchArgValues Object with the arguments to be parsed.
   * @returns {{name, value}|*}
   */
  parseSearchQueryArguments(searchArgValues) {
    // Processing the elements for the `Query search arguments`
    let value = null;

    if (!isEmpty(searchArgValues)) {
      value = _map(searchArgValues, 'value').join(' AND ');
    }

    return {
      type: 'query',
      name: this.fieldTypeNames['query'],
      value: value,
    };
  }

  /**
   * Parse param values to a JSON to be used in QS.
   * @param {Object} searchExtraParams Object with the params to be parsed.
   * @returns {{name, value}|*}
   */
  parseSearchQueryParams(searchExtraParams) {
    let value = null;
    if (!isEmpty(searchExtraParams)) {
      // Getting the name of the params in the url
      const transformedParams = searchExtraParams.map((param) => ({
        ...param,
        name: this.fieldTypeNames[param.name],
      }));

      // Grouping by the names
      let paramGroups = _groupBy(transformedParams, 'name');

      // Transforming the data in a `qs` valid structure
      paramGroups = Object.keys(paramGroups).map((paramName) => {
        return {
          [paramName]: paramGroups[paramName].map((obj) => obj.value),
        };
      });

      value = _merge(...paramGroups);
    }

    return {
      type: 'param',
      name: null, // in this case, the `value` contains multiple names to be used.
      value: value,
    };
  }

  /**
   * Generate `qs` valid objects for the Search `Arguments` and `Params` defined
   * for the users.
   * @param {Object} serializedValues Object with the `Arguments` and `Params`
   *                                  defined by the user in the filter menu.
   * @returns {{searchExtraParams: ({name, value}|*), searchQueryArgs: ({name, value}|*)}}
   */
  generateQsObjects(serializedValues) {
    const searchElements = _groupBy(serializedValues, 'type');

    const qsArguments = this.parseSearchQueryArguments(searchElements.args);
    const qsParams = this.parseSearchQueryParams(searchElements.params);

    return {
      searchQueryArgs: qsArguments,
      searchExtraParams: qsParams,
    };
  }
}
