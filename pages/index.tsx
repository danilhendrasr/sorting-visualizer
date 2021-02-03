import React, { useEffect, useRef, useState } from "react"
import { animateSelectionSort } from "../algorithms-helper/selection-sort"
import { Bar } from "../components/Bar"
import { ChartWrapper } from "../components/ChartWrapper"
import { SortButton } from "../components/SortButton"
import { generateBarHeights, changeBarsColor } from "../utils/index"
import { Grid } from "@geist-ui/react"
import { AlgorithmSelector } from "../components/AlgorithmSelector"
import { INACTIVE_BAR_COLOR } from "../constants"
import { SortingAlgorithms, SortingState } from "../types"
import { animateInsertionSort } from "../algorithms-helper/insertion-sort"

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

  const getNewBarHeights = () => {
    const newBarHeights = generateBarHeights(100)
    setBarHeights(newBarHeights)
  }

  useEffect(() => {
    getNewBarHeights()
    setSortState("Sort")
    // requestAnimationFrame is used to defer the function execution after
    // the browser has finished painting.
    window.requestAnimationFrame(() => {
      changeBarsColor(barsEl.current, INACTIVE_BAR_COLOR)
    })
  }, [selectedAlgorithm])

  return (
    <Grid.Container justify="center" style={{ height: "100vh" }}>
      <Grid xs={24} style={{ paddingTop: "40px" }}>
        <ChartWrapper bars={bars} />
      </Grid>
      <Grid xs={24}>
        <div>
          <SortButton
            sortState={sortState}
            clickAction={() => {
              setSortState("Sorting")
              startAnimation(selectedAlgorithm as SortingAlgorithms, barHeights, () =>
                setSortState("Sorted")
              )
            }}
          />
          <AlgorithmSelector
            selectedAlgorithm={selectedAlgorithm}
            onChangeHandler={setSelectedAlgorithm}
          />
        </div>
      </Grid>
    </Grid.Container>
  )
}

export default Home
