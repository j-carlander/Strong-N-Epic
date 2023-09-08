import { useEffect, useState } from "react";
import { FilterOptions, Workout } from "../../../Types/Workout";
import WorkoutsCardComponent from "../workoutsCardComponent/WorkoutsCardComponent";
import fetchService, { PatchAction } from "../../service/fetchService";
import memoryService from "../../service/memoryService";
import { User } from "../../../Types/User";

const currentUser = memoryService.getSessionValue("USER_INFO") as User;

interface WorkoutListProps {
  filter: FilterOptions;
}

export function WorkoutsList({ filter }: WorkoutListProps): JSX.Element {
  const [workouts, setWorkouts] = useState([] as Workout[]);

  useEffect(() => {
    fetchService.getWorkouts().then(setWorkouts);
  }, []);

  async function handleWorkout(
    workout: Workout,
    action: PatchAction
  ): Promise<void> {
    if (!workout._id || !currentUser) return;

    const response = await fetchService.patchWorkout(
      workout._id,
      currentUser,
      action
    );
    if (response.status === 200) {
      currentUser.bookedWorkouts.push(workout._id);
      memoryService.saveSessionValue("USER_INFO", currentUser);
    }
    if (response.status === 204) {
      currentUser.bookedWorkouts = currentUser.bookedWorkouts.filter(
        (booking) => booking !== workout._id
      );
      memoryService.saveSessionValue("USER_INFO", currentUser);
    }
    fetchService.getWorkouts().then(setWorkouts);
  }

  return (
    <>
      {workouts.length > 0 &&
        workouts
          .filter((workout) =>
            currentUser.role === "ADMIN"
              ? workout
              : filter.date?.getDate() === new Date(workout.startTime).getDate()
          )
          .map((workout) => (
            <WorkoutsCardComponent
              key={workout._id}
              workout={workout}
              currentUser={currentUser}
              handleWorkout={handleWorkout}
            />
          ))}
    </>
  );
}
