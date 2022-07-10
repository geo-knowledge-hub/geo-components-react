/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import _get from 'lodash/get';

import { isEmpty } from '../utils';
import { ArgField } from './ArgField';

/**
 * Vocabulary field for values in metadata with a defined or custom vocabulary associated.
 */
export class VocabularyField extends ArgField {
  /**
   * @constructor
   *
   * @param {String} storageField Path in the storage (e.g., Formik) where the field is defined.
   * @param {String} metadataField Path in the metadata where the `VocabularyField` will be defined.
   * @param {String} operator Operator (e.g., `AND`, `OR`) used to concatenate the values from the `storageField`.
   * @param {String} vocabularyValueField Path where the data (inside the `storageField` object) is defined.
   */
  constructor(storageField, metadataField, operator, vocabularyValueField) {
    super(storageField, metadataField, operator);
    this.vocabularyValueField = vocabularyValueField;
  }

  /**
   * General function to serialize the vocabulary values.
   * @param {Object} values Object to be serialized.
   * @param {String} storageField Path in the storage (e.g., Formik) where the field is defined.
   * @param {String} metadataField Path in the metadata where the `VocabularyField` will be defined.
   * @returns {string|null}
   */
  serializeVocabularyValues(values, storageField, metadataField) {
    let fieldValue = _get(values, storageField, null);

    if (isEmpty(fieldValue)) {
      return null;
    }

    // extracting the values
    if (Array.isArray(fieldValue)) {
      fieldValue = fieldValue
        .map((value) => _get(value, this.vocabularyValueField))
        .join(` ${this.operator} `);
    } else {
      fieldValue = _get(fieldValue, this.vocabularyValueField);
    }

    return `${metadataField}:(${fieldValue})`;
  }

  serialize(values) {
    const serializedValue = this.serializeVocabularyValues(
      values,
      this.storageField,
      this.metadataField
    );

    return {
      type: this.type,
      value: serializedValue,
    };
  }
}
