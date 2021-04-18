import { useContext } from "react"
import { AppStateContext } from "../contexts/app-state"

/**
 * See if control panel should be disabled
 * @returns Should control panel be disabled
 */
const useShouldDisableControlPanel = () => {
  const sortingState = useContext(AppStateContext).sortingState
  const shouldDisableControls = sortingState === "Sorting"
  return shouldDisableControls
}

export { useShouldDisableControlPanel }
