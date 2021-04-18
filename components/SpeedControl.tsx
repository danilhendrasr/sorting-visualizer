// @ts-ignore
import styles from "../styles/Home.module.scss"

import { Text, Spacer, ButtonGroup, Button } from "@geist-ui/react"
import { SortingSpeeds } from "../types"
import { useShouldDisableControlPanel } from "../hooks"
import { sortingSpeedTable } from "../constants"

interface Props {
  sortingSpeed: keyof SortingSpeeds
  onSortingSpeedChange: (newSpeed: keyof SortingSpeeds) => void
}

const SpeedControl: React.FC<Props> = ({
  sortingSpeed,
  onSortingSpeedChange,
}) => {
  const disable = useShouldDisableControlPanel()
  const controlButtons = getSpeedCtrlBtns(sortingSpeed, onSortingSpeedChange)

  return (
    <div className={styles.sideBarInputContainer}>
      <Text>Speed</Text>
      <Spacer y={-0.6} />
      <ButtonGroup disabled={disable} ghost size="small" type="secondary">
        {controlButtons}
      </ButtonGroup>
    </div>
  )
}

/**
 * Generate speed control buttons
 * @param currentSpeed Current sorting speed, used to determine which button to activate out of the 3
 * @param onSpeedChange Function to be called on any button's click
 * @returns 3 buttons in JSX form
 */
const getSpeedCtrlBtns = (
  currentSpeed: Props["sortingSpeed"],
  onSpeedChange: Props["onSortingSpeedChange"]
) => {
  const activeSpeedCtrlBtnStyles: React.CSSProperties = {
    backgroundColor: "#000",
    color: "#fff",
  }

  const speedTableKeys = Object.keys(
    sortingSpeedTable
  ) as (keyof SortingSpeeds)[]

  const speedCtrlBtns = speedTableKeys.map((currentKey, idx) => (
    <Button
      key={idx}
      onClick={() => onSpeedChange(currentKey)}
      style={
        currentSpeed === currentKey ? activeSpeedCtrlBtnStyles : undefined
      }>
      {currentKey}
    </Button>
  ))

  return speedCtrlBtns
}

export { SpeedControl }
