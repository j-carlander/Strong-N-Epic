import { ChangeEvent } from 'react';

export type UserRole = "USER" | "ADMIN";

export type InputEvent = ChangeEvent<HTMLInputElement>

export interface AuthUser {
  username: string;
  role: UserRole;
}

