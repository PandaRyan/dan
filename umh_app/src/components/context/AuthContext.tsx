
import { useState, createContext, useContext } from 'react';
import { type ReactNode } from 'react';
import { ThemedSnackbar } from '../../components/ThemedSnackBar';

interface User {
  token: string;
  name: string;
}

interface AuthContextType {
  authUser: User | null;
  setAuthUser: (user: User | null) => void;
  UserContextLogin: (userData: User) => void;
  ContextLogout: () => void;
  triggerSnackbar: (msg: string, sev:"error" | "success" | "warning") => void;
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

const AuthContext = createContext<AuthContextType | undefined>(undefined);

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

  const [snackbarConfig, setSnackbarConfig] = useState<{open: boolean, msg: string, sev: "error" | "success" | "warning"}>({
      open: false,
      msg: '',
      sev: 'success'
  });

  const triggerSnackbar = (msg: string, sev: "error" | "success" | "warning") => {
    setSnackbarConfig({open: true, msg, sev});
  };

  const handleClose = () => {
    setSnackbarConfig((prev) => ({...prev, open:false}));
  }

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, UserContextLogin, ContextLogout, triggerSnackbar} }>
      {children}

      <ThemedSnackbar
        open={snackbarConfig.open}
        message={snackbarConfig.msg}
        severity={snackbarConfig.sev}
        onClose={handleClose}
      />
    </AuthContext.Provider>
  );
}



