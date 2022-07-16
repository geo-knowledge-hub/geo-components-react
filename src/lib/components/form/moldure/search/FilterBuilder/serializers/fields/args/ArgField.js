/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import { Field } from '../internal';

/**
 * Base `arg` field value.
 */
export class ArgField extends Field {
  constructor(storageField, metadataField, operator) {
    super('args', storageField, 'q');

    this.metadataField = metadataField;
    this.operator = operator;
  }
}
