import { createContext } from "react"

interface AppStateCtx {
  disableControlForms: boolean
}

export const AppStateContext = createContext<AppStateCtx>(undefined)
