import { Select } from "@geist-ui/react"
import { SortingAlgorithms } from "../types"

const algorithms: SortingAlgorithms[] = ["Selection", "Insertion", "Bubble"]

export const AlgorithmSelector: React.FC<{
  disabled: boolean
  selectedAlgorithm: string | string[]
  onChangeHandler: (algorithm: string | string[]) => void
}> = (props) => {
  let { disabled, selectedAlgorithm, onChangeHandler } = props

  const selectOptions = algorithms.map((algorithm, idx) => (
    <Select.Option key={idx} value={algorithm}>
      {`${algorithm} Sort`}
    </Select.Option>
  ))

  return (
    <Select
      disabled={disabled}
      initialValue={selectedAlgorithm}
      onChange={(algorithm) => onChangeHandler(algorithm)}
      size="large">
      {selectOptions}
    </Select>
  )
}
