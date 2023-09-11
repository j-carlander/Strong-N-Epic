import { useContext } from "react"
import { UserContext } from "./contextProvider"



export function useUserContext() {
  return useContext(UserContext)
}