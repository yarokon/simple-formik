import memoize from 'memoize-one';
import { loremIpsum } from 'lorem-ipsum';

export const getOptions1 = memoize(() => {
  const options = [];

  for (let i = 0; i < 1000; i++) {
    options.push({
      label: `Option ${i}`,
      value: i,
    });
  }

  return options;
});

export const getOptions2 = memoize(() => {
  const options = [];

  for (let i = 0; i < 5000; i++) {
    options.push({
      label: loremIpsum({ sentenceUpperBound: 30 }),
      value: i,
    });
  }

  return options;
});
