import 'semantic-ui-css/semantic.min.css';
import 'pure-react-carousel/dist/react-carousel.es.css';
import 'react-lazy-load-image-component/src/effects/blur.css';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
