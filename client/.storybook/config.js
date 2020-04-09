import { confiure, configure } from '@storybook/react';

configure(require.context('../src/stories', true, /\.stories\.tsx?$/), module);
