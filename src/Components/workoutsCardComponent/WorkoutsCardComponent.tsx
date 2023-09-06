// import React from 'react'
import styles from "./workoutsCardComponent.module.css";
import { Workout } from "../../../Types/Workout";

interface workoutProps {
  workout: Workout;
}

export default function WorkoutsCardComponent({ workout }: workoutProps): JSX.Element {
  const formattedStartTime: Date = new Date(workout.startTime)
  const endTime: Date = new Date(formattedStartTime.getTime() + workout.durationInMin * 60000)
  let isDisabled: boolean;

  if (workout.participants.length >= workout.maxAllowedParticipants) { isDisabled = true; } else { isDisabled = false; }

  return (
    <article className={styles.workoutsComponent}>
      <div className={styles.container}>
        <h3 className={styles.workoutsComponentHeader}>{workout.workoutType}</h3>
        <p className={styles.workoutsComponentTime}>{formattedStartTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})} - {endTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</p>
        <p className={styles.workoutsComponentSpots}>{formattedStartTime.toLocaleDateString()}</p>
        <p className={styles.workoutsComponentSpots}>{workout.maxAllowedParticipants - workout.participants.length} spots available (of {workout.maxAllowedParticipants})</p>
      </div>
      <div className={styles.container}>
        <button className={styles.workoutsComponentButton} disabled={isDisabled}>Book</button>
        <p className={styles.workoutsComponentCity}>&#x1F588;{workout.city}</p>
      </div>
    </article>
  );
}