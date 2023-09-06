import { useState } from "react";
import LoginComponent from "../Components/LoginComponent/LoginComponent";
import RegisterComponent from "../Components/RegisterComponent/RegisterComponent";

import { FormState } from "../../Types/Form.js";
import { PageHeader } from "../Components/PageHeader/PageHeader.js";

export function HomePage(): JSX.Element {
  const [formState, setFormState] = useState("LOGIN" as FormState);
  const [currentUser, setCurrentUser] = useState("Guest");

  return (
    <>
      <PageHeader currentUser={currentUser} />
      {formState === "LOGIN" && (
        <LoginComponent 
          formState={formState}
          setFormState={setFormState}
          setCurrentUser={setCurrentUser}
        />
      )}

      {formState === "REGISTER" && (
        <RegisterComponent formState={formState} setFormState={setFormState} />
      )}
    </>
  );
}
