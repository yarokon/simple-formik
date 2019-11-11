// import React from 'react';
// import { Field } from 'formik';
// import WindowedSelect from 'react-windowed-select';

// import FieldWrapper from '../FieldWrapper';
// import { validateField, requiredRule } from '../utils';

// function Select(props) {
//   const { name, label = '', required = false, validationSchema = [], multi, ...rest } = props;

//   const extendSchema = () => {
//     const schema = [];

//     if (required) {
//       schema.push(requiredRule);
//     }

//     schema.push(...validationSchema);

//     return schema;
//   };

//   return (
//     <FieldWrapper className="Select" name={name} label={label} required={required}>
//       <Field
//         name={name}
//         validate={value =>
//           validateField({
//             value,
//             schema: extendSchema(),
//           })
//         }
//       >
//         {({ field, form }) => (
//           <WindowedSelect
//             {...field}
//             onChange={value => {
//               form.setFieldValue(name, multi ? value : value ? value.value : null);
//             }}
//             onBlur={() => form.setFieldTouched(name, true)}
//             {...rest}
//           />
//         )}
//       </Field>
//     </FieldWrapper>
//   );
// }

// export default Select;
