export type UserRole = "USER" | "ADMIN";

export interface User {
  _id: "string";
  username: string;
  role: UserRole;
}
