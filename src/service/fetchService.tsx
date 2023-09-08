import { User } from "../../Types/User";
import memoryService from "./memoryService";
import { Workout } from "../../Types/Workout";

const token = memoryService.getSessionValue("JWT_TOKEN") as string;

const url = "http://127.0.0.1:8000";

const headersList = {
  Authorization: "Bearer " + token,
  "Content-Type": "application/json",
};

async function getWorkouts(): Promise<Workout[]> {
  const uri = url + "/api/workout";
  const options = {
    method: "GET",
    headers: headersList,
  };
  const result = await fetch(uri, options);
  if (result.status !== 200) throw new Error("No workouts found");

  return await result.json();
}

export type PatchAction = "BOOK" | "CANCEL";

async function patchWorkout(
  workoutId: string,
  currentUser: User,
  action: PatchAction
): Promise<Response> {
  const uri = url + "/api/workout/" + action;

  const bodyContent = JSON.stringify({
    id: workoutId,
    participant: currentUser.username,
  });
  const options = {
    method: "PATCH",
    headers: headersList,
    body: bodyContent,
  };
  return await fetch(uri, options);
}

async function postWorkout(content: Workout): Promise<Response> {
  const url = "http://127.0.0.1:8000/api/workout";

  const bodyContent = JSON.stringify({ ...content });
  const options = {
    method: "POST",
    headers: headersList,
    body: bodyContent,
  };
  return await fetch(url, options);
}

async function getUsers() {
  const uri = url + "/api/user";

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
