/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import _compact from 'lodash/compact';

import { isEmpty } from '../utils';
import { VocabularyField } from './VocabularyField';

/**
 * MultiVocabulary field where multiple `metadataField` can be defined.
 */
export class MultiVocabularyField extends VocabularyField {
  serialize(values) {
    let serializedValue = this.metadataField.map((metadataFieldValue) => {
      const queryValue = this.serializeVocabularyValues(
        values,
        this.storageField,
        metadataFieldValue
      );

      return !isEmpty(queryValue) ? `(${queryValue})` : null;
    });

    serializedValue = _compact(serializedValue) || [];
    serializedValue = serializedValue.join(' OR ');

    if (isEmpty(serializedValue)) {
      return null;
    }

    return {
      type: this.type,
      value: `(${serializedValue})`,
    };
  }
}
