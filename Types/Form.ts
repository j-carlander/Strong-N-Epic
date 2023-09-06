import { ChangeEvent, MouseEvent } from "react";

export type InputEvent = ChangeEvent<HTMLInputElement>;
export type SelectEvent = ChangeEvent<HTMLSelectElement>;
export type ButtonEvent = MouseEvent<HTMLButtonElement>;

export type FormState = "LOGIN" | "REGISTER";