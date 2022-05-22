/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';

import { useContext } from 'react';

import { Pagination as PaginationComponent } from 'semantic-ui-react';

import { IndexContext } from '../IndexContext';

/**
 * Pagination component.
 */
export const Pagination = () => {
  // getting data
  const indexContext = useContext(IndexContext);
  const { status, setPagionationPage } = indexContext.searchContext.pagination;

  return (
    <>
      {status.totalItems > 1 && (
        <div>
          <PaginationComponent
            activePage={status.currentPage}
            totalPages={status.totalPages}
            siblingRange={2}
            boundaryRange={0}
            firstItem={null}
            lastItem={null}
            size={'mini'}
            onPageChange={(_, data) => {
              // setting current pagination
              setPagionationPage(data.activePage);
            }}
          />
        </div>
      )}
    </>
  );
};
