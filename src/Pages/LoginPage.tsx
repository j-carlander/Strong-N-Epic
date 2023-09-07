import LoginComponent from "../Components/LoginComponent/LoginComponent";
import { PageHeader } from "../Components/PageHeader/PageHeader.js";

export function LoginPage(): JSX.Element {

  return (
    <>
      <PageHeader />
      <LoginComponent />
    </>
  );
}