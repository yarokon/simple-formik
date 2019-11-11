import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form as RawForm } from 'formik';

import { validateForm } from '../utils';
import ErrorFocus from '../ErrorFocus';

Form.propTypes = {
  initialValues: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  validationSchema: PropTypes.object,
};

Form.defaultProps = {
  validationSchema: {},
};

function Form({ children, validationSchema, ...rest }) {
  return (
    <Formik
      enableReinitialize
      validate={values =>
        validateForm({
          values,
          schema: validationSchema,
        })
      }
      {...rest}
    >
      {formik => (
        <RawForm className="Formik" autoComplete="off">
          {children(formik)}

          <ErrorFocus />
        </RawForm>
      )}
    </Formik>
  );
}

export default Form;
