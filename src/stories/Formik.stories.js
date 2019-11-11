import React from 'react';
import _ from 'lodash';
import moment from 'moment';

import {
  Form,
  Input,
  DateTimePicker,
  Select,
  FieldArray,
  requiredRule,
} from '../components/Formik';
import { Buttons, Debug, onSubmit } from './utils';
import { getOptions1, getOptions2 } from './utils/select';

export default {
  title: 'Formik',
};

export const simpleForm = () => (
  <Form
    initialValues={{
      value: '',
    }}
    onSubmit={onSubmit}
  >
    {() => (
      <div>
        <Input name="value" />

        <Buttons />

        <Debug />
      </div>
    )}
  </Form>
);

export const input = () => (
  <Form
    initialValues={{
      first: '',
      second: 'disabled',
      third: '',
      fourth: '',
    }}
    onSubmit={onSubmit}
  >
    {({ values, setValues }) => (
      <div>
        <Input name="first" label="Could be changed from another component" required />

        <Input name="second" label="Disabled" disabled />

        <Input
          name="third"
          label="Internal validationt"
          required
          validationSchema={[
            [value => value > 0, 'The value should be greater than zero'],
            [value => value <= 100, 'The value should be less than or equal to 100'],
          ]}
        />

        <Input
          name="fourth"
          label="Custom onChange method"
          onChange={e => {
            setValues({
              ...values,
              first: 'the value has been changed from another component',
              [e.target.name]: e.target.value.toUpperCase(),
            });
          }}
        />

        <Buttons />

        <Debug />
      </div>
    )}
  </Form>
);

export const dateTimePicker = () => {
  return (
    <Form
      initialValues={{
        date: ['', moment(), moment(), moment(), moment(), moment()],
      }}
      onSubmit={onSubmit}
    >
      {() => (
        <div>
          <DateTimePicker name="date[0]" label="Without date" />

          <DateTimePicker name="date[1]" label="Disabled" disabled />

          <DateTimePicker name="date[2]" label="Current date" />

          <DateTimePicker name="date[3]" label="Only date" timeFormat={false} />

          <DateTimePicker name="date[4]" label="Only time" dateFormat={false} />

          <DateTimePicker
            name="date[5]"
            label="Custom format"
            dateFormat="MMMM D, YYYY"
            timeFormat="h:mm a"
          />

          <Buttons />

          <Debug />
        </div>
      )}
    </Form>
  );
};

export const select = () => (
  <Form
    initialValues={{
      select: [null, [], null, null],
    }}
    onSubmit={onSubmit}
  >
    {() => (
      <div>
        <Select name="select[0]" label="Select" options={getOptions1()} />

        <Select name="select[1]" label="Multi Select" options={getOptions1()} multi />

        <Select name="select[2]" label="Disabled" options={getOptions1()} disabled />

        <Select name="select[3]" label="Dynamic Height" options={getOptions2()} />

        <Buttons />

        <Debug />
      </div>
    )}
  </Form>
);

export const fieldLevelValidation = () => (
  <Form
    initialValues={{
      username: '',
      dateOfBirth: '',
      password: '',
      passwordConfirmation: '',
    }}
    onSubmit={onSubmit}
  >
    {({ values }) => (
      <div>
        <Input
          name="username"
          label="Username"
          required
          validationSchema={[
            [value => value.length >= 2, 'Too short'],
            [value => value.length <= 50, 'Too long'],
            [value => !['admin', 'null', 'god'].includes(value), 'Nice try'],
          ]}
        />

        <DateTimePicker
          label="Date of Birth"
          name="dateOfBirth"
          timeFormat={false}
          viewMode="years"
          required
          validationSchema={[
            [
              value =>
                moment(value).isBetween(
                  moment().subtract(150, 'years'),
                  moment().subtract(1, 'day'),
                ),
              'Please select a different date',
            ],
          ]}
        />

        <Input
          name="password"
          label="Password"
          type="password"
          required
          validationSchema={[
            [value => value.length >= 6, 'Password has to be longer than 6 characters'],
          ]}
        />

        <Input
          name="passwordConfirmation"
          label="Password Confirmation"
          type="password"
          required
          validationSchema={[
            [value => value.length >= 6, 'Password has to be longer than 6 characters'],
            [value => value === values.password, 'Passwords are not the same'],
          ]}
        />

        <Buttons />

        <Debug />
      </div>
    )}
  </Form>
);

export const formLevelValidation = () => (
  <Form
    initialValues={{
      username: '',
      dateOfBirth: '',
      password: '',
      passwordConfirmation: '',
    }}
    validationSchema={{
      username: [
        requiredRule,
        [value => value.length >= 2, 'Too short'],
        [value => value.length <= 50, 'Too long'],
        [value => !['admin', 'null', 'god'].includes(value), 'Nice try'],
      ],
      dateOfBirth: [
        requiredRule,
        [
          value =>
            moment(value).isBetween(moment().subtract(150, 'years'), moment().subtract(1, 'day')),
          'Please select a different date',
        ],
      ],
      password: [
        requiredRule,
        [value => value.length >= 6, 'Password has to be longer than 6 characters'],
      ],
      passwordConfirmation: [
        requiredRule,
        [value => value.length >= 6, 'Password has to be longer than 6 characters'],
        [(value, values) => value === values.password, 'Passwords are not the same'],
      ],
    }}
    onSubmit={onSubmit}
  >
    {() => (
      <div>
        <Input name="username" label="Username" required />

        <DateTimePicker
          label="Date of Birth"
          name="dateOfBirth"
          timeFormat={false}
          viewMode="years"
          required
        />

        <Input name="password" label="Password" type="password" required />

        <Input name="passwordConfirmation" label="Password Confirmation" type="password" required />

        <Buttons />

        <Debug />
      </div>
    )}
  </Form>
);

export const fieldArray = () => (
  <Form
    initialValues={{
      friends: ['Misha', 'Oleh', 'Vlad'],
    }}
    onSubmit={onSubmit}
  >
    {({ values }) => (
      <div>
        <FieldArray name="friends">
          {arrayHelpers =>
            values.friends.length ? (
              values.friends.map((friend, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                  }}
                >
                  <Input
                    name={`friends.${index}`}
                    label={`friend #${index + 1}`}
                    style={{ width: '80%' }}
                    required
                  />

                  <div>
                    <button type="button" onClick={() => arrayHelpers.remove(index)}>
                      -
                    </button>{' '}
                    <button type="button" onClick={() => arrayHelpers.insert(index + 1, '')}>
                      +
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <button type="button" onClick={() => arrayHelpers.push('')}>
                Add a friend
              </button>
            )
          }
        </FieldArray>

        <Buttons />

        <Debug />
      </div>
    )}
  </Form>
);

export const focusOnError = () => {
  const initialValues = {
    first: '',
    second: '',
    third: '',
  };

  return (
    <Form initialValues={initialValues} onSubmit={onSubmit}>
      {() => (
        <div>
          {_.map(initialValues, (value, key) => (
            <div key={key}>
              <Input
                name={key}
                label={key}
                required
                style={{
                  marginBottom: 500,
                }}
              />
            </div>
          ))}

          <Buttons />
        </div>
      )}
    </Form>
  );
};
