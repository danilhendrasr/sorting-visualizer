// @ts-ignore
import styles from "../styles/Home.module.scss"

import { Select, Text, Spacer } from "@geist-ui/react"
import { SortingAlgorithms } from "../types"
import { useControlsDisabled } from "../hooks"

const algorithms: SortingAlgorithms[] = ["Selection", "Insertion", "Bubble"]

interface Props {
  selectedAlgorithm: SortingAlgorithms
  onChange: (algorithm: SortingAlgorithms) => void
}

export const AlgorithmSelector: React.FC<Props> = (props) => {
  let { selectedAlgorithm, onChange } = props
  const isControlsDisabled = useControlsDisabled()

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
        disabled={isControlsDisabled}
        onChange={(algorithm) => onChange(algorithm as SortingAlgorithms)}
        size="large"
        value={selectedAlgorithm}>
        {selectOptions}
      </Select>
    </div>
  )
}
