// @ts-ignore
import styles from "../styles/Home.module.scss"

import { Select, Text, Spacer } from "@geist-ui/react"
import { SortingAlgorithms } from "../types"
import { useShouldDisableControlPanel } from "../hooks"
import { ALGORITHMS_LIST } from "../constants"

interface Props {
  selected: SortingAlgorithms
  onChange: (algorithm: SortingAlgorithms) => void
}

const AlgorithmSelector: React.FC<Props> = ({ selected, onChange }) => {
  const disable = useShouldDisableControlPanel()
  const algorithms = getAlgorithmOptions(ALGORITHMS_LIST)

  return (
    <div className={styles.sideBarInputContainer}>
      <Text>Select Algorithm</Text>
      <Spacer y={-0.4} />
      <Select
        disabled={disable}
        onChange={(algorithm) => onChange(algorithm as SortingAlgorithms)}
        size="large"
        value={selected}>
        {algorithms}
      </Select>
    </div>
  )
}

const getAlgorithmOptions = (algorithms: SortingAlgorithms[]) => {
  const selectOptions = algorithms.map((algorithm, idx) => (
    <Select.Option key={idx} value={algorithm}>
      {`${algorithm} sort`}
    </Select.Option>
  ))
  return selectOptions
}

export { AlgorithmSelector }
