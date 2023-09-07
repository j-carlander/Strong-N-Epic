import { useState, useEffect } from 'react'
import { LoginUser, RegUser } from '../../Types/User.js';
import { Workout } from '../../Types/Workout.js';


export function useSetInputValues(formState: string, ref: string, value: string) {

  const [loginUser, setLoginUser] = useState({} as LoginUser);
  const [regUser, setRegUser] = useState({} as RegUser);
  const [workout, setWorkout] = useState({} as Workout);


  useEffect(() => {
    if(ref !== '' || value !== '') {

      if(formState === 'LOGIN') {
        setLoginUser({...loginUser, [ref]: value});
      }else if(formState === 'REGISTER') {
        setRegUser({...regUser, [ref]: value});
      }else if(formState === 'WORKOUT'){
        setWorkout({...workout, [ref]: value});
      }else{
        return console.error('No formState match');
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[ref, value])

  return { loginUser, regUser };
}
