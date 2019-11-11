import Buttons from './Buttons';
import Debug from './Debug';

export const sleep = (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms));

export const onSubmit = async (values, actions) => {
  await sleep();

  alert(JSON.stringify(values, null, 4));
  console.log(values);

  actions.setSubmitting(false);
};

export { Buttons, Debug };
