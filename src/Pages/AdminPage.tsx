import { Navigate } from "react-router-dom";
import { AdminView } from "../Components/AdminView/AdminView";
import { PageHeader } from "../Components/PageHeader/PageHeader";
import { useUserContext } from "../Context/useContext";
import { UserContext } from "../Context/contextProvider";

export function AdminPage(): JSX.Element {
  const currentUser: UserContext = useUserContext();

  if (!currentUser.details.jwt) return <Navigate to={"/login"} />;

  return (
    <>
      <PageHeader />
      <AdminView />
    </>
  );
}
