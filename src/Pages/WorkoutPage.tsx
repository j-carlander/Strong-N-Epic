import { DatePicker } from "../Components/DatePicker/DatePicker";
import { PageHeader } from "../Components/PageHeader/PageHeader";
import { WorkoutsList } from "../Components/WorkoutsList/WorkoutsList";

export function WorkoutPage(): JSX.Element {
  return (
    <>
      <PageHeader />
      <DatePicker />
      <WorkoutsList />
    </>
  );
}
