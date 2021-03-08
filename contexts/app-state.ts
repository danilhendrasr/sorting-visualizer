import { createContext } from "react"
import { SortingState } from "../types"

interface AppStateCtx {
  sortingState: SortingState
}

export const AppStateContext = createContext<AppStateCtx>(undefined)
