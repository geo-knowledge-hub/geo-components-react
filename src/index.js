/*
 * This file is part of GEO-Labels-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Labels-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';
import ReactDOM from 'react-dom';

import App from './demos/App';

import 'glider-js/glider.min.css';
import 'semantic-ui-css/semantic.min.css';
import 'pure-react-carousel/dist/react-carousel.es.css';

ReactDOM.render(<App />, document.getElementById('root'));
