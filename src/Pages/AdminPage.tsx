import { AdminView } from "../Components/AdminView/AdminView";
import { PageHeader } from "../Components/PageHeader/PageHeader";

type Props = {
  loggedIn: boolean;
}

export function AdminPage({loggedIn}: Props): JSX.Element {
  return (
    <>
      <PageHeader loggedIn={loggedIn} />
      <AdminView />
    </>
  );
}
