import React from 'react';
import PropTypes from 'prop-types';
import { ErrorMessage } from 'formik';
import classNames from 'classnames';

import './index.scss';

FieldWrapper.propTypes = {
  className: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  label: PropTypes.string,
  required: PropTypes.bool,
  style: PropTypes.object,
};

FieldWrapper.defaultProps = {
  label: '',
  required: false,
  style: {},
};

function FieldWrapper({ className, name, children, label, required, style }) {
  return (
    <div className={classNames('Field', className)} style={style} data-name={name}>
      <label className="label" htmlFor={name}>
        <span>{label}</span> {required && <span className="asterisk" />}
      </label>

      <div className="content">{children}</div>

      <div className="error-box">
        <ErrorMessage name={name} className="error" component="div" />
      </div>
    </div>
  );
}

export default FieldWrapper;
