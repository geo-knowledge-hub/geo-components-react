/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';
import { render } from '@testing-library/react';

import { ThemeProvider } from '@emotion/react';
import { CarouselProvider } from 'pure-react-carousel';

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
};
