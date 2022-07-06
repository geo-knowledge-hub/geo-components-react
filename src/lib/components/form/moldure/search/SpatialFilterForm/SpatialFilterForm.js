/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';
import PropTypes from 'prop-types';

import { MapContainer } from 'react-leaflet';
import {
  BaseMapLayers,
  GeometryEditorControl,
} from '@geo-knowledge-hub/invenio-geographic-components-react';

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
 * @param fieldsConfig
 * @returns {JSX.Element}
 */
export const SpatialFilterForm = ({ mapConfig }) => {
  return (
    <MapContainer {...mapConfig.mapContainer}>
      <BaseMapLayers {...mapConfig.baseMapLayers} />
      <GeometryEditorControl {...mapConfig.editor} />
    </MapContainer>
  );
};

SpatialFilterForm.propTypes = {
  mapConfig: PropTypes.shape({
    mapContainer: PropTypes.object.isRequired,
    baseMapLayers: PropTypes.object,
    editor: PropTypes.object,
  }).isRequired,
};

SpatialFilterForm.defaultProps = {
  mapConfig: {
    mapContainer: {
      center: [30, -50],
      zoom: 1,
      zoomControl: true,
    },
  },
};
