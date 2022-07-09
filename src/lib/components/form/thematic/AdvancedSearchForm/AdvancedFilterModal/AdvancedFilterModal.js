/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Formik } from 'formik';

import { Button, Form, Modal } from 'semantic-ui-react';

import { i18next } from '@translations/i18next';
import { AdvancedFilterTabs } from './AdvancedFilterTabs';

/**
 * Advanced Filter modal component.
 * @constructor
 *
 * @param {String} modalTitle Modal title
 * @param {React.ReactNode} modalTrigger Element to be rendered in-place where the modal is defined.
 * @param {Object} formInitialValues Initial values for the Formik Form.
 * @param {Function} formOnApplyFilter Function to be called when the filters are defined.
 * @returns {JSX.Element}
 */
export const AdvancedFilterModal = ({
  modalTitle,
  modalTrigger,
  formInitialValues,
  formOnApplyFilter,
}) => {
  // States
  const [modalOpen, setModalOpen] = useState(false);
  const [filterBuilderEnabled, setFilterBuilderEnabled] = useState(false);

  // Auxiliary functions
  const enableFilterBuilder = () => setFilterBuilderEnabled(true);
  const disableFilterBuilder = () => setFilterBuilderEnabled(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <Formik initialValues={formInitialValues} onSubmit={() => {}}>
      {({ values, errors, handleSubmit, isSubmitting }) => (
        <Modal
          open={modalOpen}
          onOpen={openModal}
          onClose={closeModal}
          trigger={modalTrigger}
        >
          <Modal.Header>{modalTitle}</Modal.Header>
          <Modal.Content>
            <Form onSubmit={handleSubmit}>
              <AdvancedFilterTabs />
            </Form>
          </Modal.Content>
          <Modal.Actions>
            {filterBuilderEnabled ? (
              <Button
                name={'enableFilter'}
                onClick={disableFilterBuilder}
                icon={'cogs'}
                content={i18next.t('Basic filters')}
                floated={'left'}
              />
            ) : (
              <Button
                name={'disableFilter'}
                onClick={enableFilterBuilder}
                icon={'cogs'}
                content={i18next.t('Filter builder')}
                floated={'left'}
                disabled={true}
              />
            )}
            <Button color="gray">{i18next.t('Cancel')}</Button>
            <Button
              content={i18next.t('Use filters')}
              labelPosition={'right'}
              icon={'checkmark'}
              type={'submit'}
              onClick={() => {
                closeModal();
                formOnApplyFilter(values);
              }}
              positive
            />
          </Modal.Actions>
        </Modal>
      )}
    </Formik>
  );
};

AdvancedFilterModal.propTypes = {
  modalTitle: PropTypes.string.isRequired,
  modalTrigger: PropTypes.node.isRequired,
  formInitialValues: PropTypes.object,
  formOnApplyFilter: PropTypes.func.isRequired,
};

AdvancedFilterModal.defaultProps = {
  modalTitle: i18next.t('Search filter'),
  formInitialValues: {},
};
