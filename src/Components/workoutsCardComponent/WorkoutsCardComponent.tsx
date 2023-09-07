// import React from 'react'
import styles from "./workoutsCardComponent.module.css";
import { Workout } from "../../../Types/Workout";
import memoryService from "../../service/memoryService";
import { User } from "../../../Types/User";
import fetchService from "../../service/fetchService";

interface workoutProps {
  workout: Workout;
  currentUser: User;
}

export default function WorkoutsCardComponent({
  workout,
  currentUser,
}: workoutProps): JSX.Element {
  const formattedStartTime: Date = new Date(workout.startTime);
  const endTime: Date = new Date(
    formattedStartTime.getTime() + workout.durationInMin * 60000
  );

  let isDisabled: boolean;

  if (workout.participants.length >= workout.maxAllowedParticipants) {
    isDisabled = true;
  } else {
    isDisabled = false;
  }

  let isBooked: boolean = false;

  if (workout._id) isBooked = currentUser.bookedWorkouts.includes(workout._id);

  async function bookExercise(): Promise<void> {
    if (!workout._id || !currentUser) return;

    const response = await fetchService.putWorkout(workout._id, currentUser);
    if (response.status === 200) {
      currentUser.bookedWorkouts.push(workout._id);
      memoryService.saveSessionValue("USER_INFO", currentUser);
    }
  }

  function cancelExercise() {
    console.log("Hej då");
  }

  return (
    <article className={styles.workoutsComponent}>
      <div className={styles.container}>
        <h3 className={styles.workoutsComponentHeader}>
          {workout.workoutType}
        </h3>
        <p className={styles.workoutsComponentTime}>
          {formattedStartTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}{" "}
          -{" "}
          {endTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        <p className={styles.workoutsComponentSpots}>
          {formattedStartTime.toLocaleDateString()}
        </p>
        <p className={styles.workoutsComponentSpots}>
          {workout.maxAllowedParticipants - workout.participants.length} spots
          available (of {workout.maxAllowedParticipants})
        </p>
      </div>
      <div className={styles.container}>
        {!isBooked ? (
          <button
            className={styles.workoutsComponentButton}
            onClick={bookExercise}
            disabled={isDisabled}>
            Book
          </button>
        ) : (
          <button
            className={styles.workoutsComponentButtonCancel}
            onClick={cancelExercise}
            disabled={isDisabled}>
            Cancel
          </button>
        )}
        <p className={styles.workoutsComponentCity}>&#x1F588;{workout.city}</p>
      </div>
    </article>
  );
}
