import { Select, Text, Spacer } from "@geist-ui/react"
import { SortingAlgorithms } from "../types"

const algorithms: SortingAlgorithms[] = ["Selection", "Insertion", "Bubble"]

export const AlgorithmSelector: React.FC<{
  disabled: boolean
  containerClass: string
  selectedAlgorithm: string | string[]
  onChangeHandler: (algorithm: string | string[]) => void
}> = (props) => {
  let { disabled, containerClass, selectedAlgorithm, onChangeHandler } = props

  const selectOptions = algorithms.map((algorithm, idx) => (
    <Select.Option key={idx} value={algorithm}>
      {`${algorithm} Sort`}
    </Select.Option>
  ))

  return (
    <div className={containerClass}>
      <Text>Select Algorithm</Text>
      <Spacer y={-0.4} />
      <Select
        disabled={disabled}
        value={selectedAlgorithm}
        onChange={(algorithm) => onChangeHandler(algorithm)}
        size="large">
        {selectOptions}
      </Select>
    </div>
  )
}
