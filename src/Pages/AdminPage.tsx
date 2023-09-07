import { AdminView } from "../Components/AdminView/AdminView";
import { PageHeader } from "../Components/PageHeader/PageHeader";

export function AdminPage(): JSX.Element {
  return (
    <>
      <PageHeader />

      <AdminView />
    </>
  );
}
