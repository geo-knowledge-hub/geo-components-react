/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';

import { TwitterShareButton, TwitterIcon } from 'react-share';

/**
 * Twitter Share Button
 */
export const ShareTwitterButton = ({
  resourceType,
  resourceIcon,
  resourceTitle,
  resourceUrl,
  hashtags,
  relatedTo,
  ...iconProps
}) => (
  <TwitterShareButton
    title={`(${resourceType} ${resourceIcon}) ${resourceTitle}\n`}
    hashtags={hashtags}
    url={`\n${resourceUrl}\n`}
    related={relatedTo}
  >
    <TwitterIcon {...iconProps} />
  </TwitterShareButton>
);
