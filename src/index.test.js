import React from 'react';
import { render } from '@testing-library/react';

import App from './demos/App';

test('Basic App test', () => {
  const { getByText } = render(<App />);

  expect(getByText('GEO Components React')).toBeInTheDocument();
});
