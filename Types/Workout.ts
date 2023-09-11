export type WorkoutType = "Spinning" | "Aerobics" | "Gympa" | "Dans" | "Yoga" | "Boxning";
export type City = "Norrtälje" | "Åkersberga" | "Stockholm" | "Vallentuna";

export type Recurring = "just_once" | "every_week" | "every_other_week";

export interface Workout {
  _id: string;
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
  "Boxning"
];

export const cities: City[] = ["Norrtälje", "Åkersberga", "Stockholm", "Vallentuna"];

export const recurring: Recurring[] = [
  "just_once",
  "every_week",
  "every_other_week",
];
