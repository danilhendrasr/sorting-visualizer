import { useContext } from "react"
import { AppStateContext } from "../contexts/app-state"

/**
 * See if any form of sorting controls should be disabled
 * @returns Are controls should be disabled
 */
const useControlsDisabled = () => {
  const sortingState = useContext(AppStateContext).sortingState
  const isControlsDisabled = sortingState === "Sorting"
  return isControlsDisabled
}

export { useControlsDisabled }
