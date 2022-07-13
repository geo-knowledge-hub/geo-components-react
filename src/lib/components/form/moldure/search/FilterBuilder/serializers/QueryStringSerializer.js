/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

/**
 * Query String serializer.
 */
export class QueryStringSerializer {
  /**
   * @constructor
   */
  constructor() {
    if (this.constructor === QueryStringSerializer) {
      throw new Error('Abstract');
    }
  }

  /**
   * Serialize fields values.
   * @param {String} values Fields values to be serialized.
   */
  serialize(values) {
    throw new Error('Not implemented.');
  }
}
