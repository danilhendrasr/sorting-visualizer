import React, { useEffect, useRef, useState } from "react"
import { animateSelectionSort } from "../algorithms-helper/selection-sort"
import { Bar } from "../components/Bar"
import { ChartWrapper } from "../components/ChartWrapper"
import { SortButton } from "../components/SortButton"
import { generateBarHeights, changeBarsColor } from "../utils/index"
import { Grid, Row, Spacer } from "@geist-ui/react"
import { AlgorithmSelector } from "../components/AlgorithmSelector"
import { INACTIVE_BAR_COLOR } from "../constants"
import { SortingAlgorithms, SortingState } from "../types"
import { animateInsertionSort } from "../algorithms-helper/insertion-sort"
import { default as Head } from "next/head"
import { animateBubbleSort } from "../algorithms-helper/bubble-sort"

const startAnimation = (
  sortingAlgorithm: SortingAlgorithms,
  barHeights: number[],
  callback?: () => void
): void => {
  switch (sortingAlgorithm) {
    case "Selection":
      animateSelectionSort(barHeights, callback)
      break
    case "Insertion":
      animateInsertionSort(barHeights, callback)
      break
    case "Bubble":
      animateBubbleSort(barHeights, callback)
      break
  }
}

const Home: React.FC = () => {
  const [barHeights, setBarHeights] = useState([])
  const [sortState, setSortState] = useState<SortingState>("Sort")
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string | string[]>(
    "Selection"
  )

  const barsEl = useRef<HTMLDivElement[]>([])

  const bars = barHeights.map((heightValue, idx) => (
    <Bar
      key={idx}
      height={heightValue}
      elRef={(element) => (barsEl.current[idx] = element)}
    />
  ))

  useEffect(() => {
    const newBarHeights = generateBarHeights(100)
    setBarHeights(newBarHeights)
    setSortState("Sort")

    // requestAnimationFrame is used to defer the function execution after
    // the browser has finished painting.
    window.requestAnimationFrame(() => {
      changeBarsColor(barsEl.current, INACTIVE_BAR_COLOR)
    })
  }, [selectedAlgorithm])

  return (
    <>
      <Head>
        <title>Sorting Algorithms Visualizer</title>
      </Head>

      <Spacer y={1.3} />
      <Row justify="center">
        <ChartWrapper bars={bars} />
      </Row>
      <Spacer y={2} />
      <Row justify="center">
        <SortButton
          sortState={sortState}
          clickAction={() => {
            setSortState("Sorting")
            startAnimation(selectedAlgorithm as SortingAlgorithms, barHeights, () =>
              setSortState("Sorted")
            )
          }}
        />
        <Spacer x={1} />
        <AlgorithmSelector
          disabled={sortState === "Sorting" ? true : false}
          selectedAlgorithm={selectedAlgorithm}
          onChangeHandler={setSelectedAlgorithm}
        />
      </Row>
    </>
  )
}

export default Home
