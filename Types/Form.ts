import { ChangeEvent } from "react";

export type InputEvent = ChangeEvent<HTMLInputElement>;
export type SelectEvent = ChangeEvent<HTMLSelectElement>

export type FormState = "LOGIN" | "REGISTER";