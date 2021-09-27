import { render, screen } from '@testing-library/react';

import Faq from '../components/Faq'

test('Check for the text', () => {

  render(<Faq/>);

  const linkElement = screen.getByText(/what is grocery store/i);

  expect(linkElement).toBeInTheDocument();

});
