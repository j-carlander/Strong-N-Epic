import { Workout } from "../../Types/Workout";

const url = "http://127.0.0.1:8000";

async function getWorkouts(token: string): Promise<Workout[]> {
  const uri = url + "/api/workout";
  const headersList = {
    Authorization: "Bearer " + token,
    "Content-Type": "application/json",
  };
  const options = {
    method: "GET",
    headers: headersList,
  };
  const result = await fetch(uri, options);
  if (result.status !== 200) throw new Error("No workouts found");

  return await result.json();
}

export type PatchAction = "BOOK" | "CANCEL";

async function patchWorkout(token: string,
  workoutId: string,
  username: string,
  action: PatchAction
): Promise<Response> {
  const uri = url + "/api/workout/" + action;

  const bodyContent = JSON.stringify({
    id: workoutId,
    participant: username,
  });
  const headersList = {
    Authorization: "Bearer " + token,
    "Content-Type": "application/json",
  };
  const options = {
    method: "PATCH",
    headers: headersList,
    body: bodyContent,
  };
  return await fetch(uri, options);
}

async function postWorkout(token: string, content: Workout): Promise<Response> {
  const url = "http://127.0.0.1:8000/api/workout";

  const bodyContent = JSON.stringify({ ...content });
  const headersList = {
    Authorization: "Bearer " + token,
    "Content-Type": "application/json",
  };
  const options = {
    method: "POST",
    headers: headersList,
    body: bodyContent,
  };
  return await fetch(url, options);
}

async function getUsers(token: string) {
  const uri = url + "/api/user";
  const headersList = {
    Authorization: "Bearer " + token,
    "Content-Type": "application/json",
  };
  const options = {
    method: "GET",
    headers: headersList,
  };
  const result = await fetch(uri, options);
  if (result.status !== 200) throw new Error("No users found");
  const data = await result.json();

  return data;
}

export default { getWorkouts, patchWorkout, postWorkout, getUsers };
