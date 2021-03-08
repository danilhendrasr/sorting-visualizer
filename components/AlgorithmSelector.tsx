import { Select, Text, Spacer } from "@geist-ui/react"
import { SortingAlgorithms } from "../types"

// @ts-ignore
import styles from "../styles/Home.module.scss"

const algorithms: SortingAlgorithms[] = ["Selection", "Insertion", "Bubble"]

interface Props {
  disabled: boolean
  selectedAlgorithm: SortingAlgorithms
  onChange: (algorithm: SortingAlgorithms) => void
}

export const AlgorithmSelector: React.FC<Props> = (props) => {
  let { disabled, selectedAlgorithm, onChange } = props

  const selectOptions = algorithms.map((algorithm, idx) => (
    <Select.Option key={idx} value={algorithm}>
      {`${algorithm} Sort`}
    </Select.Option>
  ))

  return (
    <div className={styles.sideBarInputContainer}>
      <Text>Select Algorithm</Text>
      <Spacer y={-0.4} />
      <Select
        disabled={disabled}
        onChange={(algorithm) => onChange(algorithm as SortingAlgorithms)}
        size="large"
        value={selectedAlgorithm}>
        {selectOptions}
      </Select>
    </div>
  )
}
