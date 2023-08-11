/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';
import ReactDOM from 'react-dom';

import App from './demos/App';

// Base theme
import 'semantic-ui-css/semantic.min.css';
import 'react-lazy-load-image-component/src/effects/blur.css';

// Leaflet
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fullscreen
import 'leaflet.fullscreen';
import 'leaflet.fullscreen/Control.FullScreen.css';

// Geocoding controller
import 'leaflet-control-geocoder/dist/Control.Geocoder.js';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';

// Geometry editor
import '@geoman-io/leaflet-geoman-free';
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';

// React slick
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

ReactDOM.render(<App />, document.getElementById('root'));
