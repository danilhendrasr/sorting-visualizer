import { useContext } from "react"
import { AppStateContext } from "../contexts/app-state"

const useControlsDisabled = () => {
  const isDisabled = useContext(AppStateContext).disableControlForms
  return isDisabled
}

export { useControlsDisabled }
