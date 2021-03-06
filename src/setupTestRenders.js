/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';
import { render } from '@testing-library/react';

import { Formik } from 'formik';
import { ThemeProvider } from '@emotion/react';
import { CarouselProvider } from 'pure-react-carousel';

/**
 * Required libraries
 */

// Base theme
import 'semantic-ui-css/semantic.min.css';
import 'pure-react-carousel/dist/react-carousel.es.css';
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
 * Constants
 */
const DEFAULT_THEME_OBJECT = {
  theme: {},
};

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
  ({ children }) =>
    (
      <ContextProviderComponent {...options}>
        {children}
      </ContextProviderComponent>
    );

/**
 * @name wrapperGlobalThemeProvider
 * @description This wrapper functions generate a customizable theme provider
 *              to be used with the ``testing-library`` ``render`` function.
 *
 * @param object options object for the global theme provider.
 *
 * @returns function callback to wrap the Rendered component.
 */
const wrapperGlobalThemeProvider =
  (options) =>
  ({ children }) =>
    <ThemeProvider {...options.themeProvider}>{children}</ThemeProvider>;

/**
 * @name wrapperGlobalCarouselProvider
 * @description This wrapper functions generate a customizable carousel provider
 *              to be used with the ``testing-library`` ``render``function.
 *
 * @param object options object for the global carousel provider
 *
 * @returns function callback to wrap the Rendered component.
 */
const wrapperGlobalCarouselProvider =
  (options) =>
  ({ children }) =>
    (
      <ThemeProvider {...options.themeProvider}>
        <CarouselProvider {...options.carouselProvider}>
          {children}
        </CarouselProvider>
      </ThemeProvider>
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
  ({ children }) =>
    <Formik {...options}>{children}</Formik>;

/**
 * @name customThemeRender
 * @description Custom render method for the ``testing-library``.
 */
const customThemeRender = (
  ui,
  contextOptions = { themeProvider: DEFAULT_THEME_OBJECT },
  renderOptions = {}
) =>
  render(ui, {
    wrapper: wrapperGlobalThemeProvider(contextOptions),
    ...renderOptions,
  });

/**
 * @name customCarouselRender
 * @description Custom render method for the ``testing-library``
 */
const customCarouselRender = (
  ui,
  contextOptions = { themeProvider: DEFAULT_THEME_OBJECT },
  renderOptions = {}
) =>
  render(ui, {
    wrapper: wrapperGlobalCarouselProvider(contextOptions),
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
  customThemeRender as renderWithThemeProvider,
  customContextRender as renderWithCustomContext,
  customCarouselRender as renderWithCarouselProvider,
  customFormikRender as renderWithFormikProvider,
};
