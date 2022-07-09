/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';
import PropTypes from 'prop-types';

import { GeometryField } from '@geo-knowledge-hub/invenio-geographic-components-react';

/**
 * Basic Spatial form to create filter components.
 * @constructor
 *
 * @param {Object} mapConfig Configuration object for the `invenio-geographic-components-react`
 *                           used in the form which includes:
 *                                - BaseMapLayers (key: `baseMapLayers`)
 *                                - GeometryEditorControl (key: `editor`)
 *                           Also, the user must provide an object inside the
 *                           `mapContainer` property. This configuration will be
 *                           used to define the initial properties of the Leaflet
 *                           Map Container like initial `center position` and `zoom`
 * @param fieldConfig
 * @returns {JSX.Element}
 */
export const SpatialFilterForm = ({ fieldPathPrefix, ...fieldConfig }) => {
  // Defining the geometry field path (Customizable)
  const fieldPath = `${fieldPathPrefix}.geometry`;

  return (
    <GeometryField
      fieldPath={fieldPath}
      menu={false}
      interactiveMapConfig={{
        mapConfig: {
          mapContainer: {
            center: [30, -50],
            zoom: 1,
            zoomControl: true,
          },
          geometryEditorConfig: {
            toolbarConfig: {
              positions: {
                draw: 'topleft',
                edit: 'topright',
              },
              drawText: false,
              drawCircleMarker: false,
              drawCircle: false,
              drawPolyline: false,
              drawPolygon: false,
              cutPolygon: false,
              controlOrder: [
                'drawMarker',
                'drawRectangle',
                'editMode',
                'dragMode',
                'rotateMode',
                'removalMode',
              ],
            },
          },
        },
      }}
      {...fieldConfig}
    />
  );
};

SpatialFilterForm.propTypes = {
  fieldPathPrefix: PropTypes.string.isRequired,
  fieldConfig: PropTypes.object,
};

SpatialFilterForm.defaultProps = {
  fieldPathPrefix: 'form',
  fieldConfig: {},
};
