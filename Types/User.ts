export type UserRole = "USER" | "ADMIN";

export interface User {
  username: string;
  role: UserRole;
}
