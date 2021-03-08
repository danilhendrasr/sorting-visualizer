import { Text, Spacer, ButtonGroup, Button } from "@geist-ui/react"
import { SortingSpeeds, SortingState } from "../types"

// @ts-ignore
import styles from "../styles/Home.module.scss"
import { sortingSpeedTable } from "../utils"

const activeSortingSpeedBtn: React.CSSProperties = {
  backgroundColor: "#000",
  color: "#fff",
}

interface Props {
  sortingSpeed: keyof SortingSpeeds
  sortState: SortingState
  onSpeedChange: (speed: keyof SortingSpeeds) => void
}

export const SpeedControl: React.FC<Props> = (props) => {
  const { sortingSpeed, sortState, onSpeedChange } = props

  const controlButtons = Object.keys<SortingSpeeds>(sortingSpeedTable).map((key, idx) => {
    return (
      <Button
        key={idx}
        onClick={() => onSpeedChange(key)}
        style={sortingSpeed === key ? activeSortingSpeedBtn : undefined}>
        {key}
      </Button>
    )
  })

  return (
    <div className={styles.sideBarInputContainer}>
      <Text>Speed</Text>
      <Spacer y={-0.6} />
      <ButtonGroup disabled={sortState === "Sorting"} ghost size="small" type="secondary">
        {controlButtons}
      </ButtonGroup>
    </div>
  )
}
