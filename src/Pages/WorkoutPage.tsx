import { DatePicker } from "../Components/DatePicker/DatePicker";
import { PageHeader } from "../Components/PageHeader/PageHeader";
import { WorkoutsList } from "../Components/WorkoutsList/WorkoutsList";

type Props = {
  loggedIn: boolean;
}

export function WorkoutPage({loggedIn}: Props): JSX.Element {
  return (
    <>
      <PageHeader loggedIn={loggedIn} />
      <DatePicker />
      <WorkoutsList />
    </>
  );
}
