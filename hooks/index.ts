import { useContext } from "react"
import { AppStateContext } from "../contexts/app-state"

const useControlsDisabled = () => {
  const sortingState = useContext(AppStateContext).sortingState
  const isControlsDisabled = sortingState === "Sorting"
  return isControlsDisabled
}

export { useControlsDisabled }
