import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the dashboard at its route', () => {
  window.history.pushState({}, 'Dashboard', '/dashboard');
  render(<App />);
  expect(screen.getByText(/hiii/i)).toBeInTheDocument();
});
