import { connect as withFormik, FieldArray } from 'formik';

import Form from './Form';
import Input from './Input';
import Checkbox from './Checkbox';
import Switch from './Switch';
import DateTimePicker from './DateTimePicker';
import Select from './Select';
import { requiredRule } from './utils';
import './index.scss';

export {
  Form,
  Input,
  Checkbox,
  Switch,
  DateTimePicker,
  Select,
  FieldArray,
  withFormik,
  requiredRule,
};
