import { useState, useEffect } from "react";
import { Navigate } from 'react-router-dom';
import { DatePicker } from "../Components/DatePicker/DatePicker";
import { PageHeader } from "../Components/PageHeader/PageHeader";
import { WorkoutsList } from "../Components/WorkoutsList/WorkoutsList";
import { useUserContext } from "../Context/useContext";
import fetchService from "../service/fetchService";
import { Workout } from "../../Types/Workout";
import BookedWorkouts from "../Components/BookedWorkouts/BookedWorkouts";

export function WorkoutPage(): JSX.Element {

  const currentUser = useUserContext();

  const [chosenDate, setChosenDate] = useState<Date>(new Date());
  const [workouts, setWorkouts] = useState([] as Workout[]);
  
  const token = currentUser.details.jwt;

  useEffect(() => {
    fetchService.getWorkouts(token).then(setWorkouts);
  }, [token, currentUser.details.bookedWorkouts]);

  if(!currentUser.details.jwt) return <Navigate to={"/login"}/>

  const filteredWorkouts = workouts.filter((workout) => chosenDate.toDateString() === new Date(workout.startTime).toDateString());
  const bookedWorkouts = workouts.filter((workout) => currentUser.details.bookedWorkouts.includes(workout._id));
 
  return (
    <>
      <PageHeader />
      <BookedWorkouts workouts={bookedWorkouts} setWorkouts={setWorkouts}/>
      <DatePicker chosenDate={chosenDate} setChosenDate={setChosenDate} />
      <WorkoutsList workouts={filteredWorkouts}/>
    </>
  );
}
