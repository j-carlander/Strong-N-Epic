import { useContext } from "react"
import { AuthContext, UserContext } from "./contextProvider"


export function useAuthContext() {
  return useContext(AuthContext)
}

export function useUserContext() {
  return useContext(UserContext)
}