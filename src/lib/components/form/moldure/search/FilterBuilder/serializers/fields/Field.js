/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

/**
 * Field base class. A field is a value defined in a form with a serialized representation.
 *
 * About the types:
 *  A Field can have a type. This type is used to represent where the
 *  field will be used during the search. For this purpose, two types can be used:
 *    - `arg` (For field used as arguments of the `Query` q parameter, in the search URL);
 *    - `param` (For field used to define a new URL param, in the search URL).
 */
export class Field {
  // Type of the field.
  // Can be defined as `arg` (Query `q` arguments) or `param` (URL parameter).
  type = null;

  /**
   * @constructor
   *
   * @param {String} type Type of the field
   * @param {String} storageField Path in the storage (e.g., Formik) where the field is defined.
   */
  constructor(type, storageField) {
    this.type = type;
    this.storageField = storageField;
  }

  /**
   * Serialize the field values.
   * @param {Object} values Values to be serialized.
   */
  serialize(values) {
    throw new Error('Not implemented');
  }
}
