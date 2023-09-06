import { FormEvent, useState } from 'react'
import { FormState, InputEvent, ButtonEvent } from '../../../Types/Form';
import { useSetUserInfo } from '../../hooks/userHook.js';
import authService from '../../service/authService.js';
import memoryService from '../../service/memoryService.js';
import { useNavigate } from 'react-router-dom';


type FormStateProps = {
  formState: FormState;
  setFormState: (formState: FormState) => void;
}


export default function LoginComponent(props: FormStateProps):JSX.Element {

  const [value, setValue] = useState('');
  const [ref, setRef] = useState('');
  const navigate = useNavigate()

  const { loginUser } = useSetUserInfo(props.formState, ref, value);

  function handleLoginInfo(event: InputEvent) {
    setRef(event.target.name); 
    setValue(event.target.value);
  }

  function changeFormState(event: ButtonEvent) {
    event.preventDefault();
    props.setFormState("REGISTER");
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
      // navigate("/workouts");
    }else if(userInfo.username && userInfo.role === "ADMIN") {
      // navigate("/admin");
    }else {
      throw new Error("Login went wrong");
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
