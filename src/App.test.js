import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders input field and button', () => {
  render(<App />);
  
  // Check if the input field is rendered
  const inputElement = screen.getByLabelText(/id input/i);
  expect(inputElement).toBeInTheDocument();

  // Check if the submit button is rendered
  const buttonElement = screen.getByRole('button', { name: /submit/i });
  expect(buttonElement).toBeInTheDocument();
});

test('renders score display and conclusions', () => {
  render(<App />);
  
  // Check if the score display is initially rendered
  const scoreElement = screen.getByText(/score: 0\/100/i);
  expect(scoreElement).toBeInTheDocument();

  // Check if the conclusions section is rendered
  const conclusionElement = screen.getByText(/conclusions:/i);
  expect(conclusionElement).toBeInTheDocument();
});

test('updates score and conclusion on submit', () => {
  render(<App />);
  
  // Simulate entering an ID and clicking submit
  const inputElement = screen.getByLabelText(/id input/i);
  fireEvent.change(inputElement, { target: { value: 'test-id' } });

  const buttonElement = screen.getByRole('button', { name: /submit/i });
  fireEvent.click(buttonElement);

  // Verify that the score is updated and conclusions are shown
  const scoreElement = screen.getByText(/score:/i);
  expect(scoreElement).toBeInTheDocument();

  const conclusionElement = screen.getByText(/conclusions:/i);
  expect(conclusionElement).toBeInTheDocument();
});
