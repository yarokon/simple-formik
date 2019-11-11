import _ from 'lodash';

export const validateField = ({ value, values, schema }) => {
  try {
    for (let i = 0; i < schema.length; i++) {
      const [condition, errorMessage] = schema[i];

      if (!condition(value, values)) {
        return errorMessage;
      }
    }
  } catch (err) {
    return err.message;
  }
};

export const validateForm = ({ values, schema }) => {
  try {
    const flattenedSchema = flatten(schema);

    const flattenedErrors = _.mapValues(flattenedSchema, (fieldSchema, path) => {
      const value = _.get(values, path);

      if (isSchema(fieldSchema)) {
        return validateField({
          value,
          values,
          schema: fieldSchema,
        });
      }
    });

    const flattenedFilteredErrors = _.pickBy(flattenedErrors, Boolean);

    return unflatten(flattenedFilteredErrors);
  } catch (err) {
    console.error(err.message);
  }
};

export const requiredRule = [
  value => Boolean(Array.isArray(value) ? value.length : value),
  'Required',
];

const flatten = (obj = {}) => {
  const result = {};

  const flatten = (collection, prefix = '', suffix = '') => {
    _.forEach(collection, (value, key) => {
      const path = `${prefix}${key}${suffix}`;

      if (_.isArray(value) && !isSchema(value)) {
        flatten(value, `${path}[`, ']');
      } else if (_.isPlainObject(value)) {
        flatten(value, `${path}.`);
      } else {
        result[path] = value;
      }
    });
  };

  flatten(obj);

  return result;
};

const unflatten = (obj = {}) => _.zipObjectDeep(_.keys(obj), _.values(obj));

const isSchema = value =>
  _.isArray(value) &&
  (_.isEmpty(value) ||
    (_.isFunction(value[0] && value[0][0]) && _.isString(value[0] && value[0][1])));
