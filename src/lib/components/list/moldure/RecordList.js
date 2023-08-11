/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022-2023 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from 'react';
import PropTypes from 'prop-types';

import { RecordItem } from '../base/RecordItem';

import './RecordList.css';

export const RecordList = ({ records }) => {
  return (
    <div className="record-list">
      {records.map((record, index) => (
        <RecordItem key={index} recordData={record} />
      ))}
    </div>
  );
};

RecordList.propTypes = {
  records: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      authors: PropTypes.arrayOf(PropTypes.string).isRequired,
      initiative: PropTypes.string,
      date: PropTypes.string.isRequired,
    })
  ).isRequired,
};
