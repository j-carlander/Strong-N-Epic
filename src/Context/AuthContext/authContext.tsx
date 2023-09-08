import { createContext, ReactNode, useState } from 'react';

type Props = {
  children?:ReactNode;
}

type AuthContext = {
  authenticated: boolean;
  setAuthenticated: (authentiocated: boolean) => void;
}

const initialValue = {
  authenticated: false,
  setAuthenticated: () => {},
}

const AuthContext = createContext<AuthContext>(initialValue);


const AuthProvider = ({children}: Props) => {
  
  const [authenticated, setAuthenticated] = useState<boolean>(initialValue.authenticated);

  return (
    <AuthContext.Provider value={{authenticated, setAuthenticated}}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider}