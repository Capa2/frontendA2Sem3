import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import App from './App';

test('render app h1', () => {
  render(<Router><App /></Router>);
  const h1 = screen.getByText(/CA2A2 STARTCODE/i); // substring match, ignore case
  expect(h1).toBeInTheDocument();
});