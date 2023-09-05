export type UserRole = "USER" | "ADMIN";

export type gender = "I prefer not to say" | "Male" | "Female" | "Other";

export interface AuthUser {
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
  gender: gender;
  age: number;
  email: string;
  phone: number | string;
  username: string;
  password: string;
}

