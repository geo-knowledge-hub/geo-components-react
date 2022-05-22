/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';

import { Segment, Sidebar } from 'semantic-ui-react';

/**
 * Segment Sidebar component.
 */
export const SegmentSidebar = ({ children, ...props }) => (
  <Sidebar as={Segment} {...props}>
    {children}
  </Sidebar>
);
