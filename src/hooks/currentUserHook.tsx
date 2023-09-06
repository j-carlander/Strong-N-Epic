import { useState, useEffect } from 'react'
import memoryService from '../service/memoryService';

export function useCurrentUser(loggedIn: boolean) {
  const [currentUser, setCurrentUser] = useState<string>('');

  useEffect(() => {
    if(loggedIn === false) {
      setCurrentUser("Guest");
      return;
    }else if(loggedIn === true){
      const userInfo = memoryService.getSessionValue("USER_INFO");
      setCurrentUser(userInfo.username);
    }
  }, [loggedIn])  
   

  return { currentUser };
}
