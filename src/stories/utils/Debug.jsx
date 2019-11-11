import React from 'react';
import { withFormik } from '../../components/Formik';

const Debug = ({ formik }) => (
  <div
    style={{
      margin: '1.5rem 0',
      background: '#f6f8fa',
    }}
  >
    <div
      style={{
        textTransform: 'uppercase',
        fontSize: 11,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        fontWeight: 500,
        padding: '.5rem',
        background: '#1ea7fd',
        color: '#fff',
        letterSpacing: '1px',
      }}
    >
      Formik State
    </div>

    <pre
      style={{
        fontSize: '.85rem',
        padding: '.25rem .5rem',
        overflowX: 'scroll',
      }}
    >
      {JSON.stringify(formik, null, 2)}
    </pre>
  </div>
);

export default withFormik(Debug);
