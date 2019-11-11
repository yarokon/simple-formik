import React from 'react';
import { withFormik } from '../../components/Formik';

function Buttons({ formik }) {
  const disabled = formik.isSubmitting;

  return (
    <div>
      <button type="submit" disabled={disabled}>
        Submit
      </button>{' '}
      <button type="reset" disabled={disabled}>
        Reset
      </button>
    </div>
  );
}

export default withFormik(Buttons);
