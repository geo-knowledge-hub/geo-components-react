/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import { Field } from '../internal';

/**
 * Base `param` field value.
 */
export class ParamField extends Field {
  constructor(storageField, parameterName) {
    super('param', storageField);

    this.parameterName = parameterName;
  }
}
