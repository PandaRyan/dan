import { describe, it} from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // 1. Import the Car
import App from './App'; 
import { AuthProvider } from './components/context/AuthContext';

describe('App Component', () => {
  it('renders without crashing', () => {
    render(
      // 2. Wrap the app in BOTH the Router and the AuthProvider!
      <MemoryRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </MemoryRouter>
    );
  });
});