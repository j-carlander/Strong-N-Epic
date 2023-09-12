import { FormEvent, useState, useEffect } from 'react'
import { InputEvent, SelectEvent } from '../../../Types/Form.js';
import authService from '../../service/authService.js';
import './RegisterComponent.css';
import { User } from '../../../Types/User.js';
import { NavigateFunction, useNavigate } from 'react-router-dom';


export default function RegisterComponent():JSX.Element {

  const navigate: NavigateFunction = useNavigate();
  
  const [regUser, setRegUser] = useState({} as User);
  const [value, setValue] = useState<string>('');
  const [ref, setRef] = useState<string>('');
  const [status, setStatus] = useState<number>();
  const [confirmedPw, setConfirmedPw] = useState<string>('');

  useEffect(() => {
    setRegUser({...regUser, [ref]: value});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[ref, value])

  function handleRegInfo(event: InputEvent | SelectEvent) {
    setRef(event.target.name); 
    setValue(event.target.value);
  }

  function saveConfirmedPassword(event: InputEvent) {
    setConfirmedPw(event.target.value);
  }

  async function submitRegForm(event: FormEvent) {
    event.preventDefault();
    if(regUser.password === confirmedPw) {
      const result = await authService.registration(regUser);
      if(result.status === 201) {
        setStatus(201);
        navigate("/login")
      }else if(result.status === 409) {
        setStatus(409);
      }else if(result.status === 449) {
        setStatus(449);
      }else{
        setStatus(500);
      }
      
    }else {
      console.log("Something went wrong");
    }
  }

  return (
    <section>
      <form className='login-form' onSubmit={submitRegForm}>
        <label className='firstname-label' htmlFor="firstnameField">*Firstname:</label>
        <input required autoFocus className='firstname-field' onChange={handleRegInfo} type='text' name='firstname' value={regUser.firstname || ''} id="firstnameField"></input>

        <label className='lastname-label' htmlFor="lastnameField">*Lastname:</label>
        <input required className='lastname-field' onChange={handleRegInfo} type='text' name='lastname' value={regUser.lastname || ''} id="lastnameField"></input>

        <label className='gender-label' htmlFor="genderField">*Gender:</label>
        <select required defaultValue="DEFAULT" className='gender-field' name="gender" onChange={handleRegInfo} value={regUser.gender} id="genderField">
          <option className='option-one' disabled value="DEFAULT"></option>
          <option className='option-two' value="male">Male</option>
          <option className='option-three' value="female">Female</option>
          <option className='option-four' value="other">Other</option>
          <option className='option-five' value="i prefer not to say">I prefer not to say</option>
        </select>

        <label className='age-label' htmlFor="ageField">*Age:</label>
        <input required className='age-field' onChange={handleRegInfo} type='number' name='age' value={regUser.age || ''} id="ageField"></input>

        <label className='email-label' htmlFor="emailField">*Email:</label>
        <input required className='email-field' onChange={handleRegInfo} type='text' name='email' value={regUser.email || ''} id="emailField"></input>

        <label className='phone-label' htmlFor="phoneField">*Phone:</label>
        <input required className='phone-field' onChange={handleRegInfo} type='phone' name='phone' value={regUser.phone || ''} id="phoneField"></input>

        <label className='user-id-label' htmlFor="usernameField">*Username:</label>
        <input required className='username-field' onChange={handleRegInfo} type='text' name='username' value={regUser.username || ''} id="usernameField"></input>

        <label className='password-label' htmlFor="passwordField">*Password:</label>
        <input required className='password-field' onChange={handleRegInfo} type='password' name='password' value={regUser.password || ''} id="passwordField"></input>

        <label className='repassword-label' htmlFor="repasswordField">*Confirm password:</label>
        <input required className='repassword-field' onChange={saveConfirmedPassword} type='password' name='repassword' id="repasswordField"></input>

        <button className='login-btn'>Sign up</button>
      </form>
      {status === 409 && (
        <p className='error-para'>Username is already in use. Try something else.</p>
      )}
      {status === 449 && (
        <p className='error-para'>Check that each input is filled in correctly.</p>
      )}
      {status === 500 && (
        <p className='error-para'>Server is not responding, try again later.</p>
      )}
      <aside className='login-option'>
        <p>Already a member?</p>
        <button className='change-formstate-btn' onClick={(() => navigate("/login"))}>Sign in</button>
        <p>here!</p>
      </aside> 
    </section>
  )
}
