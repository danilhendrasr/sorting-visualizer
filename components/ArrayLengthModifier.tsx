import { Text, Slider } from "@geist-ui/react"

// @ts-ignore
import styles from "../styles/Home.module.scss"

interface Props {
  disabled: boolean
  value: number
  onChange: (value: number) => void
}

export const ArrayLengthModifier: React.FC<Props> = (props): JSX.Element => {
  const { disabled, value, onChange } = props

  return (
    <div className={styles.sideBarInputContainer}>
      <Text>Length of array</Text>
      <Slider
        disabled={disabled}
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
