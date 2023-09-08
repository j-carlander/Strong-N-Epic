import { useState } from "react";
import { Navigate } from 'react-router-dom';
import { DatePicker } from "../Components/DatePicker/DatePicker";
import { PageHeader } from "../Components/PageHeader/PageHeader";
import { WorkoutsList } from "../Components/WorkoutsList/WorkoutsList";
import { useUserContext } from "../Context/useContext";

export function WorkoutPage(): JSX.Element {
  const [chosenDate, setChosenDate] = useState<Date>(new Date());
  const currentUser = useUserContext();

  if(!currentUser.details.jwt) return <Navigate to={"/login"}/>
  

  return (
    <>
      <PageHeader />
      <DatePicker chosenDate={chosenDate} setChosenDate={setChosenDate} />
      <WorkoutsList filter={{ date: chosenDate }} />
    </>
  );
}
