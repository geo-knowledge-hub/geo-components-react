// This file is part of React-Invenio-Deposit
// Copyright (C) 2021 CERN.
// Copyright (C) 2021 Northwestern University.
//
// React-Invenio-Deposit is free software; you can redistribute it and/or modify it
// under the terms of the MIT License; see LICENSE file for more details.

import React, { useState } from 'react';
import { Button, Grid, Image, Modal, List, Segment } from 'semantic-ui-react';

import { Field } from 'formik';
import { FieldLabel, RichInputField } from 'react-invenio-forms';

import {
  EUFundingLogos,
  EUFundingVisibilityDocument,
} from './EUFundingModalData';

/**
 * EU logo selector.
 * @param logos {Object} List of logo objects.
 * @constructor
 */
const EUFundingLogoSelector = ({ logos }) => {
  {
    const [selectedLogo, setSelectedLogo] = useState({});

    const handleSelect = (logo) => {
      setSelectedLogo(logo);
    };

    const fieldPath = 'selectedFunding.award.icon';
    const labelIcon = 'image';
    const label = 'EU Emblem';

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
                        {logos.map((item) => (
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

/**
 * EU logo selector.
 * @param logos {Object} List of logo objects.
 * @constructor
 */
const EUFundingFundingStatement = () => {
  const fieldPath = 'selectedFunding.award.disclaimer';
  const labelIcon = 'write';
  const label = 'Funding Statement';
  return (
    <RichInputField
      className="description-field rel-mb-1"
      fieldPath={fieldPath}
      editorConfig={{}}
      label={<FieldLabel htmlFor={fieldPath} icon={labelIcon} label={label} />}
      optimized
    />
  );
};

const EUFundingDescription = () => {
  return (
    <>
      <p>
        For EU-funded projects, as outlined in the guidelines on{' '}
        <a
          href={EUFundingVisibilityDocument}
          target="_blank"
          rel="noopener noreferrer"
        >
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

export const EUFundingModal = ({ isOpen, setIsOpen, handleSubmit }) => {
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
            <EUFundingDescription />
            <EUFundingFundingStatement />
            <EUFundingLogoSelector logos={EUFundingLogos} />
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
