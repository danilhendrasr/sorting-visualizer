// @ts-ignore
import styles from "../styles/Home.module.scss"

import { Text, Spacer, ButtonGroup, Button } from "@geist-ui/react"
import { SortingSpeeds } from "../types"
import { useControlsDisabled } from "../hooks"
import { sortingSpeedTable } from "../constants"

const activeSortingSpeedBtn: React.CSSProperties = {
  backgroundColor: "#000",
  color: "#fff",
}

interface Props {
  sortingSpeed: keyof SortingSpeeds
  onSpeedChange: (speed: keyof SortingSpeeds) => void
}

export const SpeedControl: React.FC<Props> = ({ sortingSpeed, onSpeedChange }) => {
  const isControlsDisabled = useControlsDisabled()

  const controlButtons = Object.keys(sortingSpeedTable).map((key, idx) => {
    return (
      <Button
        key={idx}
        onClick={() => onSpeedChange(key as keyof SortingSpeeds)}
        style={sortingSpeed === key ? activeSortingSpeedBtn : undefined}>
        {key}
      </Button>
    )
  })

  return (
    <div className={styles.sideBarInputContainer}>
      <Text>Speed</Text>
      <Spacer y={-0.6} />
      <ButtonGroup disabled={isControlsDisabled} ghost size="small" type="secondary">
        {controlButtons}
      </ButtonGroup>
    </div>
  )
}
