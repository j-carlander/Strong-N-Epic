import { createContext, ReactNode, useState } from 'react';

type Props = {
  children?:ReactNode;
}

type AuthContext = {
  authenticated: boolean;
  setAuthenticated: (authentiocated: boolean) => void;
}

type UserDetails = {
  jwt: string;
  role: string;
  username: string;
  bookedWorkouts: string[];
}

type UserContext = {
  details: UserDetails;
  setDetails: (details: UserDetails) => void;
}

const initialAuthValue = {
  authenticated: false,
  setAuthenticated: () => {},
}

const initialUserValue = {
  details: {
    jwt: '',
    role: '',
    username: '',
    bookedWorkouts: [],
  },
  setDetails: () => {},
}


const AuthContext = createContext<AuthContext>(initialAuthValue);
const UserContext = createContext<UserContext>(initialUserValue)


const ContextProvider = ({children}: Props) => {
  
  const [authenticated, setAuthenticated] = useState<boolean>(initialAuthValue.authenticated);
  const [details, setDetails] = useState<UserDetails>(initialUserValue.details)

  return (
    <AuthContext.Provider value={{authenticated, setAuthenticated}}>
      <UserContext.Provider value={{details, setDetails}}>
        {children}
      </UserContext.Provider>
    </AuthContext.Provider>
  )
}

export { AuthContext, UserContext, ContextProvider }