import { useContext } from "react"
import { UserContext } from "./contextProvider"


export function useUserContext(): UserContext {
  return useContext(UserContext)
}