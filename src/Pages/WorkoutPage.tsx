import { useState } from "react";
import { DatePicker } from "../Components/DatePicker/DatePicker";
import { PageHeader } from "../Components/PageHeader/PageHeader";
import { WorkoutsList } from "../Components/WorkoutsList/WorkoutsList";

export function WorkoutPage(): JSX.Element {
  const [chosenDate, setChosenDate] = useState<Date>(new Date());
  return (
    <>
      <PageHeader />
      <DatePicker chosenDate={chosenDate} setChosenDate={setChosenDate} />
      <WorkoutsList filter={{ date: chosenDate }} />
    </>
  );
}
