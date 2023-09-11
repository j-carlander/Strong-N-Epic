import { useRef } from 'react';
import styles from "../WorkoutForm/WorkoutDialogForm.module.css";
import { PatchAction } from "../../service/fetchService";
import { useUserContext } from '../../Context/useContext';
import WorkoutsCardComponent from '../workoutsCardComponent/WorkoutsCardComponent';
import { Workout } from '../../../Types/Workout';

type Props = {
  workouts: Workout[];
  handleWorkout: (workout: Workout, action: PatchAction) => Promise<void>;
}

export default function BookedWorkouts({workouts, handleWorkout}: Props): JSX.Element {

  const dialogRef = useRef<HTMLDialogElement>(null);
  const currentUser = useUserContext();

  const filteredWorkouts = workouts.filter((workout) => currentUser.details.bookedWorkouts.includes(workout._id!));


    console.log(filteredWorkouts)

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
         {filteredWorkouts.map((workout) => <WorkoutsCardComponent key={workout._id} workout={workout} handleWorkout={handleWorkout} />)}
      </dialog>
    </div>
  )
}