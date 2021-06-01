import { render, screen } from '@testing-library/react';
import App from './App';

test('if App renders sistem title correctly', () => {
  render(<App />);

  const linkElement = screen.getByText(/Sistema de empréstimo - MATA 63/i);

  expect(linkElement).toBeInTheDocument();
});
