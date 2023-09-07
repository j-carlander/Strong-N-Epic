import { useEffect, useState } from "react";
import { Workout } from "../../../Types/Workout";
import WorkoutsCardComponent from "../workoutsCardComponent/WorkoutsCardComponent";
import fetchService from "../../service/fetchService";

export function WorkoutsList(): JSX.Element {
  const [workouts, setWorkouts] = useState([] as Workout[]);

  useEffect(() => {
    fetchService.getWorkouts().then(setWorkouts);
  }, []);

  return (
    <>
      {workouts.length > 0 &&
        workouts.map((workout) => (
          <WorkoutsCardComponent key={workout._id} workout={workout} />
        ))}
    </>
  );
}
