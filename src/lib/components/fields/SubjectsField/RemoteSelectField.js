/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import _uniq from 'lodash/uniq';
import _uniqBy from 'lodash/unionBy';
import _flatten from 'lodash/flatten';

import { RemoteSelectField as BaseRemoteSelectField } from 'react-invenio-forms';

export class RemoteSelectField extends BaseRemoteSelectField {
  /**
   * Extract multiple values based on a single string
   * with `;` pattern between the values.
   */
  extractBulkValue = (values) => {
    const defaultSeparator = ';';

    return _uniq(
      _flatten(values.map((value) => value.split(defaultSeparator)))
    );
  };

  onSelectValue = (event, { options, value: rawValue }, callbackFunc) => {
    const { multiple } = this.props;

    const value = this.extractBulkValue(rawValue);
    const newSelectedSuggestions = options.filter((item) =>
      value.includes(item.value)
    );

    this.setState(
      {
        selectedSuggestions: newSelectedSuggestions,
        searchQuery: null,
        error: false,
        open: multiple ? true : false,
      },
      () => callbackFunc(newSelectedSuggestions)
    );
  };

  handleAddition = (e, { value: rawValue }, callbackFunc) => {
    const { serializeAddedValue } = this.props;
    const { selectedSuggestions } = this.state;

    const bulkValueDefinition = this.extractBulkValue([rawValue]);

    const bulkSelectedSuggestions = bulkValueDefinition.map((value) => {
      const selectedSuggestion = serializeAddedValue
        ? serializeAddedValue(value)
        : { text: value, value, key: value, name: value };

      return selectedSuggestion;
    });

    const newSelectedSuggestions = [
      ...selectedSuggestions,
      ...bulkSelectedSuggestions,
    ];

    this.setState(
      (prevState) => ({
        selectedSuggestions: newSelectedSuggestions,
        suggestions: _uniqBy(
          [...prevState.suggestions, ...newSelectedSuggestions],
          'value'
        ),
      }),
      () => callbackFunc(newSelectedSuggestions)
    );
  };
}
