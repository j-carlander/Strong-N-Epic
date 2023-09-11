import { useEffect, useState } from "react";
import { FilterOptions, Workout } from "../../../Types/Workout";
import WorkoutsCardComponent from "../workoutsCardComponent/WorkoutsCardComponent";
import fetchService, { PatchAction } from "../../service/fetchService";
import { useUserContext } from "../../Context/useContext";
import memoryService from "../../service/memoryService";
import { useLocation } from "react-router-dom";

interface WorkoutListProps {
  filter: FilterOptions;
}

export function WorkoutsList({ filter }: WorkoutListProps): JSX.Element {
  const [workouts, setWorkouts] = useState([] as Workout[]);

  const location = useLocation();

  const currentUser = useUserContext();
  const token = currentUser.details.jwt;

  useEffect(() => {
    fetchService.getWorkouts(token).then(setWorkouts);
  }, [token]);

  async function handleWorkout(
    workout: Workout,
    action: PatchAction
  ): Promise<void> {
    if (!workout._id || !currentUser) return;

    const response = await fetchService.patchWorkout(
      token,
      workout._id,
      currentUser.details.username,
      action
    );

    const sessionUser = memoryService.getSessionValue("USER_INFO");

    if (response.status === 200) {
      sessionUser.bookedWorkouts.push(workout._id);
      memoryService.saveSessionValue("USER_INFO", sessionUser);
      currentUser.setDetails({
        ...currentUser.details,
        bookedWorkouts: [...currentUser.details.bookedWorkouts, workout._id],
      });
    }
    if (response.status === 204) {
      const bookedWorkouts = currentUser.details.bookedWorkouts.filter(
        (booking) => booking !== workout._id
      );
      memoryService.saveSessionValue("USER_INFO", {
        ...currentUser.details,
        bookedWorkouts: bookedWorkouts,
      });
      currentUser.setDetails({
        ...currentUser.details,
        bookedWorkouts: bookedWorkouts,
      });
    }
    fetchService.getWorkouts(token).then(setWorkouts);
  }

  return (
    <>
      {workouts.length > 0 &&
        workouts
          .filter((workout) =>
            currentUser.details.role === "ADMIN" &&
            location.pathname === "/admin"
              ? workout
              : filter.date.toDateString() ===
                new Date(workout.startTime).toDateString()
          )
          .map((workout) => (
            <WorkoutsCardComponent
              key={workout._id}
              workout={workout}
              handleWorkout={handleWorkout}
            />
          ))}
    </>
  );
}
