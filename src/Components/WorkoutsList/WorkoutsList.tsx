import { Workout } from "../../../Types/Workout";
import WorkoutsCardComponent from "../workoutsCardComponent/WorkoutsCardComponent";

interface WorkoutListProps {
  workouts: Workout[];
}

export function WorkoutsList({ workouts }: WorkoutListProps): JSX.Element {

  return (
    <>
      {workouts.length > 0 &&
        workouts
          .map((workout) => (
            <WorkoutsCardComponent
              key={workout._id}
              workout={workout}
            />
          ))}
    </>
  );
}
