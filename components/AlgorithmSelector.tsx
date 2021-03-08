// @ts-ignore
import styles from "../styles/Home.module.scss"

import { Select, Text, Spacer } from "@geist-ui/react"
import { SortingAlgorithms } from "../types"
import { useControlsDisabled } from "../hooks"
import { ALGORITHMS_LIST } from "../constants"

interface Props {
  selectedAlgorithm: SortingAlgorithms
  onChange: (algorithm: SortingAlgorithms) => void
}

const getSelectOptionsFromAlgorithmsList = (algorithmsList: SortingAlgorithms[]) => {
  const selectOptions = algorithmsList.map((algorithm, idx) => (
    <Select.Option key={idx} value={algorithm}>
      {`${algorithm} sort`}
    </Select.Option>
  ))

  return selectOptions
}

export const AlgorithmSelector: React.FC<Props> = ({ selectedAlgorithm, onChange }) => {
  const isControlsDisabled = useControlsDisabled()
  const selectOptions = getSelectOptionsFromAlgorithmsList(ALGORITHMS_LIST)

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
