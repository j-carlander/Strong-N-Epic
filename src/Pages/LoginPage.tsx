import { Navigate } from "react-router-dom";
import LoginComponent from "../Components/LoginComponent/LoginComponent";
import { PageHeader } from "../Components/PageHeader/PageHeader.js";
import { useUserContext } from "../Context/useContext.js";
import { UserContext } from "../Context/contextProvider.js";

export function LoginPage(): JSX.Element {
  const currentUser: UserContext = useUserContext();

  if (currentUser.details.role === "USER") return <Navigate to={"/workout"} />;
  if (currentUser.details.role === "ADMIN") return <Navigate to={"/admin"} />;

  return (
    <>
      <PageHeader />
      <LoginComponent />
    </>
  );
}
