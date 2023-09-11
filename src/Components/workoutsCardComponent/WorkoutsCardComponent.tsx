// import React from 'react'
import styles from "./workoutsCardComponent.module.css";
import { Workout } from "../../../Types/Workout";
import { PatchAction } from "../../service/fetchService";
import { useUserContext } from "../../Context/useContext";
import { useLocation } from "react-router-dom";
// import memoryService from "../../service/memoryService";
// import fetchService from "../../service/fetchService";
// import { useEffect, useState } from "react";

interface workoutProps {
  workout: Workout;
  handleWorkout: (workout: Workout, action: PatchAction) => Promise<void>;
  // cancelWorkout: (workout: Workout) => Promise<void>;
}

export default function WorkoutsCardComponent({
  workout,
  handleWorkout,
}: workoutProps): JSX.Element {
  const currentUser = useUserContext();
  const location = useLocation();

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

  if (workout._id)
    isBooked = currentUser.details.bookedWorkouts.includes(workout._id);

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
      {currentUser.details.role === "ADMIN" &&
      location.pathname === "/admin" ? (
        <details className={styles.details}>
          <summary>Participants</summary>
          {workout.participants.map((participant) => (
            <p key={participant}>{participant}</p>
          ))}
        </details>
      ) : (
        <div className={styles.container}>
          {!isBooked ? (
            <button
              className={styles.workoutsComponentButton}
              onClick={() => handleWorkout(workout, "BOOK")}
              disabled={isDisabled}>
              Book
            </button>
          ) : (
            <button
              className={styles.workoutsComponentButtonCancel}
              onClick={() => handleWorkout(workout, "CANCEL")}>
              Cancel
            </button>
          )}
          <p className={styles.workoutsComponentCity}>
            &#x1F588;{workout.city}
          </p>
        </div>
      )}
    </article>
  );
}
