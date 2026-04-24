import { describe, it} from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // 1. Import the Car
import App from './App'; 
import { AuthProvider } from './components/context/AuthContext';

describe('App Component', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </MemoryRouter>
    );
  });
});