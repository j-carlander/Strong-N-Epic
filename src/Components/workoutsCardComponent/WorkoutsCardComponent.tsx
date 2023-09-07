// import React from 'react'
import styles from "./workoutsCardComponent.module.css";
import { Workout } from "../../../Types/Workout";
import memoryService from "../../service/memoryService";
import { User } from "../../../Types/User";

interface workoutProps {
  workout: Workout;
}

export default function WorkoutsCardComponent({
  workout,
}: workoutProps): JSX.Element {
  const formattedStartTime: Date = new Date(workout.startTime);
  const endTime: Date = new Date(
    formattedStartTime.getTime() + workout.durationInMin * 60000
  );

  const currentUser = memoryService.getSessionValue("USER_INFO") as User;
  const token = memoryService.getSessionValue("JWT_TOKEN");

  let isDisabled: boolean;

  if (workout.participants.length >= workout.maxAllowedParticipants) {
    isDisabled = true;
  } else {
    isDisabled = false;
  }

  let isBooked: boolean = false;

  if (workout._id) isBooked = currentUser.bookedWorkouts.includes(workout._id);

  async function attendExercise(): Promise<void> {
    if (!workout._id || !currentUser) return;

    const url = "http://127.0.0.1:8000/api/workout";
    const headersList = {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    };
    const bodyContent = JSON.stringify({
      id: workout._id,
      participant: currentUser.username,
    });
    const options = {
      method: "PUT",
      headers: headersList,
      body: bodyContent,
    };

    const response = await fetch(url, options);
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
            onClick={attendExercise}
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
