import { useState } from 'react'
import LoginComponent from "../Components/LoginComponent/LoginComponent";
import RegisterComponent from '../Components/RegisterComponent/RegisterComponent';

import {FormState} from '../../Types/Form.js'

export function HomePage():JSX.Element{


  const [formState, setFormState] = useState("LOGIN" as FormState);

    return (
        <>
          {(formState === 'LOGIN' &&
          <LoginComponent formState={formState} setFormState={setFormState} /> )}

         {(formState === 'REGISTER' &&
          <RegisterComponent formState={formState} setFormState={setFormState} /> )}
        </>
    )
}