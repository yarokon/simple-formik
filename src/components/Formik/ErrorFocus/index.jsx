import { Component } from 'react';
import { connect, getIn } from 'formik';
import _ from 'lodash';

class ErrorFocus extends Component {
  componentDidUpdate(prevProps) {
    const { isSubmitting, isValidating, errors } = prevProps.formik;

    if (!_.isEmpty(errors) && isSubmitting && !isValidating) {
      const fieldList = document.querySelectorAll('.Field');

      for (let i = 0; i < fieldList.length; i++) {
        const field = fieldList[i];

        if (getIn(errors, field.dataset.name)) {
          field.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });

          break;
        }
      }
    }
  }

  render() {
    return null;
  }
}

export default connect(ErrorFocus);
