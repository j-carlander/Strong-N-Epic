import { FormEvent, useState } from 'react'
import { FormState, InputEvent, ButtonEvent } from '../../../Types/Form';
import { useSetUserInfo } from '../../hooks/setUserInfoHook.js';
import authService from '../../service/authService.js';
import memoryService from '../../service/memoryService.js';
import { useNavigate } from 'react-router-dom';

type Props = {
  formState: FormState;
  setFormState: (formState: FormState) => void;
  setLoggedIn: (setLoggedIn: boolean) => void;
}

export default function LoginComponent({formState, setFormState, setLoggedIn}: Props):JSX.Element {

  const [value, setValue] = useState('');
  const [ref, setRef] = useState('');
  const navigate = useNavigate()

  const { loginUser } = useSetUserInfo(formState, ref, value);

  function handleLoginInfo(event: InputEvent) {
    setRef(event.target.name); 
    setValue(event.target.value);
  }

  function changeFormState(event: ButtonEvent) {
    event.preventDefault();
    setFormState("REGISTER");
  }

  function logout(event: ButtonEvent) {
    event.preventDefault();
    memoryService.removeSessionValue("JWT_TOKEN");
    memoryService.removeSessionValue("USER_INFO");
  }

  async function submitLoginForm(event: FormEvent) {
    event.preventDefault();
    await authService.login(loginUser);
    
    const userInfo = memoryService.getSessionValue("USER_INFO");
    
    if(userInfo.username && userInfo.role === "USER"){
      setLoggedIn(true);
      navigate("/workout");
    }else if(userInfo.username && userInfo.role === "ADMIN") {
      setLoggedIn(true);
      navigate("/admin");
    }else {
      memoryService.removeSessionValue("JWT_TOKEN");
      memoryService.removeSessionValue("USER_INFO");
      throw new Error("Login went wrong, verify your login credentials");
    }
  }

  return (
    <section>
      <form className='login-form' onSubmit={submitLoginForm}> 
        <label className='user-id-label' htmlFor="usernameField">UserID:</label>
        <input required autoFocus className='username-field' onChange={handleLoginInfo} type='text' name='username' value={loginUser.username || ''} id="usernameField"></input>
        <label className='password-label' htmlFor="passwordField">Password:</label>
        <input required className='password-label' onChange={handleLoginInfo} type='password' name='password' value={loginUser.password || ''} id="passwordField"></input>
        <button className='login-btn'>Login</button>
        <button onClick={logout}>Logout</button>
      </form>
      <aside>
        <p>Not a member?</p>
        <button className='change-formstate-btn' onClick={changeFormState}>Sign up</button>
        <p>today!</p>
      </aside>
    </section>
  )
}
