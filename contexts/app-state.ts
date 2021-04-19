import { GeistUIThemes } from "@geist-ui/react"
import { createContext } from "react"
import { BarColorPalette, SortingState } from "../types"

interface AppStateCtx {
  sortingState: SortingState
}

export const AppStateContext = createContext<AppStateCtx>(undefined)

export const BarPaletteCtx = createContext<BarColorPalette>(undefined)
