import { useRef } from 'react';
import styles from "../WorkoutForm/WorkoutDialogForm.module.css";
import WorkoutsCardComponent from '../workoutsCardComponent/WorkoutsCardComponent';
import { Workout } from '../../../Types/Workout';

type Props = {
  workouts: Workout[];
  setWorkouts: (setWorkouts: Workout[]) => void;
}

export default function BookedWorkouts({workouts, setWorkouts}: Props): JSX.Element {

  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <div>
      <button 
      onClick={() => dialogRef.current?.showModal()}
      className={styles["open-btn"]}
      >Booked workouts</button>
      <dialog ref={dialogRef} className={styles["workout-dialog"]}>
        <h5>My booked workouts</h5>
        <button 
        onClick={() => dialogRef.current?.close()}
        className={styles["close-btn"]}
        >&#10006;</button>
         {workouts.map((workout) => <WorkoutsCardComponent key={workout._id} workout={workout} setWorkouts={setWorkouts} />)}
      </dialog>
    </div>
  )
}