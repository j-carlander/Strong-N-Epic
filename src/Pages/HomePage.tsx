import { useState } from "react";
import LoginComponent from "../Components/LoginComponent/LoginComponent";
import RegisterComponent from "../Components/RegisterComponent/RegisterComponent";

import { FormState } from "../../Types/Form.js";

export function HomePage(): JSX.Element {
  const [formState, setFormState] = useState("LOGIN" as FormState);

  return (
    <>
      <h2>GymBros</h2>
      <h1>Strong-N-Epic</h1>
      {formState === "LOGIN" && (
        <LoginComponent formState={formState} setFormState={setFormState} />
      )}

      {formState === "REGISTER" && (
        <RegisterComponent formState={formState} setFormState={setFormState} />
      )}
    </>
  );
}
