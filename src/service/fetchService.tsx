import { User } from "../../Types/User";
import memoryService from "./memoryService";
import { Workout } from "../../Types/Workout";

const currentUser = memoryService.getSessionValue("USER_INFO") as User;
const token = memoryService.getSessionValue("JWT_TOKEN");

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

interface PutWorkoutProps {
  id: string;
}
async function putWorkout({ id }: PutWorkoutProps): Promise<void> {
  const uri = url + "/api/workout";

  const bodyContent = JSON.stringify({
    id: id,
    participant: currentUser.username,
  });
  const options = {
    method: "PUT",
    headers: headersList,
    body: bodyContent,
  };

  const response = await fetch(uri, options);
  if (response.status === 200) {
    currentUser.bookedWorkouts.push(id);
    memoryService.saveSessionValue("USER_INFO", currentUser);
  }
}

async function postWorkout(
  content: Workout,
  dialogRef: React.RefObject<HTMLDialogElement>
) {
  const url = "http://127.0.0.1:8000/api/workout";
  const headersList = {
    Authorization: "Bearer " + token,
    "Content-Type": "application/json",
  };
  const bodyContent = JSON.stringify({ ...content });
  const options = {
    method: "POST",
    headers: headersList,
    body: bodyContent,
  };

  const result = await fetch(url, options);
  if (result.status === 201) {
    dialogRef.current?.close();
    return result.json();
  }
  throw new Error("Wasn't able to POST a new workout");
}


async function getUsers() {
  const uri  = url + "/api/user";

  const options = {
    method: "GET",
    headers: headersList,
  };
  const result = await fetch(uri, options);
  if (result.status !== 200) throw new Error("No users found");
  const data = await result.json();

  return data;
}

export default { getWorkouts, putWorkout, postWorkout, getUsers };
