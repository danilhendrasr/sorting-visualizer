import { Select } from "@geist-ui/react"

const algorithms = ["Selection", "Insertion"]

export const AlgorithmSelector: React.FC<{
  selectedAlgorithm: string | string[]
  onChangeHandler: (algorithm: string | string[]) => void
}> = (props) => {
  let { selectedAlgorithm, onChangeHandler } = props

  const selectOptions = algorithms.map((algorithm, idx) => (
    <Select.Option key={idx} value={algorithm}>
      {`${algorithm} Sort`}
    </Select.Option>
  ))

  return (
    <Select
      onChange={(algorithm) => onChangeHandler(algorithm)}
      initialValue={selectedAlgorithm}>
      {selectOptions}
    </Select>
  )
}
