import { useState } from "react";
import LoginComponent from "../Components/LoginComponent/LoginComponent";
import RegisterComponent from "../Components/RegisterComponent/RegisterComponent";

import { FormState } from "../../Types/Form.js";
import { PageHeader } from "../Components/PageHeader/PageHeader.js";

type Props = {
  loggedIn: boolean;
  setLoggedIn: (setLoggedIn: boolean) => void;
}

export function HomePage({loggedIn, setLoggedIn}: Props): JSX.Element {
  const [formState, setFormState] = useState("LOGIN" as FormState);

  return (
    <>
      <PageHeader loggedIn={loggedIn} />
      {formState === "LOGIN" && (
        <LoginComponent 
          formState={formState}
          setFormState={setFormState}
          setLoggedIn={setLoggedIn}
        />
      )}

      {formState === "REGISTER" && (
        <RegisterComponent formState={formState} setFormState={setFormState} />
      )}
    </>
  );
}
