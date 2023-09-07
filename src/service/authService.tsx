import { User } from "../../Types/User.js";
import memoryService from "./memoryService.js";


const baseURL = "http://127.0.0.1:8000"

async function login(user: User) {
  const url = baseURL + "/auth/login";
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: user.username,
      password: user.password,
    }),
  };

  const response = await fetch(url, fetchOptions);
  const data = await response.json();

  if (response.status === 200) {
    memoryService.saveSessionValue("JWT_TOKEN", data.jwt);
    memoryService.saveSessionValue("USER_INFO", data.details);
  }

  return { status: response.status, data };
}

async function registration(user: User) {
    const url = baseURL + "/auth/register";
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        age: user.age,
        email: user.email,
        firstname: user.firstname,
        gender: user.gender,
        lastname: user.lastname,
        password: user.password,
        phone: user.phone,
        username: user.username,
      }),
    };
    const response = await fetch(url, fetchOptions);
    const data = await response.json();
    return { status: response.status, data };
}

const authService = {registration, login}

export default authService;