import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';

import FieldWrapper from '../FieldWrapper';
import { validateField, requiredRule } from '../utils';
import './index.scss';

Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  validationSchema: PropTypes.array,
  style: PropTypes.object,
  onChange: PropTypes.func,
};

Input.defaultProps = {
  type: 'text',
  required: false,
  disabled: false,
  validationSchema: [],
  style: {},
};

function Input({ name, label, required, validationSchema, style, ...rest }) {
  const extendSchema = () => {
    const schema = [];

    if (required) {
      schema.push(requiredRule);
    }

    schema.push(...validationSchema);

    return schema;
  };

  return (
    <FieldWrapper className="Input" name={name} label={label} required={required} style={style}>
      <Field
        name={name}
        validate={value => validateField({ value, schema: extendSchema() })}
        {...rest}
      />
    </FieldWrapper>
  );
}

export default Input;
