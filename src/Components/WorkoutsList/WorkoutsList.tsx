import { useEffect, useState } from "react";
import { Workout } from "../../../Types/Workout";
import WorkoutsCardComponent from "../workoutsCardComponent/WorkoutsCardComponent";
import fetchService, { PatchAction } from "../../service/fetchService";
import memoryService from "../../service/memoryService";
import { User } from "../../../Types/User";

const currentUser = memoryService.getSessionValue("USER_INFO") as User;

export function WorkoutsList(): JSX.Element {
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

  // async function cancelWorkout(workout: Workout): Promise<void> {
  //   if (!workout._id || !currentUser) return;

  //   const response = await fetchService.patchWorkout(
  //     workout._id,
  //     currentUser,
  //     "CANCEL"
  //   );
  //   if (response.status === 200) {
  //     currentUser.bookedWorkouts = currentUser.bookedWorkouts.filter(
  //       (booking) => booking !== workout._id
  //     );
  //     memoryService.saveSessionValue("USER_INFO", currentUser);
  //   }
  // }

  return (
    <>
      {workouts.length > 0 &&
        workouts.map((workout) => (
          <WorkoutsCardComponent
            key={workout._id}
            workout={workout}
            currentUser={currentUser}
            handleWorkout={handleWorkout}
            // cancelWorkout={cancelWorkout}
          />
        ))}
    </>
  );
}
