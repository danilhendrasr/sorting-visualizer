// @ts-ignore
import styles from "../styles/Home.module.scss"

import { Text, Slider } from "@geist-ui/react"
import { useShouldDisableControlPanel } from "../hooks"

interface Props {
  value: number
  onChange: (value: number) => void
}

export const ArrayLengthModifier: React.FC<Props> = ({ value, onChange }) => {
  const disable = useShouldDisableControlPanel()

  return (
    <div className={styles.sideBarInputContainer}>
      <Text>Length of array</Text>
      <Slider
        disabled={disable}
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
