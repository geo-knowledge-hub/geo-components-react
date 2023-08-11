/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022-2023 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';
import { render } from '@testing-library/react';

import { Formik } from 'formik';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

/**
 * Required libraries
 */

// Base theme
import 'semantic-ui-css/semantic.min.css';
import 'react-lazy-load-image-component/src/effects/blur.css';

// Leaflet
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fullscreen
import 'leaflet.fullscreen';

// Geocoding controller
import 'leaflet-control-geocoder/dist/Control.Geocoder.js';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';

// Geometry editor
import '@geoman-io/leaflet-geoman-free';
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';

/**
 * @name wrapperGenericContextProvider
 * @description This wrapper functions generate a customizable and generic
 *              context provider.
 *
 * @param object options object to customize the context provider.
 * @param object contextProvider component.
 *
 * @returns function callback to wrap the Rendered component.
 */
const wrapperGenericContextProvider =
  (ContextProviderComponent, options) =>
  ({ children }) => (
    <ContextProviderComponent {...options}>{children}</ContextProviderComponent>
  );

/**
 * @name const wrapperGlobalQueryProvider
 * @description This wrapper functions generate a ``react-query`` query provider
 *              to be used with the ``testing-library`` ``render`` function.
 *
 * @param object options object for the global query provider.
 *
 * @returns function callback to wrap the Rendered component.
 */
const wrapperGlobalQueryProvider =
  (options) =>
  ({ children }) => (
    <QueryClientProvider client={new QueryClient()}>
      {children}
    </QueryClientProvider>
  );

/**
 * @name wrapperFormikProvider
 *
 * @description Wrapper for custom formik render.
 *
 * This wrapper functions generate a customizable ``Formik`` context provider
 * to be used with the ``testing-library`` ``render`` function.
 *
 * @param {Object} options object for the ``Formik`` context provider.
 *
 * @returns function callback to wrap the Rendered component.
 */
const wrapperFormikProvider =
  (options) =>
  ({ children }) => <Formik {...options}>{children}</Formik>;

/**
 * @name customQueryContextRender
 * @description Custom render method for the ``testing-library``.
 */
const customQueryContextRender = (
  ui,
  contextOptions = {},
  renderOptions = {}
) =>
  render(ui, {
    wrapper: wrapperGlobalQueryProvider(contextOptions),
    ...renderOptions,
  });

/**
 * @name customFormikRender
 * @description Custom render method for the ``testing-library``
 */
const customFormikRender = (ui, formikOptions = {}, renderOptions = {}) =>
  render(ui, {
    wrapper: wrapperFormikProvider(formikOptions),
    ...renderOptions,
  });

/**
 * @name customContextRender
 * @description Custom render method for the ``testing-library``
 */
const customContextRender = (
  ui,
  ContextProviderComponent,
  contextProviderOptions = {},
  renderOptions = {}
) => {
  render(ui, {
    wrapper: wrapperGenericContextProvider(
      ContextProviderComponent,
      contextProviderOptions
    ),
    ...renderOptions,
  });
};

export * from '@testing-library/react';
export {
  render as render,
  customContextRender as renderWithCustomContext,
  customFormikRender as renderWithFormikProvider,
  customQueryContextRender as renderWithQueryContext,
};
