import RegisterComponent from "../Components/RegisterComponent/RegisterComponent";
import { PageHeader } from "../Components/PageHeader/PageHeader.js";

export function RegistrationPage(): JSX.Element {

  return (
    <>
      <PageHeader />
      <RegisterComponent />
    </>
  );
}