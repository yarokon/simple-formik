import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import RawSwitch from 'react-switch';

import FieldWrapper from '../FieldWrapper';
import { validateField, requiredRule } from '../utils';
// import './index.scss';

Switch.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  validationSchema: PropTypes.array,
  style: PropTypes.object,
  onChange: PropTypes.func,
};

Switch.defaultProps = {
  required: false,
  disabled: false,
  validationSchema: [],
  style: {},
};

function Switch({ name, label, required, validationSchema, style, ...rest }) {
  const extendSchema = () => {
    const schema = [];

    if (required) {
      schema.push(requiredRule);
    }

    schema.push(...validationSchema);

    return schema;
  };

  return (
    <FieldWrapper className="Switch" name={name} label={label} required={required} style={style}>
      <Field
        type="checkbox"
        name={name}
        validate={value => validateField({ value, schema: extendSchema() })}
        {...rest}
      >
        {({ field, form }) => (
          <RawSwitch
            checked={field.checked}
            onChange={checked => form.setFieldValue(name, checked)}
            onBlur={() => form.setFieldTouched(name, true)}
          />
        )}
      </Field>
    </FieldWrapper>
  );
}

export default Switch;
