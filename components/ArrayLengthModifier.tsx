// @ts-ignore
import styles from "../styles/Home.module.scss"

import { Text, Slider } from "@geist-ui/react"
import { useControlsDisabled } from "../hooks"

interface Props {
  value: number
  onChange: (value: number) => void
}

export const ArrayLengthModifier: React.FC<Props> = (props): JSX.Element => {
  const { value, onChange } = props
  const isControlsDisabled = useControlsDisabled()

  return (
    <div className={styles.sideBarInputContainer}>
      <Text>Length of array</Text>
      <Slider
        disabled={isControlsDisabled}
        max={100}
        min={10}
        onChange={onChange}
        showMarkers
        step={10}
        value={value}
      />
    </div>
  )
}
