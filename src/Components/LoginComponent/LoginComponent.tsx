import { FormEvent, useState } from 'react'
import { handleInputChange } from '../../service/userService.js';




export default function LoginComponent():JSX.Element {

  const [loginInfo, setLoginInfo] = useState();
  const [formState, setFormState] = useState('login');
 
  function saveInfo() {
    handleInputChange(formState)
  }

  function submitLoginForm(event: FormEvent) {
    event.preventDefault();
    // fetch(url);
  }

  return (
    <>
      <form className='login-form' onSubmit={submitLoginForm}> 
        <label className='user-id-label' htmlFor="usernameField">UserID:</label>
        <input className='username-field' onChange={saveInfo} type='text' name='username' id="usernameField"></input>
        <label className='password-label' htmlFor="passwordField">Password:</label>
        <input className='password-label' onChange={saveInfo} type='password' name='password' id="passwordField"></input>
        <button className='login-btn'>Login</button>
      </form>
    </>
  )
}
