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
 * Base Layers config
 */
const FormTilesConfig = [
  {
    baseLayer: {
      checked: true,
      name: 'Esri World Street Map',
    },
    tileLayer: {
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
      attribution:
        'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012',
    },
  },
  {
    baseLayer: {
      name: 'Open Street Map',
    },
    tileLayer: {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors",
      maxNativeZoom: 19,
    },
  },
  {
    baseLayer: {
      name: 'Esri World Imagery',
    },
    tileLayer: {
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      attribution:
        'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
    },
  },
  {
    baseLayer: {
      name: 'OpenTopoMap',
    },
    tileLayer: {
      url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
      maxZoom: 17,
      attribution:
        'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
    },
  },
];

/**
 * Basic Spatial form to create filter components.
 * @constructor
 *
 * @param {String} fieldPathPrefix Prefix used in the storage to store the field values.
 * @param {Object} mapConfig Configuration object for the `invenio-geographic-components-react`
 *                           used in the form which includes:
 *                                - BaseMapLayers (key: `baseMapLayers`)
 *                                - GeometryEditorControl (key: `editor`)
 *                           Also, the user must provide an object inside the
 *                           `mapContainer` property. This configuration will be
 *                           used to define the initial properties of the Leaflet
 *                           Map Container like initial `center position` and `zoom`
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
          tileLayersConfig: {
            tileLayers: FormTilesConfig,
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
              drawMarker: false,
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
