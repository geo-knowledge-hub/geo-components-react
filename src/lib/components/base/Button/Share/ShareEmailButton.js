/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';

import { EmailIcon, EmailShareButton } from 'react-share';

/**
 * Email Share Button
 */
export const ShareEmailButton = ({
  resourceType,
  resourceDescription,
  resourceIcon,
  resourceTitle,
  resourceUrl,
  ...iconProps
}) => (
  <EmailShareButton
    url={`\n${resourceUrl}\n`}
    body={resourceDescription}
    title={`(${resourceType} ${resourceIcon}) ${resourceTitle}\n`}
  >
    <EmailIcon {...iconProps} />
  </EmailShareButton>
);
