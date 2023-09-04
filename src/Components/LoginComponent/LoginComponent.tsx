import { FormEvent, useState } from 'react'
import { InputEvent } from '../../../Types/User.js'

interface LoginUser {
  username: string;
  password: string;
}

const userInfo: LoginUser = {
  username: '',
  password: '',
} 

export default function LoginComponent():JSX.Element {

  const [userId, setUserId] = useState(userInfo);

  function saveUsernameValue(event: InputEvent) {
    setUserId({...userInfo, username: event.target.value})
  }

  function savePasswordValue(event: InputEvent) {
    setUserId({...userInfo, password: event.target.value})
  }

  function submitLoginForm(event: FormEvent) {
    event.preventDefault();
    // fetch(url);
  }

  return (
    <>
      <form className='login-form' onSubmit={submitLoginForm}> 
        <label className='user-id-label' htmlFor="usernameField">UserID:</label>
        <input className='username-field' onChange={saveUsernameValue} type='text' name='username' id="usernameField"></input>
        <label className='password-label' htmlFor="passwordField">Password:</label>
        <input className='password-label' onChange={savePasswordValue} type='password' name='password' id="passwordField"></input>
        <button className='login-btn'>Login</button>
      </form>
    </>
  )
}
