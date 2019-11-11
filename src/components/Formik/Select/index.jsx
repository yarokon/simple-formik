import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import VirtualizedSelect from 'react-virtualized-select';
import 'react-select/dist/react-select.css';
import 'react-virtualized-select/styles.css';

import FieldWrapper from '../FieldWrapper';
import { validateField, requiredRule } from '../utils';
import './index.scss';

class Select extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    multi: PropTypes.bool,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    validationSchema: PropTypes.array,
    style: PropTypes.object,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    multi: false,
    required: false,
    disabled: false,
    validationSchema: [],
    style: {},
  };

  extendSchema() {
    const { required, validationSchema } = this.props;
    const schema = [];

    if (required) {
      schema.push(requiredRule);
    }

    schema.push(...validationSchema);

    return schema;
  }

  handleOnChange = (selectedValue, callback) => {
    const { name, multi } = this.props;

    const nextValue = multi
      ? selectedValue.map(({ value }) => value)
      : selectedValue && selectedValue.value;

    callback(name, nextValue);
  };

  calculateOptionHeight = ({ option }) => {
    if (this.optionHeightElement && this.virtualizedSelectElement) {
      const width = this.virtualizedSelectElement.offsetWidth;

      this.optionHeightElement.style.width = `${width}px`;
      this.optionHeightElement.innerHTML = option.label;

      return this.optionHeightElement.clientHeight;
    }
  };

  render() {
    const { name, label, placeholder, required, disabled, style, ...rest } = this.props;

    return (
      <FieldWrapper className="Select" name={name} label={label} required={required} style={style}>
        <Field
          name={name}
          validate={value =>
            validateField({
              value,
              schema: this.extendSchema(),
            })
          }
        >
          {({ field, form }) => (
            <div>
              <VirtualizedSelect
                value={field.value}
                onChange={value => this.handleOnChange(value, form.setFieldValue)}
                onBlur={() => form.setFieldTouched(name, true)}
                optionHeight={this.calculateOptionHeight}
                placeholder={disabled ? '' : placeholder}
                disabled={disabled}
                ignoreAccents={false}
                ref={comp => (this.virtualizedSelectElement = ReactDOM.findDOMNode(comp))}
                {...rest}
              />
              <div className="option-height" ref={el => (this.optionHeightElement = el)} />
            </div>
          )}
        </Field>
      </FieldWrapper>
    );
  }
}

export default Select;
