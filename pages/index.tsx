import React, { useEffect, useState } from "react"
import { selectionSort } from "../algorithms/selectionSort"
import { Bar } from "../components/Bar"
import { ChartWrapper } from "../components/ChartWrapper"
import { SortButton } from "../components/SortButton"
import {
  generateBarHeights,
  makeBarsActive,
  postSortAnimation,
  changeBarsColor,
  getAllBars,
} from "../utils/index"
import { Grid } from "@geist-ui/react"
import { AlgorithmSelector } from "../components/AlgorithmSelector"
import { ACTIVE_BAR_COLOR, INACTIVE_BAR_COLOR } from "../constants"
import { ActiveBar, SortingState } from "../types"

/**
 * Sorting speed in miliseconds
 */
const SORTING_SPEED = 50

const animateSelectionSort = (barHeights: number[], callback?: () => void): void => {
  const [arrayStates, animationSequence] = selectionSort(barHeights)
  const bars = document.getElementsByClassName("bar") as HTMLCollectionOf<HTMLElement>

  for (let i = 0; i < animationSequence.length; i++) {
    let firstIteration = i === 0
    let lastIteration = i === animationSequence.length - 1

    const [bar1Idx, bar2Idx] = animationSequence[i]

    const activeBar1 = bars[bar1Idx]
    const activeBar2 = bars[bar2Idx]

    const activeBar1Height = arrayStates[i][bar2Idx]
    const activeBar2Height = arrayStates[i][bar1Idx]

    let barsToActiveBars: ActiveBar[] = [
      {
        element: activeBar1,
        height: activeBar2Height,
      },
      {
        element: activeBar2,
        height: activeBar1Height,
      },
    ]

    setTimeout(() => {
      if (!firstIteration) {
        // Reset previously active bars' color
        let prevAnimationSequence = animationSequence[i - 1]
        let [prevBar1Idx, prevBar2Idx] = prevAnimationSequence
        let previousActiveBars = [bars[prevBar1Idx], bars[prevBar2Idx]]
        changeBarsColor(previousActiveBars, INACTIVE_BAR_COLOR)
      }

      makeBarsActive(barsToActiveBars)

      if (lastIteration) {
        // Revert the last bar to an inactive bar
        setTimeout(() => {
          let lastBar = activeBar1
          changeBarsColor(lastBar, INACTIVE_BAR_COLOR)

          // Because this animate function executes asynchronous function (setTimeout)
          // if we wanted to do something right after this function is done running,
          // we have to put the code inside the last setTimeout.
          // Otherwise, the code will get executed without waiting for the setTimeouts
          // to get executed.
          postSortAnimation(bars, ACTIVE_BAR_COLOR)
          if (callback) callback()
        }, SORTING_SPEED)
      }
    }, i * SORTING_SPEED)
  }
}

const Home: React.FC = () => {
  const [barHeights, setBarHeights] = useState([])
  const [sortState, setSortState] = useState<SortingState>("Sort")
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string | string[]>(
    "Selection"
  )

  const bars = barHeights.map((heightValue, idx) => (
    <Bar key={idx} height={heightValue} />
  ))

  const getNewBarHeights = () => {
    const newBarHeights = generateBarHeights(100)
    setBarHeights(newBarHeights)
  }

  const makeAllBarsInactive = () => {
    const allBars = getAllBars()
    changeBarsColor(allBars, INACTIVE_BAR_COLOR)
  }

  useEffect(() => {
    getNewBarHeights()
    setSortState("Sort")
    makeAllBarsInactive()
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
              animateSelectionSort(barHeights, () => setSortState("Sorted"))
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
