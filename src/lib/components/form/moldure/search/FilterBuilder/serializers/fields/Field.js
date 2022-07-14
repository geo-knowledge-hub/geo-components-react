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

  // Name of the field in the query string.
  name = null;

  /**
   * @constructor
   *
   * @param {String} type Type of the field
   * @param {String} name Name of the field in the query string.
   * @param {String} storageField Path in the storage (e.g., Formik) where the field is defined.
   */
  constructor(type, storageField, name) {
    this.type = type;
    this.name = name;
    this.storageField = storageField;
  }

  /**
   * Field value generator. This is the default method used to generate the
   * value of the fields.
   *
   * @param {Object} value Value to be returned as part of the Field.
   * @returns {{name: String, type: null, value}}
   */
  generateValue(value) {
    return {
      type: this.type,
      name: this.name,
      value: value,
    };
  }

  /**
   * Serialize the field values.
   * @param {Object} values Values to be serialized.
   * @returns {{name: String, type: null, value}}
   */
  serialize(values) {
    throw new Error('Not implemented');
  }
}
