/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import _get from 'lodash/get';

import { isEmpty } from '../toolbox';
import { ArgField } from './ArgField';

/**
 * Basic argument Field. This class is used to represent fields with non-complex values (e.g., String).
 */
export class ValueField extends ArgField {
  serialize(values) {
    let fieldValue = _get(values, this.storageField, null);

    if (isEmpty(fieldValue)) {
      return null;
    }

    // extracting the values
    if (Array.isArray(fieldValue)) {
      fieldValue = fieldValue
        .map((obj) => obj.value || obj)
        .join(` ${this.operator} `);
    }

    return this.generateValue(`${this.metadataField}:(${fieldValue})`);
  }
}
