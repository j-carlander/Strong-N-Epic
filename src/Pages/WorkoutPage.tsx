import { DatePicker } from "../Components/DatePicker/DatePicker";
import { WorkoutsList } from "../Components/WorkoutsList/WorkoutsList";

export function WorkoutPage(): JSX.Element {
  return (
    <>
      <h2>GymBros</h2>
      <h1>Strong-N-Epic</h1>
      <DatePicker />
      <WorkoutsList />
    </>
  );
}
