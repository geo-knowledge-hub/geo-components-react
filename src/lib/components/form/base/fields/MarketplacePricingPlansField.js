/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022-2024 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { Component } from "react";
import PropTypes from "prop-types";

import {
  TextField,
  GroupField,
  ArrayField,
  FieldLabel,
} from "react-invenio-forms";
import { Button, Form, Icon } from "semantic-ui-react";

import { i18next } from '@translations/i18next';

/**
 * Empty Pricing plan model
 */
const emptyMarketplacePricingPlans = {
  "title": "",
  "description": "",
  "url": "",
  "value": ""
}

/**
 * Pricing plan component
 */
export class MarketplacePricingPlansField extends Component {
  render() {
    const { fieldPath, label, labelIcon, required, showEmptyValue } =
      this.props;

    return (
      <>
        <ArrayField
          addButtonLabel={i18next.t('Add')}
          defaultNewValue={emptyMarketplacePricingPlans}
          fieldPath={fieldPath}
          label={<FieldLabel htmlFor={fieldPath} icon={labelIcon} label={label} />}
          required={required}
          showEmptyValue={showEmptyValue}
        >
          {({ arrayHelpers, indexPath }) => {
            const fieldPathPrefix = `${fieldPath}.${indexPath}`;

            return (
              <div className="invenio-group-field-multiple-line">
                <GroupField optimized>
                  <TextField
                    fieldPath={`${fieldPathPrefix}.title`}
                    label={i18next.t('Title')}
                    width={16}
                    required
                  />

                  <TextField
                    fieldPath={`${fieldPathPrefix}.description`}
                    label={i18next.t('Description')}
                    width={16}
                    required
                  />

                  <TextField
                    fieldPath={`${fieldPathPrefix}.url`}
                    label={i18next.t('URL')}
                    width={9}
                    required
                  />

                  <TextField
                    fieldPath={`${fieldPathPrefix}.value`}
                    label={i18next.t('Price')}
                    width={6}
                    required
                  />

                  <Form.Field>
                    <Button
                      aria-label={i18next.t('Remove field')}
                      className="close-btn"
                      icon
                      size="small"
                      onClick={() => arrayHelpers.remove(indexPath)}
                    >
                      <Icon name="close" />
                    </Button>
                  </Form.Field>
                </GroupField>
              </div>
            );
          }}
        </ArrayField>
        <label className="helptext" style={{ marginTop: '10px' }}>
          {i18next.t(
            'Pricing plans are available for the described product. For the ' +
            'value, please specify the currency acronym before the value.',
          )}
        </label>
      </>
    );
  }
}

MarketplacePricingPlansField.propTypes = {
  fieldPath: PropTypes.string.isRequired,
  label: PropTypes.string,
  labelIcon: PropTypes.string,
  required: PropTypes.bool,
  showEmptyValue: PropTypes.bool,
};

MarketplacePricingPlansField.defaultProps = {
  fieldPath: 'metadata.marketplace.pricing',
  label: i18next.t('Pricing plans'),
  labelIcon: 'money bill alternate outline',
  required: false,
  showEmptyValue: true,
};
