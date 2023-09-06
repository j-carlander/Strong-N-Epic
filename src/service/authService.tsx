import memoryService from "./memoryService.js";
import { LoginUser, RegUser } from "../../Types/User.js";

const baseURL = "http://127.0.0.1:8000"

async function login(loginUser: LoginUser) {
  const url = baseURL + "/auth/login";
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: loginUser.username,
      password: loginUser.password,
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

async function registration(regUser: RegUser) {
    const url = baseURL + "/auth/register";
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        age: regUser.age,
        email: regUser.email,
        firstname: regUser.firstname,
        gender: regUser.gender,
        lastname: regUser.lastname,
        password: regUser.password,
        phone: regUser.phone,
        username: regUser.username,
      }),
    };
    const response = await fetch(url, fetchOptions);
    const data = await response.json();
    return { status: response.status, data };
}

const authService = {registration, login}

export default authService;