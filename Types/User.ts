export type UserRole = "USER" | "ADMIN";

export type Gender = "I prefer not to say" | "Male" | "Female" | "Other";

export interface User {
  firstname: string;
  lastname: string;
  gender: Gender;
  age: number;
  email: string;
  phone: number | string;
  username: string;
  password: string;
  role: UserRole;
  bookedWorkouts: string[];
}

export type UserDetails = {
  jwt: string;
  role: UserRole;
  username: string;
  bookedWorkouts: string[];
};
