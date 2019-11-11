import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import RawDateTimePicker from 'react-datetime';
import moment from 'moment';
import 'react-datetime/css/react-datetime.css';

import FieldWrapper from '../FieldWrapper';
import { validateField, requiredRule } from '../utils';
import './index.scss';

DateTimePicker.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  dateFormat: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  timeFormat: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  viewMode: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  validationSchema: PropTypes.array,
  style: PropTypes.object,
  onChange: PropTypes.func,
};

DateTimePicker.defaultProps = {
  dateFormat: 'YYYY-MM-DD',
  timeFormat: 'HH:mm',
  viewMode: 'days',
  required: false,
  disabled: false,
  validationSchema: [],
  style: {},
};

function DateTimePicker({ name, label, required, disabled, validationSchema, style, ...rest }) {
  const extendSchema = () => {
    const schema = [];

    if (required) {
      schema.push(requiredRule);
    }

    schema.push([value => value instanceof moment, 'Invalid Date'], ...validationSchema);

    return schema;
  };

  return (
    <FieldWrapper
      className="DateTimePicker"
      name={name}
      label={label}
      required={required}
      style={style}
    >
      <Field
        name={name}
        validate={value =>
          validateField({
            value,
            schema: extendSchema(),
          })
        }
      >
        {({ field, form }) => (
          <RawDateTimePicker
            inputProps={{
              name,
              disabled,
            }}
            value={field.value}
            onChange={value => form.setFieldValue(name, value)}
            onBlur={() => form.setFieldTouched(name, true)}
            {...rest}
          />
        )}
      </Field>
    </FieldWrapper>
  );
}

export default DateTimePicker;
