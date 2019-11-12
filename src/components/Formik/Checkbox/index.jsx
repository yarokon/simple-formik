import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';

import FieldWrapper from '../FieldWrapper';
import { validateField, requiredRule } from '../utils';

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  validationSchema: PropTypes.array,
  style: PropTypes.object,
  onChange: PropTypes.func,
};

Checkbox.defaultProps = {
  required: false,
  disabled: false,
  validationSchema: [],
  style: {},
};

function Checkbox({ name, label, required, validationSchema, style, ...rest }) {
  const extendSchema = () => {
    const schema = [];

    if (required) {
      schema.push(requiredRule);
    }

    schema.push(...validationSchema);

    return schema;
  };

  return (
    <FieldWrapper className="Checkbox" name={name} label={label} required={required} style={style}>
      <Field
        type="checkbox"
        name={name}
        validate={value => validateField({ value, schema: extendSchema() })}
        {...rest}
      />
    </FieldWrapper>
  );
}

export default Checkbox;
