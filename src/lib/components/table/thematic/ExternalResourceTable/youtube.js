/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022-2024 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { useState } from 'react';
import _isEmpty from 'lodash/isEmpty';

import {
  Modal,
  ModalHeader,
  Button,
  Icon,
  Embed,
  Container,
} from 'semantic-ui-react';

import './youtube.css';

/**
 * Get Video ID from a YouTube URL
 * @param url {string} YouTube URL.
 * @returns {*|null}
 */
export const getYouTubeVideoIdFromUrl = (url) => {
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);

  if (match && match[2].length === 11) {
    return match[2];
  } else {
    return null;
  }
};

/**
 * Check if a given URL is from YouTube.
 * @param url {string} URL to be verified.
 * @returns {boolean} Flag indicating if the given link is from YouTube.
 */
export const isUrlFromYouTube = (url) => {
  // Regular expression to match YouTube URL patterns
  const youtubePattern =
    /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)/;
  return youtubePattern.test(url);
};

/**
 * YouTube video viewer component.
 * @param videoId {string} YouTube video ID.
 */
const YouTubeVideo = ({ videoId }) => {
  return (
    <div>
      <Embed
        id={videoId}
        placeholder={`https://img.youtube.com/vi/${videoId}/0.jpg`}
        source="youtube"
        iframe={{
          allowfullscreen: 'allowfullscreen',
        }}
        hd={true}
        className={'youtube-embed'}
      />
    </div>
  );
};

/**
 * YouTube viewer component.
 * @param url {string} YouTube video URL.
 * @param buttonProps {object} Button UI properties.
 */
export const YouTubeViewer = ({ url, ...buttonProps }) => {
  const [open, setOpen] = useState(false);

  // Extracting video id
  const videoId = getYouTubeVideoIdFromUrl(url);

  // Define trigger button
  const isUsingCustomProps = !_isEmpty(buttonProps);

  const triggerBasic = <Button as={'a'} size={'mini'} {...buttonProps} />;

  const triggerWithAnimation = (
    <Button animated as={'a'} size={'mini'}>
      <Button.Content visible>
        <Icon name={'youtube'} />
      </Button.Content>
      <Button.Content hidden>Watch</Button.Content>
    </Button>
  );

  const triggerButton = isUsingCustomProps
    ? triggerBasic
    : triggerWithAnimation;

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={triggerButton}
      size={'large'}
      dimmer={'blurring'}
      closeIcon
      closeOnEscape
      closeOnDimmerClick={false}
    >
      <ModalHeader>Youtube viewer</ModalHeader>
      <Container className={'youtube-embed-container'}>
        {videoId ? (
          <YouTubeVideo videoId={videoId} />
        ) : (
          <p>Invalid YouTube link</p>
        )}
      </Container>
    </Modal>
  );
};
