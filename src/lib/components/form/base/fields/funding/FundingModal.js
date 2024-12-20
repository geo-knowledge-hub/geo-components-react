// This file is part of React-Invenio-Deposit
// Copyright (C) 2021-2022 CERN.
// Copyright (C) 2021 Northwestern University.
//
// React-Invenio-Deposit is free software; you can redistribute it and/or modify it
// under the terms of the MIT License; see LICENSE file for more details.

import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { i18next } from '@translations/i18next';

import _get from 'lodash/get';

import { Formik } from 'formik';

import {
  EmptyResults,
  Error,
  InvenioSearchApi,
  Pagination,
  ReactSearchKit,
  ResultsLoader,
  SearchBar,
} from 'react-searchkit';

import { Grid, Modal, Container, Button } from 'semantic-ui-react';
import * as Yup from 'yup';

import { AwardResults } from './AwardResults';
import CustomAwardForm from './CustomAwardForm';
import { FunderDropdown } from './FunderDropdown';
import { NoAwardResults } from './NoAwardResults';

import { EUFundingModal } from './EUFundingModal';
import { isEUFunder } from './EUFundingModalData';

const ModalTypes = {
  STANDARD: 'standard',
  CUSTOM: 'custom',
};

const ModalActions = {
  ADD: 'add',
  EDIT: 'edit',
};

const StandardSchema = Yup.object().shape({
  selectedFunding: Yup.object().shape({
    funder: Yup.object().shape({
      id: Yup.string().required(),
    }),
    award: Yup.object().shape({
      id: Yup.string().required(),
      icon: Yup.string(),
      disclaimer: Yup.string(),
    }),
  }),
});

const CustomFundingSchema = Yup.object().shape({
  selectedFunding: Yup.object().shape({
    funder: Yup.object().shape({
      id: Yup.string().required(i18next.t('Funder is required.')),
    }),
    award: Yup.object().shape({
      title: Yup.string().test({
        name: 'testTitle',
        message: i18next.t('Title must be set alongside number.'),
        test: function testTitle(value) {
          const { number } = this.parent;

          if (number && !value) {
            return false;
          }

          return true;
        },
      }),
      number: Yup.string().test({
        name: 'testNumber',
        message: i18next.t('Number must be set alongside title.'),
        test: function testNumber(value) {
          const { title } = this.parent;

          if (title && !value) {
            return false;
          }

          return true;
        },
      }),
      url: Yup.string()
        .url(i18next.t('URL must be valid.'))
        .test({
          name: 'validateUrlDependencies',
          message: i18next.t('URL must be set alongside title and number.'),
          test: function testUrl(value) {
            const { title, number } = this.parent;

            if (value && value !== '' && !title && !number) {
              return false;
            }

            return true;
          },
        }),
      icon: Yup.string(),
      disclaimer: Yup.string(),
    }),
  }),
});

/**
 * Funding Modal component.
 */
function FundingModal({
  action,
  mode: initialMode,
  trigger,
  onAwardChange,
  searchConfig,
  deserializeAward,
  deserializeFunder,
  computeFundingContents,
  extraConfig,
  ...props
}) {
  const [open, setOpen] = useState(false);
  const [isEUModalOpen, setEUModalIsOpen] = useState(false);

  const [mode, setMode] = useState(initialMode);
  const openModal = () => setOpen(true);
  const closeModal = () => {
    setMode(initialMode);
    setOpen(false);
  };
  const onSubmit = (values, formikBag) => {
    formikBag.setSubmitting(false);
    formikBag.resetForm();
    setMode(initialMode);
    closeModal();
    onAwardChange(values.selectedFunding);
  };

  const searchApi = new InvenioSearchApi(searchConfig.searchApi);
  const customObject = mode === ModalTypes.CUSTOM ? props.initialFunding : {};
  const initialFunding = {
    selectedFunding: action === ModalActions.EDIT ? customObject : {},
  };

  const FundingSchema =
    mode === ModalTypes.CUSTOM ? CustomFundingSchema : StandardSchema;

  return (
    <Formik
      initialValues={initialFunding}
      onSubmit={onSubmit}
      validationSchema={FundingSchema}
      validateOnChange={false}
      validateOnBlur={false}
      enableReinitialize
    >
      {({ values, resetForm, handleSubmit }) => (
        <Modal
          role="dialog"
          centered={false}
          onOpen={openModal}
          open={open}
          trigger={React.cloneElement(trigger, {
            'aria-expanded': open,
            'aria-haspopup': 'dialog',
          })}
          onClose={closeModal}
          closeIcon
          closeOnDimmerClick={false}
        >
          <Modal.Header as="h2" className="pt-10 pb-10">
            {mode === 'standard'
              ? i18next.t('Add standard award')
              : i18next.t('Add custom award')}
          </Modal.Header>
          <Modal.Content>
            {mode === ModalTypes.STANDARD && (
              <ReactSearchKit
                searchApi={searchApi}
                appName="awards"
                urlHandlerApi={{ enabled: false }}
                initialQueryState={searchConfig.initialQueryState}
              >
                <Grid className="m-0">
                  <Grid.Row>
                    <Grid.Column
                      width={11}
                      floated="left"
                      verticalAlign="middle"
                    >
                      <SearchBar
                        placeholder={i18next.t('Search for awards')}
                        autofocus
                        actionProps={{
                          icon: 'search',
                          content: null,
                          className: 'search',
                        }}
                      />
                    </Grid.Column>
                    <Grid.Column width={5} floated="right" textAlign="right">
                      <FunderDropdown />
                    </Grid.Column>
                  </Grid.Row>

                  <Grid.Column width={16} className="pb-0">
                    <ResultsLoader>
                      <EmptyResults />
                      <Error />
                      <AwardResults
                        deserializeAward={deserializeAward}
                        deserializeFunder={deserializeFunder}
                        computeFundingContents={computeFundingContents}
                      />
                    </ResultsLoader>
                    <Container textAlign="center" className="rel-mb-1">
                      <Pagination />
                    </Container>
                  </Grid.Column>

                  <Grid.Column
                    width={16}
                    textAlign="center"
                    className="pt-0 pb-0"
                  >
                    <NoAwardResults
                      switchToCustom={() => {
                        resetForm();
                        setMode(ModalTypes.CUSTOM);
                      }}
                    />
                  </Grid.Column>
                </Grid>
              </ReactSearchKit>
            )}
            {mode === ModalTypes.CUSTOM && (
              <CustomAwardForm
                deserializeFunder={deserializeFunder}
                selectedFunding={values.selectedFunding}
              />
            )}
          </Modal.Content>
          <Modal.Actions>
            <Button
              onClick={() => {
                resetForm();
                closeModal();
              }}
              icon="remove"
              content={i18next.t('Cancel')}
              floated="left"
            />
            <Button
              onClick={(event) => {
                // Extract Funder ID
                const funderId = _get(values, 'selectedFunding.funder.id');

                // Get valid funder IDs
                const validFunderIds = _get(extraConfig, 'eu-funder-ids', []);

                // Special case: For EU-related projects, it is required to
                // show a modal to include funding disclaimer and icon
                if (isEUFunder(funderId, validFunderIds)) {
                  // submit handling is done in the specialized modal.
                  setEUModalIsOpen(true);
                } else {
                  handleSubmit(event);
                }
              }}
              primary
              icon="checkmark"
              content={
                action === ModalActions.ADD
                  ? i18next.t('Add award')
                  : i18next.t('Change award')
              }
            />
          </Modal.Actions>

          <EUFundingModal
            isOpen={isEUModalOpen}
            setIsOpen={setEUModalIsOpen}
            handleSubmit={handleSubmit}
            extraConfig={extraConfig}
          />
        </Modal>
      )}
    </Formik>
  );
}

FundingModal.propTypes = {
  mode: PropTypes.oneOf(['standard', 'custom']).isRequired,
  action: PropTypes.oneOf(['add', 'edit']).isRequired,
  trigger: PropTypes.object.isRequired,
  onAwardChange: PropTypes.func.isRequired,
  searchConfig: PropTypes.shape({
    searchApi: PropTypes.shape({
      axios: PropTypes.shape({
        headers: PropTypes.object,
      }),
    }).isRequired,
    initialQueryState: PropTypes.object.isRequired,
  }).isRequired,
  deserializeAward: PropTypes.func.isRequired,
  deserializeFunder: PropTypes.func.isRequired,
  computeFundingContents: PropTypes.func.isRequired,
  initialFunding: PropTypes.object,
};

FundingModal.defaultProps = {
  initialFunding: undefined,
};

export default FundingModal;
