import { UserDetails } from "../../Types/User";
import { Workout } from "../../Types/Workout";
import fetchService, { PatchAction } from "../service/fetchService";
import memoryService from "../service/memoryService";


export async function handleWorkout(
  workout: Workout,
  currentUser: {
    details: UserDetails,
    setDetails: (details: UserDetails) => void,
  },
  action: PatchAction
): Promise<void> {

  const sessionUser = memoryService.getSessionValue("USER_INFO") as UserDetails;

  const token = sessionUser.jwt;
  const username = sessionUser.username;
  
  const response = await fetchService.patchWorkout(token, workout._id, username, action);

  if (response.status === 200) {
    sessionUser.bookedWorkouts.push(workout._id);
    memoryService.saveSessionValue("USER_INFO", sessionUser);
    currentUser.setDetails({
      ...currentUser.details,
      bookedWorkouts: [...currentUser.details.bookedWorkouts, workout._id],
    });
  }
  if (response.status === 204) {
    const bookedWorkouts = currentUser.details.bookedWorkouts.filter(
      (booking) => booking !== workout._id
    );
    memoryService.saveSessionValue("USER_INFO", {
      ...currentUser.details,
      bookedWorkouts: bookedWorkouts,
    });
    currentUser.setDetails({
      ...currentUser.details,
      bookedWorkouts: bookedWorkouts,
    });
  }
}