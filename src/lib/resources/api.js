/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022-2023 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import axios from 'axios';

//
// Constants
//
const GKHUB_BASE_HEADERS = {
  json: { 'Content-Type': 'application/json' },
  'vnd+json': {
    'Content-Type': 'application/json',
    Accept: 'application/vnd.inveniordm.v1+json',
  },
  'octet-stream': { 'Content-Type': 'application/octet-stream' },
};

const GKHUB_API_CONFIG_DEFAULT = {
  withCredentials: true,
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFToken',
  headers: GKHUB_BASE_HEADERS.json,
};

const CMS_BASE_HEADERS = {
  json: { 'Content-Type': 'application/json' },
};

const CMS_API_CONFIG_DEFAULT = {
  headers: CMS_BASE_HEADERS.json,
  baseUrl: process.env.CMS_BASE_URL,
};

export const httpFactory = (axiosConfig) => {
  return axios.create(axiosConfig);
};

export const gkhubClient = httpFactory(GKHUB_API_CONFIG_DEFAULT);
export const cmsClient = httpFactory(CMS_API_CONFIG_DEFAULT);
