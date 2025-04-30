// src/context/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  JSX,
} from 'react';

interface UserContextType {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
  phone: string;
  gender: string;
  birthDate: string;
  address: string;
  accessToken: string;
};

interface AuthContextProps {
  user: UserContextType | null;
  setUser: Dispatch<SetStateAction<UserContextType | null>>;
};


const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [user, setUser] = useState<UserContextType | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
