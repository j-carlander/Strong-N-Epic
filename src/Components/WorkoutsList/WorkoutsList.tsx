import { useEffect, useState } from "react";
import { Workout } from "../../../Types/Workout";
import WorkoutsCardComponent from "../workoutsCardComponent/WorkoutsCardComponent";
import fetchService from "../../service/fetchService";
import memoryService from "../../service/memoryService";
import { User } from "../../../Types/User";

const currentUser = memoryService.getSessionValue("USER_INFO") as User;

export function WorkoutsList(): JSX.Element {
  const [workouts, setWorkouts] = useState([] as Workout[]);

  useEffect(() => {
    fetchService.getWorkouts().then(setWorkouts);
  }, []);

  return (
    <>
      {workouts.length > 0 &&
        workouts.map((workout) => (
          <WorkoutsCardComponent
            key={workout._id}
            workout={workout}
            currentUser={currentUser}
          />
        ))}
    </>
  );
}
