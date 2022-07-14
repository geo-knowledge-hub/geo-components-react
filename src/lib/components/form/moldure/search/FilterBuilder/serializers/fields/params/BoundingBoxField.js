/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import _get from 'lodash/get';

import bbox from '@turf/bbox';
import bboxPolygon from '@turf/bbox-polygon';

import { isEmpty } from '../toolbox';
import { ParamField } from './ParamField';

/**
 * Bounding box field filter. This field is used to serialize a `geometry` (GeoJSON compatible)
 * into a Bounding Box filter in the URL.
 */
export class BoundingBoxField extends ParamField {
  constructor(storageField, parameterName) {
    super(storageField, 'filter', parameterName);
  }

  serialize(values) {
    let fieldValue = _get(values, this.storageField, null);

    if (isEmpty(fieldValue)) {
      return null;
    }

    // Parsing the geometry.
    // Creating a valid feature with the geometry.
    const feature = {
      type: 'Feature',
      geometry: fieldValue,
    };

    // Generating the bounding box
    const geometryBoundingBox = bbox(feature);
    const geometryBboxPolygon = bboxPolygon(geometryBoundingBox);

    // Extracting the values from the bbox polygon to generate
    // the `TopLeft`, `BottomRight` bbox (elasticsearch pattern).
    const topLeftCoords = geometryBboxPolygon.geometry.coordinates[0][3];
    const bottomRightCoords = geometryBboxPolygon.geometry.coordinates[0][1];

    const bboxValue = [...topLeftCoords, ...bottomRightCoords];

    // Producing the result.
    return this.generateValue(`${this.parameterName}:${bboxValue}`);
  }
}
