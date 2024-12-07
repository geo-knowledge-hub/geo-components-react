// This file is part of React-Invenio-Deposit
// Copyright (C) 2021 CERN.
// Copyright (C) 2021 Northwestern University.
//
// React-Invenio-Deposit is free software; you can redistribute it and/or modify it
// under the terms of the MIT License; see LICENSE file for more details.

import React, { useState } from 'react';
import PropTypes from 'prop-types';

import _get from 'lodash/get';

import { Button, Grid, Image, Modal, List, Segment } from 'semantic-ui-react';

import { Field } from 'formik';
import { FieldLabel, RichInputField } from 'react-invenio-forms';

/**
 * EU logo selector.
 * @param fieldPath {string} Field path.
 * @param label {string} Field label.
 * @param labelIcon {string} Field icon.
 * @param required {bool} Flag indicating if the field is required.
 * @param options {list} List of options to be displayed.
 * @constructor
 */
const EUFundingLogoSelector = ({
  fieldPath,
  label,
  labelIcon,
  required,
  options,
}) => {
  {
    const [selectedLogo, setSelectedLogo] = useState({});

    const handleSelect = (logo) => {
      setSelectedLogo(logo);
    };

    return (
      <Field name={fieldPath}>
        {({ form }) => {
          return (
            <div style={{ marginTop: '20px' }}>
              <FieldLabel htmlFor={fieldPath} icon={labelIcon} label={label} />
              <Grid columns={2} stackable>
                <Grid.Row>
                  {/* List Box */}
                  <Grid.Column width={9}>
                    <Segment
                      style={{
                        height: '200px',
                        overflowY: 'auto',
                        padding: '0.3em',
                      }}
                    >
                      <List selection divided relaxed>
                        {options.map((item) => (
                          <List.Item
                            key={item.id}
                            active={selectedLogo.id === item.id}
                            onClick={() => {
                              handleSelect(item);
                              form.setFieldValue(fieldPath, item.id);
                            }}
                            style={{
                              padding: '10px',
                              cursor: 'pointer',
                            }}
                          >
                            <div>
                              <List.Content>
                                <List.Header>{item.text}</List.Header>
                                <List.Description style={{ color: 'gray' }}>
                                  Programme: {item.programme}
                                </List.Description>
                              </List.Content>
                            </div>
                          </List.Item>
                        ))}
                      </List>
                    </Segment>
                  </Grid.Column>

                  {/* Image Display */}
                  <Grid.Column width={7} textAlign="center">
                    <Segment
                      style={{
                        height: '200px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {selectedLogo ? (
                        <Image
                          src={selectedLogo.logo}
                          style={{
                            maxWidth: '100%',
                            maxHeight: '100%',
                            objectFit: 'contain',
                          }}
                        />
                      ) : (
                        <p>Select an option to display the EU Emblem</p>
                      )}
                    </Segment>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </div>
          );
        }}
      </Field>
    );
  }
};

EUFundingLogoSelector.propTypes = {
  fieldPath: PropTypes.string.isRequired,
  label: PropTypes.string,
  labelIcon: PropTypes.string,
  required: PropTypes.bool,
  options: PropTypes.array.isRequired,
};

EUFundingLogoSelector.defaultProps = {
  fieldPath: 'selectedFunding.award.icon',
  label: 'EU Funding Emblem',
  labelIcon: 'image',
  required: true,
};

/**
 * EU Funding statement.
 * @param fieldPath {string} Field path.
 * @param label {string} Field label.
 * @param labelIcon {string} Field icon.
 * @param required {bool} Flag indicating if the field is required.
 * @constructor
 */
export const EUFundingStatement = ({
  fieldPath,
  label,
  labelIcon,
  required,
}) => {
  return (
    <RichInputField
      className="description-field rel-mb-1"
      fieldPath={fieldPath}
      label={<FieldLabel htmlFor={fieldPath} icon={labelIcon} label={label} />}
      required={required}
      optimized
      editorConfig={{
        removePlugins: [
          'Image',
          'ImageCaption',
          'ImageStyle',
          'ImageToolbar',
          'ImageUpload',
          'MediaEmbed',
          'Table',
          'TableToolbar',
          'TableProperties',
          'TableCellProperties',
        ],
      }}
    />
  );
};

EUFundingStatement.propTypes = {
  fieldPath: PropTypes.string.isRequired,
  label: PropTypes.string,
  labelIcon: PropTypes.string,
  required: PropTypes.bool,
};

EUFundingStatement.defaultProps = {
  fieldPath: 'selectedFunding.award.disclaimer',
  label: 'Funding Statement',
  labelIcon: 'write',
  required: true,
};

/**
 * EU Funding description.
 * @param referenceDocument {string} Reference document to be displayed.
 * @constructor
 */
export const EUFundingDescription = ({ referenceDocument }) => {
  return (
    <>
      <p>
        For EU-funded projects, as outlined in the guidelines on{' '}
        <a href={referenceDocument} target="_blank" rel="noopener noreferrer">
          Communicating and raising EU visibility
        </a>
        , it is mandatory to include a funding statement and the EU emblem in
        your communication and dissemination materials.
      </p>

      <p>
        Use the fields below to provide your funding statement and select the
        appropriate EU emblem to be presented alongside it.
      </p>
    </>
  );
};

EUFundingDescription.propTypes = {
  referenceDocument: PropTypes.string.isRequired,
};

export const EUFundingModal = ({
  isOpen,
  setIsOpen,
  handleSubmit,
  extraConfig,
}) => {
  // Extra configurations for the EU-related projects
  const EUFundingLogos = _get(extraConfig, 'eu-funding-logos');
  const EUFundingVisibilityDocument = _get(extraConfig, 'eu-visibility-doc');

  return (
    <Modal
      onClose={() => setIsOpen(false)}
      open={isOpen}
      size="small"
      closeIcon
      closeOnDimmerClick={false}
    >
      <Modal.Header>EU Project Funding Statement</Modal.Header>
      <Modal.Content>
        <div>
          <div>
            <EUFundingDescription
              referenceDocument={EUFundingVisibilityDocument}
            />
            <EUFundingStatement />
            <EUFundingLogoSelector options={EUFundingLogos} />
          </div>
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Button
          onClick={() => setIsOpen(false)}
          icon="remove"
          content="Cancel"
          floated="left"
        />
        <Button
          primary
          icon="checkmark"
          content="Add award"
          onClick={(event) => {
            setIsOpen(false);
            handleSubmit(event);
          }}
        />
      </Modal.Actions>
    </Modal>
  );
};

EUFundingModal.propTypes = {
  fieldPath: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  extraConfig: PropTypes.object.isRequired,
};
