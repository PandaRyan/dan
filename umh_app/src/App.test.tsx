import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import App from './App'; // Make sure this path matches your App component

describe('App Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<App />);
    expect(container).toBeTruthy();
  });
});