
import { useState, createContext, useContext } from 'react';
import { type ReactNode } from 'react';

interface User {
  token: string;
  name: string;
}

interface AuthContextType {
  authUser: User | null;
  setAuthUser: (user: User | null) => void;
  UserContextLogin: (userData: User) => void;
  ContextLogout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (context === undefined) 
    throw new Error('useAuth must be used within AuthProvider')
  else
    return context
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const [authUser, setAuthUser] = useState<User | null>(null);

 const UserContextLogin = (userData: User) => {
    localStorage.setItem('userName', userData.name);
    localStorage.setItem('userToken', userData.token);
    setAuthUser(userData);
  }

  const ContextLogout = () => {
    localStorage.removeItem('userName');
    localStorage.removeItem('userToken');
    setAuthUser(null);
  };

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, UserContextLogin, ContextLogout} }>
      {children}
    </AuthContext.Provider>
  );
}



