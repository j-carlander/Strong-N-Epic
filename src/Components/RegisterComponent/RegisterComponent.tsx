import { FormEvent, useState } from 'react'
import { InputEvent } from '../../../Types/User.js'

type sex = "I prefer not to say" | "Male" | "Female" | "Other";

interface RegUser {
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  sex: sex;
  age: number;
  email: string;
  phone: number;
}

const user: RegUser = {
  username: '',
  password: '',
  firstname: '',
  lastname: '',
  sex: 'I prefer not to say',
  age: 0,
  email: '',
  phone: 0
}

export default function RegisterComponent():JSX.Element {
  
  const [userInfo, setUserInfo] = useState(user);

  function saveUsernameValue(event: InputEvent) {
    setUserInfo({...userInfo, username: event.target.value})
  }

  function savePasswordValue(event: InputEvent) {
    setUserInfo({...userInfo, password: event.target.value})
  }

  function submitRegForm(event: FormEvent) {
    event.preventDefault();
    // fetch(url);
  }

  return (
    <>
      <form className='login-form' onSubmit={submitRegForm}> 
        <label className='user-id-label' htmlFor="usernameField">UserID:</label>
        <input className='username-field' onChange={saveUsernameValue} type='text' name='username' id="usernameField"></input>
        <label className='password-label' htmlFor="passwordField">Password:</label>
        <input className='password-label' onChange={savePasswordValue} type='password' name='password' id="passwordField"></input>
        <button className='login-btn'>Login</button>
      </form>  
    </>
  )
}
