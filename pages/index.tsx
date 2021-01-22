import React, { useEffect, useState } from "react"
import { selectionSort } from "../algorithms/selectionSort"
import { Bar } from "../components/Bar"
import { ChartWrapper } from "../components/ChartWrapper"
import { SortButton } from "../components/SortButton"
import { generateNewBarHeights } from "../utils/index"
import { Grid } from "@geist-ui/react"

/**
 * Tailwind class of the active bar
 */
const ACTIVE_BAR_CLASS = "bg-black"

/**
 * Tailwind class of the default bar
 */
const INACTIVE_BAR_CLASS = "bg-red-600"

/**
 * Sorting speed in miliseconds
 */
const SORTING_SPEED = 50

interface changeElementClassParam {
  add?: string
  remove?: string
}

/**
 * Change an element's classList, can be adding or removing item from classList depending on the
 * 2nd param's properties
 * @param element A bar DOM element which will be modified
 * @param operations An object containing 2 optional property, add and remove. The presence
 * of one or both of it will determine what kind of operation will be done to the classList
 */
const changeElementClass = (
  element: Element,
  operations: changeElementClassParam
): void => {
  let isAdd = operations.add
  let isRemove = operations.remove
  let isRemoveAndAdd = isRemove && isAdd

  if (isRemoveAndAdd) {
    element.classList.remove(operations.remove)
    element.classList.add(operations.add)
  } else if (isAdd) {
    element.classList.add(operations.add)
  } else if (isRemove) {
    element.classList.remove(operations.remove)
  }
}

/**
 * Revert each bar in the given collection bars from active bar to default bar
 * @param bars HTMLCollection of bar elements
 */
const revertBarsColor = (bars: Element[]): void => {
  for (const bar of bars) {
    changeElementClass(bar, {
      add: INACTIVE_BAR_CLASS,
      remove: ACTIVE_BAR_CLASS,
    })
  }
}

/**
 * Turn 2 previously active bars back into inactive bars
 * @param prevBarsIndexes Previous bars' indexes in the current DOM
 * @param bars Array/HTMLCollection of the bar's DOM elemnt
 */
const revertPreviousBarsColors = (
  prevBarsIndexes: [number, number],
  bars: HTMLCollectionOf<Element>
): void => {
  let [prevBar1Idx, prevBar2Idx] = prevBarsIndexes

  let prevActiveBar1 = bars[prevBar1Idx]
  let prevActiveBar2 = bars[prevBar2Idx]

  let previousActiveBars = [prevActiveBar1, prevActiveBar2]

  revertBarsColor(previousActiveBars)
}

type BarToActiveBar = { element: Element; newHeight: number }

/**
 * Turn each bar in the given array into an active bar, then set the height of it
 * to the given newHeight property
 * @param bars Array of object, each item is an object containing the element which
 * will be changed and the new height for that element
 */
const makeBarsActive = (bars: BarToActiveBar[]): void => {
  for (const bar of bars) {
    changeElementClass(bar.element, {
      add: ACTIVE_BAR_CLASS,
      remove: INACTIVE_BAR_CLASS,
    })

    // @ts-ignore
    bar.element.style.height = `${bar.newHeight}%`
  }
}

/**
 * Turn every bar in the given array into an active bar one by one, from first bar to last bar
 * @param bars Array/HTML Collection of the bar's DOM elements
 */
const postSortAnimation = (bars: HTMLCollectionOf<Element>): void => {
  for (let n = 0; n < bars.length; n++) {
    setTimeout(() => {
      let nThBar = bars[n]

      changeElementClass(nThBar, {
        remove: INACTIVE_BAR_CLASS,
        add: ACTIVE_BAR_CLASS,
      })
    }, n * 10)
  }
}

const animateSelectionSort = (barHeights: number[], postSortFunc?: () => void): void => {
  const [arrayStates, animationSequence] = selectionSort(barHeights)
  const bars = document.getElementsByClassName("bar")

  for (let i = 0; i < animationSequence.length; i++) {
    let firstIteration = i === 0
    let lastIteration = i === animationSequence.length - 1

    const [bar1Idx, bar2Idx] = animationSequence[i]

    const activeBar1 = bars[bar1Idx]
    const activeBar2 = bars[bar2Idx]

    const activeBar1Height = arrayStates[i][bar2Idx]
    const activeBar2Height = arrayStates[i][bar1Idx]

    setTimeout(() => {
      if (!firstIteration) {
        let prevAnimationSequence = animationSequence[i - 1]
        revertPreviousBarsColors(prevAnimationSequence, bars)
      }

      let barsToActiveBars: BarToActiveBar[] = [
        {
          element: activeBar1,
          newHeight: activeBar2Height,
        },
        {
          element: activeBar2,
          newHeight: activeBar1Height,
        },
      ]

      makeBarsActive(barsToActiveBars)

      if (lastIteration) {
        // Revert the last bar to an inactive bar
        setTimeout(() => {
          let lastBar = activeBar1
          revertBarsColor([lastBar])

          // Because this animate function executes asynchronous function (setTimeout)
          // if we wanted to do something right after this function is done running,
          // we have to put the code inside the setTimeout and set it to run at the last iteration.
          // Otherwise, the code will be executed before the setTimeouts get
          // executed (because it is asynchronous).
          postSortAnimation(bars)
          if (postSortFunc) postSortFunc()
        }, SORTING_SPEED)
      }
    }, i * SORTING_SPEED)
  }
}

const Home: React.FC = () => {
  const [barHeights, setBarHeights] = useState([])
  const [sortState, setSortState] = useState<"Sort" | "Sorting" | "Sorted">("Sort")

  const bars = barHeights.map((heightValue, idx) => (
    <Bar key={idx} height={heightValue} />
  ))

  useEffect(() => {
    const newBarHeights = generateNewBarHeights(100)
    setBarHeights(newBarHeights)
  }, [])

  return (
    <Grid.Container justify="center" style={{ height: "100vh" }}>
      <Grid xs={24} style={{ paddingTop: "40px" }}>
        <ChartWrapper bars={bars} />
      </Grid>
      <Grid xs={24}>
        <SortButton
          sortState={sortState}
          clickAction={() => {
            setSortState("Sorting")
            animateSelectionSort(barHeights, () => setSortState("Sorted"))
          }}
        />
      </Grid>
    </Grid.Container>
  )
}

export default Home
