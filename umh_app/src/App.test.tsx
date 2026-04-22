import { describe, it} from 'vitest';
import { render } from '@testing-library/react';
import App from './App'; // Make sure this path matches your App component
import { AuthProvider } from './components/context/AuthContext';

describe('App Component', () => {
  it('renders without crashing', () => {
    render(
      <AuthProvider>
        <App />
      </AuthProvider>
    );
  });
});