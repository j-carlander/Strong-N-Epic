import { FormEvent, useState, useEffect } from 'react'
import { InputEvent } from '../../../Types/Form';
import authService from '../../service/authService.js';
import { useNavigate } from 'react-router-dom';
import './LoginComponent.css';
import { User } from '../../../Types/User.js';
import { useUserContext } from '../../Context/useContext.js';
import memoryService from '../../service/memoryService.js';

export default function LoginComponent():JSX.Element {

  const [value, setValue] = useState('');
  const [ref, setRef] = useState('');
  const [loginUser, setLoginUser] = useState({} as User);
  const navigate = useNavigate()

  const currentUser = useUserContext();

  useEffect(() => {
    setLoginUser({...loginUser, [ref]: value});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[ref, value])

  function handleLoginInfo(event: InputEvent) {
    setRef(event.target.name); 
    setValue(event.target.value);
  }


  async function submitLoginForm(event: FormEvent) {
    event.preventDefault();
    const userInfo = await authService.login(loginUser);

    currentUser.setDetails(userInfo.data);
    memoryService.saveSessionValue("USER_INFO", userInfo.data);
  }

  return (
    <section>
      <form className='login-form' onSubmit={submitLoginForm}> 
        <label className='username-label' htmlFor="usernameField">Username:</label>
        <input required autoFocus className='username-field' onChange={handleLoginInfo} type='text' name='username' value={loginUser.username || ''} id="usernameField"></input>
        <label className='password-label' htmlFor="passwordField">Password:</label>
        <input required className='password-field' onChange={handleLoginInfo} type='password' name='password' value={loginUser.password || ''} id="passwordField"></input>
        <button className='login-btn'>Log In</button>
      </form>
      <aside className='register-option'>
        <p>Not a member?</p>
        <button className='change-formstate-btn' onClick={(() => navigate("/register"))}>Sign up</button>
        <p>today!</p>
      </aside>
    </section>
  )
}
