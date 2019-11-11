import { configure } from '@storybook/react';
import '@storybook/addon-console';

configure(require.context('../src/stories', true, /\.stories\.jsx?$/), module);
