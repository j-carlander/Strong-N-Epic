export type UserRole = "USER" | "ADMIN";

export type Gender = "I prefer not to say" | "Male" | "Female" | "Other";


export interface User {
  _id: "string";
  username: string;
  role: UserRole;
}

export interface LoginUser {
  username: string;
  password: string;
}

export interface RegUser {
  firstname: string;
  lastname: string;
  gender: Gender;
  age: number;
  email: string;
  phone: number | string;
  username: string;
  password: string;
}

