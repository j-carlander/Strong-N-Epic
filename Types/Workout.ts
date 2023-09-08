// import { User } from "./User";

export type WorkoutType = "Spinning" | "Aerobics" | "Gympa" | "Dans" | "Yoga";
export type City = "Norrtälje" | "Åkersberga";
export type Recurring = "just_once" | "every_week" | "every_other_week";

export interface Workout {
  _id: string | null;
  workoutType: WorkoutType;
  city: City;
  participants: string[];
  startTime: Date;
  maxAllowedParticipants: number;
  recurring: Recurring;
  durationInMin: number;
}

export interface FilterOptions {
  date: Date;
}

export const workoutTypes: WorkoutType[] = [
  "Spinning",
  "Aerobics",
  "Gympa",
  "Dans",
  "Yoga",
];

export const cities: City[] = ["Norrtälje", "Åkersberga"];

export const recurring: Recurring[] = [
  "just_once",
  "every_week",
  "every_other_week",
];
