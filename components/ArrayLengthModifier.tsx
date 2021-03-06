import { Text, Slider } from "@geist-ui/react"

interface Props {
  containerClass: string
  disabled: boolean
  value: number
  onChange: (value: number) => void
}

export const ArrayLengthModifier: React.FC<Props> = (props): JSX.Element => {
  const { containerClass, disabled, value, onChange } = props

  return (
    <div className={containerClass}>
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
