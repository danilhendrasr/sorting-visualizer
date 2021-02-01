import React, { useEffect, useRef, useState } from "react"
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
import { ActiveBar, SortingAlgorithms, SortingState } from "../types"
import { insertionSort } from "../algorithms/insertionSort"

/**
 * Sorting speed in miliseconds
 */
const SORTING_SPEED = 50

const animateSelectionSort = (barHeights: number[], callback?: () => void): void => {
  const [arrayStates, animationSequence] = selectionSort(barHeights)
  const bars = getAllBars()

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

const animateInsertionSort = (barHeights: number[], callback?: () => void): void => {
  const animationSequence = insertionSort(barHeights)
  const bars = getAllBars()

  for (let i = 0; i < animationSequence.length; i++) {
    const {
      idx: idxToInsertTo,
      moveFrom: barToMove,
      shift: rightShift,
    } = animationSequence[i]
    const isFirstIteration = i === 0
    const isLastIteration = i === animationSequence.length - 1

    let prevIdxBarHeights = []

    setTimeout(() => {
      if (!isFirstIteration) {
        changeBarsColor(bars[animationSequence[i - 1].idx], INACTIVE_BAR_COLOR)
      }

      prevIdxBarHeights.push(bars[idxToInsertTo].style.height)
      makeBarsActive([{ element: bars[idxToInsertTo], height: barHeights[barToMove] }])
    }, i * SORTING_SPEED)

    for (let x = 1; x <= rightShift; x++) {
      setTimeout(() => {
        prevIdxBarHeights.push(bars[idxToInsertTo + x].style.height)
        bars[idxToInsertTo + x].style.height = prevIdxBarHeights[x - 1]

        const isLastInnerIteration = x === rightShift
        if (isLastInnerIteration && isLastIteration) {
          changeBarsColor(bars[idxToInsertTo], INACTIVE_BAR_COLOR)
          postSortAnimation(bars, ACTIVE_BAR_COLOR)
          if (callback) callback()
        }
      }, i * SORTING_SPEED)
    }
  }
}

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
