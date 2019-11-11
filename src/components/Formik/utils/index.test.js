import { validateField, validateForm, flattenObjectDeep, isSchema } from './';

describe('validateField', () => {
  test('empty schema', () => {
    const value = '';
    const schema = [];

    expect(validateField({ value, schema })).toBeUndefined();
  });

  test('required', () => {
    const errorMessage = 'Required';
    const value = '';
    const schema = [[value => Boolean(value), errorMessage]];

    expect(validateField({ value, schema })).toBe(errorMessage);
  });

  test('multiple rules', () => {
    const matchedError = 'The value should be greater than zero';
    const value = '0';
    const schema = [
      [value => Boolean(value), 'Required'],
      [value => value > 0, matchedError],
      [value => value <= 100, 'The value should be less than or equal to 100'],
    ];

    expect(validateField({ value, schema })).toBe(matchedError);
  });

  test('comparing the values ​​of two fields', () => {
    const matchedError = 'Passwords are not the same';

    const values = {
      password: 'qwerty',
      passwordConfirmation: 'qwe',
    };

    const schema = [[(value, values) => value === values.password, matchedError]];

    expect(
      validateField({
        value: values.passwordConfirmation,
        values,
        schema,
      }),
    ).toBe(matchedError);

    values.passwordConfirmation = values.password;

    expect(
      validateField({
        value: values.passwordConfirmation,
        values,
        schema,
      }),
    ).toBeUndefined();
  });

  test('handle error', () => {
    const value = '';
    const schema = [[value => misprint, 'Required']];

    expect(validateField({ value, schema })).toBe('misprint is not defined');
  });
});

describe('validateForm', () => {
  test('nested values', () => {
    const values = {
      a: 'x',
      b: {
        c: '',
        d: [
          {
            e: '',
            f: [],
          },
          {
            g: 'x',
            h: ['1', '1'],
          },
        ],
      },
    };

    const schema = {
      a: [[value => !!value, 'Required']],
      b: {
        c: [[value => !!value, 'Required']],
        d: [
          undefined,
          {
            g: [[(value, values) => value === values.b.d[0].e, 'Not equal']],
            h: [[[value => value === '0', 'Should be zero']]],
          },
        ],
      },
    };

    expect(validateForm({ values, schema })).toEqual({
      b: {
        c: 'Required',
        d: [
          undefined,
          {
            g: 'Not equal',
            h: ['Should be zero'],
          },
        ],
      },
    });
  });
});
