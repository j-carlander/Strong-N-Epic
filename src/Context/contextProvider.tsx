import { createContext, ReactNode, useState } from 'react';
import memoryService from '../service/memoryService';

const userDetails = memoryService.getSessionValue("USER_INFO") || {
  jwt: '',
  role: '',
  username: '',
  bookedWorkouts: [],
};

type Props = {
  children?:ReactNode;
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

const initialUserValue = {
  details: userDetails,
  setDetails: () => {},
}

const UserContext = createContext<UserContext>(initialUserValue)


const ContextProvider = ({children}: Props) => {
  
  const [details, setDetails] = useState<UserDetails>(initialUserValue.details)

  return (
      <UserContext.Provider value={{details, setDetails}}>
        {children}
      </UserContext.Provider>
  )
}

export { UserContext, ContextProvider }