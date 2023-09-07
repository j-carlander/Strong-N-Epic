import { useEffect, useState } from "react";
import { Workout } from "../../../Types/Workout";
import WorkoutsCardComponent from "../workoutsCardComponent/WorkoutsCardComponent";

// TODO: Remove and use session storage
const testToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkpvcnJlQWRtaW4iLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE2OTM5MTE2MTUsImlzcyI6IlRvRG8gUmVhY3QgVFMiLCJzdWIiOiJzZW5kIGFuZCByZWNlaXZlIGFjY2VzcyB0b2tlbiJ9.coIBFkEiBMBTwwU_bHyafPPDVCbCFNswNW3-Eeqrupk";

export function WorkoutsList(): JSX.Element {
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  useEffect(() => {
    async function fetchWorkouts(): Promise<void> {
      const url = "http://127.0.0.1:8000/api/workout";
      const headersList = {
        Authorization: "Bearer " + testToken,
      };
      const options = {
        method: "GET",
        headers: headersList,
      };
      const result = await fetch(url, options);
      if (result.status !== 200) throw new Error("No workouts found");
      const data = await result.json();

      setWorkouts(data);
    }

    fetchWorkouts();
  }, []);
  return (
    <>
      {workouts.length > 0 &&
        workouts.map((workout) => (
          <WorkoutsCardComponent key={workout._id} workout={workout} />
        ))}
    </>
  );
}
