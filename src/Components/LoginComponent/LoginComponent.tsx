import { FormEvent, useState } from 'react'
import { FormState, InputEvent } from '../../../Types/Form';
import { useSetUserInfo } from '../../hooks/userHook.js';
import authService from '../../service/authService.js';
import memoryService from '../../service/memoryService.js';


type FormStateProps = {
  formState: FormState;
  setFormState: (formState: FormState) => void;
}


export default function LoginComponent(props: FormStateProps):JSX.Element {

  const [value, setValue] = useState('');
  const [ref, setRef] = useState('');

  const { loginUser } = useSetUserInfo(props.formState, ref, value);

  function handleLoginInfo(event: InputEvent) {
    setRef(event.target.name); 
    setValue(event.target.value);
  }

  function changeFormState() {
    props.setFormState("REGISTER");
  }

  function submitLoginForm(event: FormEvent) {
    event.preventDefault();
    authService.login(loginUser);
    memoryService.getSessionValue("details");
  }

  return (
    <section>
      <form className='login-form' onSubmit={submitLoginForm}> 
        <label className='user-id-label' htmlFor="usernameField">UserID:</label>
        <input required autoFocus className='username-field' onChange={handleLoginInfo} type='text' name='username' value={loginUser.username || ''} id="usernameField"></input>
        <label className='password-label' htmlFor="passwordField">Password:</label>
        <input required className='password-label' onChange={handleLoginInfo} type='password' name='password' value={loginUser.password || ''} id="passwordField"></input>
        <button className='login-btn'>Login</button>
      </form>
      <aside>
        <p>Not a member?</p>
        <a onClick={changeFormState}>Sign up</a>
        <p>today!</p>
      </aside>
    </section>
  )
}
