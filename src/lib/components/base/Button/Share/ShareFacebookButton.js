/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';

import { FacebookShareButton, FacebookIcon } from 'react-share';

/**
 * Twitter Share Button
 */
export const ShareFacebookButton = ({
  resourceType,
  resourceIcon,
  resourceTitle,
  resourceUrl,
  ...iconProps
}) => (
  <FacebookShareButton
    quote={`(${resourceType} ${resourceIcon}) ${resourceTitle}\n`}
    url={`\n${resourceUrl}\n`}
  >
    <FacebookIcon {...iconProps} />
  </FacebookShareButton>
);
